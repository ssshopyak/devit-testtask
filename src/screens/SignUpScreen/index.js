import React, {useEffect, useState} from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {isValidNumber} from 'react-native-phone-number-input'
import validator from 'validator'
import Colors from '../../assets/colors'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Logo from '../../components/Logo'
import OtpPhoneInput from '../../components/OtpPhoneInput'
import {toRegister} from '../../database'
import Auth from '../../store/auth'

const RegisterScreen = ({navigation}) => {
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [phoneCode, setPhoneCode] = useState('')
  const [phoneForValidation, setPhoneForValidation] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userConfirmPassword, setUserConfirmPassword] = useState('')

  const handleSubmitButton = () => {
    if (!userName) {
      alert('Please fill Name')
      return
    }
    if (!userEmail) {
      alert('Please fill Email')
      return
    }
    if (!userPassword) {
      alert('Please fill Password')
      return
    }
    if (!userConfirmPassword) {
      alert('Please confirm Password')
      return
    }
    if (!phoneCode) {
      alert('Please fill code')
      return
    }
    if (userPassword !== userConfirmPassword) {
      alert("confirm password doesn't match")
      return
    }
    if (!validator.isEmail(userEmail)) {
      alert("email isn't valid")
      return
    }
    if (!isValidNumber(phoneForValidation, 'UA')) {
      alert("phone isn't valid")
      return
    }
    toRegister(userName, userEmail, userPhone, userPassword)
    Auth.ToAuthorize()
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Logo textUnderLogo={'Sign Up To woorkroom'} />
        <KeyboardAvoidingView style={styles.inputContainer}>
          <OtpPhoneInput
            setPhoneValidation={setPhoneForValidation}
            setPhone={setUserPhone}
            setPhoneCode={setPhoneCode}
          />
          <Input title={'Your Name'} setValue={setUserName} />
          <Input
            title={'Your Email'}
            setValue={setUserEmail}
            keyboardType={'email-address'}
          />
          <Input
            title={'Password'}
            setValue={setUserPassword}
            isPassword={true}
          />
          <Input
            title={'Password'}
            setValue={setUserConfirmPassword}
            isPassword={true}
          />
          <Button onPress={handleSubmitButton} title={'Next'} />
          <Text
            style={styles.registerTextStyle}
            onPress={() => navigation.push('LogIn')}>
            Have Account? <Text style={{color: Colors.active}}>Log In</Text>
          </Text>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}
export default RegisterScreen

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 50,
  },
  registerTextStyle: {
    fontFamily: 'Poppins',
    color: Colors.body,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
})
