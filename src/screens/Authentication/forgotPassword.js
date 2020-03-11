import React from "react";
import {
    Text,
    View,
    TextInput,
    Image,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from "react-native";
import styles from "../../styles/authStyles";
const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileNumber: "",
            password: ''
        }
        this.errors = {};
        this.onLoginSubmit = this.onLoginSubmit.bind(this)
    }

    async onCreatePassword() {
        let data = {
            'mobile_number': this.state.mobileNumber,
            'password': this.state.password
        }
        this.props.actions.forgotPassword(data, async (response) => {
            if (response && response.status == 200) {



                this.props.navigation.navigate('Login')
            }


        })



    }


    render() {
        const { props } = this.props
        return (
            <SafeAreaView style={{ flex: 1 }}>

                <View style={styles.container}>
                    <View style={{ height: 200, width: '100%', backgroundColor: 'blue' }}>

                        <Text style={[styles.topText, { justifyContent: 'center', alignItems: 'center', marginTop: 50 }]}>
                            FORGOT PASSWORD

                        </Text>
                        <Text> Enter new Password to continue...</Text>

                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 60 }}>
                        <TextInput
                            placeholder="Mobile Number"
                            selectionColor='blue'
                            style={styles.textInput}
                            underlineColorAndroid='grey'
                            keyboardType='number-pad'
                            onChangeText={(text) => this.setState({ mobileNumber: text })}
                            value={this.state.mobileNumber}
                            autoCapitalize='none'

                        />

                        <TextInput
                            placeholder="Enter new Password"
                            selectionColor='blue'
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({ password: text })}
                            value={this.state.password}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity>
                            <Text style={[styles.forgotPasswordText, { textAlign: 'right' }]}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                                this.onCreatePassword()
                            }
                            }
                        >
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>

        )
    }
}







// // Login Page

