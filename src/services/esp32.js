import {firebase} from '@react-native-firebase/database';
import {ESP32_IS_CONNECT} from '../constants/config';
import {mockSensorData} from '../constants/mockSensorData';

export const fetchSensorData = async () => {
  if (!ESP32_IS_CONNECT) {
    return mockSensorData;
  }

  try {
    const snapshot = await firebase
      .app()
      .database()
      .ref('/sensorData')
      .once('value');
    return snapshot.val();
  } catch (error) {
    console.error('Error fetching sensor data from Firebase:', error);
    return mockSensorData;
  }
};

export const sendThreshold = async threshold => {
  if (!ESP32_IS_CONNECT) {
    return {success: true, data: threshold};
  }

  try {
    await firebase.app().database().ref('/threshold').set(threshold);

    return {
      success: true,
      data: threshold,
    };
  } catch (error) {
    console.error('Error sending threshold to Firebase:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};
