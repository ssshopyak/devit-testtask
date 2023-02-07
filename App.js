import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {useFonts} from 'expo-font'
import {observer} from 'mobx-react-lite'
import React, {useEffect, useState} from 'react'
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native'
import FlashMessage from 'react-native-flash-message'
import Colors from './src/assets/colors'
import {createTable} from './src/database'
import LogInScreen from './src/screens/LoginInScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import Auth from './src/store/auth'
const Stack = createNativeStackNavigator()
const customFonts = {
  Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
}

function App() {
  const [fontsLoaded] = useFonts(customFonts)
  const [isDbInitialized, setIsDbInitialized] = useState(false)

  useEffect(() => {
    createTable().then(setIsDbInitialized(true))
  }, [])

  if (!fontsLoaded || !isDbInitialized) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.active} />
      </SafeAreaView>
    )
  }

  if (Auth.isAuthorizated) {
    return <ProfileScreen />
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="LogIn" component={LogInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default observer(App)
