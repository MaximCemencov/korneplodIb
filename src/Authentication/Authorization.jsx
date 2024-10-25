import React from "react";
import SignIn from "./signIn/SignIn";
import SignUp from "./signUp/SignUp";

const Authorization = () => {
    return (
        <div className="Auth">
            <SignUp/>
            <SignIn/>
        </div>
    )
}

export default Authorization