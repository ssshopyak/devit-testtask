import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
const Logo = ({textUnderLogo}) => {
  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../assets/icons/logo.png')}
          style={styles.icon}
        />
      </View>
      <Text style={styles.titleText}>{textUnderLogo}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: '50%',
    height: 90,
    marginTop: 50,
    resizeMode: 'contain',
  },
  titleText: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginTop: 80,
    fontSize: 24,
  },
})

export default Logo
