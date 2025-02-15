import React from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import SensorData from './components/SensorData';
import {useSensorData} from './hooks/useSensorData';

function App() {
  const {sensorData, lastUpdate, refreshing, setRefreshing, updateSensorData} =
    useSensorData();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await updateSensorData();
    } catch (error) {
      console.error('센서 데이터를 가져올 수 없습니다', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <SensorData
          sensorData={sensorData}
          lastUpdate={lastUpdate}
          // thresholds={thresholds}
        />
        {/* <ThresholdControl /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
});

export default App;
