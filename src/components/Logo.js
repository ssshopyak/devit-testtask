import { View, Image } from 'react-native'
const Logo = () => {
    return(
        <View style={{alignItems: 'center'}}>
            <Image
              source={require('../assets/icons/logo.png')}
              style={{
                width: '50%',
                height: 100,
                marginTop: 50,
                resizeMode: 'contain',
              }}
            />
        </View>
    )
}

export default Logo