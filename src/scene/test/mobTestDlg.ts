// //this.new_txt(Laya.stage, msMoudle.mobList[i], 100 * (i % 8), 30 + Math.floor(i / 8) * 50, i);
// /// <reference path="./../../core/ms/Maple/Character.ts" />
// /// <reference path="./../../core/ms/Maple/Mob.ts" />
// /// <reference path="./../../core/ms/Maple/Skill.ts" />
// /// <reference path="./../../core/ms/Maple/Summon.ts" />
// /// <reference path="./../../core/ms/Maple/Cool.ts" />
// /// <reference path="./../../core/ms/Maple/CssParser.ts" />

// module app.test {
//     import cssParser = CssParser.Txt;
//     import cssCharacter = CharacterRole.Character;
//     import cssMob = MobRole.Mob;
//     import cssSkill = SkillRole.Skill;
//     import cssSummon = SummonRole.Summon;
//     import cssTextEff = TextEffMoudle.TextEff;
//     import cssCool = CoolRole.Cool;

//     export class mobTestDlg extends ui.test.testMobDlgUI implements ui.test.ItestMobDlgUI {
//         public static className = "app.test.mobTestDlg";

//         onInitialize(){
//             this.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#b5a9a9")
//              this.updateData();
//         }

//         onClose() {

//         }


//         mobArr:Array<any> = [];
//         test_tamingmob:Array<any> = [
//             "01902000","01902001","01902004","01902005","01902006","01902007","01902008","01902009","01902010","01902011","01902013","01902014","01902015","01902016","01902017","01902018","01902019","01902020",
//             "01902021","01902024","01902028","01902031","01902032","01902033","01902034","01902035","01902036","01902037","01902038","01902039","01902040","01902041","01902042","01902045","01902047","01902048",
//             "01902059","01902060","01902061","01902062","01912000","01912002","01912003","01912004","01912005","01912006","01912007","01912009","01912010","01912011","01912012","01912013","01912014","01912017",
//             "01912021","01912024","01912025","01912026","01912027","01912028","01912029","01912030","01912031","01912032","01912033","01912034","01912035","01912038","01912040","01912041","01912052","01912053",
//             "01912054","01930000","01930001","01932000","01932001","01932002","01932003","01932004","01932005",
//             "01932006","01932007","01932008","01932009","01932010","01932011","01932012","01932013","01932014",
//             "01932015","01932016","01932017","01932018","01932020","01932021","01932022","01932023","01932025",
//             "01932026","01932027","01932028","01932029","01932030","01932031","01932032","01932033","01932034",
//             "01932035","01932036","01932038","01932041","01932043","01932044","01932045","01932046","01932047",
//             "01932048","01932049","01932050","01932051","01932052","01932053","01932054","01932055","01932056",
//             "01932057","01932058","01932059","01932060","01932061","01932065","01932071","01932080","01932081",
//             "01932084","01932086","01932087","01932088","01932089","01932090","01932091","01932092","01932096",
//             "01932097","01932098","01932099","01932106","01932107","01932108","01932110","01932112","01932113",
//             "01932114","01932116","01932117","01932118","01932123","01932124","01932126","01932132","01932133",
//             "01932138","01932139","01932140","01932142","01932147","01932148","01932150","01932151","01932152",
//             "01932153","01932155","01932156","01932157","01932158","01932159","01932161","01932162","01932163",
//             "01932166","01932171","01932173","01932174","01932175","01932187","01932188","01932192","01932193",
//             "01932198","01932199","01932200","01932201","01932203","01932204","01932205","01932207","01932211",
//             "01932212","01932214","01932216","01932221","01932223","01932224","01932226","01932235","01932237",
//             "01932238","01932239","01932240","01932241","01932242","01932243","01932244","01932245","01932246",
//             "01932247","01932249","01932251","01932252","01932253","01932254","01932256","01932258","01932259",
//             "01932261","01932263","01932264","01932265","01932266","01932267","01932268","01932269","01932270",
//             "01932271","01932272","01932273","01932274","01932276","01932277","01932280","01932286","01932287",
//             "01932290","01932291","01932293","01932296","01932300","01932301","01932302","01932306","01932311",
//             "01932315","01932317","01932318","01932319","01932321","01932323","01932324","01932325","01932328",
//             "01932333","01932334","01932336","01932337","01932339","01932341","01932342","01932344","01932346",
//             "01932347","01932351","01932353","01932354","01932355","01932357","01932358","01932359","01932360",
//             "01932361","01932363","01932366","01932369","01932371","01932373","01932374","01932375","01932376",
//             "01932377","01932378","01932379","01932380","01932383","01932384","01932385","01932387","01932388",
//             "01932389","01932390","01932391","01932392","01932393","01932394","01932396","01932398","01932401",
//             "01932403","01932406","01932407","01932408","01932409","01932410","01932411","01932412","01932413",
//             "01932414","01932415","01932416","01932418","01932419","01932420","01932421","01932422","01932425",
//             "01932426","01932427","01932428","01932430","01932431","01932432","01932433","01932435","01932437",
//             "01932438","01932439","01932440","01932441","01932442","01932445","01932446","01932448","01932449",
//             "01932452","01932453","01932455","01932456","01932457","01939000","01939001","01939002","01939003",
//             "01939004","01939005","01983000","01983001","01983002","01983003","01983004","01983005","01983006",
//             "01983007","01983008","01983010","01983011","01983012","01983014","01983015","01983016","01983017",
//             "01983018","01983019","01983020","01983021","01983022","01983024","01983025","01983027","01983029",
//             "01983030","01983032","01983035","01983036","01983038","01983039","01983042","01983043","01983044",
//             "01983048","01983049","01983050","01983051","01983053","01983055","01983056","01983057","01983058",
//             "01983059","01983060","01983061","01983066","01983067","01983075","01983076","01983078","01983079","01983082","01983083","01983084","01983085","01983086","01983087","01983088","01983089","01983090",
//             "01983091","01983093","01983095","01983100","01983101","01983102","01983104","01983105","01983106",
//             "01983107","01983108","01983109","01983110","01983111","01983112","01983124","01983125","01983126",
//             "01983127","01983128","01983129","01983130","01983131","01983132","01983133","01983134","01983135",
//             "01983137","01983138","01983139","01983140","01983141","01983142","01983143","01983144","01983145",
//             "01983146","01983152","01983153","01983154","01983157","01983161","01983162","01983164","01983168",
//             "01983169","01983170","01983173","01983174","01983176","01983181","01983182","01983184","01983186",
//             "01983187","01983188","01983191","01983207","01983209","01983210","01983224","01983229","01983230",
//             "01983232","01983233","01983235","01983236","01983239","01983240","01983241","01983243","01983245",
//             "01983248","01983251","01983252","01983256","01983257","01983258","01983259","01983260","01983264",
//             "01983270","01983271","01983272","01983273","01983278","01983286","01983287","01983290","01983291",
//             "01983292","01983293","01983295","01983297","01983304","01983306","01983307","01983308","01983309","01983310","01983318","01983320","01983322","01983323","01983324","01983325","01983326","01983333","01983334","01983337","01983338","01983341","01983342","01983343","01983353","01983354","01983355","01983356","01983357","01983358","01983359","01983360","01983361","01983363","01983364","01983369","01983380","01992003","01992004","01992005","01992006","01992007","01992009","01992013","01992015","01992027","01992030","01992031","01992033"
//         ];

//         updateData() : void {
//             this.lstTest.vScrollBarSkin = "";
//             // for(let i:number = 0; i < msMoudle.AllCape.length; i++) {
//             // for(let i:number = 0; i < msMoudle.AllSkills.length; i++) {
//             // for(let i:number = 0; i < msMoudle.mobList.length; i++) {
//             for(let i:number = 0; i < this.test_tamingmob.length; i++) {
//                 this.mobArr[i] = new Object();
//                 this.mobArr[i].name = this.test_tamingmob[i];
//                 this.mobArr[i].col = "#FFFFFF";
//                 this.mobArr[i].id = this.test_tamingmob[i];
//             }
//             this.lstTest.dataModel = this.mobArr;

//             // ms.getMSData(1);
//             // if(this.mob) {
//             //     this.mob.clearUp();
//             //     this.mob = null;
//             // }
//             // this.mob = new cssMob();
//             // let lifeMsg:any = new Object();
//             // lifeMsg.id = msMoudle.mobList[0];
//             // lifeMsg.cy = 0;
//             // lifeMsg.x = 600;
//             // lifeMsg.y =  550;
//             // this.mob.changeAll(Laya.stage, (lifeMsg.id + ".img"), lifeMsg);
//             // this.mob.m_lv = 100;
//             // this.mob.m_hp = 1000000;         //对应角色的攻击
//             // this.mob.m_maxhp = 1000000;
//             // this.mob.m_atk = 26; //
//             // this.mob.m_def = 0;//15 + Math.floor(mob.m_lv * 2)
//             // this.mob.m_target = 100;
//             // this.mob.m_baoji = 0;
//             // this.mob.m_miss = 0;
//             this.onLstTestCellClick(null, 0);


//             let mArr:Array<any> = [];
//             for(let key in msMoudle.characterjson) {
//                 mArr[mArr.length] = msMoudle.characterjson[key];
//             }
//             // if(this.hero) {
//             //     this.hero.clearUp();
//             //     this.hero = null;
//             // }
//             // this.hero = new cssCharacter();
//             // let E:any = {};
//             // E.weapon = "01302000.img"//"01452025.img";
//             // E.fweapon = mArr[0].fweapon;
//             // E.cap = mArr[0].cap;
//             // E.longcoat = mArr[0].longcoat;
//             // this.hero.changeAll(this, E, 300, 550);
//             // this.hero.setDir(-1);
//             // this.hero.m_armyList = [this.mob]
//             // this.hero.____x[0] = this.mob;
//             Laya.stage.on(laya.events.Event.KEY_DOWN, this, this.onKeyDown);
//         }

//         xxxIndex:number = 0;
//         public onKeyDown(event:Laya.Event) : void {
//             if(event.keyCode == Laya.Keyboard.A) {
//                 this.xxxIndex--;
//                 this.onLstTestCellClick(null, this.xxxIndex);
//             }
//             else if(event.keyCode == Laya.Keyboard.D) {
//                 this.xxxIndex++;
//                 this.onLstTestCellClick(null, this.xxxIndex);
//             }
//         }

//         ///////////
//         mob:cssMob;
//         mob1:cssMob;
//         mob2:cssMob;
//         hero:cssCharacter;
//         // onLstTestCellClick(e: Laya.Event, index: number): void {
//         //     // this.hero.showSkillById(msMoudle.AllSkills[index], true);
//         //     for(let i:number = 0; i < msMoudle.AllCape.length; i++) {
//         //         this.mobArr[i].col = "#FFFFFF";
//         //     }
//         //     this.mobArr[index].col = "#35f904";
//         //     this.lstTest.dataModel = this.mobArr;

//         //     let mArr:Array<any> = [];
//         //     for(let key in msMoudle.characterjson) {
//         //         mArr[mArr.length] = msMoudle.characterjson[key];
//         //     }
//         //     if(this.hero) {
//         //         this.hero.clearUp();
//         //         this.hero = null;
//         //     }
//         //     this.hero = new cssCharacter();
//         //     let E:any = {};
//         //     E.weapon = "01302000.img"//"01452025.img";
//         //     E.fweapon = mArr[0].fweapon;
//         //     E.cap = mArr[0].cap;
//         //     E.longcoat = "N"//mArr[0].longcoat;
//         //     E.cape = msMoudle.AllCape[index] + ".img";
//         //     this.hero.changeAll(this, E, 300, 550);
//         //     this.hero.setDir(-1);
//         //     this.hero.m_armyList = [this.mob]
//         //     this.hero.____x[0] = this.mob;
//         // }
//         onLstTestCellClick(e: Laya.Event, index: number): void {
//             this.xxxIndex = index;
//             // let mobArr:Array<any> = [];
//             for(let i:number = 0; i < this.test_tamingmob.length; i++) {
//                 this.mobArr[i].col = "#FFFFFF";
//             }
//             this.mobArr[index].col = "#07ec47";
//             this.lstTest.dataModel = this.mobArr;

//             if(this.hero) {
//                 this.hero.clearUp();
//                 this.hero = null;
//             }
//             let mArr:Array<any> = [];
//             for(let key in msMoudle.characterjson) {
//                 mArr[mArr.length] = msMoudle.characterjson[key];
//             }
//             ms.herodata = new Object();
//             ms.herodata.Sex = 1;
//             this.hero = new cssCharacter();
//             let E:any = {};
//             E.weapon = "01302000.img"//"01452025.img";
//             E.fweapon = mArr[0].fweapon;
//             E.cap = mArr[0].cap;
//             E.longcoat = mArr[0].longcoat;

//             E.tamingmob =    this.test_tamingmob[index] + ".img";//01932261  01902000  01902028
//             E.tamingmob0 =   "N";

//             //01902004
//             //01932152
//             //01932211
//             //01932351
//             //01932440
//             //01932407  火凤凰

//             // ms.tamingmob.tamingmob1 =    "01902028.img";//01902000  01902028    01902032
//             // ms.tamingmob.tamingmob2 =   "01912021.img";//01912000  01912021    01912025

//             // E.cape = msMoudle.AllCape[0] + ".img";
//             this.hero.changeAll(this, E, 300, 550);
//             this.hero.setDir(-1);
//             // this.hero.m_armyList = [this.mob]
//             // this.hero.____x[0] = this.mob;

//             // this._name.text = msMoudle.mobList[index];
//             // if(true) {
//             //     if(this.mob) {
//             //         this.mob.clearUp();
//             //         this.mob = null;
//             //     }
//             //     this.mob = new cssMob();
//             //     let lifeMsg:any = new Object();
//             //     lifeMsg.id = msMoudle.mobList[index];
//             //     lifeMsg.cy = 0;
//             //     lifeMsg.x = 500;
//             //     lifeMsg.y =  550;
//             //     lifeMsg.action = "stand";
//             //     this.mob.changeAll(Laya.stage, (lifeMsg.id + ".img"), lifeMsg);
//             // }
//             // if(true) {
//             //     if(this.mob1) {
//             //         this.mob1.clearUp();
//             //         this.mob1 = null;
//             //     }
//             //     this.mob1 = new cssMob();
//             //     let lifeMsg:any = new Object();
//             //     lifeMsg.id = msMoudle.mobList[index];
//             //     lifeMsg.cy = 0;
//             //     lifeMsg.x = 600;
//             //     lifeMsg.y =  550;
//             //     lifeMsg.action = "move";
//             //     this.mob1.changeAll(Laya.stage, (lifeMsg.id + ".img"), lifeMsg);
//             // }
//             // if(true) {
//             //     if(this.mob2) {
//             //         this.mob2.clearUp();
//             //         this.mob2 = null;
//             //     }
//             //     this.mob2 = new cssMob();
//             //     let lifeMsg:any = new Object();
//             //     lifeMsg.id = msMoudle.mobList[index];
//             //     lifeMsg.cy = 0;
//             //     lifeMsg.x = 700;
//             //     lifeMsg.y =  550;
//             //     lifeMsg.action = "attack1";
//             //     this.mob2.changeAll(Laya.stage, (lifeMsg.id + ".img"), lifeMsg);
//             // }
//         }

//         onBtnStandClick(e: Laya.Event): void {
//             // this.mob.changeByName("stand", 0);
//             // this.hero.changeByName("stand", 0);
//         }
//         onBtnMoveClick(e: Laya.Event): void {
//             // this.mob.changeByName("move", 0);
//             // this.hero.changeByName("walk", 0);
//         }
//         onBtnAtkClick(e: Laya.Event): void {
//             // let wea_act:string = msMoudle.getWeaponAct(this.hero.partIndex[msMoudle.partType.tWeapon]);
//             // this.mob.changeByName("attack1", 1);
//             // this.hero.changeByName(wea_act, 0);
//         }


//         //

//     }
// }