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
    photos: GGSPhoto[];
};
type WikimediaPhoto = {
    imageUrl: string;
    filename: string;
    originalUrl: string;
    attribution: string;
    copyright: string;
};
type Coordinate = {
    latitude: number;
    longitude: number;
};
export declare function parseCoordinates(inputLatitude: string | number | undefined, inputLongitude: string | number | undefined): Coordinate | undefined;
export declare function getWikimediaPhotoData(wikiUrl: string): Promise<WikimediaPhoto>;
export declare function getPhotos(locationId: string, photoRef: string): Promise<GGSPhoto[]>;
export declare function buildLocations(workbook: any): Promise<GGSLocation[]>;
export declare function checkSpreadsheet(): Promise<number>;
export declare function processSpreadsheet(): Promise<void>;
export {};
