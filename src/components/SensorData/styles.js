const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 18,
  },
  updateContainer: {
    flex: 1,
    alignItems: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E0E0E0',
    marginHorizontal: 12,
  },
  statusBar: {
    height: 4,
    borderRadius: 2,
    marginTop: 8,
  },
  statusGood: {
    backgroundColor: '#4CAF50',
  },
  statusWarning: {
    backgroundColor: '#FFC107',
  },
  updateText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginTop: 16,
  },
  updateBtn: {
    backgroundColor: 'lightgrey',
    padding: 8,
    borderRadius: 5,
    fontSize: 20,
  },
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
  dataContainer: {
    flex: 1,
  },
});
