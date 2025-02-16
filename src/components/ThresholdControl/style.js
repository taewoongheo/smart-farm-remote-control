import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  bottomsheetModal: {
    marginHorizontal: 20,
  },
  bottomsheetContentContainer: {
    flex: 1,
    height: 380,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
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
