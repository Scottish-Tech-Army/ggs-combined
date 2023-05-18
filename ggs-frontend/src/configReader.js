import { config } from './config.json';

/**
 * Read the key from the backend configuration file.
 * @param {*} key 
 */
export function readConfig(key) {
  return config[Object.keys(obj)[0]][key];
}
