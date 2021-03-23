import { useEffect,useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "./useAuth";

export const useIsAuth = () => {
    const {user} = useContext(UserContext);
    const router = useHistory();
    console.log(user)
    useEffect(() => {
      if(!user.id){
        router.replace("/login?next=" + router.location.pathname);
      }
    }, [user,router])
}