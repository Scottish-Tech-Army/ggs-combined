import config from './config.json';

/**
 * Read the key from the backend configuration file.
 * @param {*} key 
 */
export function readConfig(key) {
  return config[Object.keys(config)[0]][key];
}
