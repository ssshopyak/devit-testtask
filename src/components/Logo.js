import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import LogoSVG from '../assets/icons/logo'
const Logo = ({textUnderLogo}) => {
  return (
    <View>
      <View style={styles.iconContainer}>
        <LogoSVG />
      </View>
      <Text style={styles.titleText}>{textUnderLogo}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  titleText: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginTop: 80,
    fontSize: 24,
  },
})

export default Logo
