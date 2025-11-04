// import axios
import axios from 'axios';

const Api = axios.create({
    // set default endpoint API
    baseURL: 'http://localhost:3000/api/v1'
})

export default Api