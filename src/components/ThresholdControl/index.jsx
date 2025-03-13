import React, {useCallback, useRef, useMemo} from 'react';
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './style';
import ThresholdInput from './input';

function ThresholdBottomSheet({threshold, updateThreshold}) {
  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['80%'], []);

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
        style={styles.bottomsheetBtn}
        activeOpacity={0.7}>
        <Text style={styles.bottomsheetBtnText}>목표 값 설정</Text>
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        detached={true}
        style={styles.bottomsheetModal}
        snapPoints={snapPoints}
        bottomInset={50}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}>
        <BottomSheetScrollView
          contentCon
          tainerStyle={styles.bottomsheetContentContainer}>
          <ThresholdInput
            threshold={threshold}
            updateThreshold={updateThreshold}
          />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

export default ThresholdBottomSheet;
