import * as types from "../constants/actionTypes";
import * as API_END_POINTS from "../constants/api";
import axios from "axios";

export function login(loginData, callback) {
    return dispatch => {
        axios.post(
            API_END_POINTS.LOGIN, loginData, {
            headers: {
                Accept: "application/json,",
                'Content-Type': "application/json",
            },
            withCredentials: true
        }
        )
            .then(async response => {
                if (response.status == 200) {
                    axios.defaults.headers.common["x-access-token"] =
                        response && response.data && response.data.accessToken;
                    callback(response)
                    dispatch({
                        type: types.LOGIN,
                        userData: response && response.data
                    })
                }
            }).catch((e) => {
                alert('Incorrect password')
                console.log(e)
                // callback(e)
            })
    }
}
export function createProfile(profileData, callback) {
    return dispatch => {
        axios.post(
            API_END_POINTS.CREATE_ACCOUNT, profileData, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            withCredentials: true
        }
        ).then(async response => {
            if (response.status == 200) {
                axios.defaults.headers.common["x-access-token"] =
                    response && response.data && response.data.accessToken;
                dispatch({
                    type: types.CREATE_ACCOUNT,
                    profileData: response && response.data
                })
                callback(response)
            }
        }).catch((e) => {
            console.log(e)
        })
    }
}
export function forgotPassword(payload) {
    return dispatch => {
        axios.put(
            API_END_POINTS.FORGOT_PASSWORD, payload, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            withCredentials: true
        }
        ).then(response => {
            if (response.status == 200) {
                dispatch({
                    type: types.FORGOT,
                    forgotPassword: response && response.data
                })
            }
        })
    }
}
export function getUsers() {
    return dispatch => {
        axios.get(
            API_END_POINTS.GET_USERS, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            withCredentials: true

        }
        ).then(response => {
            if (response.status == 200) {
                dispatch({
                    type: types.GET_USERS,
                    users: response && response.data
                })
            }
        })
    }
}
export function rides(data, navigation) {
    return dispatch => {
        axios.post(
            API_END_POINTS.RIDES, data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            withCredentials: true
        }
        ).then(response => {
            if (response.status == 200) {
                navigation.navigate('rides', {
                    total_distance: data.distance,
                    user_id: data.id,
                    trip_id: response && response.data && response.data.id
                })
                dispatch({
                    type: types.RIDES,
                    rides: response && response.data
                })
            }
        })
    }
}
export function getFare(data) {
    console.log('data', data)
    return dispatch => {
        axios.get(
            API_END_POINTS.FARE + "?to=" + data, {
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
            ,
            withCredentials: true
        }
        ).then(response => {
            console.log('reducer', response)

            if (response.status == 200) {
                dispatch({
                    type: types.FARE,
                    amount: response && response.data
                })
            }
        }).catch((e) => {
            console.log('err', e)
        })
    }
}
export function getDrivers() {
    return dispatch => {
        axios.get(
            API_END_POINTS.GET_DRIVERS, {
            header: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            withCredentials: true
        }
        ).then(response => {
            if (response.status == 200) {
                dispatch({
                    type: types.GET_DRIVERS,
                    drivers: response && response.data
                })
            }
        })
    }
}
export function tripDetails(data, ) {
    return dispatch => {
        axios.post(
            API_END_POINTS.TRIP_DETAILS, data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            withCredentials: true
        }
        ).then(response => {
            if (response.status == 200) {

                dispatch({
                    type: types.TRIP_DETAILS,
                    trips: response && response.data
                })
            }
        })
    }
}
export function payment(data, callback) {
    return dispatch => {
        axios.post(
            API_END_POINTS.PAYMENT, data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            withCredentials: true

        }
        ).then(response => {
            callback(response)

            if (response.status == 200) {
                dispatch({
                    type: types.PAYMENT,
                    payment: response && response.data
                })
            }
        }).catch((e) => {
            alert('something went wrong')
            console.log("err", e)
        })

    }
}