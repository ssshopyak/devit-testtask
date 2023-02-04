import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import {observer} from 'mobx-react-lite';
import Auth from './src/store/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './src/screens/SignUpScreen';
import LogInScreen from './src/screens/LoginInScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { createTable } from './src/database';
const Stack = createNativeStackNavigator();

function App () {
  if(Auth.isAuthorizated){
    return <ProfileScreen />
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default observer(App);