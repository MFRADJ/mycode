import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080', // Assurez-vous que cette URL pointe vers votre backend Spring Boot
});

export default instance;
