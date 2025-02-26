import {useEffect, useState} from 'react';
import {fetchSensorData} from '../services/esp32';
import {UPDATE_INTERVAL} from '../constants/config';
import {mockSensorData} from '../constants/mockSensorData';

export function useSensorData() {
  const [sensorData, setSensorData] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const updateSensorData = async () => {
    try {
      let data = mockSensorData;
      setTimeout(async () => {
        data = await fetchSensorData();
      }, 5000);
      setSensorData(data);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      throw new Error(`센서 데이터를 가져올 수 없습니다: ${err.message}`);
    }
  };

  useEffect(() => {
    updateSensorData();
    const interval = setInterval(updateSensorData, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return {
    sensorData,
    lastUpdate,
    refreshing,
    setRefreshing,
    updateSensorData,
  };
}
