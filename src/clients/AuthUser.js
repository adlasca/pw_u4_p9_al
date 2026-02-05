import axios from "axios";
const URL = `http://localhost:8082/auth/token`;

const login = async (user, password) => {
    const token = await axios
        .get(URL, { params: { user, password } })
        .then((r) => r.data.accessToken);
    return token;
}

export const loginFacade = async (user, password) => {
    return await login(user, password);
}