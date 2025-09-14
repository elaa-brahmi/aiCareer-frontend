import EverythingNeeded from "@/components/landingPage/helpers/EverythingNeeded";
import WhatUsersSay from "@/components/landingPage/helpers/WhatUsersSay";
import ReadyToFindJob from "@/components/landingPage/helpers/ReadyToFindJob";
import HeaderWithoutAuth from "@/components/landingPage/helpers/HeaderWithoutAuth";
import Opening from "@/components/landingPage/helpers/Opening";
import HowItWorks from "@/components/landingPage/helpers/HowItWorks";

const WithoutAuth = () =>{
    return(
        <div className="flex flex-col">
            <HeaderWithoutAuth />
            <Opening 
                onGetStartedFree={()=>console.log('started')}
                onLogin={()=>console.log('login')}/>
            <EverythingNeeded />
            <HowItWorks />
            <WhatUsersSay />
            <ReadyToFindJob />
        </div>
    )
}
export default WithoutAuth