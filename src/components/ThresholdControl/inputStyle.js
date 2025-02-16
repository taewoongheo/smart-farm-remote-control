import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  inputContainer: {
    gap: 15,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    width: '70%',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  inputText: {
    fontSize: 18,
    fontWeight: 600,
  },
  sendText: {
    fontSize: 20,
    fontWeight: 700,
    color: 'white',
  },
});
