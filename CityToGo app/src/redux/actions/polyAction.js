import Config from '../../config/config'
import axios from "axios";
import { FETCHING_POLY } from "./types";

export function getPoly() {


    return {
        type: FETCHING_POLY,
        payload: axios.get(`${Config.MY_IP_ADRES}/api/v1/poly`)
        .then(res => res.data)
    }
}