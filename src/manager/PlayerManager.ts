// namespace app {
//     export class PlayerManager extends laya.events.EventDispatcher {
//         private _openId: string;
//         private _loginKey: string;
//         public tmpId:string;

//         enterGame(cb?: (hasChar: number) => void) {
//             let param = new api.userEnterGame.ReqType();

//             this._openId = "1111_";
//             this._loginKey = "2222_";

//             param.openId = this._openId;
//             param.loginKey = this._loginKey;

//             console.log("000");
//             net.requestApi(api.userEnterGame.r, api.userEnterGame.ResType, param,{}).done(data => {

//                 console.log("1111");
//                 this._loginKey = "";

//                 console.log(data);
//                 // net.sessionId = data.role.sid;
//                 // let isOldUser = data.role.name ? 1 : 2;
//                 // if (isOldUser==1){
//                 //     this.updateInfo(data);
//                 //     if (cb) cb(isOldUser);

//                 // }else{
//                 //     if (cb) cb(isOldUser);
//                 // }

//                 // if (cb) cb(1);
//             });
//             if (cb) cb(1);
//         }

//         //创角
//         createRole(nickName: string, gender: number, cb?: () => void) {
//             // let param = new api.userCreateRole.ReqType();
//             // param.name = nickName.substr(0,6); //最多6个字
//             // param.gender = gender;
//             // if (utils.getURLParameter("scode")){
//             //     param.inviteId = utils.getURLParameter("scode");
//             // }

//             // net.requestApi(api.userCreateRole.r, api.userCreateRole.ResType, param, {noLoading:true}).done(data => {
//             //     this.updateInfo(data);
//             //     if (cb) cb();
//             // });
//             if (cb) cb();
//         }
//     }
// }