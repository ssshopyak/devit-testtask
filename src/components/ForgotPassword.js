import React, {useState} from 'react'
import {Modal, StyleSheet, Text, View} from 'react-native'
import RNRestart from 'react-native-restart'
import Colors from '../assets/colors'
import {resetPassword, toGetDataByEmail} from '../database'
import auth from '../store/auth'
import {showError, showSuccess} from '../utils/flash-messages'
import Button from './Button'
import Input from './Input'

const ForgotPassword = ({modalVisible, setModalVisible, navigation}) => {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPasswordConfirm, setUserPasswordConfirm] = useState('')

  const handleSubmitPress = () => {
    if (!userEmail) {
      showError('Please fill Email')
      return
    }
    if (!userPassword) {
      showError('Please fill Password')
      return
    }
    if (!userPasswordConfirm) {
      showError('Please confirm Password')
      return
    }
    if (userPassword !== userPasswordConfirm) {
      showError("Confirm password doesn't match")
      return
    }
    toGetDataByEmail(userEmail).then(res => {
      if (res.length > 0) {
        resetPassword(userEmail, userPassword)
        showSuccess('Password was changed')
        auth.ToSetEmail(userEmail)
        auth.ToAuthorize()
      } else {
        showError('Email Address is not Registered')
      }
    })
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible)
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.close}>Close</Text>
          <Text style={styles.modalText}>Change password</Text>
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
          <Input
            value={userPasswordConfirm}
            setValue={setUserPasswordConfirm}
            title={'Password'}
            isPassword={true}
          />
          <Button onPress={handleSubmitPress} title={'Confirm'} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
  },
  close: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  modalView: {
    margin: 20,
    width: '95%',

    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
  },
})

export default ForgotPassword
