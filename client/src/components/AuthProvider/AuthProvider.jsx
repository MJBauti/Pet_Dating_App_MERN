import Auth from "../../utils/auth";
import Landing from "../../pages/Landing/Landing";

function AuthProvider({children}){
    if(Auth.loggedIn()){
        return children
    } else {
        return <Landing />
    }
}

export default AuthProvider