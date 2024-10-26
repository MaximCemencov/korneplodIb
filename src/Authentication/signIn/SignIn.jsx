import React, { useState } from "react";
import "./../auth.css";
import { validateRequired } from "./../../domain/authentication";
import axios from "axios";

const SignIn = ({toggleRender}) => {
    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [errors, setErrors] = useState({ userLogin: "", userPassword: "" });

    const handleSubmit = async () => {
        const newErrors = {
            global: validateRequired(userLogin, userPassword) || "", 
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
    // const globalStyleError = {
    //     border: (errors.global) ? "1px solid red" : '1px solid #fafafa'
    // }
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
                        // style={globalStyleError}
                    />
                </div>

                <div className="input-wrapper">
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        className="input-field"
                        // style={globalStyleError}
                    />
                </div>
            </div>
            <div className="nextStap">
                <p className="nextStap_verif">Нет аккаунта?</p>
                <p className="nextStap_render" onClick={toggleRender}>Зарегистрироваться</p>
            </div>
            <button onClick={handleSubmit} className="submit-button">Send log</button>
            {errors.global && <span className="error">Заполните все поля</span>}
        </div>
    );
};

export default SignIn;
