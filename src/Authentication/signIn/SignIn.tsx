import React, { useState } from "react";
import axios from "axios";
import {validateRequired} from "../../domain/authentication";
import {API_URL} from "../../config";
import authStore from "../../store/authStore";

interface SignInProps {
    toggleRender: () => void;
}

const SignIn: React.FC<SignInProps> = ({ toggleRender }) => {
    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [errors, setErrors] = useState<{ global?: string }>({});

    const handleSubmit = async () => {
        const newErrors = {
            global: validateRequired(userLogin, userPassword) || "",
        };
        setErrors(newErrors);

        const isValid = !newErrors.global;
        if (isValid) {
            const postData = {
                login: userLogin,
                password: userPassword
            };

            try {
                const response = await axios.post(
                    `${API_URL}/user/login`,
                    postData,
                    {headers:{"Content-Type": "application/json"}});
                if (response.status === 200) {
                    console.log(response.data.token);
                    console.log(response.status)
                    authStore.login(); // Вызов функции login
                    return true;
                }
            } catch (error) {
                console.error(error);
                setErrors({ global: "Ошибка сервера или неверные данные." });
                return false;
            }
        }
    };

    return (
        <div className="bg-white p-8 rounded shadow-md w-96">
            <h1 className="text-2xl mb-4">Авторизация</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Почта"
                    value={userLogin}
                    onChange={(e) => setUserLogin(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                />
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    placeholder="Пароль"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                />
            </div>
            {errors.global && (
                <span className="text-red-500">{errors.global}</span>
            )}
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white p-2 rounded w-full"
            >
                Войти
            </button>
            <div className="mt-4">
                <p>Нет аккаунта?</p>
                <button onClick={toggleRender} className="text-blue-500 underline">
                    Зарегистрироваться
                </button>
            </div>
        </div>
    );
};

export default SignIn;