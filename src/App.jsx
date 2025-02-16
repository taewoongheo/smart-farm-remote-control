import React, {useEffect} from 'react';
import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import SensorData from './components/SensorData';
import {useSensorData} from './hooks/useSensorData';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ThresholdBottomSheet from './components/ThresholdControl';
import {useThreshold} from './hooks/useThreshold';
import {styles} from './style';

function App() {
  const {sensorData, lastUpdate, refreshing, setRefreshing, updateSensorData} =
    useSensorData();
  console.log(sensorData);
  const {threshold, updateThreshold, isLoading, error} = useThreshold();

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await updateSensorData();
    } catch (err) {
      console.error('센서 데이터를 가져올 수 없습니다', err);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <View style={styles.scrollViewContainer}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <SensorData
              sensorData={sensorData}
              lastUpdate={lastUpdate}
              threshold={threshold}
              thresholdIsLoading={isLoading}
            />
          </ScrollView>
        </View>

        {/* bottom sheet modal */}
        <ThresholdBottomSheet
          threshold={threshold}
          updateThreshold={updateThreshold}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
