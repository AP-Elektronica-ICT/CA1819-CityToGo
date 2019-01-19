import { FETCHING_IMAGE_RECOGNITION } from "./types";
import Config from '../../config/config'
import axios from "axios";

export function fetchRecognitionImage(imageBase64) {
    let body = JSON.stringify({
        image: imageBase64
    })

    return {
        type: FETCHING_IMAGE_RECOGNITION,
        payload: axios.post(`http://${Config.MY_IP_ADRES}:3000/api/getImageLabels`, body, {
            headers: {
                // authorization: 'Bearer ' + global.token,
                // Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res)

    }
}
