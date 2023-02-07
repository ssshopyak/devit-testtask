import React, {useState} from 'react'
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import Colors from '../assets/colors'
import Hide from '../assets/icons/hide.js'
import Show from '../assets/icons/show.js'

const Input = ({
  value,
  setValue,
  title,
  isPassword = false,
  editable = true,
  keyboardType = 'default',
}) => {
  const [isVisiblePass, setIsVisiblePass] = useState(true)

  const togglePasswordVisibility = () => {
    setIsVisiblePass(!isVisiblePass)
  }

  return (
    <View style={styles.SectionStyle}>
      <Text style={styles.overInputText}>{title}</Text>
      <TextInput
        editable={editable}
        style={styles.inputStyle}
        onChangeText={text => setValue(text)}
        value={value}
        secureTextEntry={isVisiblePass}
        keyboardType={keyboardType}
        returnKeyType="next"
        blurOnSubmit={false}
      />
      {isPassword && (
        <Pressable
          onPress={togglePasswordVisibility}
          style={styles.iconPasswordVisibility}>
          {isVisiblePass ? <Show /> : <Hide />}
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginVertical: 25,
    width: '80%',
    alignSelf: 'center',
  },
  overInputText: {
    fontFamily: 'Poppins',
    position: 'absolute',
    fontSize: 14,
    bottom: 40,
    color: Colors.body,
  },
  inputStyle: {
    fontFamily: 'Poppins',
    paddingVertical: 10,
    flex: 1,
    color: Colors.title,
    borderBottomWidth: 1,
    borderColor: '#D7D7D7',
  },
  iconPasswordVisibility: {
    position: 'absolute',
    alignSelf: 'center',
    right: 0,
  },
})

export default Input
