import React, { useState } from "react";
import axios from "axios";
import { validateRequired } from "../../domain/authentication";
import { API_URL } from "../../config";

interface SignUpProps {
    toggleRender: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ toggleRender }) => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [userLogin, setUserLogin] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [errors, setErrors] = useState<{ global?: string }>({});

    const handleSubmit = async () => {
        const newErrors = {
            global: validateRequired(firstName, lastName, middleName, userLogin, userPassword),
        };

        setErrors(newErrors);

        const isValid = !newErrors.global;
        if (isValid) {
            const postData = {
                fullName: `${firstName} ${middleName} ${lastName}`,
                login: userLogin,
                password: userPassword,
            };

            try {
                const response = await axios.post(
                    `${API_URL}/user/register`,
                    postData,
                    { headers: { "Content-Type": "application/json" } }
                );

                if (response.status === 200) {
                    console.log(response.data);
                    alert("Регистрация успешна!");
                    return true;
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    switch (error.response.status) {
                        case 400:
                            setErrors({ global: "Заполните все обязательные поля." });
                            break;
                        case 409:
                            setErrors({ global: "Пользователь с такой почтой уже существует." });
                            break;
                        default:
                            setErrors({ global: "Ошибка сервера или неверные данные." });
                            break;
                    }
                } else {
                    setErrors({ global: "Ошибка сети. Попробуйте снова." });
                }
                return false;
            }
        }
    };

    return (
        <div className="bg-white p-8 rounded shadow-md w-96">
            <h1 className="text-2xl mb-4">Регистрация</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Имя"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Фамилия"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Отчество"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                />
            </div>
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
                Зарегистрироваться
            </button>
            <div className="mt-4">
                <p>Есть аккаунт?</p>
                <button onClick={toggleRender} className="text-blue-500 underline">
                    Войти
                </button>
            </div>
        </div>
    );
};

export default SignUp;