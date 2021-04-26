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
  addresses: [
    "Thành phố Hà Nội",
    "Tỉnh Hà Giang",
    "Tỉnh Cao Bằng",
    "Tỉnh Bắc Kạn",
    "Tỉnh Tuyên Quang",
    "Tỉnh Lào Cai",
    "Tỉnh Điện Biên",
    "Tỉnh Lai Châu",
    "Tỉnh Sơn La",
    "Tỉnh Yên Bái",
    "Tỉnh Hoà Bình",
    "Tỉnh Thái Nguyên",
    "Tỉnh Lạng Sơn",
    "Tỉnh Quảng Ninh",
    "Tỉnh Bắc Giang",
    "Tỉnh Phú Thọ",
    "Tỉnh Vĩnh Phúc",
    "Tỉnh Bắc Ninh",
    "Tỉnh Hải Dương",
    "Thành phố Hải Phòng",
    "Tỉnh Hưng Yên",
    "Tỉnh Thái Bình",
    "Tỉnh Hà Nam",
    "Tỉnh Nam Định",
    "Tỉnh Ninh Bình",
    "Tỉnh Thanh Hóa",
    "Tỉnh Nghệ An",
    "Tỉnh Hà Tĩnh",
    "Tỉnh Quảng Bình",
    "Tỉnh Quảng Trị",
    "Tỉnh Thừa Thiên Huế",
    "Thành phố Đà Nẵng",
    "Tỉnh Quảng Nam",
    "Tỉnh Quảng Ngãi",
    "Tỉnh Bình Định",
    "Tỉnh Phú Yên",
    "Tỉnh Khánh Hòa",
    "Tỉnh Ninh Thuận",
    "Tỉnh Bình Thuận",
    "Tỉnh Kon Tum",
    "Tỉnh Gia Lai",
    "Tỉnh Đắk Lắk",
    "Tỉnh Đắk Nông",
    "Tỉnh Lâm Đồng",
    "Tỉnh Bình Phước",
    "Tỉnh Tây Ninh",
    "Tỉnh Bình Dương",
    "Tỉnh Đồng Nai",
    "Tỉnh Bà Rịa - Vũng Tàu",
    "Thành phố Hồ Chí Minh",
    "Tỉnh Long An",
    "Tỉnh Tiền Giang",
    "Tỉnh Bến Tre",
    "Tỉnh Trà Vinh",
    "Tỉnh Vĩnh Long",
    "Tỉnh Đồng Tháp",
    "Tỉnh An Giang",
    "Tỉnh Kiên Giang",
    "Thành phố Cần Thơ",
    "Tỉnh Hậu Giang",
    "Tỉnh Sóc Trăng",
    "Tỉnh Bạc Liêu",
    "Tỉnh Cà Mau",
  ] as string[],
  categories: [
    "Xe cộ",
    "Dụng cụ sửa chữa nhà cửa",
    "Gia đình",
    "Giải trí",
    "Làm vườn & hoạt động ngoài trời",
    "Nhạc cụ",
    "Rao vặt",
    "Sản phẩm thể thao",
    "Tài sản cho thuê",
    "Bán nhà",
    "Đồ dùng cho thú cưng",
    "Đồ may mặc",
    "Đồ điện tử",
  ] as string[],
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
  addresses: [
    "Thành phố Hà Nội",
    "Tỉnh Hà Giang",
    "Tỉnh Cao Bằng",
    "Tỉnh Bắc Kạn",
    "Tỉnh Tuyên Quang",
    "Tỉnh Lào Cai",
    "Tỉnh Điện Biên",
    "Tỉnh Lai Châu",
    "Tỉnh Sơn La",
    "Tỉnh Yên Bái",
    "Tỉnh Hoà Bình",
    "Tỉnh Thái Nguyên",
    "Tỉnh Lạng Sơn",
    "Tỉnh Quảng Ninh",
    "Tỉnh Bắc Giang",
    "Tỉnh Phú Thọ",
    "Tỉnh Vĩnh Phúc",
    "Tỉnh Bắc Ninh",
    "Tỉnh Hải Dương",
    "Thành phố Hải Phòng",
    "Tỉnh Hưng Yên",
    "Tỉnh Thái Bình",
    "Tỉnh Hà Nam",
    "Tỉnh Nam Định",
    "Tỉnh Ninh Bình",
    "Tỉnh Thanh Hóa",
    "Tỉnh Nghệ An",
    "Tỉnh Hà Tĩnh",
    "Tỉnh Quảng Bình",
    "Tỉnh Quảng Trị",
    "Tỉnh Thừa Thiên Huế",
    "Thành phố Đà Nẵng",
    "Tỉnh Quảng Nam",
    "Tỉnh Quảng Ngãi",
    "Tỉnh Bình Định",
    "Tỉnh Phú Yên",
    "Tỉnh Khánh Hòa",
    "Tỉnh Ninh Thuận",
    "Tỉnh Bình Thuận",
    "Tỉnh Kon Tum",
    "Tỉnh Gia Lai",
    "Tỉnh Đắk Lắk",
    "Tỉnh Đắk Nông",
    "Tỉnh Lâm Đồng",
    "Tỉnh Bình Phước",
    "Tỉnh Tây Ninh",
    "Tỉnh Bình Dương",
    "Tỉnh Đồng Nai",
    "Tỉnh Bà Rịa - Vũng Tàu",
    "Thành phố Hồ Chí Minh",
    "Tỉnh Long An",
    "Tỉnh Tiền Giang",
    "Tỉnh Bến Tre",
    "Tỉnh Trà Vinh",
    "Tỉnh Vĩnh Long",
    "Tỉnh Đồng Tháp",
    "Tỉnh An Giang",
    "Tỉnh Kiên Giang",
    "Thành phố Cần Thơ",
    "Tỉnh Hậu Giang",
    "Tỉnh Sóc Trăng",
    "Tỉnh Bạc Liêu",
    "Tỉnh Cà Mau",
  ] as string[],
  categories: [
    "Xe cộ",
    "Dụng cụ sửa chữa nhà cửa",
    "Gia đình",
    "Giải trí",
    "Làm vườn & hoạt động ngoài trời",
    "Nhạc cụ",
    "Rao vặt",
    "Sản phẩm thể thao",
    "Tài sản cho thuê",
    "Bán nhà",
    "Đồ dùng cho thú cưng",
    "Đồ may mặc",
    "Đồ điện tử",
  ] as string[],
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

  const values = {
    user: state.user,
    commentState: state.commentState,
    commentItem: state.commentItem,
    moreState: state.moreState,
    listComment: state.listComment,
    editState: state.editState,
    messState: state.messState,
    addresses: state.addresses,
    categories: state.categories,
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
  };
  return <UserContext.Provider value={values} {...props} />;
};

export { UserContext, UserProvider };
