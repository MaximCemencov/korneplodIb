import { makeAutoObservable } from "mobx";

class AuthStore {
    isLoggedIn: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.isLoggedIn = Boolean(localStorage.getItem("isLoggedIn")); // Проверка состояния в localStorage
    }

    login() {
        this.isLoggedIn = true;
        localStorage.setItem("isLoggedIn", "true"); // Сохраняем логин в localStorage
    }

    logout() {
        this.isLoggedIn = false;
        localStorage.removeItem("isLoggedIn"); // Удаляем данные о логине
    }
}

export default new AuthStore();