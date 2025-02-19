import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
  unit: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#666',
  },
  dividerHorizontal: {
    height: 1,
    width: '100%',
    backgroundColor: '#E0E0E0',
  },
  targetValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
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
});
