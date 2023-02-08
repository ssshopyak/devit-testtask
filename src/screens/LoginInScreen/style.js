import {StyleSheet} from 'react-native'
import Colors from '../../assets/colors'

const styles = StyleSheet.create({
  forgotPasswordContainer: {
    width: '80%',
    alignSelf: 'center',
  },
  forgotPassword: {
    color: Colors.body,
    fontFamily: 'Poppins',
    fontSize: 14,
    textAlign: 'right',
  },
  inputContainer: {
    marginTop: 50,
  },
  registerTextStyle: {
    fontFamily: 'Poppins',
    marginHorizontal: 5,
    color: Colors.body,
    textAlign: 'center',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
})

export default styles
