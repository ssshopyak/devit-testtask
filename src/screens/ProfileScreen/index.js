import React, {useEffect, useState} from 'react'
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Colors from '../../assets/colors'
import Avatar from '../../assets/icons/avatar.png'
import Edit from '../../assets/icons/edit'
import Button from '../../components/Button'
import Input from '../../components/Input'
import {toGetDataByEmail, updateData} from '../../database'
import Auth from '../../store/auth'
import styles from './style'
export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userPosition, setUserPosition] = useState('')
  const [userSkype, setUserSkype] = useState('')

  const getData = async () => {
    toGetDataByEmail(Auth.Email)
      .then(res => {
        console.log(res)
        setUserName(res[0]?.Name)
        setUserEmail(res[0]?.Email)
        setUserPhone(res[0]?.Phone)
        setUserPosition(res[0]?.Position)
        setUserSkype(res[0]?.Skype)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const saveData = () => {
    updateData(userName, userEmail, userPhone, userPosition, userSkype)
  }

  useEffect(() => {
    getData()
  }, [])

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.active} />
      </SafeAreaView>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleTextContainer}>
        <Text style={styles.titleText}>Edit Profile</Text>
        <TouchableOpacity
          onPress={() => {
            Auth.ToLogout()
          }}
          style={styles.logOutContainer}>
          <Text style={styles.logOutText}>Log out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.avatarContainer}>
        <ImageBackground source={Avatar} style={styles.avatarIcon}>
          <TouchableOpacity
            onPress={() => {
              setIsEditing(!isEditing)
            }}>
            <Edit width={20} />
          </TouchableOpacity>
        </ImageBackground>
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
        {isEditing && <Button title={'Save'} onPress={saveData} />}
      </KeyboardAvoidingView>
    </ScrollView>
  )
}
