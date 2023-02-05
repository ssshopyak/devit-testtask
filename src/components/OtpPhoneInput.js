import { View, StyleSheet, Text } from 'react-native'
import PhoneInput from 'react-native-phone-number-input';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useRef } from 'react';
import Colors from '../assets/colors';

const OtpPhoneInput = ({setPhoneValidation, setPhone, setPhoneCode}) => {

    const phoneInput = useRef();
    
    return(
        <View>
            <View style={styles.SectionStyle}>
                <Text style={styles.underInputText}>Phone Number</Text>
                <PhoneInput
                    flagButtonStyle={[styles.phoneInput, { marginRight: 20 }]}
                    textContainerStyle={[styles.phoneInput]}
                    textInputStyle={{ fontSize: 16 }}
                    codeTextStyle={{ color: Colors.body }}
                    ref={phoneInput}
                    defaultCode="UA"
                    layout="second"
                    onChangeText={(text) => {
                        setPhoneValidation(text);
                    }}
                    onChangeFormattedText={(text) => {
                        setPhone(text);
                    }}
                />
            </View>
            <View style={styles.SectionStyle}>
                <Text style={styles.underInputText}>Code</Text>
                <OTPInputView
                    pinCount={4}
                    style={{ width: '60%', height: 60 }}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled={(code) => {
                        setPhoneCode(code);
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginVertical:25,
        width: '80%',
        alignSelf:'center'
    },
    underInputText: {
        position:'absolute', 
        bottom:40, 
        color:Colors.body
    },
    phoneInput: {
        height:50,
        borderWidth:1, 
        borderRadius:15, 
        borderColor:'#D7D7D7', 
    },
    underlineStyleBase: {
        marginRight:20,
        fontSize: 16,
        color: Colors.title,
        width: 50,
        height: 50,
        borderRadius:12,
        borderWidth: 1,
    },
    underlineStyleHighLighted: {
        borderColor: Colors.active,
    },
})

export default OtpPhoneInput