import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-6f08a.firebaseio.com/',
});

export default instance;