// module app.pvp {

//     export class pvpDlg extends ui.pvp.pvpDlgUI implements ui.pvp.IpvpDlgUI {

//         public static className = "app.pvp.pvpDlg";

//         onInitialize(){

//             msMoudle.popShow(this, (800 - 720) / 2, (600 - 480) / 2);
//             this.updateData();
//         }

//         onClose() {

//         }

//         updateData(){
//             // this.lstPvp.vScrollBarSkin = "";
//             if(ms.pvpTeam.length < 9) {
//                 this.InitPvp();
//             }
//             this.updataPvp();
//             //
//         }

//         rewards:Array<any> = [];
//         onBx1Click(e: Laya.Event): void {
//             if(ms.pvp_reweard[0] == 0 && ms.pvp_note >= 3) {
//                 this.bx1.skin = "homeland/img_baoxiang2.png";
//                 ms.pvp_reweard[0] = 1;

//                 let rnk = 1;
//                 for(let i:number = 0; i < rnk; i++) {
//                     this.rewards[i] = new Object();
//                     this.rewards[i].type = msMoudle.waterReward();
//                 }
//                 msMoudle.specialReward(this.rewards, -1, true);
//             }
//             else {
//                 if(ms.pvp_reweard[0] == 1) {
//                     msMoudle.toast2("已经领取过了！");
//                 }
//                 else {
//                     msMoudle.toast2("胜利场数不足！");
//                 }
//             }
//         }
//         onBx2Click(e: Laya.Event): void {
//             if(ms.pvp_reweard[1] == 0 && ms.pvp_note >= 6) {
//                 this.bx2.skin = "homeland/img_baoxiang4.png";
//                 ms.pvp_reweard[1] = 1;

//                 let rnk = msMoudle.getRandValue(1, 0, 2);
//                 for(let i:number = 0; i < rnk; i++) {
//                     this.rewards[i] = new Object();
//                     this.rewards[i].type = msMoudle.waterReward();
//                 }
//                 msMoudle.specialReward(this.rewards, -1, true);
//             }
//             else {
//                 if(ms.pvp_reweard[1] == 1) {
//                     msMoudle.toast2("已经领取过了！");
//                 }
//                 else {
//                     msMoudle.toast2("胜利场数不足！");
//                 }
//             }
//         }
//         onBx3Click(e: Laya.Event): void {
//             if(ms.pvp_reweard[2] == 0 && ms.pvp_note == 9) {
//                 this.bx3.skin = "homeland/img_baoxiang6.png";
//                 ms.pvp_reweard[2] = 1;

//                 let rnk = msMoudle.getRandValue(1, 0, 3);
//                 for(let i:number = 0; i < rnk; i++) {
//                     this.rewards[i] = new Object();
//                     this.rewards[i].type = msMoudle.waterReward();
//                 }
//                 msMoudle.specialReward(this.rewards, -1, true);
//             }
//             else {
//                 if(ms.pvp_reweard[2] == 1) {
//                     msMoudle.toast2("已经领取过了！");
//                 }
//                 else {
//                     msMoudle.toast2("当前进度未达到");
//                 }
//             }
//         }

//         onLstPvpCellClick(e: Laya.Event, index: number): void {
//             console.log("等级 " + ms.pvpTeam[index].lv + "难度" + ms.pvpTeam[index].nandu);

//             if(ms.pvpTeam[index].ok == 1) {
//                 msMoudle.toast2("已经挑战过了！");
//             }
//             else {
//                 // if(ms.huoli >= 3) {
//                     ms.pvpguanka = index;
//                     ms.pvplv = ms.pvpTeam[index].lv;
//                     ms.pvpnandu = ms.pvpTeam[index].nandu;

//                     msMoudle.MapInit();
//                     //场景切换
//                     msMoudle.isPvp = true;
//                     msMoudle.specialPvp = false;
//                     ui.show(app.battle.addTeamDlg, {params:[this], black:true});
//                     // msMoudle.gameP.gotoScene("222010402.img");
//                     // this.close();
//                 // }
//                 // else {
//                 //     msMoudle.toast2("体力不足");
//                 // }
//             }
//         }

//         private InitPvp() : void {
//             ms.pvpTeam = new Array(9);
//             for(let i:number = 0; i < 9;i ++) {
//                 ms.pvpTeam[i] = new Object();

//                 // ms.pvpTeam[i].img = msMoudle.getRandValue(1, 0, 3);
//                 ms.pvpTeam[i].name = msMoudle.getRandomName();
//                 if(ms.herodata.Lv > 5) {
//                     ms.pvpTeam[i].lv = msMoudle.getRandValue(ms.herodata.Lv - 5, 0, 15);
//                 }
//                 else {
//                     ms.pvpTeam[i].lv = msMoudle.getRandValue(1, 0, 5); //1-5
//                 }
//                 ms.pvpTeam[i].nandu = msMoudle.getRandValue(1, 0, 6);
//                 ms.pvpTeam[i].ok = 0;

//                 ms.pvpTeam[i].head = msMoudle.getRandValue(0, 0, msMoudle.characterjson.length);
//                 ms.pvpTeam[i].player = new Array();
//                 for(let _:number = 1; _ < ms.pvpTeam[i].nandu; _++) {
//                     ms.pvpTeam[i].player[_ - 1] = msMoudle.getRandValue(0, 0, msMoudle.herojson.length);
//                 }
//             }

//             ms.pvp_note = 0;
//             for(let i:number = 0; i < 3; i++) ms.pvp_reweard[i] = 0;
//         }

//         private updataPvp() : void {
//             this.lstPvp.dataModel = ms.pvpTeam;

//             let sum = 0;
//             for(let i:number = 0; i < ms.pvpTeam.length; i++) {
//                 if(ms.pvpTeam[i].ok) sum++;
//             }
//             this.jindu.value = sum / ms.pvpTeam.length;

//             ////如果跳着领取?????
//             ms.pvp_note = sum;
//             this.bx1.skin = "homeland/img_baoxiang1.png";
//             this.bx2.skin = "homeland/img_baoxiang3.png";
//             this.bx3.skin = "homeland/img_baoxiang5.png";
//             // this.bx1.y = -23;
//             // this.bx2.y = -23;
//             // this.bx3.y = -23;

//             if(ms.pvp_note == 9) {
//                 this.suo1.visible = false;
//                 this.suo2.visible = false;
//                 this.suo3.visible = false;
//             }
//             else if(ms.pvp_note >= 6) {
//                 this.suo1.visible = false;
//                 this.suo2.visible = false;
//             }
//             else if(ms.pvp_note >= 3) {
//                 this.suo1.visible = false;
//             }

//             if(ms.pvp_reweard[0] == 1) {
//                 this.bx1.skin = "homeland/img_baoxiang2.png";
//                 // this.bx1.y = -30;
//             }
//             if(ms.pvp_reweard[1] == 1) {
//                 this.bx2.skin = "homeland/img_baoxiang4.png";
//                 // this.bx2.y = -30;
//             }
//             if(ms.pvp_reweard[2] == 1) {
//                 this.bx3.skin = "homeland/img_baoxiang6.png";
//                 // this.bx3.y = -30;
//             }
//         }

//         onBtnReStartClick(e: Laya.Event): void {
//             this.InitPvp();
//             this.updataPvp();
//         }

//         onBtnBackClick(e: Laya.Event): void {
//             msMoudle.popClose(this, 360, 240);
//         }

//     }
// }