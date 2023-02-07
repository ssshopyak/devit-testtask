import React, {useEffect, useState} from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Colors from '../../assets/colors'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Logo from '../../components/Logo'
import {toGetData} from '../../database'
import Auth from '../../store/auth'

export default function LogInScreen({navigation}) {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const toForgotPassword = () => {
    console.log('forgot password')
  }

  const handleSubmitPress = () => {
    if (!userEmail) {
      alert('Please fill Email')
      return
    }
    if (!userPassword) {
      alert('Please fill Password')
      return
    }
    toGetData.then(res => {
      console.log(res)
      const user = res.find(element => userEmail === element.Email)
      if (typeof user !== 'undefined') {
        if (user.Password === userPassword) {
          Auth.ToAuthorize()
          Auth.ToSetEmail(userEmail)
        } else {
          alert('Wrong Password')
        }
      } else {
        alert('Email Address is not Registered')
      }
    })
  }

  return (
    <View style={styles.mainBody}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View>
          <KeyboardAvoidingView>
            <Logo textUnderLogo={'Log In To Woorkroom'} />
            <View style={styles.inputContainer}>
              <Input
                value={userEmail}
                setValue={setUserEmail}
                keyboardType={'email-address'}
                title={'Your Email'}
              />
              <Input
                value={userPassword}
                setValue={setUserPassword}
                title={'Password'}
                isPassword={true}
              />
            </View>
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPassword} onPress={toForgotPassword}>
                Forgot password?
              </Text>
            </View>
            <Button onPress={handleSubmitPress} title={'Log In'} />
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.push('SignUp')}>
              New User?{' '}
              <Text style={{color: Colors.active}}> Create Account </Text>
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  )
}

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
