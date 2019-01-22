import Config from '../../config/config'
import axios from "axios";
import { FETCHING_POLY } from "./types";

export function getPoly() {


    return {
        type: FETCHING_POLY,
        payload: axios.get(`http://${Config.MY_IP_ADRES}:3000/api/v1/poly`)
        .then(res => res.data)
    }
}