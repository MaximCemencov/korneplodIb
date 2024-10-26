import React, { useState } from "react";
import SignIn from "./signIn/SignIn";
import SignUp from "./signUp/SignUp";


const Authorization: React.FC = () => {
    const [isRender, setIsRender] = useState(false);

    const toggleRender = () => {
        setIsRender(prev => !prev);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {isRender
                ? <SignUp toggleRender={toggleRender} />
                : <SignIn toggleRender={toggleRender} />}
        </div>
    );
};

export default Authorization;