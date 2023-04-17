import { PutItemCommand, PutItemOutput } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { parse } from 'csv-parse/sync';
import fs from 'fs';
require("dotenv").config({ path: ".env.local" });
import { dynamodbClient } from "./aws";
import { PHOTO_LINKS } from "./photoLinks";
require("isomorphic-fetch");
const path = require('path');

type GGSPhoto = {
  url: string;
  originalUrl?: string;
  copyright?: string;
  attribution?: string;
};

type GGSLocation = {
  locationId: string;
  region: string;
  county: string;
  city?: string;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
  challenge: string;
  image_location: string;
  image_ref: string;
  photos: GGSPhoto[];
};

type WikimediaPhoto = {
  imageUrl: string;
  filename: string;
  originalUrl: string;
  attribution: string;
  copyright: string;
};

const COLUMN_COUNTY: string = "County";
const COLUMN_DISTRICT: string = "District";
const COLUMN_CITY: string = "City";
const COLUMN_NAME: string = "Name";
const COLUMN_LATITUDE: string = "Latitude";
const COLUMN_LONGITUDE: string = "Longitude";
const COLUMN_DESCRIPTION: string = "Description";
const COLUMN_CHALLENGE: string = "Challenge";
const COLUMN_IMAGE_LOCATION: string = "Image location";
const COLUMN_IMAGE_REF: string = "Image ref";

const ROWS_TO_SKIP = 0;

const PHOTOS_BASEURL = process.env.PHOTOS_BASEURL;

// Each sheet has a different name for the column...
function getPhotoColumnKey(sheetJson: any): string {
  let photoColumnKey: string | undefined = undefined;
  sheetJson.forEach((row: Record<string, any>) => {
    photoColumnKey =
      photoColumnKey ||
      Object.keys(row).find(
        (key) => key.includes("folder") || key.toLowerCase().includes("image")
      );
  });
  return photoColumnKey!;
}

function sanitise(input?: string): string {
  return input ? input.toLowerCase().replace(/[^a-z0-9]/gi, "") : "";
}

function createLocationId(
  county: string,
  city: string | undefined,
  name: string
) {
  return `${sanitise(county)}-${sanitise(city)}-${sanitise(name)}`;
}

type Coordinate = {
  latitude: number;
  longitude: number;
};

const REGEX_DEG_MIN_SEC = /^\s*([+-]?\d+)\D+(\d+)\D+(\d+(\.\d+)?)\D*$/;

function getOrdinate(input: string | number | undefined): number {
  if (typeof input === "number") {
    return Number.isInteger(input) ? 0 : input;
  }

  const result = input ? parseFloat(input.trim()) : 0;
  if (!result || Number.isNaN(result)) {
    // Input is unlikely to be valid ordinate
    return 0;
  }

  if (!Number.isInteger(result)) {
    return result;
  }

  // Integer suggests degree minute second format - attempt to parse
  const components = input!.match(REGEX_DEG_MIN_SEC);
  if (!components) {
    return 0;
  }

  return (
    parseFloat(components[1]) +
    parseFloat(components[2]) / 60 +
    parseFloat(components[3]) / 3600
  );
}

export function parseCoordinates(
  inputLatitude: string | number | undefined,
  inputLongitude: string | number | undefined
): Coordinate | undefined {
  const latitude = getOrdinate(inputLatitude);
  let longitude = getOrdinate(inputLongitude);

  if (!latitude || !longitude) {
    // One of the ordinates is probably bad
    console.warn("Probably bad lat/long: ", inputLatitude, inputLongitude);
    return undefined;
  }

  // Handle incorrect signs for longitudes - everything is west of prime meridian
  longitude = -Math.abs(longitude);

  if (latitude < 50 || latitude > 61 || longitude < -9 || longitude > 0) {
    // Out of range coordinates
    console.warn("Probably transposed lat/long: ", inputLatitude, inputLongitude);
    return undefined;
  }

  return { latitude, longitude };
}

export async function getWikimediaPhotoData(wikiUrl: string): Promise<WikimediaPhoto> {
  const wikiFile = wikiUrl.substring("https://commons.wikimedia.org/wiki/File:".length);

  const queryUrl = `https://en.wikipedia.org/w/api.php?format=json&action=query&titles=File:${wikiFile}&prop=imageinfo&iiprop=user|extmetadata|url&iiextmetadatafilter=LicenseShortName&iiurlwidth=640`;

  const response = await fetch(queryUrl, { method: "GET" })
    .then((data) => data.json())
    .catch((err) => {
      console.error(err);
    });
  const imageinfo = (Object.values(response.query.pages)[0] as any)
    .imageinfo[0];
  return {
    imageUrl: imageinfo.thumburl,
    filename: imageinfo.thumburl.split("/").pop(),
    originalUrl: wikiUrl,
    attribution: imageinfo.user,
    copyright: imageinfo.extmetadata.LicenseShortName.value,
  };
}

export async function getPhotos(locationId: string, photoRef: string) {
  let photoLinkCount = 0;
  let photoFileCount = 0;
    const photos: GGSPhoto[] = [];

  if (PHOTO_LINKS[photoRef]) {
    // Already processed linked (or file with attribution) photo - skip fetching again
    console.log("Using archived photo link", photoRef);
    const archivedPhoto = PHOTO_LINKS[photoRef];
    photos.push({
      url: `${PHOTOS_BASEURL}/${archivedPhoto.file}`,
      attribution: archivedPhoto.attribution,
      copyright: archivedPhoto.copyright,
      originalUrl: archivedPhoto.originalUrl,
    });
    photoLinkCount++;
  } else if (photoRef?.startsWith("https://commons.wikimedia.org/wiki/File:")) {
    // Linked wikimedia photo
    const wikiPhotoData = await getWikimediaPhotoData(photoRef);
    // Throttle fetch rate to avoid annoying wikimedia
    await new Promise((r) => setTimeout(r, 2000));
    const photo = {
      url: `${PHOTOS_BASEURL}/${wikiPhotoData.filename}`,
      attribution: wikiPhotoData.attribution,
      copyright: wikiPhotoData.copyright,
      originalUrl: wikiPhotoData.originalUrl,
    };
    console.log("Upload this photo to the photos bucket:");
    console.log(wikiPhotoData.imageUrl);
    console.log("Then add the following to PHOTO_LINKS:");
    console.log(
      `"${photoRef}": ${JSON.stringify({
        file: wikiPhotoData.filename,
        attribution: wikiPhotoData.attribution,
        copyright: wikiPhotoData.copyright,
        originalUrl: wikiPhotoData.originalUrl,
      })},`
    );
    photos.push(photo);
    photoLinkCount++;
  } else if (photoRef?.includes("http")) {
    // Linked photo - manually process and add to PHOTO_LINKS
    console.log("Unprocessed photo link", locationId, photoRef);
    photoLinkCount++;
  } else if (photoRef) {
    // File photo - no attribution or copyright requested
    photos.push({
      url: `${PHOTOS_BASEURL}/${locationId}.jpg`,
    });
    console.log("Photo file", `${locationId}.jpg`);
    
    photoFileCount++;
  }
  return photos;
}

export async function buildLocations(csvFilePath: string): Promise<GGSLocation[]> {
  const csvFileContents = fs.readFileSync(csvFilePath, 'utf8');

  // Parse the CSV file contents
  const records = parse(csvFileContents, { columns: true, skip_empty_lines: true });

  return processCsvData(records);
}

async function uploadToDynamoDB(locations: GGSLocation[]) {
  const locationsTableName = process.env.LOCATIONS_TABLE_NAME;
  console.log("Loading location data into DynamoDB", locationsTableName);

  for (let location of locations) {
    const result: PutItemOutput = await dynamodbClient.send(
      new PutItemCommand({
        TableName: locationsTableName,
        Item: marshall(location, { removeUndefinedValues: true }),
      })
    );
  }
}

export async function checkSpreadsheet() {
  const partial_csv_file_location = process.env.SOURCE_SPREADSHEET_PATH;
  const csv_file_location = path.join(__dirname, partial_csv_file_location);
  const csv_file_location_abs = path.resolve(csv_file_location);

  console.log(`Checking CSV import files in: ${csv_file_location_abs}...`);

  const allFiles = fs.readdirSync(csv_file_location_abs);
  let allFilesAbs: string[] = [];
  allFiles.forEach((relativeFile) => {
    const absFile = path.join(csv_file_location_abs, relativeFile);
    allFilesAbs.push(absFile);
  });
  const csvFiles = allFilesAbs.filter(x => path.extname(x) === '.csv')

  const all_locations: GGSLocation[] = [];

  for (const csvFile of csvFiles) {
    const locations = await buildLocations(csvFile);

    locations.forEach((location) => {
      console.log(location.locationId, location.name);
      all_locations.push(location);
    });
  }

  return all_locations.length;
}

export async function processSpreadsheet() {
  const csv_file_path = process.env.SOURCE_SPREADSHEET_PATH;
  if (csv_file_path == undefined) {
    throw new Error(`Error reading SOURCE_SPREADSHEET_PATH: ${csv_file_path}.`);
  }

  const locations = await buildLocations(csv_file_path!);

  locations.forEach((location) => {
    console.log(location.locationId, location.name);
  });

  await uploadToDynamoDB(locations);
}

function processCsvData(csvData: object[]): GGSLocation[] {
  const result: GGSLocation[] = [];

  let photoLinkCount = 0;
  let photoFileCount = 0;
  let successCount = 0;
  let failCount = 0;

  for (let csvRow of csvData) {

//    console.log("Row: ");
//    console.log(csvRow);

    // TODO photo handling
    let photoColumnKey = getPhotoColumnKey(csvData);
    const county = csvRow[COLUMN_COUNTY];
    const district = csvRow[COLUMN_DISTRICT];
    const city = csvRow[COLUMN_CITY];
    const name = csvRow[COLUMN_NAME];
    const locationId = createLocationId(county, city, name);

//    const photos: GGSPhoto[] = await getPhotos(locationId, csvRow[photoColumnKey]);

    const coordinates = parseCoordinates(csvRow[COLUMN_LATITUDE], csvRow[COLUMN_LONGITUDE]);

    const description = csvRow[COLUMN_DESCRIPTION];
    const image_location = csvRow[COLUMN_IMAGE_LOCATION];
    const image_ref = csvRow[COLUMN_IMAGE_REF];
    const challenge = csvRow[COLUMN_CHALLENGE];
    if (!coordinates) {
      console.warn("Incomplete location coordinates: ", county, {
        [COLUMN_COUNTY]: county,
        [COLUMN_CITY]: city,
        [COLUMN_NAME]: csvRow[COLUMN_NAME],
        [COLUMN_LATITUDE]: csvRow[COLUMN_LATITUDE],
        [COLUMN_LONGITUDE]: csvRow[COLUMN_LONGITUDE],
      }, csvRow);
      failCount++;
    } else if (!name || !county || !description || !challenge) {
      console.warn("Incomplete location information: ", county, {
        [COLUMN_COUNTY]: county,
        [COLUMN_CITY]: city,
        ...csvRow,
      });
      failCount++;
    } else {
      const photos: GGSPhoto[] = [];
      result.push({
        locationId,
        region: district,
        county,
        city,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        name,
        description,
        challenge,
        photos,
        image_location,
        image_ref
      });
      successCount++;
    }
  }
  
  console.log("success: ", successCount);
  console.log("fail: ", failCount);
  console.log("photo links: ", photoLinkCount);
  console.log("photo files: ", photoFileCount);
  
  return result;
}