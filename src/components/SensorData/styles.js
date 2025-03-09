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
    marginTop: 10,
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
  dataContainer: {
    flex: 1,
  },
});
