import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    Pressable,
  } from 'react-native';
  import React , { useState, createRef, useEffect } from 'react';
import Auth from '../../store/auth';
import Show from '../../assets/icons/show.png'
import Hide from '../../assets/icons/hide.png'
import { toGetData } from '../../database';

export default function LogInScreen({navigation}) {
    const [data,setData] = useState([])
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [isVisiblePass, setIsVisiblePass] = useState(false)
  
    const passwordInputRef = createRef();

    const handlePasswordVisibility = () => {
      setIsVisiblePass(!isVisiblePass)
    }

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
      toGetData({setData})
    });
    return unsubscribe;
  },[navigation])

  return (
    <View style={styles.mainBody}>
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flex: 1,
        alignContent: 'center',
      }}>
      <View>
        <KeyboardAvoidingView enabled>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/icons/logo.png')}
              style={{
                width: '50%',
                height: 100,
                marginTop: 50,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View>
            <Text style={styles.titleText}>Log In To Woorkroom</Text>
          </View>
          <View style={styles.SectionStyle}>
          <Text style={{position:'absolute', bottom:40, color:'#9795A4'}}>Your Email</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) =>
                setUserEmail(UserEmail)
              }
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
          <Text style={{position:'absolute', bottom:40, color:'#9795A4'}}>Your Password</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              keyboardType="default"
              ref={passwordInputRef}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry={isVisiblePass}
              underlineColorAndroid="#f000"
              returnKeyType="next"
            />
            <Pressable onPress={handlePasswordVisibility} style={{justifyContent:'center'}}>
              <Image style={{height:24, width:24, position:'absolute', alignSelf:'center', right: 15, tintColor:'#5E6272'}} source={isVisiblePass ? Show : Hide}/>
            </Pressable>
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitPress}>
            <Text style={styles.buttonTextStyle}>Log In</Text>
          </TouchableOpacity>
          <Text
            style={styles.registerTextStyle}
            onPress={() => navigation.navigate('SignUp')}>
            New User? <Text style={{color:'#FFC612'}}> Create Account </Text>
          </Text>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  </View>  
  );
}

const styles = StyleSheet.create({
    titleText: {
      textAlign: 'center',
      marginTop: 40,
      marginBottom: 20,
      fontSize: 24,
    },
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
    },
    SectionStyle: {
      alignItems:'center',
      flexDirection: 'row',
      height: 40,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10,
    },
    buttonStyle: {
      backgroundColor: '#FFC612',
      borderWidth: 0,
      color: '#000',
      borderColor: '#FFC612',
      height: 60,
      alignItems: 'center',
      justifyContent:'center',
      borderRadius: 14,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 25,
    },
    buttonTextStyle: {
      color: '#000',
      paddingVertical: 10,
      fontSize: 16,
    },
    inputStyle: {
      paddingVertical:10,
      flex: 1,
      color: '#1F1D1D',
      borderBottomWidth: 1,
      borderColor: '#dadae8',
    },
    registerTextStyle: {
      marginHorizontal: 5,
      color: '#9795A4',
      textAlign: 'center',
      fontSize: 14,
      alignSelf: 'center',
      padding: 10,
    },
    errorTextStyle: {
      color: 'red',
      textAlign: 'center',
      fontSize: 14,
    },
  });