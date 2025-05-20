// module app.pvp {

//     export class pvpItem extends ui.pvp.pvpItemUI {
//         public static className = "app.pvp.pvpItem";

//         ppp:Array<any> = [this.p1, this.p2, this.p3, this.p4, this.p5];
//         ttt:Array<any> = [this.t1, this.t2, this.t3, this.t4, this.t5];

//         updateData(data: any, index: number) {
//             for(let i:number = 0; i < this.ppp.length; i++) {
//                 this.ppp[i].visible = false;
//                 this.ttt[i].visible = false;
//             }
//             if(data) {
//                 // console.log(data.img)
//                 if(data.head == 0) this._img.skin = "res/Character/Cap/01003035.img/info.icon.png";
//                 else if(data.head == 1) this._img.skin = "res/Character/Cap/01003816.img/info.icon.png";
//                 else if(data.head == 2) this._img.skin = "res/Character/Cap/01003818.img/info.icon.png";
//                 this._ok.visible = data.ok;
//                 this._img.gray = data.ok;
//                 this._name.text = data.name;
//                 this._lv.text = "Lv." + data.lv;
//                 // this._nandu.text = "人数:" + (data.nandu);
//                 for(let i:number = 0; i < data.nandu - 1; i++) {
//                     this.ppp[i].visible = true;
//                     this.ttt[i].visible = true;

//                     // for(let _:number = 0; _ < data.player.length; _++) {
//                         // let hdata = msMoudle.herojson[data.player[i]];
//                         // this.ppp[i].skin = hdata.head;
//                     // }
//                 }
//             }
//         }

//         onClose() {

//         }

//         /////

//     }
// }