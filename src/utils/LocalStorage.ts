import Hook from "./Hook";
export default {
    get: (name : string) => {
        try{
            let data = JSON.parse(localStorage.getItem(name) || '{}');

            Hook.doAction('get_localStorage_' + name, data);
            return data
        }catch(err){
            return null;
        }
    },
    set: (name : string, value : string) =>{
        if(typeof value !== undefined){
            localStorage.setItem(name, JSON.stringify(value))
            Hook.doAction('setLocalStorage_' + name, value);
            return true;
        }
        return false;
    },
    remove: (name: string) => {
        localStorage.removeItem(name)
    },
    clear: () => {
        localStorage.clear();
    }
}