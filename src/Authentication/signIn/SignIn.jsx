import React, { useState } from "react";
import "./../auth.css";
import { validateLogin, validatePassword} from "./../../domain/authentication";

const SignIn = () => {
    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [errors, setErrors] = useState({ userLogin: "", userPassword: "" });

    const handleSubmit = () => {
        const newErrors = {
            userLogin: validateLogin(userLogin) || "",
            userPassword: validatePassword(userPassword) || ""
        };

        setErrors(newErrors);

        const isValid = Object.values(newErrors).every(error => !error);
        if (isValid) {
            alert("Форма прошла валидацию. Отправляем данные");
        }
    };

    return (
        <div className="form-container">
            <h1>Авторизация</h1>
            <div className="input-group">
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="User Login"
                        value={userLogin}
                        onChange={(e) => setUserLogin(e.target.value)}
                        className="input-field"
                    />
                    {errors.userLogin && <span className="error">{errors.userLogin}</span>}
                </div>

                <div className="input-wrapper">
                    <input
                        type="password"
                        placeholder="User Password"
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
