
import { User } from "@/types/userType";
import React from "react";

interface LandingPageWithAuthProps{
    user:User
}
const WithoutAuth : React.FC<LandingPageWithAuthProps> = ({user}) =>{
    return(
        <div className="flex flex-col">
            landing page with auth
           {/*  <Opening />
            <EverythingNeeded />
            <HowItWorks />
            <WhatUsersSay />
            <ReadyToFindJob /> */}
        </div>
    )
}
export default WithoutAuth