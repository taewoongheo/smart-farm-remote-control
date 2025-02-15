const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 26,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#333',
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  valueLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  currentValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  targetValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  unit: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#666',
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
  valueContainerVertical: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginBottom: 12,
    gap: 12,
  },
  valueBox: {
    alignItems: 'center',
  },
  dividerHorizontal: {
    height: 1,
    width: '100%',
    backgroundColor: '#E0E0E0',
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
});
