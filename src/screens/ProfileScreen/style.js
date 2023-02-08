import {StyleSheet} from 'react-native'
import Colors from '../../assets/colors'

const styles = StyleSheet.create({
  loadingContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logOutContainer: {
    position: 'absolute',
    right: 30,
    top: 2,
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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 30,
    height: 70,
    width: 70,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatarTitle: {
    marginTop: 10,
    fontFamily: 'Poppins',
    fontSize: 24,
  },
  avatarTextBody: {
    fontFamily: 'Poppins',
    color: Colors.body,
  },
})

export default styles
