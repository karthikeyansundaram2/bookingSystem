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
import map from "lodash/map"
export default class ridesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    componentDidMount() {
        this.props.actions.getDrivers()

    }

    render() {
        const { props } = this.props
        let distance = this.props.navigation.getParam('total_distance')
        let user_id = this.props.navigation.getParam('user_id')
        let trip_id = this.props.navigation.getParam('trip_id')
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {this.props && this.props.authReducer && this.props.authReducer.drivers && this.props.authReducer.drivers.length ?
                    map(this.props.authReducer.drivers, (driver, key) => {
                        let languages = (driver && driver.description && driver.description.language && driver.description.language)
                        return (
                            <TouchableOpacity
                                style={{ flex: 1 }}
                                key={key}
                                onPress={() => {
                                    let data = {
                                        purpose: "Booking",
                                        amount: Math.trunc(this.props && this.props.authReducer && this.props.authReducer.amount && this.props.authReducer.amount.length ? this.props.authReducer.amount[0].total_amount : distance * driver.description.fare),
                                        buyer_name: 'karthi',
                                        email: 'email'
                                    }
                                    this.props.actions.payment(data, (callback) => {
                                        this.props.navigation.navigate('WebView', {
                                            url: callback && callback.data && callback.data.url,
                                            // user_id: user_id,
                                            // trip_id: trip_id,
                                            // driver_id: driver.id,
                                            // amount: Math.trunc(this.props && this.props.authReducer && this.props.authReducer.amount && this.props.authReducer.amount.length ? this.props.authReducer.amount[0].total_amount : distance * driver.description.fare)


                                        })
                                        let data = {
                                            user_id: user_id,
                                            driver_id: driver && driver.id,
                                            trip_id: trip_id,
                                            total_amount: Math.trunc(this.props && this.props.authReducer && this.props.authReducer.amount && this.props.authReducer.amount.length ? this.props.authReducer.amount[0].total_amount : distance * driver.description.fare),
                                            driver_rating: ""
                                        }
                                        this.props.actions.tripDetails(data)
                                    })
                                }}>
                                <View style={styles.container}>

                                    <View style={{
                                        marginRight: 40,
                                        marginLeft: 40,
                                        marginTop: 10,
                                        paddingTop: 20,
                                        paddingBottom: 20,
                                        backgroundColor: '#68a0cf',
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        width: '80%',
                                        height: '40%'
                                    }}>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                        }}>
                                            <Text style={styles.topText}>Driver</Text>
                                            <View
                                                style={{
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 1,
                                                }}
                                            />
                                            <Text style={[styles.topText]}>
                                                {driver && driver.driver_name}

                                            </Text>
                                            <Text>
                                                car:{driver && driver.description && driver.description.car}</Text>
                                            <Text>fare(per km):{driver && driver.description && driver.description.fare}</Text>
                                            <Text> languages:{driver && driver.description && driver.description.language && driver.description.language}{" "}
                                            </Text>

                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                        }}>
                                            <Image
                                                style={{ height: 90, width: 90 }}
                                                source={require("../../images/car.jpg")}
                                            >
                                            </Image>
                                        </View>
                                        <View
                                            style={{
                                                borderBottomColor: 'black',
                                                borderBottomWidth: 1,
                                            }}
                                        />
                                        <Text>Amount to pay</Text>
                                        {this.props && this.props.authReducer && this.props.authReducer.amount && this.props.authReducer.amount.length ? <Text>
                                            {this.props.authReducer.amount[0].total_amount}
                                        </Text> : <Text>{Math.trunc(distance * driver.description.fare)}</Text>}
                                        <TouchableOpacity
                                            style={{
                                                flexDirection: 'row-reverse', right: 1,
                                            }}
                                        >

                                            <Text>Click to pay</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                    : <View>

                        <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 28 }}>No drivers found</Text>
                    </View>
                }
            </SafeAreaView >

        )
    }
}







        // // Login Page

