import axios from 'axios'

const PRODUCTINO_URL = 'http://jisutqybmf.market.alicloudapi.com'

const http = axios.create({
    baseURL: PRODUCTINO_URL,
    timeout: 1000,
    headers: {
        Authorization: 'APPCODE 51666496883a48b2b4e371dcb77903c0'
    }
})

export {
    http
}