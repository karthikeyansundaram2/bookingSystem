import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    PermissionsAndroid
} from "react-native";
import MapView, {
    Marker,
    AnimatedRegion,
    Polyline,
    PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";
import Geocoder from 'react-native-geocoding';
import { TextInput } from "react-native-gesture-handler";
import authStyles from "../../styles/authStyles"
// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
import MapViewDirections from 'react-native-maps-directions';
import DatePicker from 'react-native-datepicker'

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 20.5937;
const LONGITUDE = 78.9629;

class AnimatedMarkers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            tolatitude: '',
            tolongitude: '',
            to: '',
            distanceTravelled: 0,
            prevLatLng: {},
            date: "2020-03-15",
            amount: 0

        };
        this.address = this.props.navigation.getParam('address') ? this.props.navigation.getParam('address') : ""
    }
    async  requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Location Permission',
                    'message': 'This App needs access to your location ' +
                        'so we can know where you are.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use locations ")
            } else {
                console.log("Location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }
    geocodeEvent() {

        Geocoder.from(this.state.to)
            .then(json => {
                var location = json.results[0].geometry.location;
                console.log("location", location);
                this.setState({
                    tolatitude: location.lat,
                    tolongitude: location.lng
                })
            })
            .catch(error => console.warn(error));
    }

    componentDidMount() {
        Geocoder.init("AIzaSyDpILFOxfpQljjlflOQO1TLKT9fQJUd6x8"); // use a valid API key
        this.requestLocationPermission();

        this.geocodeEvent();

        const { coordinate } = this.state;

    }
    distance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit == "K") { dist = dist * 1.609344 }
            if (unit == "N") { dist = dist * 0.8684 }

            return Math.trunc(dist);
        }
    }
    showRides() {
        let distance = this.distance(12.9716, 77.5946, this.state.tolatitude, this.state.tolongitude, "K")

        let rideData = {
            user_id: this.props.navigation.getParam('id'),
            trip_type: 'one-way',
            pickup_location: 'banglore',
            drop_location: this.state.to,
            depart_date: this.state.date,
            return_date: null,
            distance: distance
        }
        this.props.actions.rides(rideData, this.props.navigation)
    }

    getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });


    render() {
        const origin = { latitude: 12.9716, longitude: 77.5946 };
        const destination = { latitude: this.state.tolatitude, longitude: this.state.tolongitude };
        const GOOGLE_MAPS_APIKEY = 'AIzaSyDpILFOxfpQljjlflOQO1TLKT9fQJUd6x8';
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 12.9716,
                        longitude: 77.5946,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}

                    />
                    {/* <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} /> */}

                    <MapView.Marker
                        coordinate={{
                            latitude: 12.9716,
                            longitude: 77.5946
                        }}
                        title={"banglore"}
                        description={"banglore"}
                    />
                    <MapView.Marker
                        coordinate={{
                            latitude: this.state.tolatitude,
                            longitude: this.state.tolongitude
                        }}
                        title={this.state.to}
                        description={"banglore"}
                    />


                </MapView>
                {this.state.showDistance ? <View style={styles.bottomContainer}>
                    <Text style={authStyles.topText}>Kilometers:</Text>
                    <Text style={authStyles.topText}>{this.distance(12.9716, 77.5946, this.state.tolatitude, this.state.tolongitude, "K")}</Text>
                    <Text>FROM:Banglore</Text>
                    <Text>TO:{this.state.to}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                showDistance: false
                            })

                        }}>
                        <Text style={authStyles.buttonText}>EDIT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={authStyles.button}
                        onPress={() => {
                            this.showRides()

                        }}>
                        <Text style={authStyles.buttonText}>BOOK</Text>
                    </TouchableOpacity>
                </View> :
                    <View style={styles.bottomContainer}>
                        <TextInput
                            placeholder="from"
                            selectionColor='blue'
                            style={styles.textInput}
                            underlineColorAndroid='grey'
                            defaultValue='Banglore'
                            editable={false}
                            autoCapitalize='none'

                        />
                        <TextInput
                            placeholder="to"
                            selectionColor='blue'
                            style={styles.textInput}
                            underlineColorAndroid='grey'

                            onChangeText={(text) => this.setState({ to: text })}
                            value={this.state.to}
                            autoCapitalize='none'

                        />
                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2020-03-01"
                            maxDate="2021-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                        <TouchableOpacity style={authStyles.button}
                            disabled={!this.state.to}
                            onPress={() => {
                                this.geocodeEvent()
                                this.distance(12.9716, 77.5946, this.state.tolatitude, this.state.tolongitude, "K")
                                // this.props.navigation.navigate('rides')
                                this.setState({ showDistance: true })

                                this.props.actions.getFare(this.state.to, async (res) => {
                                    if (res.status == 200) {
                                        console.log(res && res.data)
                                        this.setState({
                                            amount: res && res.data && res.data[0] && res.data[0].total_amount
                                        })
                                    }

                                })
                            }}
                        >
                            <Text style={authStyles.buttonText}>
                                {/* {parseFloat(this.state.distanceTravelled).toFixed(2)} km */}
                                NEXT
            </Text>
                        </TouchableOpacity>
                    </View>}
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        alignItems: "center"
    },

    map: {
        ...StyleSheet.absoluteFillObject
    },
    bubble: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.7)",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20
    },
    latlng: {
        width: 200,
        alignItems: "stretch"
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: "center",
        marginHorizontal: 10
    },
    textInput: {
        color: '#000',
        textAlign: 'left',
        height: 50,
        borderWidth: 2,
        width: 280,
        borderColor: '#000',
        borderRadius: 20,
        backgroundColor: '#FFF',
        marginTop: 10,
        padding: 5

    },
    bottomContainer: {
        height: 200,
        width: '100%',
        marginTop: 10,
        flexDirection: "column",
        marginVertical: 20,
        backgroundColor: "#fff"
    }
});

export default AnimatedMarkers;