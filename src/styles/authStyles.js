import { StyleSheet, Dimensions } from "react-native";
const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const authStyles = {
    container: {
        flex: 1,
        backgroundColor: "#fff",

    },
    topTextContainer: { marginTop: 100, flexDirection: 'row', alignContent: 'center', padding: 20, backgroundColor: "red" },
    topText: { color: '#000', fontSize: 24, },
    form: {
        flex: 1,
        margin: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageView: {
        justifyContent: 'center', alignItems: 'center', marginTop: 40
    },
    textInput: {
        color: '#000',
        textAlign: 'left',
        height: 60,
        borderWidth: 2,
        width: 340,
        borderColor: '#000',
        borderRadius: 20,
        backgroundColor: '#FFF',
        padding: 20,
        marginTop: 10
    },
    textInputAddress: {
        color: '#FFFFFF',
        textAlign: 'left',
        height: 100,
        borderWidth: 2,
        width: 340,
        borderColor: '#516A98',
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 20,
        marginTop: 10
    },
    button: {
        marginTop: 10,
        backgroundColor: 'blue',
        borderRadius: 20,
        width: 187,
        height: 40
    },
    buttonText: {
        color: '#000',
        fontSize: 20,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10
    },
    forgotPasswordText: {
        color: '#000',
        fontSize: 16,
        height: 40,
        padding: 10
    },
    bottom: {
        borderRadius: 20,
        position: 'absolute',
        top: WINDOW_HEIGHT - 130,
        height: 100,
        width: WINDOW_WIDTH,
    },
    bottomText: {
        fontSize: 20,
        color: '#CEBFA3',
        position: 'absolute',
        height: 40,
        textAlign: 'center',
        top: WINDOW_HEIGHT - 100,
        width: WINDOW_WIDTH,
    },
    pickerStyle: {

        inputIOS: {
            color: '#FFFFFF',
            paddingHorizontal: 10,
            height: 60,
            backgroundColor:
                'rgba(0,0,0,0.1)',
            fontSize: 14,
            borderRadius: 20,
            width: 340,
            marginTop: 10,
            marginHorizontal: 35,
            padding: 25,


        },
        inputAndroid: {
            color: '#FFFFFF',
            paddingHorizontal: 10,
            height: 60,
            backgroundColor:
                'rgba(0,0,0,0.1)',
            fontSize: 14,
            borderRadius: 20,
            width: 340,
            marginTop: 10,
            marginHorizontal: 35

        },
        placeholderColor: "white",
        marginHorizontal: 20,
        padding: 20


    },
    multipleRadiobox: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    radioBox: {
        flexDirection: "row",
        alignItems: "center"
    },
    radioBox_outer: {
        width: 24,
        height: 24,
        backgroundColor: "#0B1120",
        borderColor: "#0041FF",
        borderWidth: 1,
        borderRadius: 16,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    radioBoxActive: {
        width: 14,
        height: 14,
        backgroundColor: "#0041FF",
        borderRadius: 7,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowColor: "#0041FF",
        shadowOpacity: 1
    },
    radioBoxInActive: {
        width: 14,
        height: 14,
        backgroundColor: "#0B1120",
        borderRadius: 7,
    },
    radioBox_label: {
        fontSize: 14,
        color: "#FFFFFF"
    }

}
export default authStyles;