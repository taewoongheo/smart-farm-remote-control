import {useEffect, useState} from 'react';
import {fetchSensorData} from '../services/esp32';
import {UPDATE_INTERVAL} from '../constants/config';

export function useSensorData() {
  const [sensorData, setSensorData] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const updateSensorData = async () => {
    try {
      const data = await fetchSensorData();
      setSensorData(data);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('센서 데이터 fetch 에러:', error);
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
