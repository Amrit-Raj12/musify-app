/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import playBackService from 'playbackService';
import TrackPlayer from 'react-native-track-player';

TrackPlayer.registerPlaybackService(() => playBackService);

AppRegistry.registerComponent(appName, () => App);
