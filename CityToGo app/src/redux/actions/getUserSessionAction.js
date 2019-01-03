import { FETCHING_GET_USER_SESSION } from "./types";
import Config from '../../config/config'
import axios from "axios";

export function getfetchUserSession(userID) {
    return {
        type: FETCHING_GET_USER_SESSION,
        payload: axios.get(`http://${Config.MY_IP_ADRES}:3000/api/v1/userSession/find/${userID}`)
            .then((res) => res)
    }
}