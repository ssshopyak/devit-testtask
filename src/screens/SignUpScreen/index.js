import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import validator from 'validator';
import { toRegister, createTable } from '../../database';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Logo from '../../components/Logo';
import OtpPhoneInput from '../../components/OtpPhoneInput';
import Colors from '../../assets/colors';

const RegisterScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('')
  const [phoneCode, setPhoneCode] = useState('')
  const [phoneForValidation, setPhoneForValidation] = useState('')
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('')

  useEffect(()=>{
    createTable()
  },[userPhone])

  const handleSubmitButton = () => {
    if (!phoneForValidation) {
      alert('Please fill Name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    if (!userConfirmPassword) {
      alert('Please confirm Password');
      return;
    }
    if (!phoneCode) {
      alert('Please fill code');
      return;
    }
    if (userPassword !== userConfirmPassword) {
      alert(`confirm password doesn't match`)
      return;
    }
    if (!validator.isEmail(userEmail)) {
      alert(`email isn't valid`)
      return;
    }
    toRegister(userName,userEmail,userPhone,userPassword)
    navigation.navigate('LogIn')
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Logo textUnderLogo={'Sign Up To woorkroom'}/>
        <KeyboardAvoidingView style={styles.inputContainer}>
          <OtpPhoneInput
            setPhoneValidation={setPhoneForValidation}
            setPhone={setUserPhone}
            setPhoneCode={setPhoneCode}
          />
          <Input
            title={'Your Name'}
            setValue={setUserName}
          />
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
          <Button
            onPress={handleSubmitButton}
            title={'Next'}
          />
          <Text
            style={styles.registerTextStyle}
            onPress={() => navigation.navigate('LogIn')}>
            Have Account? <Text style={{color:Colors.active}}>Log In</Text>
          </Text>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 50,
  },
  registerTextStyle: {
    color: Colors.body,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
});