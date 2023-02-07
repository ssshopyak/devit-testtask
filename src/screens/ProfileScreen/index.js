import {StyleSheet,
   Text, View, TouchableOpacity, SafeAreaView, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView} from 'react-native';
import Auth from '../../store/auth';
import Avatar from '../../assets/icons/avatar.png';
import {toGetDataByEmail, updateData} from '../../database';
import {useEffect, useState} from 'react';
import Colors from '../../assets/colors';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function ProfileScreen({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPosition, setUserPosition] = useState('');
  const [userSkype, setUserSkype] = useState('');

  const getData = async () => {
    toGetDataByEmail(Auth.Email)
        .then((res)=>{
          console.log(res);
          setUserName(res[0]?.Name);
          setUserEmail(res[0]?.Email);
          setUserPhone(res[0]?.Phone);
          setUserPosition(res[0]?.Position);
          setUserSkype(res[0]?.Skype);
        })
        .finally(()=>{
          setIsLoading(false);
        });
  };

  const saveData = () => {
    updateData(userName, userEmail, userPhone, userPosition, userSkype);
  };

  useEffect(()=>{
    getData();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.active} />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleTextContainer}>
        <Text style={styles.titleText} onPress={()=>{
          setIsEditing(!isEditing);
        }}>Edit Profile</Text>
        <TouchableOpacity onPress={()=>{
          Auth.ToLogout();
        }} style={{position: 'absolute', right: 30, top: 2, fontFamily: 'Poppins'}}>
          <Text style={styles.logOutText}>Log out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.avatarContainer}>
        <Image
          source={Avatar}
          style={styles.avatarIcon}
        />
        <Text style={styles.avatarTitle}>{userName}</Text>
        <Text style={styles.avatarTextBody}>{userPosition}</Text>
      </View>
      <KeyboardAvoidingView>
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
        { isEditing &&
          <Button
            title={'Save'}
            onPress={saveData}
          />
        }
      </KeyboardAvoidingView>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    width: '100%',
  },
  titleText: {
    fontFamily: 'Poppins',
    fontSize: 18,
  },
  logOutText: {
    fontFamily: 'Poppins',
    color: Colors.active,
  },
  avatarIcon: {
    alignSelf: 'center',
    marginTop: 30,
    height: 70,
    width: 70,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatarTitle: {
    marginTop:10,
    fontFamily: 'Poppins',
    fontSize: 24,
  },
  avatarTextBody: {
    fontFamily: 'Poppins',
    color: Colors.body,
  },
});
