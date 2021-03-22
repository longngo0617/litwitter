
let actions : any = {};
let actionsOneTime : any = {};

export default {
    doAction: (name :any,...ref :any[]) => {
        if(name in actions){
            actions[name].forEach((e :any) => e(...ref))
        }

        if(name in actionsOneTime){
            for(let i in actionsOneTime[name]){
                actionsOneTime[name][i](...ref)
            }
            actionsOneTime[name] = []
        }
    },
    addAction: (name : any, callback : any) => {
        if(!(name in actions)) actions[name] = []
        actions[name].push(callback);
    },
    // doActionOneTime: (name,...ref) => {
    //     if(name in actionsOneTime){
    //         for(let i in actionsOneTime[name]){
    //             actionsOneTime[name][i](...ref)
    //         }
    //         actionsOneTime[name] = []
    //     }
    // },
    addActionOneTime: (name : any, callback : any) => {
        if(!(name in actionsOneTime)) actionsOneTime[name] = []
        actionsOneTime[name].push(callback);
    },
}