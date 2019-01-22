import Config from '../../config/config'
import axios from "axios";
import { FETCHING_QUIZ } from "./types";

export function getQuiz(category, number) {
    let body = JSON.stringify({
        category: String(category),
        number: String(number)
    })

    return {
        type: FETCHING_QUIZ,
        payload: axios.post(`${Config.MY_IP_ADRES}/api/QuizCategory`, body, {
            headers: {
                authorization: 'Bearer ' + global.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.data)
    }

}