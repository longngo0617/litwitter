import { createContext, useReducer } from "react";
import LocalStorage from "./LocalStorage";

const initState = {
  user: LocalStorage.get("user"),
  commentState: false,
  commentItem: {},
};

const UserContext = createContext({
  user: LocalStorage.get("user"),
  commentState: false,
  commentItem:{
    id:"",
    username: null,
    displayname:null,
    body:null,
  },
  login: (userData: any) => {},
  logout: () => {},
  openComment: (item : any) =>{},
  closeComment: () =>{},
});
const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOUGOUT":
      return {
        ...state,
        user: null,
      };
    case "OPEN_COMMENT":
      return {
        ...state,
        commentState: true,
        commentItem: action.payload,
      };
    case "CLOSE_COMMENT":
      return {
        ...state,
        commentState: false,
        commentItem: {},
      };
    case "ADD_COMMENT_ITEM":
      return {
        ...state,
        commentState: false,
      };
    default:
      return state;
  }
};

const UserProvider = (props: any) => {
  const [state, dispatch] = useReducer(userReducer, initState);

  function login(userData: any) {
    LocalStorage.set("jwtToken", userData.token);
    LocalStorage.set("user", userData);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    LocalStorage.clear();
    dispatch({ type: "LOUGOUT" });
  }

  function openComment(item : any) {
    dispatch({ type: "OPEN_COMMENT",payload: item });
  }

  function closeComment() {
    dispatch({ type: "CLOSE_COMMENT" });
  }
  const values = {
    user: state.user,
    commentState: state.commentState,
    commentItem: state.commentItem,
    login,
    logout,
    openComment,
    closeComment
  };
  return <UserContext.Provider value={values} {...props} />;
};

export { UserContext, UserProvider };
