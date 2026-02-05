
import axios from "axios";
const user="goku"
const password="123"
const URL = `http://localhost:8082/auth/token?user=${user}&password=${password}`;

export const login = async() => {
    const token = await axios
        .get(URL)
        .then((r) => r.data.accessToken);
    return token;
}