import { createContext, useReducer } from "react";
import LocalStorage from "./LocalStorage";

const initState = {
  user: LocalStorage.get("user"),
  commentState: false,
  commentItem: {},
  moreState: { xPos: "0px", yPos: "0px", showMenu: false },
  listComment: [] as any[],
  editState: false,
  messState: false,
  urlState: "",
  arrImage: [] as string[],
  errorFile: false,
  notiState: true,
  successSend: false,
  openAddMember: false,
  roomChatId: "",
  arrMemberExist: [] as any[],
};

const UserContext = createContext({
  user: LocalStorage.get("user"),
  commentState: false,
  commentItem: {} as any,
  editState: false,
  moreState: {
    item: {} as any,
    xPos: "0px",
    yPos: "0px",
    showMenu: false,
    isComment: false,
  },
  messState: false,
  listComment: [] as any[],
  arrImage: [] as string[],
  errorFile: false,
  notiState: true,
  successSend: false,
  openAddMember: false,
  roomChatId: "",
  arrMemberExist: [] as any[],
  removeImage: (id: string) => {},
  addImage: (fileArr: string) => {},
  openMore: (mousePos: any, item: any, isComment?: boolean) => {},
  closeMore: () => {},
  login: (userData: any) => {},
  logout: () => {},
  openComment: (item: any) => {},
  closeComment: () => {},
  openListComment: (item: any) => {},
  closeListComment: () => {},
  addUser: (arrayUser: any) => {},
  openEdit: () => {},
  closeEdit: () => {},
  openMessage: () => {},
  closeMessage: () => {},
  cacheProfile: (data: any) => {},
  openErrorFile: () => {},
  closeErrorFile: () => {},
  setNotiTrue: () => {},
  setNotiFalse: () => {},
  sendMess: () => {},
  resetImage: () => {},
  addMember: (roomChatId: string = "", members: any) => {},
  closeAddMember: () => {},
});

function returnState(state: any) {
  LocalStorage.set("user", state.user);
  return { ...state };
}

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
    case "ADD_USER":
      // const existUser: any =state.user.following.find((x: any) => x.username === action.payload.username);
      return returnState({
        ...state,
        user: {
          ...state.user,
          following: action.payload.following,
        },
      });
    case "OPEN_EDIT_PROFILE":
      return {
        ...state,
        editState: true,
      };
    case "CLOSE_EDIT_PROFILE":
      return {
        ...state,
        editState: false,
      };
    case "UPDATE_EDIT_PROFILE":
      return returnState({
        ...state,
        user: {
          ...state.user,
          profile: action.payload,
        },
      });
    case "OPEN_MESSAGE":
      return {
        ...state,
        messState: true,
      };
    case "CLOSE_MESSAGE":
      return {
        ...state,
        messState: false,
      };
    case "GET_URL":
      return {
        ...state,
        urlState: action.payload,
      };
    case "DELETE_URL":
      return {
        ...state,
        urlState: "",
      };
    case "ADD_IMAGE":
      //(prevImage) => prevImage.concat(fileArr)
      return {
        ...state,
        arrImage: state.arrImage.concat(action.payload),
      };
    case "REMOVE_IMAGE":
      const filtered = state.arrImage.filter((x: any) => x !== action.payload);
      return {
        ...state,
        arrImage: filtered,
      };
    case "RESET_IMAGE":
      return {
        ...state,
        arrImage: [],
      };
    case "OPEN_ERROR_FILE":
      return {
        ...state,
        errorFile: true,
      };
    case "CLOSE_ERROR_FILE":
      return {
        ...state,
        errorFile: false,
      };
    case "SET_NOTI_TRUE":
      return {
        ...state,
        notiState: true,
      };
    case "SET_NOTI_FALSE":
      return {
        ...state,
        notiState: false,
      };
    case "SET_SENDED":
      return {
        ...state,
        successSend: true,
      };
    case "OPEN_ADD_MEMBER":

      return {
        ...state,
        openAddMember: true,
        roomChatId: action.payload.roomChatId,
        arrMemberExist: state.arrMemberExist.concat(action.payload.members),
      };
    case "CLOSE_ADD_MEMBER":
      return {
        ...state,
        openAddMember: false,
        roomChatId: "",
        arrMemberExist: [],
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

  function openEdit() {
    dispatch({ type: "OPEN_EDIT_PROFILE" });
  }

  function closeEdit() {
    dispatch({ type: "CLOSE_EDIT_PROFILE" });
  }

  function cacheProfile(data: any) {
    dispatch({ type: "UPDATE_EDIT_PROFILE", payload: data });
  }

  function addUser(arrayUser: any) {
    dispatch({ type: "ADD_USER", payload: arrayUser });
  }

  function openListComment(item: any) {
    dispatch({ type: "OPEN_LIST_COMMENTS", payload: item });
  }

  function closeListComment(item: any) {
    dispatch({ type: "CLOSE_LIST_COMMENTS" });
  }

  function openMessage() {
    dispatch({ type: "OPEN_MESSAGE" });
  }

  function closeMessage() {
    dispatch({ type: "CLOSE_MESSAGE" });
  }

  function addImage(fileArr: string) {
    dispatch({ type: "ADD_IMAGE", payload: fileArr });
  }
  function removeImage(id: string) {
    dispatch({ type: "REMOVE_IMAGE", payload: id });
  }

  function openErrorFile() {
    dispatch({ type: "OPEN_ERROR_FILE" });
  }

  function closeErrorFile() {
    dispatch({ type: "CLOSE_ERROR_FILE" });
  }

  function setNotiTrue() {
    dispatch({ type: "SET_NOTI_TRUE" });
  }

  function setNotiFalse() {
    dispatch({ type: "SET_NOTI_FALSE" });
  }

  function sendMess() {
    dispatch({ type: "SET_SENDED" });
  }

  function resetImage() {
    dispatch({ type: "RESET_IMAGE" });
  }

  function addMember(roomChatId: string = "", members: any) {

    dispatch({ type: "OPEN_ADD_MEMBER", payload: { roomChatId, members } });
    
  }

  function closeAddMember() {
    dispatch({ type: "CLOSE_ADD_MEMBER" });
  }

  const values = {
    user: state.user,
    commentState: state.commentState,
    commentItem: state.commentItem,
    moreState: state.moreState,
    listComment: state.listComment,
    editState: state.editState,
    messState: state.messState,
    arrImage: state.arrImage,
    errorFile: state.errorFile,
    notiState: state.notiState,
    successSend: state.successSend,
    roomChatId: state.roomChatId,
    openAddMember: state.openAddMember,
    arrMemberExist: state.arrMemberExist,
    login,
    logout,
    openComment,
    closeComment,
    openMore,
    closeMore,
    openListComment,
    closeListComment,
    addUser,
    openEdit,
    closeEdit,
    cacheProfile,
    openMessage,
    closeMessage,
    addImage,
    removeImage,
    openErrorFile,
    closeErrorFile,
    setNotiTrue,
    setNotiFalse,
    sendMess,
    resetImage,
    addMember,
    closeAddMember,
  };
  return <UserContext.Provider value={values} {...props} />;
};

export { UserContext, UserProvider };
