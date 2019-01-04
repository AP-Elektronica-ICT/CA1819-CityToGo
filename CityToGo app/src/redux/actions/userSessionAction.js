import {
    FETCHING_GET_USER_SESSION,
    FETCHING_POST_USER_SESSION,
    FETCHING_PUT_USER_SESSION
} from "./types";

import Config from '../../config/config'
import axios from "axios";

export function getUserSession(userID) {
    return {
        type: FETCHING_GET_USER_SESSION,
        payload: axios.get(`http://${Config.MY_IP_ADRES}:3000/api/v1/userSession/find/${userID}`)
            .then((res) => res.data)
    }
}

export function postUserSession(userId, isRunning, startTime, stopTime, isFound, monument, ) {
    let body = JSON.stringify({
        userId: userId,
        isRunning: isRunning,
        subSession: {
            startTime: startTime,
            stopTime: stopTime,
            isFound: isFound,
            monument: monument
        }
    })

    return {
        type: FETCHING_POST_USER_SESSION,
        payload: axios.post(`http://${Config.MY_IP_ADRES}:3000/api/v1/userSession/create`, body, {
            headers: {
                // authorization: 'Bearer ' + global.token,
                // Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.data)
    }
}