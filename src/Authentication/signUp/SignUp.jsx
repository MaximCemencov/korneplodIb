import React, { useState } from "react";
import "./../auth.css";
import { validateNameField, validateLogin, validatePassword} from "./../../domain/authentication";

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

    const handleSubmit = () => {
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
        }
    };

    return (
        <div className="form-container">
            <h1>Регистрация</h1>
            <div className="input-group">
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="input-field"
                    />
                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                </div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input-field"
                    />
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>

                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Middle Name"
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
            <button onClick={handleSubmit} className="submit-button">Send reg</button>
        </div>
    );
};

export default SignUp;
