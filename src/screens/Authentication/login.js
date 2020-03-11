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
export default class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileNumber: '',
            password: ''
        }
        this.formData = {};
        this.errors = {};
        this.onLoginSubmit = this.onLoginSubmit.bind(this)
    }

    async onLoginSubmit() {
        console.log(this.state.mobileNumber.length)
        if (this.state.mobileNumber.length == 10) {
            let loginData = {
                'mobile_number': this.state.mobileNumber,
                'password': this.state.password
            }
            this.props.actions.login(loginData, async (response) => {
                if (response && response.status == 200) {
                    console.log(response)
                    await navigator.geolocation.requestAuthorization();
                    this.props.navigation.navigate('Map', {
                        id: response && response.data && response.data.username && response.data.username.id
                    })
                }


            })

        }
        else {
            alert('mobile number is invalid')
        }


    }


    render() {
        const { props } = this.props
        return (
            <SafeAreaView style={{ flex: 1 }}>

                <View style={styles.container}>
                    <View style={{ height: 200, width: '100%', backgroundColor: 'blue' }}>

                        <Text style={[styles.topText, { justifyContent: 'center', alignItems: 'center', marginTop: 50 }]}>
                            SIGN IN

                        </Text>
                        <Text> Login with your account to continue...</Text>

                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 60 }}>
                        <Image
                            source={require("../../images/user.png")}
                        />
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
                            placeholder="Password"
                            selectionColor='blue'
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({ password: text })}
                            value={this.state.password}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('forgotPassword')
                        }}>
                            <Text style={[styles.forgotPasswordText, { textAlign: 'right' }]}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                                this.onLoginSubmit()
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

