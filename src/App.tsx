import React from 'react';
import './App.css';
import Authorization from './Authentication/Authorization';
import MainMenu from "./MainMenu/MainMenu";
import authStore from "./store/authStore";
import {observer} from "mobx-react";

const App: React.FC = observer(() => {
    return (
        <div className="App">
            {authStore.isLoggedIn ? <MainMenu /> : <Authorization />}
        </div>
    );
});

export default App;
