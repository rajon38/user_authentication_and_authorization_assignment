class SessionHelper{
    setToken(token){
        localStorage.setItem("token",token)
    }
    getToken(){
        return localStorage.getItem("token")
    }
    setUserDetails(UserDetails){
        localStorage.setItem("UserDetails", JSON.stringify(UserDetails))
    }
    getUserDetails(){
        try {
            const userDetails = localStorage.getItem("UserDetails");
            if(userDetails !== undefined){
                return JSON.parse(userDetails);
            }else {
                return null
            }
        }catch (e) {
            console.log("Error Parsing user details:", e);
            return null;
        }
    }
    removeSessions=()=>{
        localStorage.clear();
        window.location.href="/login"
    }
}

export const {setToken,getToken,setUserDetails,getUserDetails,removeSessions}=new SessionHelper();