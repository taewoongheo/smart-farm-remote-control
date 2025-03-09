import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  sensorCard: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    minHeight: 180, // 세로 배치를 위한 최소 높이 설정
  },
});
