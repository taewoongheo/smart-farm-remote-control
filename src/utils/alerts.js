import {Alert} from 'react-native';

function showAlert(title, message, confirm) {
  Alert.alert(`${title}`, `${message}`, [
    {
      text: `${confirm}`,
    },
  ]);
}

export function errorAlert({title, message, confirm}) {
  return showAlert(title, message, confirm);
}

export function statusAlert({title, message, confirm}) {
  return showAlert(title, message, confirm);
}
