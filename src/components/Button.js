import { TouchableOpacity, Text, StyleSheet } from "react-native";

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
        backgroundColor: '#FFC612',
        borderWidth: 0,
        color: '#000',
        borderColor: '#FFC612',
        height: 60,
        width: '90%',
        alignItems: 'center',
        alignSelf:'center',
        borderRadius: 14,
        justifyContent:'center',
        marginVertical: 20,
    },
    buttonTextStyle: {
        color: '#000',
        paddingVertical: 10,
        fontSize: 16,
    },
});

export default Button;