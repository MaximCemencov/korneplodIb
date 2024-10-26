import React, { useState } from "react";
import SignIn from "./signIn/SignIn";
import SignUp from "./signUp/SignUp";

const Authorization = () => {
    const [isRender, setIsRender] = useState(false);  

    const toggleRender = () => {
        setIsRender(prev => !prev);  
    };

    return (
        <div className="Auth">
            {isRender ? <SignIn toggleRender={toggleRender} /> : <SignUp toggleRender={toggleRender} />}
        </div>
    );
};

export default Authorization