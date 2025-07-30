/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
module.exports = {
    assets: ['./assets/fonts'],
  };
AppRegistry.registerComponent(appName, () => App);
