import React from "react";
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    TouchableOpacity
} from "react-native";
import styles from "../styles/authStyles";

export default class Welcome extends React.PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <ImageBackground
                        source={require('../images/background.jpg')}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 100 }}>
                            <Text style={[styles.topText, { color: '#000' }]}>
                                Welcome

                            </Text>
                            <View style={{ margin: 20 }} />
                            <Text style={styles.topText}>Choose and enjoy the ride</Text>
                            <TouchableOpacity
                                style={[styles.button, { marginTop: 250 }]}
                                onPress={() => {
                                    this.props.navigation.navigate('Login')
                                }}
                            >
                                <Text style={styles.buttonText}>LOGIN</Text>

                            </TouchableOpacity>
                            <Text style={{ marginTop: 20 }}>Don't have an account? </Text>
                            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        //   this.createAccount()
                                        this.props.navigation.navigate("createAccount")
                                    }}
                                >
                                    <Text style={{ fontSize: 22, color: "#000" }}>REGISTER</Text>

                                </TouchableOpacity>

                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </SafeAreaView >
        )
    }
}