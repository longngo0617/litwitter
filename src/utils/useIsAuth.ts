import { useEffect,useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "./useAuth";

export const useIsAuth = () => {
    const {user} = useContext(UserContext);
    const router = useHistory();
    
    useEffect(() => {
      if(!user.username){
        router.replace("/login?next=" + router.location.pathname);
      }
    }, [user,router])
}