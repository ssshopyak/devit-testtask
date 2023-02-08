import React, {useState} from 'react'
import {KeyboardAvoidingView, ScrollView, Text, View} from 'react-native'
import Colors from '../../assets/colors'
import Button from '../../components/Button'
import ForgotPassword from '../../components/ForgotPassword'
import Input from '../../components/Input'
import Logo from '../../components/Logo'
import {toGetData} from '../../database'
import Auth from '../../store/auth'
import {showError} from '../../utils/flash-messages'
import styles from './style'

export default function LogInScreen({navigation}) {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const toForgotPassword = () => {
    setModalVisible(true)
  }

  const handleSubmitPress = () => {
    if (!userEmail) {
      showError('Please fill Email')
      return
    }
    if (!userPassword) {
      showError('Please fill Password')
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
          showError('Wrong Password')
        }
      } else {
        showError('Email Address is not Registered')
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
          <ForgotPassword
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </View>
  )
}
