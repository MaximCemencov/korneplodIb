import React, { useState } from "react";
import "./../auth.css";
import { validateLogin, validatePassword} from "./../../domain/authentication";
import axios from "axios";

const SignIn = () => {
    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [errors, setErrors] = useState({ userLogin: "", userPassword: "" });

    const handleSubmit = async () => {
        const newErrors = {
            userLogin: validateLogin(userLogin) || "",
            userPassword: validatePassword(userPassword) || ""
        };

        setErrors(newErrors);

        const isValid = Object.values(newErrors).every(error => !error);
        if (isValid) {
            alert("Форма прошла валидацию. Отправляем данные");
        }
        const postData = {
            userLogin: userLogin,
            userPassword: userPassword
        };
        try {
            const response = await axios.post('/signIn', postData);
            response()
            if (response.status === 200) {
                console.log(response.data);
                return true;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    return (
        <div className="form-container">
            <h1>Авторизация</h1>
            <div className="input-group">
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Почта"
                        value={userLogin}
                        onChange={(e) => setUserLogin(e.target.value)}
                        className="input-field"
                    />
                    {errors.userLogin && <span className="error">{errors.userLogin}</span>}
                </div>

                <div className="input-wrapper">
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        className="input-field"
                    />
                    {errors.userPassword && <span className="error">{errors.userPassword}</span>}
                </div>
            </div>
            <button onClick={handleSubmit} className="submit-button">Send log</button>
        </div>
    );
};

export default SignIn;
