import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
  } from 'react-native';
import React , { useState, useEffect } from 'react';
import Auth from '../../store/auth';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { toGetData } from '../../database';
import Colors from '../../assets/colors';

export default function LogInScreen({navigation}) {
  const [data,setData] = useState([])
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSubmitPress = () => {
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    const user = data.find(element => userEmail === element.Email)
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
  }

  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      toGetData.then((res)=>{
        setData(res)
      })
    });
    return unsubscribe;
  },[navigation])

  return (
    <View style={styles.mainBody}>
    <ScrollView keyboardShouldPersistTaps="handled">
      <View>
        <KeyboardAvoidingView>
          <Logo textUnderLogo={'Log In To Woorkroom'}/>
          <View style={styles.inputContainer}>
            <Input
              value={userEmail}
              setValue={setUserEmail}
              keyboardType={"email-address"}
              title={'Your Email'}
            />
            <Input
              value={userPassword}
              setValue={setUserPassword}
              title={'Password'}
              isPassword={true}
            />
          </View>
          <Button
            onPress={handleSubmitPress}
            title={'Log In'}
          />
          <Text
            style={styles.registerTextStyle}
            onPress={() => navigation.navigate('SignUp')}>
            New User? <Text style={{color:Colors.active}}> Create Account </Text>
          </Text>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  </View>  
  );
}

const styles = StyleSheet.create({
    inputContainer: {
      marginTop:50,
    },
    registerTextStyle: {
      marginHorizontal: 5,
      color: Colors.body,
      textAlign: 'center',
      fontSize: 14,
      alignSelf: 'center',
      padding: 10,
    },
  });