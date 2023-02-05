import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, ActivityIndicator,TextInput } from 'react-native';
import Auth from '../../store/auth';
import Avatar from '../../assets/icons/avatar.png'
import { ToGetDataByEmail } from '../../database';
import { useEffect, useState } from 'react';
import Colors from '../../assets/colors';
import Input from '../../components/Input';

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState(null)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userPosition, setUserPosition] = useState('')
  const [userSkype, setUserSkype] = useState('')

  const getData = async() => {
    setIsLoading(true)
    await ToGetDataByEmail
    .then((res) => {
      console.log(res)
      setUserData(res[0])
    })
    .finally(()=>{
      console.log(userData)
      setUserName(userData?.Name)
      setUserEmail(userData?.Email)
      setUserPhone(userData?.Phone)
      setUserPosition(userData?.Position)
      setUserSkype(userData?.Skype)
    })
    setIsLoading(false)
  }

  useEffect(()=>{
    getData()
  },[userData])
  
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.active} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleTextContainer}>
        <Text style={styles.titleText} onPress={()=>{setIsEditing(!isEditing)}}>Edit Profile</Text>
        <TouchableOpacity onPress={()=>{Auth.ToLogout()}} style={{position:'absolute', right:30,top:2,}}>
          <Text style={styles.logOutText}>Log out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.avatarContainer}>
        <Image
          source={Avatar}
          style={styles.avatarIcon}
        />
        <Text style={styles.avatarTitle}>Mike Tyson</Text>
        <Text style={styles.avatarTextBody}>UI/UX Designer</Text>
      </View>
      <View>
        <Input
          value={userName}
          editable={isEditing}
          setValue={setUserName}
          title={'Name'}
        />
        <Input
          value={userEmail}
          setValue={setUserEmail}
          editable={isEditing}
          title={'Email'}
          keyboardType={'email-address'}
        />
        <Input
          value={userPhone}
          setValue={setUserPhone}
          editable={isEditing}
          title={'Phone'}
          keyboardType={'numeric'}
        />
        <Input
          value={userPosition}
          setValue={setUserPosition}
          editable={isEditing}
          title={'Position'}
        />    
        <Input
          value={userSkype}
          setValue={setUserSkype}
          editable={isEditing}
          title={'Skype'}
        />                      
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  container: {
    justifyContent:'center'
  },
  titleTextContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:50,
    width:'100%',
  },
  titleText: {
    fontSize:18,
    fontWeight:'bold'
  },
  logOutText: {
    color:Colors.active
  },
  avatarIcon: {
    alignSelf:'center',
    marginTop:30,
    height:80,
    width:80,
  },
  avatarContainer: {
    alignItems:'center'
  },
  avatarTitle: {
    fontSize: 20,
    fontWeight:'bold',
  },
  avatarTextBody: {
    color:Colors.body
  }
});
