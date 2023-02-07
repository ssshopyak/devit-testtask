import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../assets/colors";

const Button = ({onPress, title}) => {
    return (
        <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={onPress}>
            <Text style={styles.buttonTextStyle}>{title}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: Colors.active,
        borderWidth: 0,
        color: '#000',
        borderColor: Colors.active,
        height: 60,
        width: '80%',
        alignItems: 'center',
        alignSelf:'center',
        borderRadius: 14,
        justifyContent:'center',
        marginVertical: 20,
    },
    buttonTextStyle: {
        fontFamily: 'Poppins',
        color: '#000',
        paddingVertical: 10,
        fontSize: 16,
    },
});

export default Button;