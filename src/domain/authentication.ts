export const validateNameField = (name: string): string | null => {
    if (!name) return "Поле обязательно для заполнения.";
    if (name.length < 2) return "Минимальная длина — 2 символа.";
    if (name.length > 30) return "Максимальная длина — 30 символов.";
    if (/\d/.test(name)) return "Поле не должно содержать цифры.";
    return null;
};

export const validateLogin = (login: string): string | null => {
    if (!login) return "Логин обязателен для заполнения.";
    if (!login.includes("@")) return "Логин должен содержать символ '@'.";
    return null;
};

export const validatePassword = (password: string): string | null => {
    if (!password) return "Пароль обязателен для заполнения.";
    if (password.length < 6) return "Пароль должен содержать не менее 6 символов.";
    return null;
};
