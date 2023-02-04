import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Auth from '../../store/auth';
import Avatar from '../../assets/icons/avatar.png'
import { ToGetDataByEmail } from '../../database';
import { useEffect, useState } from 'react';

export default function ProfileScreen() {

  const [data, setData] = useState([])
  const email = Auth.Email

  useEffect(()=>{
    ToGetDataByEmail({email, setData})
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleTextContainer}>
        <Text style={styles.titleText}>Edit Profile</Text>
        <TouchableOpacity onPress={()=>{console.log(data)}} style={{position:'absolute', right:30,top:2,}}>
          <Text style={styles.logOutText}>Log out</Text>
        </TouchableOpacity>
      </View> 
      <Image
        source={Avatar}
        style={styles.avatarIcon}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    color:'#FFC612'
  },
  avatarIcon: {
    alignSelf:'center',
    marginTop:30,
    height:80,
    width:80,
  }
});
