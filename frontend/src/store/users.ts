import {makeAutoObservable} from "mobx";
import {user} from "../interfaces/api/user.ts";
import {getItem} from "../utils/localStorage.ts";

import {jwtDecode, JwtPayload} from "jwt-decode";
import axios from "axios";
import {userData} from "./default-values/users/user-data.ts";

// интерфейс, который расширяет jwtpayload
interface loginJwt extends JwtPayload {
    login: string;
    id: number;
    lastName: string;
    firstName: string;
}

class Users {

    constructor() {
        makeAutoObservable(this);
    }


    userData: user = userData;

    fullUserData: user = userData;

    getUserData() {
        let decoded: loginJwt;

        const token = getItem("token");

        if (token) {
            decoded = jwtDecode(token);
            this.userData.id = decoded.id;
            this.userData.firstName = decoded.firstName;
            this.userData.lastName = decoded.lastName;
            this.userData.login = decoded.login;
        }
    }

    getFullUserData(login: string) {
        if (getItem("token")) {
            axios.get(`http://localhost:${import.meta.env.VITE_API_PORT}/user/get_by_login/${login}`, {
                headers: {
                    Authorization: `Bearer ${getItem("token")}`,
                }
            }).then(res => {
                this.fullUserData = res.data;

                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}

export default new Users();