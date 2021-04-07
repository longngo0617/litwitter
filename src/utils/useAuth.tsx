import { createContext, useReducer } from "react";
import LocalStorage from "./LocalStorage";

const initState = {
  user: LocalStorage.get("user"),
  commentState: false,
  commentItem: {},
  moreState: { xPos: "0px", yPos: "0px", showMenu: false },
  listComment: [] as any[],
};

const UserContext = createContext({
  user: LocalStorage.get("user"),
  commentState: false,
  commentItem: {
    id: "",
    username: null,
    displayname: null,
    body: null,
  },
  moreState: {
    item: { displayname: "", username: "", id: "", postId: "" },
    xPos: "0px",
    yPos: "0px",
    showMenu: false,
    isComment: false,
  },
  listComment: [] as any[],
  openMore: (mousePos: any, item: any, isComment?: boolean) => {},
  closeMore: () => {},
  login: (userData: any) => {},
  logout: () => {},
  openComment: (item: any) => {},
  closeComment: () => {},
  openListComment: (item: any) => {},
  closeListComment: () => {},
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
    case "OPEN_MORE":
      return {
        ...state,
        moreState: {
          item: action.payload.item,
          xPos: action.payload.mousePos.x,
          yPos: action.payload.mousePos.y,
          showMenu: true,
          isComment: action.payload.isComment,
        },
      };
    case "CLOSE_MORE":
      return {
        ...state,
        moreState: {
          showMenu: false,
        },
      };
    case "OPEN_LIST_COMMENTS":
      return {
        ...state,
        listComment: action.payload,
      };
    case "CLOSE_LIST_COMMENTS":
      return {
        ...state,
        listComment: [],
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

  function openComment(item: any) {
    dispatch({ type: "OPEN_COMMENT", payload: item });
  }

  function closeComment() {
    dispatch({ type: "CLOSE_COMMENT" });
  }

  function openMore(mousePos: any, item: any, isComment?: boolean) {
    dispatch({ type: "OPEN_MORE", payload: { mousePos, item, isComment } });
  }

  function closeMore() {
    dispatch({ type: "CLOSE_MORE" });
  }

  function openListComment(item: any) {
    dispatch({ type: "OPEN_LIST_COMMENTS", payload: item });
  }

  function closeListComment(item: any) {
    dispatch({ type: "CLOSE_LIST_COMMENTS" });
  }

  const values = {
    user: state.user,
    commentState: state.commentState,
    commentItem: state.commentItem,
    moreState: state.moreState,
    listComment: state.listComment,
    login,
    logout,
    openComment,
    closeComment,
    openMore,
    closeMore,
    openListComment,
    closeListComment,
  };
  return <UserContext.Provider value={values} {...props} />;
};

export { UserContext, UserProvider };
