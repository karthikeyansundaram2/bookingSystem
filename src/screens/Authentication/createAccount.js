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
import axios from "axios";
import styles from "../../styles/authStyles";
const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
export default class createAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            mobile_number: '',
            password: ''
        }
        this.createAccount = this.createAccount.bind(this);
    }
    createAccount() {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(this.state.email)) {
            if (this.state.mobile_number.length == 10) {
                let profileData = {
                    'username': this.state.username,
                    'email': this.state.email,
                    'mobile_number': this.state.mobile_number,
                    'password': this.state.password
                }
                this.props.actions.createProfile(profileData, async (res) => {
                    if (res && res.status == 200) {
                        console.log(res)
                        await navigator.geolocation.requestAuthorization();
                        this.props.navigation.navigate('Map')
                    }
                    else {
                        console.log(res)
                    }
                })
            }
            else {
                alert('invalid phone number')
            }
        }
        else {
            alert('invalid email')
        }
    }
    render() {
        return (

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", height: 80, marginTop: 50, marginHorizontal: 20, }}>
                        <Text style={[styles.topText, { marginTop: 30 }]}>
                            Create Account
                  </Text>
                        <Image
                            source={require("../../images/user.png")}
                        >
                        </Image>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 40 }}>

                        <TextInput
                            placeholder="User Name"
                            placeholderTextColor="#000"
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({ username: text })}
                            value={this.state.username}
                        />
                        <TextInput
                            placeholder="Phone Number"
                            placeholderTextColor="#000"
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({ mobile_number: text })}
                            value={this.state.mobile_number}
                            keyboardType={'number-pad'}
                        />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#000"
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({ email: text })}
                            value={this.state.email}
                            autoCapitalize={false}
                        />
                        <TextInput
                            placeholder="Password"
                            style={styles.textInput}
                            placeholderTextColor="#000"

                            onChangeText={(text) => this.setState({ password: text })}
                            value={this.state.password}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity style={styles.button}
                            onPress={() => this.createAccount()}
                        >
                            <Text style={styles.buttonText}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}