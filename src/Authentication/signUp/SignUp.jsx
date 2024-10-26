import React, { useState } from "react";
import "./../auth.css";
import { validateRequired } from "./../../domain/authentication";
import axios from "axios";

const SignUp = ({toggleRender}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        userLogin: "",
        userPassword: ""
    }); 
    const handleSubmit = async () => {
        const newErrors = {
            global: validateRequired(firstName, lastName, middleName, userLogin, userPassword) || "",
        };

        setErrors(newErrors);
        const isValid = Object.values(newErrors).every(error => !error);
        if (isValid) {
            alert("Форма прошла валидацию. Отправляем данные");

            const postData = {
                firstName: firstName,
                lastName: lastName,
                middleName: middleName,
                userLogin: userLogin,
                userPassword: userPassword
            };
            console.log(postData);
            try {
                const response = await axios.post('/user/register', postData);
                response()
                if (response.status === 200) {
                    console.log(response.data);
                    return true;
                }
            } catch (error) {
                console.error(error);
                return false;
            }
        } else {
            alert('Заполните все поля правильно')
        }
    }; 
    return (
        <div className="form-container">
            <h1>Регистрация</h1>
            <div className="input-group">
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Имя"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="input-field"
                    />
                </div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Отчество"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input-field"
                    />
                </div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Фамилия"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                        className="input-field"
                    />
                </div>
            </div>
            <div className="input-group">
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Почта"
                        value={userLogin}
                        onChange={(e) => setUserLogin(e.target.value)}
                        className="input-field"
                    />
                </div>

                <div className="input-wrapper">
                    <input
                        type="Пароль"
                        placeholder="Пароль"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        className="input-field"
                    />
                </div>
            </div>
            <div className="nextStap">
                <p className="nextStap_verif">Есть аккаунт?</p>
                <p className="nextStap_render" onClick={toggleRender}>Войти</p>
            </div>
            <button onClick={handleSubmit} className="submit-button">Send reg</button>
            {errors.global && <span className="error">Заполните все поля</span>}

        </div>
    );
};

export default SignUp;
