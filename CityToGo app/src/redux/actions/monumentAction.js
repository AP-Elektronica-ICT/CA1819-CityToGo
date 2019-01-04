import Config from '../../config/config'
import axios from "axios";
import { FETCHING_MONUMENTS } from "./types";

export function monument(latitude, longitude) {
    let body = JSON.stringify({
        latitude: String(latitude),
        longitude: String(longitude)
    })

    return {
        type: FETCHING_MONUMENTS,
        payload: axios.post(`http://${Config.MY_IP_ADRES}:3000/api/getNextLocation`, body, {
            headers: {
                // authorization: 'Bearer ' + global.token,
                // Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.data)
    }
}