import {Alert} from 'react-native';

function showAlert(title, message, text) {
  Alert.alert(`${title}`, `${message}`, [
    {
      text: `${text}`,
    },
  ]);
}

export function errorAlert(title, message, text) {
  return showAlert(title, message, text);
}

export function statusAlert(title, message, text) {
  return showAlert(title, message, text);
}
