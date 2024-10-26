import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MobXProvider from "./store/MobXProvider";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <MobXProvider>
            <App/>
        </MobXProvider>
    </React.StrictMode>
);
