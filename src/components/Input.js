import { Pressable, Text, StyleSheet,TextInput, Image, View } from "react-native";
import { useState } from "react";
import Show from '../assets/icons/show.png'
import Hide from '../assets/icons/hide.png'

const Input = ({setValue, title, isPassword, keyboardType}) => {
    const [isVisiblePass, setIsVisiblePass] = useState(false)

    const handlePasswordVisibility = () => {
      setIsVisiblePass(!isVisiblePass)
    }

    return (
        <View style={styles.SectionStyle}>
            <Text style={styles.underInputText}>{title}</Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => setValue(text)}
              secureTextEntry={isVisiblePass}
              keyboardType={keyboardType}
              returnKeyType="next"
              blurOnSubmit={false}
            />
            {
            isPassword &&
                <Pressable onPress={handlePasswordVisibility} style={{justifyContent:'center'}}>
                    <Image style={styles.iconPasswordVisibility} source={isVisiblePass ? Show : Hide}/>
                </Pressable>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        marginBottom: 20,
      },
      underInputText: {
        position:'absolute', 
        bottom:40, 
        color:'#9795A4'
      },
      inputStyle: {
        paddingVertical:10,
        flex: 1,
        color: '#1F1D1D',
        borderBottomWidth: 1,
        borderColor: '#dadae8',
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

export default Input;




