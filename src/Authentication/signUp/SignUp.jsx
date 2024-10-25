import React, { useState } from "react";
import "./../auth.css";
import { validateNameField, validateLogin, validatePassword} from "./../../domain/authentication";
import axios from "axios";

const SignUp = () => {
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
            firstName: validateNameField(firstName) || "",
            lastName: validateNameField(lastName) || "",
            middleName: validateNameField(middleName) || "",
            userLogin: validateLogin(userLogin) || "",
            userPassword: validatePassword(userPassword) || ""
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
                const response = await axios.post('/signUp', postData);
                response()
                if (response.status === 200) {
                    console.log(response.data);
                    return true;
                }
            } catch (error) {
                console.error(error);
                return false;
            }
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
                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                </div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Отчество"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input-field"
                    />
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Фамилия"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                        className="input-field"
                    />
                    {errors.middleName && <span className="error">{errors.middleName}</span>}
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
                    {errors.userLogin && <span className="error">{errors.userLogin}</span>}
                </div>

                <div className="input-wrapper">
                    <input
                        type="Пароль"
                        placeholder="Пароль"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        className="input-field"
                    />
                    {errors.userPassword && <span className="error">{errors.userPassword}</span>}
                </div>
            </div>
            <button onClick={handleSubmit} className="submit-button">Send reg</button>
            
        </div>
    );
};

export default SignUp;
