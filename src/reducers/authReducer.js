
import * as types from "../constants/actionTypes";
import { AsyncStorage, Platform } from "react-native";
import assign from "lodash/assign";

const initalState = {
    loginData: {},
    profileData: {},
    getUsers: {},
    payment: {},
    forgotPassword: {},
    amount: {},
    drivers: {}
}
export default function authReducer(state = initalState, action) {
    switch (action.type) {
        case types.LOGIN: {
            return assign({}, state, {
                loginData: action.userData
            });
        }
        case types.CREATE_ACCOUNT: {
            return assign({}, state, {
                profileData: action.profileData
            })
        }

        case types.GET_USERS: {
            return assign({}, state, {
                getUsers: action.users
            })
        }
        case types.FORGOT: {
            return assign({}, state, {
                forgotPassword: action.forgotPassword
            })
        }
        case types.PAYMENT: {
            return assign({}, state, {
                payment: action.payment
            })
        }
        case types.RIDES: {
            return assign({}, state, {
                rides: action.rides
            })
        }
        case types.FARE: {
            return assign({}, state, {
                amount: action.amount
            })
        }
        case types.GET_DRIVERS: {
            return assign({}, state, {
                drivers: action.drivers
            })
        }
        case types.TRIP_DETAILS: {
            return assign({}, state, {
                trip: action.trips
            })
        }
        default:
            return state;
    }
}