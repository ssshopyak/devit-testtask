import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, ActivityIndicator,TextInput } from 'react-native';
import Auth from '../../store/auth';
import Avatar from '../../assets/icons/avatar.png'
import { ToGetDataByEmail } from '../../database';
import { useEffect, useState } from 'react';

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const email = Auth.Email

  useEffect(()=>{
    ToGetDataByEmail({email, setData})
    setIsLoading(false)
  },[])
  
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFC612" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleTextContainer}>
        <Text style={styles.titleText}>Edit Profile</Text>
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
      <View style={styles.SectionStyle}>
        <Text style={styles.underInputText}>Name</Text>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => setUserName(text)}
          returnKeyType="next"
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.SectionStyle}>
        <Text style={styles.underInputText}>Email</Text>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => setUserName(text)}
          returnKeyType="next"
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.SectionStyle}>
        <Text style={styles.underInputText}>Phone</Text>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => setUserName(text)}
          returnKeyType="next"
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.SectionStyle}>
        <Text style={styles.underInputText}>Position</Text>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => setUserName(text)}
          returnKeyType="next"
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.SectionStyle}>
        <Text style={styles.underInputText}>Skype</Text>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => setUserName(text)}
          returnKeyType="next"
          blurOnSubmit={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    paddingVertical:10,
    flex: 1,
    color: '#1F1D1D',
    borderBottomWidth: 1,
    borderColor: '#dadae8',
  },
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
    color:'#FFC612'
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
    color:'#9795A4'
  }
});
