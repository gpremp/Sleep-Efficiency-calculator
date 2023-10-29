import { setCookie , getCookie,deleteCookie} from 'cookies-next';
export  function doLogin(user){
    setCookie("user-sleep",JSON.stringify(user));
}

export function currentUserDetail(){
    return JSON.parse(getCookie("user-sleep"));
}

export function isUserLogin(){
    const user = getCookie("user-sleep");
    if (user == null || user === "" || user === undefined) {
        return false;
      } else {
        return true;
      }
}

export  function LogOut(){
    deleteCookie("user-sleep");
}