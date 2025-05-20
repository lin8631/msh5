// /// <reference path="./../../core/ms/Maple/Character.ts" />
// /// <reference path="./../../core/ms/Maple/Pet.ts" />
// /// <reference path="./../../core/ms/Maple/Msg.ts" />
// /// <reference path="./../../core/ms/Maple/Skill.ts" />

// module app.pet {
//     import cssCharacter = CharacterRole.Character;
//     import cssPet = PetRole.Pet;
//     import cssMsg = MsgRole.Msg;
//     import cssSkill = SkillRole.Skill;

//     export class petDlg extends ui.pet.petDlgUI implements ui.pet.IpetDlgUI {
//         public static className = "app.pet.petDlg";

//         private char:cssCharacter;
//         private pet:cssPet;
//         private m_index:number = 0;
//         private m_msg:cssMsg;
//         private skillArr:Array<any> = [];
//         private sArr:Array<any> = [];

//         onInitialize(){
//             this.x = (Laya.stage.width - 600) / 2 - (Laya.stage.width - 800) / 2;
//             this.y = (Laya.stage.height - 400) / 2 - (Laya.stage.height - 600) / 2;

//             if(msMoudle.isScreen()) {
//                 if(msMoudle.mainT) {
//                     if(msMoudle.mainT.cz_sp) {
//                         msMoudle.mainT.cz_sp.visible = false;
//                     }
//                 }
//             }

//             this.onHero();
//             this.onPet();
//         }

//         onEqp_petClick2(e: Laya.Event): void {

//         }

//         onHero() : void {
//             if(this.char) {
//                 this.char.clearUp();
//                 this.char = null;
//             }

//             let eSlots = ms.herodata.EquipSlots2;
//             if(ms.selHero == 0) {}
//             else if(ms.selHero == 1) {eSlots = ms.herodata.EquipSlots3}
//             else if(ms.selHero == 2) {eSlots = ms.herodata.EquipSlots4}

//             this.char = new cssCharacter();
//             let E:any = {};
//             E.fweapon = ms.testfweapon;
//             E.weapon = ms.herodata.EquipSlots[0] ? (ms.herodata.EquipSlots[0].id + ".img") : ms.testweapon;

//             E.body = "00002000.img";
//             E.head = "00012000.img";
//             // if(ms.bodyList.length > 0) {
//                 if(ms.selbody[ms.selHero] != "N" && ms.selbody[ms.selHero]) {
//                     E.body = ms.selbody[ms.selHero];
//                     E.head = "000" + (Number(ms.selbody[ms.selHero].split(".")[0]) + 10000) + ".img";
//                 }
//             // }
//             E.face = "00020012.img";
//             // if(ms.faceList.length > 0) {
//                 if(ms.selface[ms.selHero] != "N")
//                     E.face = ms.selface[ms.selHero];
//             // }
//             E.hair = "00030020.img";
//             // if(ms.hairList.length > 0) {
//                 if(ms.selhair[ms.selHero] != "N")
//                     E.hair = ms.selhair[ms.selHero];
//             // }

//             E.coat = eSlots[msMoudle.partType.tCoat] ? eSlots[msMoudle.partType.tCoat].id + ".img" : "01040002.img";
//             E.pants = eSlots[msMoudle.partType.tPants] ? eSlots[msMoudle.partType.tPants].id + ".img" : "01060002.img";
//             // if(ms.selHero == 0) {
//             //     E.weapon = "01432000.img";
//             // }
//             // else if(ms.selHero == 1) {
//             //     E.weapon = "01382000.img";
//             // }
//             // else if(ms.selHero == 2) {
//             //     E.weapon = "01332000.img";
//             // }
//             // if(eSlots[msMoudle.partType.tWeapon]) {
//             //     E.weapon = eSlots[msMoudle.partType.tWeapon].id + ".img";
//             // }
//             E.shoes = eSlots[msMoudle.partType.tShoes] ? eSlots[msMoudle.partType.tShoes].id + ".img" : "N";
//             E.glove = eSlots[msMoudle.partType.tGlove] ? eSlots[msMoudle.partType.tGlove].id + ".img" : "N";
//             //扎昆头盔类似gm帽子改配置zmap
//             E.cap = eSlots[msMoudle.partType.tCap] ? eSlots[msMoudle.partType.tCap].id + ".img" : "N";//01002357.img 01002140 01002017
//             E.cape = eSlots[msMoudle.partType.tCape] ? eSlots[msMoudle.partType.tCape].id + ".img" : "N";
//             E.longcoat = "N";

//             // E.cap = ms.testcap;
//             // E.longcoat = ms.testlongcoat;
//             // if(ms.fashion) {
//             //     if(ms.fashion.id != "N") E.longcoat = ms.fashion.id;
//             // }


//             if(ms.ring) {
//                 if(ms.ring.id != "N") this.char.m_ring = ms.ring.id;
//             }
//             E.tamingmob =    ms.tamingmob.tamingmob1;//01902000  01902028    01902032
//             E.tamingmob0 =   ms.tamingmob.tamingmob2;//01912000  01912021    01912025
//             this.char.m_name = ms.testname;
//             this.char.m_lv = ms.herodata.Lv;
//             this.char.m_nametag_show = false;
//             // console.log(ms.ring.id)
//             this.char.changeAll(this, E, 115, 215);
//         }

//         skill:cssSkill;
//         showSucc() : void {
//             let data:any = msMoudle.wz["000.img"]["skill.0001004"];
//             if(this.skill) {
//                 this.skill.clearUp();
//                 this.skill.removeSelf();
//                 this.skill = null;
//             }
//             this.skill = new cssSkill();
//             this.skill.changeAll(null, this.char.m_state_sp, "0001004", 0, 0, data, 1);
//         }

//         showPet() : void {
//             if(this.pet) {
//                 this.pet.clearUp();
//                 this.pet = null;
//             }
//             if(ms.pet.id != "N") {
//                 this.pet = new cssPet();
//                 this.pet.changeAll(this, ms.pet.id, 115 + 40, 215)
//             }
//         }

//         onLstPetCellClick(e: Laya.Event, index: number): void {
//             if(this.mKArr[index]) {
//                 if(this.mKArr[index].sel) {
//                     this.mKArr[index].sel = false;
//                     ms.pet.openid = 0;
//                     ms.pet.id = "N";
//                     this.eqp_pet.img.skin = "";
//                     this.offPet();
//                 }
//                 else {
//                     // this.m_msg.lifeShow(ms.petbagsdata[index].id, 3);
//                     ms.pet.id = ms.petbagsdata[index].id + ".img";
//                     ms.pet.openid = ms.petbagsdata[index].openid;
//                     for(let i:number = 0; i < this.mKArr.length; i++) {
//                         if(this.mKArr[i]) {
//                             this.mKArr[i].sel = false;
//                         }
//                     }
//                     this.mKArr[index].sel = true;
//                     this.eqp_pet.img.skin = "res/Pet/" + ms.petbagsdata[index].id + ".img/info.icon.png";

//                     this.onPetById(this.mKArr[index].id);
//                 }
//                 this.lstPet.dataSource = this.mKArr;

//                 this.showPet();
//                 //带上、卸下、带上就会处问题
//                 msMoudle.mapP.changePet();

//                 ms.saveServer();
//             }
//         }

//         onPet() : void {
//             this.eqp_pet.img.skin = "";
//             this.offPet();

//             this.mKArr = new Array(12);
//             for(let i:number = 0; i < ms.petbagsdata.length; i++) {
//                 if(ms.petbagsdata[i]) {
//                     this.mKArr[i] = new Object();
//                     this.mKArr[i].openid = ms.petbagsdata[i].openid;
//                     this.mKArr[i].id = ms.petbagsdata[i].id;
//                     if(ms.petbagsdata[i].openid == ms.pet.openid) {
//                         this.mKArr[i].sel = true;
//                         this.eqp_pet.img.skin = "res/Pet/" + ms.petbagsdata[i].id + ".img/info.icon.png";

//                         this.onPetById(this.mKArr[i].id);
//                     }
//                     else this.mKArr[i].sel = false;
//                 }
//             }
//             this.lstPet.dataSource = this.mKArr;
//         }

//         onPetById(id:any) : void {
//              for(let key in msMoudle.payjson) {
//                 if(msMoudle.payjson[key].id == id) {
//                     let ___ = msMoudle.payjson[key];
//                     this.jc1.text = "攻击力:+" + ___.atk + "%"
//                     this.jc2.text = "防御力:+" + ___.def + "%"
//                     this.jc3.text = "魔法攻击力:+" + ___.atk + "%"
//                     this.jc4.text = "魔法防御力:+" + ___.def + "%"
//                     break;
//                 }
//             }
//         }

//         mKArr:Array<any> = [];
//         offPet() : void {
//             this.jc1.text = "未装扮宠物"
//             this.jc2.text = ""
//             this.jc3.text = ""
//             this.jc4.text = ""
//         }

//         onBtnBackClick(e: Laya.Event): void {
//             this.close();
//             if(msMoudle.isScreen()) {
//                 if(msMoudle.mainT) {
//                     if(msMoudle.mainT.cz_sp) {
//                         msMoudle.mainT.cz_sp.visible = true;
//                     }
//                 }
//             }
//         }

//         onClose() : void {

//         }

//     }

// }