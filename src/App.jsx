import React, {useCallback, useRef} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SensorData from './components/SensorData';
import {useSensorData} from './hooks/useSensorData';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

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

  const bottomSheetModalRef = useRef(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <View style={{padding: 15}}>
          <ScrollView
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
        </View>

        <TouchableOpacity
          onPress={handlePresentModalPress}
          style={styles.bottomsheetBtn}>
          <Text style={styles.bottomsheetBtnText}>목표 값 설정</Text>
        </TouchableOpacity>

        {/* bottom sheet modal */}
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            detached={true}
            style={{marginHorizontal: 20}}
            bottomInset={30}
            backdropComponent={renderBackdrop}
            onChange={handleSheetChanges}>
            <BottomSheetView style={styles.bottomsheetContentContainer}>
              <Text>Awesome 🎉</Text>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  bottomsheetContentContainer: {
    flex: 1,
    height: 200,
  },
  bottomsheetBtn: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 110,
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
  },
  bottomsheetBtnText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 900,
    fontSize: 20,
  },
});

export default App;
