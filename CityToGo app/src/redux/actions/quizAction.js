import Config from '../../config/config'
import axios from "axios";
import { FETCHING_QUIZ } from "./types";

export function getQuiz(category) {
   let body = JSON.stringify({
        category: category,
    })

    return {
        types: FETCHING_QUIZ,
        payload: axios.post(`http://${Config.MY_IP_ADRES}:3000/api/QuizCategory`, body, {
            headers: {
                authorization: 'Bearer ' + global.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res)
    }

}