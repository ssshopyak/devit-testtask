import { Pressable, Text, StyleSheet,TextInput, Image, View } from "react-native";
import { useState } from "react";
import Show from '../assets/icons/show.png'
import Hide from '../assets/icons/hide.png'
import Colors from "../assets/colors";

const Input = ({value, setValue, title, isPassword=false, editable=true ,keyboardType='default'}) => {
    const [isVisiblePass, setIsVisiblePass] = useState(false)

    const togglePasswordVisibility = () => {
      setIsVisiblePass(!isVisiblePass)
    }

    return (
        <View style={styles.SectionStyle}>
            <Text style={styles.overInputText}>{title}</Text>
            <TextInput
              editable={editable}
              style={styles.inputStyle}
              onChangeText={(text) => setValue(text)}
              value={value}
              secureTextEntry={isVisiblePass}
              keyboardType={keyboardType}
              returnKeyType="next"
              blurOnSubmit={false}
            />
            {
            isPassword &&
                <Pressable onPress={togglePasswordVisibility} style={{justifyContent:'center'}}>
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
        marginVertical:25,
        width:'80%',
        alignSelf:'center'
      },
      overInputText: {
        fontFamily: 'Poppins',
        position:'absolute', 
        fontSize:14,
        bottom:40, 
        color:Colors.body
      },
      inputStyle: {
        fontFamily: 'Poppins',
        paddingVertical:10,
        flex: 1,
        color: Colors.title,
        borderBottomWidth: 1,
        borderColor: '#D7D7D7',
      },
      iconPasswordVisibility: {
        height:24, 
        width:24, 
        position:'absolute', 
        alignSelf:'center', 
        right: 15, 
        tintColor: Colors.icon,
      }
});

export default Input;




