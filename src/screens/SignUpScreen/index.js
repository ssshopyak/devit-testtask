import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import validator from 'validator';
import { toRegister, createTable } from '../../database';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import PhoneInput from "react-native-phone-number-input";
import Button from '../../components/Button';
import Input from '../../components/Input';
import Logo from '../../components/Logo';

const RegisterScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState(0)
  const [phoneCode, setPhoneCode] = useState('')
  const [phoneForValidation, setPhoneForValidation] = useState('')
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('')
  const phoneInput = useRef();

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
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Logo/>
        <View>
            <Text style={styles.titleText}>Sign Up To woorkroom</Text>
          </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <Text style={styles.underInputText}>Phone Number</Text>
            <PhoneInput
              flagButtonStyle={[styles.phoneInput,{marginRight:20}]}
              textContainerStyle={[styles.phoneInput]}
              textInputStyle={{fontSize:16}}
              codeTextStyle={{color:'#9795A4'}}
              ref={phoneInput}
              defaultCode="UA"
              layout="second"
              onChangeText={(text) => {
                setPhoneForValidation(text)
              }}
              onChangeFormattedText={(text) => {
                setUserPhone(text);
              }}
            />
          </View>
          <View style={styles.SectionStyle}>
            <Text style={styles.underInputText}>Code</Text>
            <OTPInputView
              pinCount={4}
              style={{width: '60%', height: 60}}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code)=>{
                setPhoneCode(code)
              }}
            />
          </View>
          <Input
            title={'Your Name'}
            setValue={setUserName}
            isPassword={false}
            keyboardType={'default'}
          />
          <Input
            title={'Your Email'}
            setValue={setUserEmail}
            isPassword={false}
            keyboardType={'email-address'}
          />
          <Input
            title={'Password'}
            setValue={setUserPassword}
            isPassword={true}
            keyboardType={'default'}
          />
          <Input
            title={'Password'}
            setValue={setUserConfirmPassword}
            isPassword={true}
            keyboardType={'default'}
          />
          <Button
            onPress={handleSubmitButton}
            title={'Next'}
          />
          <Text
            style={styles.registerTextStyle}
            onPress={() => navigation.navigate('LogIn')}>
            Have Account? <Text style={{color:'#FFC612'}}>Log In</Text>
          </Text>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  titleText: {
      textAlign: 'center',
      marginTop: 40,
      marginBottom: 20,
      fontSize: 24,
    },
  registerTextStyle: {
    color: '#9795A4',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 20,
  },
  inputStyle: {
    paddingVertical:10,
    flex: 1,
    color: '#1F1D1D',
    borderBottomWidth: 1,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  underlineStyleBase: {
    marginRight:20,
    fontSize: 16,
    color: '#1F1D1D',
    width: 50,
    height: 50,
    borderRadius:12,
    borderWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: '#FFC612',
  },
  phoneInput: {
    height:50,
    borderWidth:1, 
    borderRadius:15, 
    borderColor:'#D7D7D7', 
  },
  underInputText: {
    position:'absolute', 
    bottom:40, 
    color:'#9795A4'
  },
  iconPasswordVisibility: {
    height:24, 
    width:24, 
    position:'absolute', 
    alignSelf:'center', 
    right: 15, 
    tintColor:'#5E6272',
  }

});