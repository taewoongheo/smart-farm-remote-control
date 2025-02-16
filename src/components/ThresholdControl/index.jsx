import React, {useCallback, useRef} from 'react';
import {
  BottomSheetModalProvider,
  BottomSheetView,
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './style';
import ThresholdInput from './input';

function ThresholdBottomSheet({threshold, updateThreshold}) {
  const bottomSheetModalRef = useRef(null);

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
    <BottomSheetModalProvider>
      <TouchableOpacity
        onPress={handlePresentModalPress}
        style={styles.bottomsheetBtn}>
        <Text style={styles.bottomsheetBtnText}>목표 값 설정</Text>
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        detached={true}
        style={styles.bottomsheetModal}
        bottomInset={50}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}>
        <BottomSheetView style={styles.bottomsheetContentContainer}>
          <ThresholdInput
            threshold={threshold}
            updateThreshold={updateThreshold}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

export default ThresholdBottomSheet;
