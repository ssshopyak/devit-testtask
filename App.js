import {observer} from 'mobx-react-lite';
import { StyleSheet,SafeAreaView, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from './src/store/auth';
import SignUpScreen from './src/screens/SignUpScreen';
import LogInScreen from './src/screens/LoginInScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { useFonts } from 'expo-font';
import Colors from './src/assets/colors';

const Stack = createNativeStackNavigator();
const customFonts = {
  'Poppins': require('./assets/fonts/Poppins-Regular.ttf')
};

function App () {
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.active} />
      </SafeAreaView>
    )
  }

  if (Auth.isAuthorizated){
    return <ProfileScreen/>
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='LogIn' component={LogInScreen}/>
        <Stack.Screen name='SignUp' component={SignUpScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default observer(App);