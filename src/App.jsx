import React, {useEffect} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import SensorData from './components/SensorData';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ThresholdBottomSheet from './components/ThresholdControl';
import {useThreshold} from './hooks/useThreshold';
import {styles} from './style';

function App() {
  const {threshold, updateThreshold, isLoading, error} = useThreshold();

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <SensorData threshold={threshold} thresholdIsLoading={isLoading} />

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
