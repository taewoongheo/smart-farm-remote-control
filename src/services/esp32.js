import {firebase} from '@react-native-firebase/database';

export const sendThreshold = async threshold => {
  try {
    firebase.app().database().ref('/thresholds').update(threshold);
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
