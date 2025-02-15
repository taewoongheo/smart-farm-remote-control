import {ESP32_IP} from '@env';

function getESP32_IP() {
  return ESP32_IP.replace(/'/g, '');
}

export default getESP32_IP;
