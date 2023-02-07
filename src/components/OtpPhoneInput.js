import OTPInputView from '@twotalltotems/react-native-otp-input'
import React, {useRef} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import PhoneInput from 'react-native-phone-number-input'
import Colors from '../assets/colors'

const OtpPhoneInput = ({setPhoneValidation, setPhone, setPhoneCode}) => {
  const phoneInput = useRef()

  return (
    <View>
      <View style={styles.SectionStyle}>
        <Text style={styles.underInputText}>Phone Number</Text>
        <PhoneInput
          flagButtonStyle={[styles.phoneInput, {marginRight: 20}]}
          textContainerStyle={[styles.phoneInput]}
          textInputStyle={styles.textInputStyle}
          codeTextStyle={styles.codeTextStyle}
          ref={phoneInput}
          defaultCode="UA"
          layout="second"
          onChangeText={text => {
            setPhoneValidation(text)
          }}
          onChangeFormattedText={text => {
            setPhone(text)
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
          onCodeFilled={code => {
            setPhoneCode(code)
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  codeTextStyle: {
    color: Colors.body,
    fontFamily: 'Poppins',
    fontSize: 16,
    height: 20,
  },
  textInputStyle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    height: 50,
    marginTop: 5,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginVertical: 25,
    width: '80%',
    alignSelf: 'center',
  },
  underInputText: {
    position: 'absolute',
    bottom: 40,
    color: Colors.body,
  },
  phoneInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#D7D7D7',
  },
  underlineStyleBase: {
    fontFamily: 'Poppins',
    marginRight: 20,
    fontSize: 16,
    color: Colors.title,
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: Colors.active,
  },
})

export default OtpPhoneInput
