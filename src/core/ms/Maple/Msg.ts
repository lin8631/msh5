/// <reference path="./../../../core/ms/Maple/TextEff.ts" />
/// <reference path="./../../../core/ms/Maple/Character.ts" />
/// <reference path="./../../../core/ms/Maple/Pet.ts" />

module MsgRole {
    import cssTextEff = TextEffMoudle.TextEff;
    import cssCharacter = CharacterRole.Character;
    import cssPet = PetRole.Pet;
    //装备/道具详情机制/信息显示
    export class Msg extends Laya.Sprite {

        public msgList:Array<any> = [];
        private msgData:Array<any> = [];

        public msgTask:Laya.Label;

        ////
        public m_item_sp:Laya.Sprite;
        public itemList:Array<any> = [];

        ////
        public m_eqp_sp:Laya.Sprite;

        public clearUp() : void {
            Laya.timer.clear(this, this.doSomeThing);
            Laya.timer.clearAll(this);
            for(let i:number = 0; i < this.msgList.length; i++) {
                this.msgList[i].removeSelf();
                this.msgList[i].destroy(true);
                this.msgList[i] = null;
            }
            this.msgList = [];
            this.msgData = [];

            if(this.m_item_sp) {
                this.m_item_sp.removeSelf();
                this.m_item_sp.destroy(true);
                this.m_item_sp = null;
            }
            this.itemList = [];
            if(this.m_eqp_sp) {
                this.m_eqp_sp.removeSelf();
                this.m_eqp_sp.destroy(true);
                this.m_eqp_sp = null;
            }
            if(this.msgTask) {
                this.msgTask.removeSelf();
                this.msgTask.destroy(true);
                this.msgTask = null;
            }
        }

        private doSomeThing() : void {
            for(let i:number = 0; i < this.msgData.length; i++) {
                if(this.msgData[i].time > 0) {
                    this.msgData[i].time = this.msgData[i].time - 1000;
                    if(this.msgData[i].time <= 0 && this.msgList[i]) {
                        let TimeLine = new Laya.TimeLine();
                        TimeLine.addLabel("msgList_" + i + "_" + msMoudle.getRandValue(0, 0, 10000000), 0).to(this.msgList[i], {alpha:0}, 1000,null, 0);
                        TimeLine.play(0, false);
                        break;
                    }
                }
            }
        }

        public msgUpdate() : void {
            // Laya.timer.loop(1000, this, this.doSomeThing);
        }

        /////这里需要优化，一直在new
        /////对方一直挂机那就没办法了
        //信息显示
        public msgShow(type:number, txt:string, flag:boolean = false) {
            ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.testChat.WorldTalk(txt);
            return ;

            if(this.msgList.length > 100) return ;

            let tIndex:number = this.msgList.length;
            this.msgList[tIndex] = new Laya.Label();
            this.msgList[tIndex].fontSize = 18;
            this.msgList[tIndex].text = txt;
            this.msgList[tIndex].bold = true;
            this.msgList[tIndex].zOrder = 999999;
            this.msgList[tIndex].color = "#07ec47";
            // this.msgList[tIndex].align = "right";
            this.msgList[tIndex].width = 200;
            this.msgList[tIndex].strokeColor = "#000000";
            this.msgList[tIndex].stroke = 2;
            Laya.stage.addChild(this.msgList[tIndex]);

            this.msgData[tIndex] = new Object();
            this.msgData[tIndex].time = 1000;

            let _:number = 0;
            let max_:number = 0;
            for(let i:number = 0; i < this.msgList.length; i++) {
                if(this.msgData[i].time > 0) max_ += 1;
            }

            for(let i:number = 0; i < this.msgList.length; i++) {
                if(this.msgData[i].time > 0) {
                    if(flag) {
                        this.msgList[tIndex].align = "left";
                        this.msgList[i].pos(20, 300 - 23 * (max_ - _ - 1) );
                    }
                    else {
                        this.msgList[tIndex].align = "right";
                        this.msgList[i].pos(Laya.stage.width - 20 - this.msgList[tIndex].width,
                        300 - 23 * (max_ - _ - 1) );
                    }
                        _ += 1;
                }
            }
        }

        public taskShow(str:string, tip:boolean) : void {
            this.msgTask = new Laya.Label();
            this.msgTask.fontSize = 25;
            if(tip == false)
                this.msgTask.color = "#ffffff";//#ffffff #FF0000红 #ffff00黄 #ff00ff紫 #00ffff蓝 #00FF00绿
            else {
                this.msgTask.color = "#00FF00";
            }
            this.msgTask.text = str;
            this.msgTask.bold = true;
            this.msgTask.strokeColor = "#000000";
            this.msgTask.stroke = 3;
            this.msgTask.zOrder = 9999999;
            this.msgTask.pos(400 - this.msgTask.width / 2, 50);
            msMoudle.gameP.addChild(this.msgTask);
        }

        public taskShow2(str:string, tip:boolean) : void {
            this.msgTask = new Laya.Label();
            this.msgTask.fontSize = 25;
            if(tip == false)
                this.msgTask.color = "#ffffff";//#ffffff #FF0000红 #ffff00黄 #ff00ff紫 #00ffff蓝 #00FF00绿
            else {
                this.msgTask.color = "#00FF00";
            }
            this.msgTask.text = str;
            this.msgTask.bold = true;
            this.msgTask.strokeColor = "#000000";
            this.msgTask.stroke = 3;
            this.msgTask.zOrder = 9999999;
            this.msgTask.pos(400 - this.msgTask.width / 2, 125);
            msMoudle.gameP.addChild(this.msgTask);
        }

//////////////////////
        char:cssCharacter;
        pet:cssPet;
        public lifeShow(itemId:any, type:number, flag:boolean = false) : void {
            let item:any = new Object();

            item.name = "效果预览";

            //时装
            if(type == 2) {
                item.img = "res/Character/LongCoat/" + itemId + ".img/info.icon.png"
            }
            //宠物
            else if(type == 3) {
                item.img = "res/Pet/" + itemId + ".img/info.icon.png";
            }
            //坐骑
            else if(type == 4) {
                item.img = "res/Character/TamingMob/" + itemId + ".img/info.icon.png"
            }
            //戒指
            else if(type == 5) {
                item.img = "res/Character/Ring/" + itemId + ".img/info.icon.png"
            }
            //椅子
            else if(type == 6) {
                item.img = "res/Character/Chair/0301.img/" + itemId + ".info.icon.png";
            }
            // item.img = "skillicon/109.png";
            item.desc = "";

            this.m_item_sp = new Laya.Sprite();
            this.m_item_sp.zOrder = 9999999999;
            this.m_item_sp.name = "itemmsg";
            // this.m_item_sp.pos((Laya.stage.width - 800) / 2,(Laya.stage.height - 600) / 2);
            this.m_item_sp.x = (Laya.stage.width - 800) / 2;
            this.m_item_sp.width = Laya.stage.width;
            this.m_item_sp.height = Laya.stage.height;

            Laya.stage.addChild(this.m_item_sp);
            this.m_item_sp.width = 800;
            this.m_item_sp.height = 600;
            this.m_item_sp.on("click", this, ()=> {
                if(this.char) {
                    this.char.clearUp();
                    this.char = null;
                }
                if(this.pet) {
                    this.pet.clearUp();
                    this.pet = null;
                }
                this.m_item_sp.removeSelf();
                this.m_item_sp = null;
            });

            let head:Laya.Image = new Laya.Image();
            head.skin = "event/Delivery.Send_Info.backgrnd.png"
            head.sizeGrid = "25,25,25,25";
            head.width = 280;
            head.height = 275;

            //时装/戒指
            if(type == 2 || type == 5) {
                head.height = 250;
            }
            //宠物
            else if(type == 3) {
                head.height = 270;
            }
            //坐骑
            else if(type == 4) {
                head.height = 250;
            }
            //椅子
            else if(type == 6) {
                head.height = 230;
            }

            head.pos(260, 220);
            head.name = "head";
            this.m_item_sp.addChild(head);

            head.height += 15;
            // let end:Laya.Image = new Laya.Image();
            // end.skin = "res/UI/ending.png";
            // end.alpha = 0.7;
            // end.pos(260, 220 + head.height);
            // end.name = "end";
            // this.m_item_sp.addChild(end);

            //icon
            let msgiconk:Laya.Image = new Laya.Image();
            // msgiconk.skin = "homeland/img_pingzhikuang1.png";
            msgiconk.pos(260 + 10, 220 + 35);
            this.m_item_sp.addChild(msgiconk);
            let msgicon:Laya.Image = new Laya.Image();
            msgicon.skin = item.img;
            msgicon.width = 44;
            msgicon.height = 44;
            msgiconk.addChild(msgicon);
            //name
            let msgname:Laya.Label = new Laya.Label();
            msgname.fontSize = 16;
            msgname.text = item.name;
            msgname.bold = true;
            msgname.color = "#ffffff";
            msgname.strokeColor = "#000000";
            msgname.stroke = 3;
            msgname.pos(260 + 130 - msgname.width / 2, 220 + msgname.height / 2);
            this.m_item_sp.addChild(msgname);
            //desc
            let msgdesc:Laya.Label = new Laya.Label();
            msgdesc.fontSize = 14;
            msgdesc.wordWrap = true;
            msgdesc.width = 200;
            msgdesc.text = item.desc;
            msgdesc.strokeColor = "#000000";
            msgdesc.stroke = 1;
            msgdesc.bold = true;
            msgdesc.leading = 4;
            msgdesc.color = "#ffffff";
            msgdesc.pos(260 + 75, 220 + 40);
            this.m_item_sp.addChild(msgdesc);

            //时装
            if(type == 2) {
                // this.p_miss = 5;        //25
                // this.p_target = 5;
                // this.p_baoji = 5;
                let real_i:number = 1;
                for(let i:number = 1; i <= 2; i++) {
                    let inc:any = null;
                    if(i == 1) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == itemId) {
                                let ___ = msMoudle.payjson[key];
                                inc = "命中率： +" + ___.target + "%";
                                break;
                            }
                        }
                    }
                    else if(i == 2) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == itemId) {
                                let ___ = msMoudle.payjson[key];
                                inc = "回避率： +" + ___.miss + "%";
                                break;
                            }
                        }
                    }
                    if(inc) {
                        let msgJob:Laya.Label = new Laya.Label();
                        msgJob.fontSize = 14;
                        msgJob.strokeColor = "#000000";
                        msgJob.stroke = 1;
                        msgJob.text = inc;
                        msgJob.bold = true;
                        msgJob.color = "#FFFFFF";
                        msgJob.pos(260 + 140 - msgJob.width / 2, 370 + (real_i + 1) * 21);
                        this.m_item_sp.addChild(msgJob);
                        real_i = real_i + 1;
                    }
                }
            }
            //宠物
            else if(type == 3) {
                // this.p_def = 0.1;
                // this.p_atk = 0.1;         //0.25
                //追加属性
                let real_i:number = 1;
                for(let i:number = 1; i <= 4; i++) {
                    let inc:any = null;
                    if(i == 1) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == itemId) {
                                let ___ = msMoudle.payjson[key];
                                inc = "攻击力： +" + ___.atk + "%";
                                break;
                            }
                        }
                    }
                    else if(i == 2) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == itemId) {
                                let ___ = msMoudle.payjson[key];
                                inc = "防御力： +" + ___.def + "%";
                                break;
                            }
                        }
                    }
                    else if(i == 3) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == itemId) {
                                let ___ = msMoudle.payjson[key];
                                inc = "魔法攻击力： +" + ___.atk + "%";
                                break;
                            }
                        }
                    }
                    else if(i == 4) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == itemId) {
                                let ___ = msMoudle.payjson[key];
                                inc = "魔法防御力： +" + ___.def + "%";
                                break;
                            }
                        }
                    }
                    if(inc) {
                        let msgJob:Laya.Label = new Laya.Label();
                        msgJob.fontSize = 14;
                        msgJob.strokeColor = "#000000";
                        msgJob.stroke = 1;
                        msgJob.text = inc;
                        msgJob.bold = true;
                        msgJob.color = "#FFFFFF";
                        msgJob.pos(260 + 140 - msgJob.width / 2, 370 + (real_i + 1) * 21);
                        this.m_item_sp.addChild(msgJob);
                        real_i = real_i + 1;
                    }
                }
            }
            //坐骑
            else if(type == 4) {
                // this.p_atkspeed = 0.1;
                // this.p_walkspeed = 0.1;
                let real_i:number = 1;
                for(let i:number = 1; i <= 3; i++) {
                    let inc:any = null;
                    if(i == 1) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == itemId) {
                                let ___ = msMoudle.payjson[key];
                                inc = "攻击速度： +" + ___.atkspeed + "%";
                                break;
                            }
                        }
                    }
                    else if(i == 2) {
                        inc = " +1%";
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == itemId) {
                                let ___ = msMoudle.payjson[key];
                                inc = "移动速度： +" + ___.walkspeed + "%";
                                break;
                            }
                        }
                    }
                    else if(i == 3) {
                        inc = " +1%";
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == itemId) {
                                let ___ = msMoudle.payjson[key];
                                inc = "暴击率： +" + ___.baoji + "%";
                                break;
                            }
                        }
                    }
                    if(inc) {
                        let msgJob:Laya.Label = new Laya.Label();
                        msgJob.fontSize = 14;
                        msgJob.strokeColor = "#000000";
                        msgJob.stroke = 1;
                        msgJob.text = inc;
                        msgJob.bold = true;
                        msgJob.color = "#FFFFFF";
                        msgJob.pos(260 + 140 - msgJob.width / 2, 370 + (real_i + 1) * 21);
                        this.m_item_sp.addChild(msgJob);
                        real_i = real_i + 1;
                    }
                }
            }
            //戒指
            else if(type == 5) {
                let real_i:number = 1;
                for(let i:number = 1; i <= 3; i++) {
                    let inc:any = null;
                    if(i == 1) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == itemId) {
                                let ___ = msMoudle.payjson[key];
                                inc = "命中率： +" + ___.target + "%";
                                break;
                            }
                        }
                    }
                    else if(i == 2) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == itemId) {
                                let ___ = msMoudle.payjson[key];
                                inc = "闪避率： +" + ___.miss + "%";
                                break;
                            }
                        }
                    }
                    else if(i == 3) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == itemId) {
                                let ___ = msMoudle.payjson[key];
                                inc = "暴击率： +" + ___.baoji + "%";
                                break;
                            }
                        }
                    }
                    if(inc) {
                        let msgJob:Laya.Label = new Laya.Label();
                        msgJob.fontSize = 14;
                        msgJob.strokeColor = "#000000";
                        msgJob.stroke = 1;
                        msgJob.text = inc;
                        msgJob.bold = true;
                        msgJob.color = "#FFFFFF";
                        msgJob.pos(260 + 140 - msgJob.width / 2, 370 + (real_i + 1) * 21);
                        this.m_item_sp.addChild(msgJob);
                        real_i = real_i + 1;
                    }
                }
            }
            //椅子
            else if(type == 6) {
                // this.p_miss = 5;        //25
                // this.p_target = 5;
                // this.p_baoji = 5;
                let real_i:number = 1;
                for(let i:number = 1; i <= 2; i++) {
                    let inc:any = null;
                    if(i == 1) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == itemId) {
                                let ___ = msMoudle.payjson[key];
                                inc = "生命： +" + ___.hp + "%";
                                break;
                            }
                        }
                    }
                    else if(i == 2) {
                        for(let key in msMoudle.payjson) {
                            if(msMoudle.payjson[key].id == itemId) {
                                let ___ = msMoudle.payjson[key];
                                inc = "体力： +" + ___.hp + "%";
                                break;
                            }
                        }
                    }
                    if(inc) {
                        let msgJob:Laya.Label = new Laya.Label();
                        msgJob.fontSize = 14;
                        msgJob.strokeColor = "#000000";
                        msgJob.stroke = 1;
                        msgJob.text = inc;
                        msgJob.bold = true;
                        msgJob.color = "#FFFFFF";
                        msgJob.pos(260 + 140 - msgJob.width / 2, 370 + (real_i + 1) * 21);
                        this.m_item_sp.addChild(msgJob);
                        real_i = real_i + 1;
                    }
                }
            }

            /////
            if(this.char) {
                this.char.clearUp();
                this.char = null;
            }
            this.char = new cssCharacter();
            let E:any = {};
            E.fweapon = ms.testfweapon;
            E.cap = ms.testcap;
            E.longcoat = ms.testlongcoat;
            if(type == 2) E.longcoat = itemId + ".img";
            E.weapon = ms.testweapon;
            this.char.m_name = ms.testname;
            this.char.m_lv = ms.herodata.Lv;
            this.char.m_nametag_show = false;
            if(type == 4) {
                E.tamingmob = itemId + ".img";//01902000  01902028    01902032
                if(itemId == "01902005") E.tamingmob0 =   "01912005.img";
                else if(itemId == "01902000") E.tamingmob0 =   "01912000.img";
                else if(itemId == "01902028") E.tamingmob0 =   "01912021.img";
                else if(itemId == "01902032") E.tamingmob0 =   "01912025.img";
                else if(itemId == "01932152") E.tamingmob0 =   "N";
                else if(itemId == "01932211") E.tamingmob0 =   "N";
                else if(itemId == "01932351") E.tamingmob0 =   "N";
                else if(itemId == "01932407") E.tamingmob0 =   "N";
            }
            else if(type == 5) {
                this.char.m_ring = itemId;
                // console.log(itemId)
            }
            else if(type == 6) {
                this.char.m_chair = itemId;
            }
            this.char.changeAll(this.m_item_sp, E, 260 + 140, 220 +180);
            if(type == 3) {
                if(this.pet) {
                    this.pet.clearUp();
                    this.pet = null;
                }
                this.pet = new cssPet();
                this.pet.changeAll(this.m_item_sp, itemId + ".img", 260 + 140 + 40, 220 +180)
            }
        }

        public lifeShow2(data:any, do1_txt:string = "") : void {
            let item:any = new Object();

            item.name = "效果预览";

            //英雄
            item.img = "res/Character/Cap/" + msMoudle.herojson[Number(data.id)-1001].head + ".img/info.icon.png";

            // item.img = "skillicon/109.png";
            item.desc = "";

            if(this.m_item_sp) {
                this.m_item_sp.removeSelf();
                this.m_item_sp = null;
            }
            this.m_item_sp = new Laya.Sprite();
            this.m_item_sp.zOrder = 9999999999;
            this.m_item_sp.name = "itemmsg";
            // this.m_item_sp.pos((Laya.stage.width - 800) / 2,(Laya.stage.height - 600) / 2);
            this.m_item_sp.x = (Laya.stage.width - 800) / 2;
            Laya.stage.addChild(this.m_item_sp);
            this.m_item_sp.width = Laya.stage.width
            this.m_item_sp.height = Laya.stage.height
            this.m_item_sp.on("click", this, ()=> {
                if(this.char) {
                    this.char.clearUp();
                    this.char = null;
                }
                this.m_item_sp.removeSelf();
                this.m_item_sp = null;
            });

            let head:Laya.Image = new Laya.Image();
            head.skin = "event/Delivery.Send_Info.backgrnd.png"
            // head.sizeGrid = "15,15,15,15";
            head.height = 105;
            head.width = 280;
            head.height = 275;


            head.pos(260, 220);
            head.name = "head";
            this.m_item_sp.addChild(head);

            head.height += 15;
            // let end:Laya.Image = new Laya.Image();
            // end.skin = "res/UI/ending.png";
            // end.alpha = 0.7;
            // end.pos(260, 220 + head.height);
            // end.name = "end";
            // this.m_item_sp.addChild(end);

            //icon
            let msgiconk:Laya.Image = new Laya.Image();
            // msgiconk.skin = "homeland/img_pingzhikuang1.png";
            msgiconk.pos(260 + 10, 220 + 35);
            this.m_item_sp.addChild(msgiconk);
            let msgicon:Laya.Image = new Laya.Image();
            msgicon.skin = item.img;
            msgicon.width = 44;
            msgicon.height = 44;
            msgiconk.addChild(msgicon);
            //name
            let msgname:Laya.Label = new Laya.Label();
            msgname.fontSize = 16;
            msgname.text = item.name;
            msgname.bold = true;
            msgname.color = "#ffffff";
            msgname.strokeColor = "#000000";
            msgname.stroke = 3;
            msgname.pos(260 + 130 - msgname.width / 2, 220 + msgname.height / 2);
            this.m_item_sp.addChild(msgname);
            //desc
            let msgdesc:Laya.Label = new Laya.Label();
            msgdesc.fontSize = 14;
            msgdesc.wordWrap = true;
            msgdesc.width = 200;
            msgdesc.text = item.desc;
            msgdesc.strokeColor = "#000000";
            msgdesc.stroke = 1;
            msgdesc.bold = true;
            msgdesc.leading = 4;
            msgdesc.color = "#ffffff";
            msgdesc.pos(260 + 75, 220 + 40);
            this.m_item_sp.addChild(msgdesc);

            /////
            if(this.char) {
                this.char.clearUp();
                this.char = null;
            }
            this.char = new cssCharacter();
            let E:any = {};
            E.fweapon = ms.testfweapon;
            E.cap = ms.testcap;
            E.longcoat = ms.testlongcoat;
            E.weapon = ms.testweapon;
            this.char.m_name = ms.testname;
            this.char.m_lv = ms.herodata.Lv;
            this.char.m_nametag_show = false;
            for(let key in msMoudle.herojson) {
                if(msMoudle.herojson[key].id == data.id) {
                    E.weapon = msMoudle.herojson[key].weapon;
                    E.fweapon = msMoudle.herojson[key].fweapon;
                    E.cap = msMoudle.herojson[key].cap;
                    E.longcoat = msMoudle.herojson[key].longcoat;
                    break;
                }
            }
            this.char.changeAll(this.m_item_sp, E, 260 + 140, 220 +180);
            if(do1_txt != "") {
                //////////////
                let btn1:Laya.Image = new Laya.Image();
                btn1.skin = "res/UI/icon/FadeYesNo.backgrnd8.png";
                btn1.width = 80
                btn1.height = 33;
                btn1.pos(260 + 97, 170 + 105 + (1 + 1) * 21 + 135);
                this.m_item_sp.addChild(btn1);

                let btn1_txt:Laya.Label = new Laya.Label();
                btn1_txt.fontSize = 16;
                btn1_txt.text = do1_txt;
                btn1_txt.bold = true;
                btn1_txt.pos(40 - 16, 15 - 7);
                btn1.addChild(btn1_txt);
                btn1.on("click", this, ()=> {
                    if(btn1_txt.text == "上架") {
                        if(data.Lv > 100) {
                            msMoudle.toast("该英雄无法出售");
                        }
                        else {
                            ui.show(app.homeland.upDlg, {params:[data.openid, 2], black:true});
                            ui.manager.getDialogByName("app.homeland.maiDlg").dlg.close();
                        }
                    }
                    else if(btn1_txt.text == "购买") {
                        //添加进入背包
                        ui.manager.getDialogByName("app.homeland.ziyouDlg").dlg.buyWood();
                    }
                    else if(btn1_txt.text == "下架") {
                        //添加进入背包
                        ui.manager.getDialogByName("app.homeland.ziyouDlg").dlg.offWood();
                    }
                });
            }
        }

        public jbShow() : void {
            this.m_item_sp = new Laya.Sprite();
            this.m_item_sp.zOrder = 9999999999;
            this.m_item_sp.name = "itemmsg";
            // this.m_item_sp.pos((Laya.stage.width - 800) / 2,(Laya.stage.height - 600) / 2);
            this.m_item_sp.x = (Laya.stage.width - 800) / 2;
            this.m_item_sp.width = Laya.stage.width;
            this.m_item_sp.height = Laya.stage.height;
            Laya.stage.addChild(this.m_item_sp);
            this.m_item_sp.width = 800;
            this.m_item_sp.height = 600;
            this.m_item_sp.on("click", this, ()=> {
                this.m_item_sp.removeSelf();
                this.m_item_sp = null;
            });

            let head:Laya.Image = new Laya.Image();
            head.skin = "event/Delivery.Send_Info.backgrnd.png"
            head.sizeGrid = "25,25,25,25";
            head.height = 105;
            head.width = 280;
            head.pos(260, 125);
            head.name = "head";
            this.m_item_sp.addChild(head);

            let jbdata:any = msMoudle.m_jb_lqs;
            if(ms.selHero == 0) jbdata = msMoudle.m_jb_lqs;
            else if(ms.selHero == 1) jbdata = msMoudle.m_jb_zj;
            else if(ms.selHero == 2) jbdata = msMoudle.m_jb_dxk;
            else if(ms.selHero == 3) jbdata = msMoudle.m_jb_sss;
            else if(ms.selHero == 4) jbdata = msMoudle.m_jb_yx;
            else if(ms.selHero == 5) jbdata = msMoudle.m_jb_bl;
            else if(ms.selHero == 6) jbdata = msMoudle.m_jb_sqs;
            else if(ms.selHero == 7) jbdata = msMoudle.m_jb_hd;
            else if(ms.selHero == 8) jbdata = msMoudle.m_jb_js;
            else if(ms.selHero == 9) jbdata = msMoudle.m_jb_wyr;
            else if(ms.selHero == 10) jbdata = msMoudle.m_jb_cfdz;
            else if(ms.selHero == 11) jbdata = msMoudle.m_jb_cz;
            else if(ms.selHero == 12) jbdata = msMoudle.m_jb_klzs;
            else if(ms.selHero == 13) jbdata = msMoudle.m_jb_ygfs;
            else if(ms.selHero == 14) jbdata = msMoudle.m_jb_jb;
            else if(ms.selHero == 15) jbdata = msMoudle.m_jb_jh;
            else if(ms.selHero == 16) jbdata = msMoudle.m_jb_myls;
            else if(ms.selHero == 17) jbdata = msMoudle.m_jb_sjsz;
            else if(ms.selHero == 18) jbdata = msMoudle.m_jb_yhyr;
            else if(ms.selHero == 19) jbdata = msMoudle.m_jb_hy;
            else if(ms.selHero == 20) jbdata = msMoudle.m_jb_szz;
            else if(ms.selHero == 21) jbdata = msMoudle.m_jb_blmts;
            else if(ms.selHero == 22) jbdata = msMoudle.m_jb_zs;
            else if(ms.selHero == 23) jbdata = msMoudle.m_jb_ls;
            else if(ms.selHero == 24) jbdata = msMoudle.m_jb_snjl;
            else if(ms.selHero == 25) jbdata = msMoudle.m_jb_hy;
            else if(ms.selHero == 26) jbdata = msMoudle.m_jb_yy;
            else if(ms.selHero == 27) jbdata = msMoudle.m_jb_emls;
            else if(ms.selHero == 28) jbdata = msMoudle.m_jb_fcz;
            else if(ms.selHero == 29) jbdata = msMoudle.m_jb_hl;
            else if(ms.selHero == 30) jbdata = msMoudle.m_jb_bps;
            else if(ms.selHero == 31) jbdata = msMoudle.m_jb_gjlr;
            else if(ms.selHero == 32) jbdata = msMoudle.m_jb_aysd;
            else if(ms.selHero == 33) jbdata = msMoudle.m_jb_mhe;
            else if(ms.selHero == 34) jbdata = msMoudle.m_jb_hqs;
            else if(ms.selHero == 35) jbdata = msMoudle.m_jb_yss;
            else if(ms.selHero == 36) jbdata = msMoudle.m_jb_flsz;
            else if(ms.selHero == 37) jbdata = msMoudle.m_jb_yxz;
            else if(ms.selHero == 38) jbdata = msMoudle.m_jb_qxz;
            else if(ms.selHero == 39) jbdata = msMoudle.m_jb_ctj;
            else if(ms.selHero == 40) jbdata = msMoudle.m_jb_bzhw;
            let jbnum = jbdata.length / 3;
            //羁绊1
            let allh = 0;
            for(let _:number = 0; _ < jbnum; _++) {
                if(true) {
                    let msgname:Laya.Label = new Laya.Label();
                    msgname.fontSize = 16;
                    msgname.text = "[" + jbdata[_] + "]";
                    msgname.bold = true;
                    msgname.color = "#c08a39";
                    // msgname.strokeColor = "#000000";
                    // msgname.stroke = 3;
                    msgname.pos(260 + 10, 125 +10 + allh);
                    this.m_item_sp.addChild(msgname);

                    let msgneed:Laya.Label = new Laya.Label();
                    msgneed.fontSize = 16;
                    msgneed.text = "需要：";
                    msgneed.bold = true;
                    msgneed.color = "#c0a538";
                    // msgneed.strokeColor = "#000000";
                    // msgneed.stroke = 3;
                    msgneed.pos(260 + 10, 125 +10 + msgname.height + 5 + allh);
                    this.m_item_sp.addChild(msgneed);

                    // let N = msMoudle.getRandValue(1, 0, 3);
                    let jobs = jbdata[_ + 1 * jbnum].split("#");
                    let N = jobs.length;
                    for(let i:number = 0; i < N; i++) {
                        let msgJob:Laya.Label = new Laya.Label();
                        msgJob.fontSize = 14;
                        msgJob.text = "-" + jobs[i] + "  职业";
                        // msgJob.bold = true;
                        msgJob.color = "#c8c816";
                        // msgJob.strokeColor = "#000000";
                        // msgJob.stroke = 1;
                        msgJob.pos(260 + 10, 125 +10 + msgname.height + 5 + (i + 1) * 21 + allh);
                        this.m_item_sp.addChild(msgJob);
                    }

                    let descs = jbdata[_ + 2 * jbnum];
                    let msgDesc:Laya.Label = new Laya.Label();
                    msgDesc.fontSize = 16;
                    msgDesc.width = 260;
                    msgDesc.leading = 2;
                    msgDesc.text = descs;//"【瞬身止水】产生的幻影能够继承本体的暴击率，且持续时间增加50%，攻击力增加100%";
                    msgDesc.bold = true;

                    let succ:boolean = true;
                    for(let i:number = 0; i < N; i++) {
                        if(msMoudle.findIndexByName(jobs[i]) == false) {
                            succ = false;
                            break;
                        }
                    }
                    if(succ) {
                        msgDesc.color = "#1add50";
                    }
                    else{
                        msgDesc.color = "#a5b2c1";
                    }

                    // msgDesc.strokeColor = "#000000";
                    // msgDesc.stroke = 1;
                    msgDesc.wordWrap = true;
                    msgDesc.pos(260 + 10, 125 +10 + msgname.height + 5 + (N + 1) * 21 + allh);
                    this.m_item_sp.addChild(msgDesc);

                    allh = 10 + msgname.height + 5 + (N + 1) * 21 + msgDesc.height + 10 + allh;
                }
            }
            // //羁绊2
            // if(true) {
            //     let msgname:Laya.Label = new Laya.Label();
            //     msgname.fontSize = 16;
            //     msgname.text = "[最真的挚友]";
            //     msgname.bold = true;
            //     msgname.color = "#c08a39";
            //     // msgname.strokeColor = "#000000";
            //     // msgname.stroke = 3;
            //     msgname.pos(260 + 10, 125 +10 + allh);
            //     this.m_item_sp.addChild(msgname);

            //     let msgneed:Laya.Label = new Laya.Label();
            //     msgneed.fontSize = 16;
            //     msgneed.text = "需要：";
            //     msgneed.bold = true;
            //     msgneed.color = "#c0a538";
            //     // msgneed.strokeColor = "#000000";
            //     // msgneed.stroke = 3;
            //     msgneed.pos(260 + 10, 125 +10 + msgname.height + 5 + allh);
            //     this.m_item_sp.addChild(msgneed);

            //     let N = msMoudle.getRandValue(1, 0, 3);
            //     for(let i:number = 0; i < N; i++) {
            //         let msgJob:Laya.Label = new Laya.Label();
            //         msgJob.fontSize = 14;
            //         msgJob.text = "-龙骑士  职业";
            //         // msgJob.bold = true;
            //         msgJob.color = "#c8c816";
            //         // msgJob.strokeColor = "#000000";
            //         // msgJob.stroke = 1;
            //         msgJob.pos(260 + 10, 125 +10 + msgname.height + 5 + (i + 1) * 21 + allh);
            //         this.m_item_sp.addChild(msgJob);
            //     }

            //     let msgDesc:Laya.Label = new Laya.Label();
            //     msgDesc.fontSize = 16;
            //     msgDesc.width = 260;
            //     msgDesc.text = "【瞬身止水】产生的幻影能够继承本体的暴击率，且持续时间增加50%，攻击力增加100%";
            //     msgDesc.bold = true;
            //     msgDesc.color = "#a5b2c1";
            //     // msgDesc.strokeColor = "#000000";
            //     // msgDesc.stroke = 1;
            //     msgDesc.wordWrap = true;
            //     msgDesc.pos(260 + 10, 125 +10 + msgname.height + 5 + (N + 1) * 21 + allh);
            //     this.m_item_sp.addChild(msgDesc);

            //     allh = 10 + msgname.height + 5 + (N + 1) * 21 + msgDesc.height + 10 + allh;
            // }
            // console.log(allh);
            head.height = allh;
            // let end:Laya.Image = new Laya.Image();
            // end.skin = "res/UI/ending.png";
            // end.alpha = 0.7;
            // end.pos(260, 125 + head.height);
            // end.name = "end";
            // this.m_item_sp.addChild(end);
            head.height += 15;
        }

        //道具详情(属性.怪物掉落道具)
        public itemShow(itemId:any, addMsg:string = "", do1_txt:string = "", suoshow:boolean = false) : void {
            let item:any = new Object();
            if(itemId == "N") {
                item.name = "普通攻击";
                item.img = "skillicon/109.png";
                item.desc = "";
            }
            else if(itemId == "100101") {
                item.name = "生命力强化";
                item.img = "skillIcon/skill.1000001.icon.png";
                item.desc = "生命力+5%" + addMsg;
                // item.desc = "Lv.1 生命力+5%\nLv.1 生命力+5%\nLv.1 生命力+5%"
            }
            else if(itemId == "100102") {
                item.name = "攻击力强化";
                item.img = "skillIcon/skill.1100000.icon.png";
                item.desc = "攻击力+5%" + addMsg;
                // item.desc = "Lv.1 攻击力+5%\nLv.1 攻击力+5%\nLv.1 攻击力+5%"
            }
            else if(itemId == "100103") {
                item.name = "防御力强化";
                item.img = "skillIcon/skill.4210000.icon.png";
                item.desc = "防御力+5%" + addMsg;
                // item.desc = "Lv.1 防御力+5%\nLv.1 防御力+5%\nLv.1 防御力+5%"
            }
            else if(itemId == "100104") {
                item.name = "暴击强化";
                item.img = "skillIcon/skill.2300000.icon.png";
                item.desc = "暴击+5%" + addMsg;
                // item.desc = "Lv.1 暴击+5%\nLv.1 暴击+5%\nLv.1 暴击+5%"
            }
            else if(itemId == "100105") {
                item.name = "闪避强化";
                item.img = "skillIcon/skill.3110000.icon.png";
                item.desc = "闪避+5%" + addMsg;
                // item.desc = "Lv.1 闪避+5%\nLv.1 闪避+5%\nLv.1 闪避+5%"
            }
            else if(itemId == "100106") {
                item.name = "命中强化";
                item.img = "skillIcon/skill.3100000.icon.png";
                item.desc = "命中+5%" + addMsg;
                // item.desc = "Lv.1 命中+5%\nLv.1 命中+5%\nLv.1 命中+5%"
            }
            else if(itemId == "1234559") {
                item.name = "装备";
                item.img = "homeland/01702320.img.png";
                item.desc = "随机获得一件装备！";
            }
            else if(itemId == "9000000") {
                item.name = "金币";
                item.img = "homeland/02022995.info.icon.png";
                item.desc = "闪闪发光的金币";
            }
            else if(itemId == "1234561") {
                item.name = "枫叶";
                item.img = "homeland/02028044.info.icon.png";
                item.desc = "好像象征着某种东西";
            }
            else if(itemId == "1234562") {
                item.name = "黑金";
                item.img = "homeland/02048719.info.icon.png";
                item.desc = "一般是昂贵的物品";
            }

            else if(itemId == "1234531") {
                item.name = "转盘券";
                item.img = "homeland/04001374.info.icon.png";
                item.desc = "特殊的入场券";
            }
            else if(itemId == "1234532") {
                item.name = "修炼场入场券";
                item.img = "homeland/04001374.info.icon.png";
                item.desc = "特殊的入场券";
            }
            else if(itemId == "1234533") {
                item.name = "林中城入场券";
                item.img = "homeland/04001374.info.icon.png";
                item.desc = "特殊的入场券";
            }
            else if(itemId == "1234534") {
                item.name = "箱子券";
                item.img = "homeland/04001374.info.icon.png";
                item.desc = "特殊的入场券";
            }
            else if(itemId == "1234535") {
                item.name = "伟大航路入场券";
                item.img = "homeland/04001374.info.icon.png";
                item.desc = "特殊的入场券";
            }
            else if(itemId == "1234553") {
                item.name = "卷轴";
                item.img = "homeland/02040001.info.icon.png";
                item.desc = "蕴含着强大力量的卷轴！";
            }
            else if(itemId == "1234554") {
                item.name = "体力";
                item.img = "homeland/02010029.info.icon.png";
                item.desc = "可增加10分钟挂机时长";
            }
            else if(itemId == "700000000") {
                item.name = "升星石";
                item.img = "homeland/04001017.info.icon.png";
                item.desc = "升级星级需要的重要材料！";
            }
            else if(itemId == "800000000") {
                item.name = "觉醒石";
                item.img = "homeland/04001129.info.icon.png";
                item.desc = "英雄觉醒需要的重要材料！";
            }
            else if(itemId == "700000001") {
                item.name = "升星石(30个)";
                item.img = "homeland/04001017.info.icon.png";
                item.desc = "升级星级需要的重要材料！";
            }
            else if(itemId == "900000001") {
                item.name = "修炼石(30个)";
                item.img = "homeland/04001190.info.icon.png";
                item.desc = "修炼需要的重要材料！";
            }
            else if(itemId == "900000002") {
                item.name = "双倍经验卡";
                item.img = "homeland/04001397.info.icon.png";
                item.desc = "可在迷雾森林中获得双倍经验(仅有一次效果)";
            }
            else if(itemId == "900000003") {
                item.name = "五倍经验卡";
                item.img = "homeland/04001397.info.icon.png";
                item.desc = "可在迷雾森林中获得五倍经验(仅有一次效果)";
            }
            else if(itemId == "900000004") {
                item.name = "十倍经验卡";
                item.img = "homeland/04001397.info.icon.png";
                item.desc = "可在迷雾森林中获得十倍经验(仅有一次效果)";
            }
            else if(itemId == "900000010") {
                item.name = "百倍经验卡";
                item.img = "homeland/04001397.info.icon.png";
                item.desc = "可在迷雾森林中获得百倍经验(仅有一次效果)";
            }
            else if(itemId == "900000005") {
                item.name = "更名卡";
                item.img = "homeland/04001397.info.icon.png";
                item.desc = "可以修改角色的名字(仅有一次效果)";
            }
            else if(itemId == "900000066") {
                item.name = "普通伤害特效";
                item.img = "homeland/04000412.info.icon.png";
                item.desc = "恢复到默认的伤害特效";
            }
            else if(itemId == "900000067") {
                item.name = "普通伤害特效";
                item.img = "homeland/04000412.info.icon.png";
                item.desc = "恢复到默认的伤害特效";
            }
            else if(itemId == "900000068") {
                item.name = "随机伤害特效";
                item.img = "homeland/04000412.info.icon.png";
                item.desc = "随机获得一种伤害特效";
            }
            else if(itemId == "900000069") {
                item.name = "全服点歌";
                item.img = "homeland/04000412.info.icon.png";
                item.desc = "点播一首歌让整个服务器知道你！";
            }
            else if(itemId == "900000070") {
                item.name = "测谎杀手";
                item.img = "homeland/04000412.info.icon.png";
                item.desc = "可以屏蔽系统的测谎检测！";
            }

            else if(itemId == "900000006") {
                item.name = "转生卷轴";
                item.img = "homeland/04000412.info.icon.png";
                item.desc = "可以直接提升主角的转生等级";
            }
            else if(itemId == "900000007") {
                item.name = "英雄置换";
                item.img = "homeland/04000412.info.icon.png";
                item.desc = "可以随机置换一个相同品质的英雄";
            }
            else if(itemId == "900000017") {
                item.name = "洗点";
                item.img = "homeland/04000412.info.icon.png";
                item.desc = "将角色的属性点重置并随机分配";
            }
            else if(itemId == "900000008") {
                item.name = "装备置换";
                item.img = "homeland/04000412.info.icon.png";
                item.desc = "可以随机置换一个相同等级的装备";
            }
            else if(itemId == "900000009") {
                item.name = "卷轴置换";
                item.img = "homeland/04000412.info.icon.png";
                item.desc = "可以随机置换一个相同类型的卷轴";
            }
            else if(itemId == "600000001") {
                item.name = "摊位凭证";
                item.img = "homeland/04001023.info.icon.png";
                item.desc = "交易市场摆摊需要的一个凭证！";
            }
            else if(itemId == "600000002") {
                item.name = "修炼石";
                item.img = "homeland/04001190.info.icon.png";
                item.desc = "一种蕴含强大力量的石头！";
            }
            ///
            else if(itemId == "600000003") {
                item.name = "圣兽精华";
                item.img = "homeland/04011007.info.icon.png";
                item.desc = "幻兽体内的宝具！";
            }
            else if(itemId == "600000004") {
                item.name = "青龙残卷";
                item.img = "homeland/02049000.info.icon.png";
                item.desc = "记载着神秘能力的残卷！";
            }
            else if(itemId == "600000005") {
                item.name = "白虎残卷";
                item.img = "homeland/02049000.info.icon.png";
                item.desc = "记载着神秘能力的残卷！";
            }
            else if(itemId == "600000006") {
                item.name = "玄武残卷";
                item.img = "homeland/02049000.info.icon.png";
                item.desc = "记载着神秘能力的残卷！";
            }
            else if(itemId == "600000007") {
                item.name = "朱雀残卷";
                item.img = "homeland/02049000.info.icon.png";
                item.desc = "记载着神秘能力的残卷！";
            }
            else if(itemId == "600000008") {
                item.name = "灵魂石";
                item.img = "homeland/01702180.info.icon.png";
                item.desc = "强大灵魂的容器！";
            }
            ///
            else if(itemId == "6000000020") {
                item.name = "生命修炼";
                // item.img = "homeland/job1.png";
                item.desc = "每级提升全体生命：+1%";
            }
            else if(itemId == "6000000021") {
                item.name = "攻击修炼";
                // item.img = "homeland/job2.png";
                item.desc = "每级提升全体攻击：+1%";
            }
            else if(itemId == "6000000022") {
                item.name = "防御修炼";
                // item.img = "homeland/job3.png";
                item.desc = "每级提升全体防御：+1%";
            }
            else if(itemId == "6000000023") {
                item.name = "命中修炼";
                // item.img = "homeland/job4.png";
                item.desc = "每级提升全体命中：+1%";
            }
            else if(itemId == "6000000024") {
                item.name = "闪避修炼";
                // item.img = "homeland/job5.png";
                item.desc = "每级提升全体闪避：+1%";
            }
            else if(itemId == "6000000025") {
                item.name = "暴击修炼";
                // item.img = "homeland/job6.png";
                item.desc = "每级提升全体暴击：+1%";
            }
            else if(itemId == "6000000026") {
                item.name = "速度修炼";
                // item.img = "homeland/job7.png";
                item.desc = "每级提升全体速度：+1%";
            }
            else if(itemId == "6000000027") {
                item.name = "召唤兽修炼";
                // item.img = "homeland/job8.png";
                item.desc = "每级提升召唤兽伤害：+3%";
            }
            else if(itemId == "800000001") {
                item.name = "觉醒石(30个)";
                item.img = "homeland/04001129.info.icon.png";
                item.desc = "英雄觉醒需要的重要材料！";
            }
            else if(itemId == "900000000") {
                item.name = "入场券";
                item.img = "homeland/04001374.info.icon.png";
                item.desc = "随机获得一张入场券！";
            }
            ////
            else if(itemId == "987654321") {
                item.name = "金币袋";
                item.img = "homeland/04000334.info.icon.png";
                item.desc = "随机获得大量的金币！";
            }
            else if(itemId == "987654322") {
                item.name = "枫叶袋";
                item.img = "homeland/04000334.info.icon.png";
                item.desc = "获得1000枫叶！";
            }
            else if(itemId == "987654328") {
                item.name = "积分袋";
                item.img = "homeland/04000334.info.icon.png";
                item.desc = "获得2500积分！";
            }
            else if(itemId == "987654329") {
                item.name = "修炼石袋";
                item.img = "homeland/04000334.info.icon.png";
                item.desc = "获得5000修炼石！";
            }
            else if(itemId == "9999") {
                item.name = "装备宝箱";
                item.img = "homeland/QuestIcon.5.0.png";
                item.desc = "随机获得一件装备！";
            }
            else if(itemId == "9998") {
                item.name = "高级卷轴宝箱";
                item.img = "homeland/QuestIcon.5.0.png";
                item.desc = "随机获得一张高级卷轴(含神秘卷轴)！";
            }
            //坐骑
            else if(itemId == "01902000" || itemId == "01902028" || itemId == "01902032") {
                if(itemId == "01902000") item.name = "代步猪(坐骑)";
                else if(itemId == "01902028") item.name = "筋斗云(坐骑)";
                else if(itemId == "01902032") item.name = "赤兔马(坐骑)";
                item.img = "res/Character/TamingMob/" + itemId + ".img/info.icon.png";
                item.desc = "街上的最靓的那个仔！";
            }
            else {
                if(msMoudle.findKeyFromArr(itemId, msMoudle.AllSkills)) item = msMoudle.getSkillMsg(itemId);
                else item = msMoudle.getItemMsg(itemId);
            }

            if(this.m_item_sp) {
                this.m_item_sp.removeSelf();
                this.m_item_sp = null;
            }
            this.m_item_sp = new Laya.Sprite();
            this.m_item_sp.zOrder = 9999999998;
            this.m_item_sp.name = "itemmsg";
            // this.m_item_sp.pos((Laya.stage.width - 800) / 2,(Laya.stage.height - 600) / 2);
            this.m_item_sp.x = (Laya.stage.width - 800) / 2;
            this.m_item_sp.width = Laya.stage.width;
            this.m_item_sp.height = Laya.stage.height;
            Laya.stage.addChild(this.m_item_sp);
            this.m_item_sp.width = 800;
            this.m_item_sp.height = 600;
            this.m_item_sp.on("click", this, ()=> {
                this.m_item_sp.removeSelf();
            });

            let head:Laya.Image = new Laya.Image();
            head.skin = "event/Delivery.Send_Info.backgrnd.png"
            head.sizeGrid = "25,25,25,25";
            head.height = 105;
            head.width = 280;
            head.pos(260, 220);
            head.name = "head";
            this.m_item_sp.addChild(head);

            let real_i = 0;
            if(do1_txt != "") {
                for(let i:number = 0; i < 1; i++) {
                    // let img:Laya.Image = new Laya.Image();
                    // img.alpha = 0.7;
                    // img.skin = "res/UI/body.png";
                    // img.pos(260, 220 + 105 + real_i * 21);
                    // this.m_item_sp.addChild(img);
                    head.height += 21;
                    real_i++;
                }
            }
            head.height += 15;
            // let end:Laya.Image = new Laya.Image();
            // end.skin = "res/UI/ending.png";
            // end.alpha = 0.7;
            // end.pos(260, 220 + 105 + real_i * 21);
            // end.name = "end";
            // this.m_item_sp.addChild(end);


            //icon
            let msgiconk:Laya.Image = new Laya.Image();
            // msgiconk.skin = "homeland/img_pingzhikuang1.png";
            msgiconk.pos(260 + 10, 220 + 35);
            this.m_item_sp.addChild(msgiconk);
            let msgicon:Laya.Image = new Laya.Image();
            msgicon.skin = item.img;
            msgicon.width = 44;
            msgicon.height = 44;
            // msgicon.pos(5, 5);
            msgiconk.addChild(msgicon);
            // msgiconk.scale(1.5, 1.5);


            //name
            let msgname:Laya.Label = new Laya.Label();
            msgname.fontSize = 16;
            msgname.text = item.name;
            msgname.bold = true;
            msgname.color = "#ffffff";
            msgname.strokeColor = "#000000";
            msgname.stroke = 3;
            msgname.pos(260 + 130 - msgname.width / 2, 220 + msgname.height / 2);
            this.m_item_sp.addChild(msgname);
            //desc
            let msgdesc:Laya.Label = new Laya.Label();
            msgdesc.fontSize = 15;
            msgdesc.wordWrap = true;
            msgdesc.width = 200;
            msgdesc.text = item.desc;
            msgdesc.strokeColor = "#000000";
            msgdesc.stroke = 1;
            msgdesc.bold = true;
            msgdesc.leading = 4;
            msgdesc.color = "#ffffff";
            msgdesc.pos(260 + 75, 220 + 40);
            this.m_item_sp.addChild(msgdesc);

            let issuo:boolean = false;
            for(let i:number = 0; i < ms.herodata.BagSlots.length; i++) {
                if(ms.herodata.BagSlots[i].openid == item.id) {
                    issuo = ms.herodata.BagSlots[i].suo;
                    break;
                }
            }
            if(suoshow) {
                let suotxt:Laya.Label = new Laya.Label();
                suotxt.bold = true;
                suotxt.stroke = 1;
                suotxt.fontSize = 20;
                if(issuo) {
                    suotxt.text = "  解锁  \n      ";
                    suotxt.color = "#842c16";
                    suotxt.strokeColor = "#FFFFFF";
                }
                else {
                    suotxt.text = "  加锁  \n      ";
                    suotxt.color = "#FFFFFF";
                    suotxt.strokeColor = "#000000";
                }
                suotxt.pos(260 + 215, 225);
                this.m_item_sp.addChild(suotxt);
                suotxt.on("click", this, ()=> {
                    ms.herodata.suoItem(item.id);
                    ui.manager.getDialogByName("app.char.charDlg").dlg.onBag();
                });
            }

            if(do1_txt != "") {
                //////////////
                let btn1:Laya.Image = new Laya.Image();
                btn1.skin = "res/UI/character_title_7.png";
                btn1.width = 80
                btn1.pos(260 + 97, 170 + 105 + (1 + 1) * 21);
                this.m_item_sp.addChild(btn1);

                let btn1_txt:Laya.Label = new Laya.Label();
                btn1_txt.fontSize = 16;
                btn1_txt.text = do1_txt;
                btn1_txt.bold = true;
                btn1_txt.pos(40 - 16, 15 - 7);
                btn1.addChild(btn1_txt);
                btn1.on("click", this, ()=> {
                    if(btn1_txt.text == "上架") {
                        ui.show(app.homeland.upDlg, {params:[itemId, 0], white:true});
                        ui.manager.getDialogByName("app.homeland.maiDlg").dlg.close();
                    }
                    else if(btn1_txt.text == "购买") {
                        //添加进入背包
                        ui.manager.getDialogByName("app.homeland.ziyouDlg").dlg.buyWood();
                    }
                    else if(btn1_txt.text == "下架") {
                        //添加进入背包
                        ui.manager.getDialogByName("app.homeland.ziyouDlg").dlg.offWood();
                    }
                    else if(btn1_txt.text == "出售") {
                        // msMoudle.toast("出售");
                        // console.log(ms.herodata.BagSlots, item);
                        for(let i:number = 0; i < ms.herodata.BagSlots.length; i++) {
                            if(ms.herodata.BagSlots[i].openid == item.id) {
                                if(ms.herodata.BagSlots[i].suo) {
                                    msMoudle.toast("该物品已加锁");
                                    return ;
                                }
                                ms.herodata.BagSlots.splice(i, 1);

                                if(item.id == "2040599") msMoudle.test_shenmi = msMoudle.test_rnk;

                                break;
                            }
                        }
                        msMoudle._(); msMoudle.updateJinBi(100);
                        ui.manager.getDialogByName("app.char.charDlg").dlg.onBag();
                        ms.saveServer();
                    }
                });
            }

        }
        ////一般是本地商店的或者掉落
        //装备详情(不应该只是本地数据)
        public equipLoadShow(itemId:any, sp:boolean = true) : void {
            this.m_eqp_sp = new Laya.Sprite();
            this.m_eqp_sp.zOrder = 9999999;
            this.m_eqp_sp.name = "eqpmsg";
            // this.m_eqp_sp.pos((Laya.stage.width - 800) / 2,(Laya.stage.height - 600) / 2);
            this.m_eqp_sp.x = (Laya.stage.width - 800) / 2;
            this.m_eqp_sp.width = Laya.stage.width;
            this.m_eqp_sp.height = Laya.stage.height;
            Laya.stage.addChild(this.m_eqp_sp);
            this.m_eqp_sp.width = 800;
            this.m_eqp_sp.height = 600;
            let index_path:string = msMoudle.getEqpIndex(itemId);
            ////需要加载
            if(!Laya.loader.getRes(index_path)) {
                let res:Array<any> = [];
                res.push({ url: index_path });
                msLoad.load(res).done(dlg => {
                    if(!msMoudle.wz[itemId + ".img"]) {
                        let cs:CssParser.Txt = new CssParser.Txt();
                        msMoudle.wz[itemId + ".img"] = msMoudle.loadWZ(cs, index_path, "ms");
                    }
                    this.equipLoadShow__(itemId, sp);
                });
            }
            else {
                if(!msMoudle.wz[itemId + ".img"]) {
                    let cs:CssParser.Txt = new CssParser.Txt();
                    msMoudle.wz[itemId + ".img"] = msMoudle.loadWZ(cs, index_path, "ms");
                }
                this.equipLoadShow__(itemId, sp);
            }
        }

        equipLoadShow__(itemId:any, sp:boolean = true) : void {
            let item:any = msMoudle.getEqpMsg(itemId);
            this.m_eqp_sp.on("click", this, ()=> {
                this.m_eqp_sp.removeSelf();
            });

            //head
            let head:Laya.Image = new Laya.Image();
            head.skin = "event/Delivery.Send_Info.backgrnd.png"
            head.sizeGrid = "25,25,25,25";
            head.height = 105;
            head.width = 280;
            head.pos(260, 170);
            this.m_eqp_sp.addChild(head);
            //icon
            let msgiconk:Laya.Image = new Laya.Image();
            msgiconk.pos(275, 190);
            this.m_eqp_sp.addChild(msgiconk);
            let msgicon:Laya.Image = new Laya.Image();
            msgicon.skin = item.img;
            msgicon.width = 44;
            msgicon.height = 44;
            msgiconk.addChild(msgicon);

            //name
            let msgname:Laya.Label = new Laya.Label();
            msgname.fontSize = 16;
            msgname.text = item.name;
            msgname.bold = true;
            msgname.color = "#FFFFFF";
            msgname.strokeColor = "#000000";
            msgname.stroke = 3;
            msgname.pos(260 + 130 - msgname.width / 2, 170 + msgname.height / 2);
            this.m_eqp_sp.addChild(msgname);

            let msgReq:Laya.Label = new Laya.Label();
            msgReq.fontSize = 14;
            // msgReq.align = "right";
            // msgReq.text = "\n价格： " + item.price;
            msgReq.leading = 8;
            msgReq.text = "要求等级： " + item.reqLevel +
                        "\n出售价格： " + Math.round( (Number(item.reqLevel)+1) * 10);
            //reqLevel
            // msgReq.text = "要求等级： " + item.reqLevel +
            //             "\n出售价格： " + Math.round(Number(item.price) / 2);
            //             "\n要求力量： " + item.reqSTR +
            //             "\n要求敏捷： " + item.reqDEX +
            //             "\n要求智力： " + item.reqINT +
            //             "\n要求运气： " + item.reqLUK;
            msgReq.color = "#FFFFFF";
            msgReq.bold = true;
            msgReq.strokeColor = "#000000";
            msgReq.stroke = 1;
            // msgReq.pos(425, 170 + 30);
            msgReq.pos(260 + 80, 170 + 30);
            this.m_eqp_sp.addChild(msgReq);

            for(let i:number = 0; i < 1; i++) {
                // let img:Laya.Image = new Laya.Image();
                // img.alpha = 0.7;
                // img.skin = "res/UI/body.png";
                // img.pos(260, 170 + 105 + i * 21);
                head.height += 21;
                // this.m_eqp_sp.addChild(img);

                let msgJob:Laya.Label = new Laya.Label();
                msgJob.fontSize = 14;
                msgJob.text = "新手     战士     魔法师     弓箭手     飞侠";
                // msgJob.text = "全部     战士     法师     弓箭手";
                // msgJob.text = "全部     武器     防具     披风     盾牌";
                msgJob.bold = true;
                msgJob.color = "#FFFFFF";
                msgJob.strokeColor = "#000000";
                msgJob.stroke = 1;
                msgJob.pos(260 + 15, 170 + 105 + i * 21);
                this.m_eqp_sp.addChild(msgJob);
            }

            //基础属性
            for(let i:number = 0; i < 1; i++) {
                // let img:Laya.Image = new Laya.Image();
                // img.alpha = 0.7;
                // img.skin = "res/UI/body.png";
                // img.pos(260, 170 + 105 + (i + 1) * 21);
                head.height += 21;
                // this.m_eqp_sp.addChild(img);

                let msgJob:Laya.Label = new Laya.Label();
                msgJob.fontSize = 14;
                if(msMoudle.isCap(itemId)) msgJob.text = "装备分类： 帽子";
                else if(msMoudle.isCape(itemId)) msgJob.text = "装备分类： 披风";
                else if(msMoudle.isShoes(itemId)) msgJob.text = "装备分类： 鞋子";
                else if(msMoudle.isCoat(itemId)) msgJob.text = "装备分类： 上衣";
                else if(msMoudle.isPants(itemId)) msgJob.text = "装备分类： 裤子";
                else if(msMoudle.isLongCoat(itemId)) msgJob.text = "装备分类： 套装";
                else if(msMoudle.isShield(itemId)) msgJob.text = "装备分类： 盾牌";
                else if(msMoudle.isGlove(itemId)) msgJob.text = "装备分类： 手套";
                else if(msMoudle.isAccessory1(itemId)) msgJob.text = "装备分类： 脸饰";
                else if(msMoudle.isAccessory2(itemId)) msgJob.text = "装备分类： 眼饰";
                else if(msMoudle.isAccessory3(itemId)) msgJob.text = "装备分类： 耳饰";
                else if(msMoudle.isAccessory4(itemId)) msgJob.text = "装备分类： 坠子";
                else if(msMoudle.isAccessory5(itemId)) msgJob.text = "装备分类： 腰带";
                else if(msMoudle.isAccessory6(itemId)) msgJob.text = "装备分类： 勋章";
                else msgJob.text = "武器分类： " + msMoudle.getWeaponType(itemId);
                msgJob.bold = true;
                msgJob.color = "#FFFFFF";
                msgJob.strokeColor = "#000000";
                msgJob.stroke = 1;
                msgJob.pos(260 + 140 - msgJob.width / 2, 170 + 105 + (i + 1) * 21);
                this.m_eqp_sp.addChild(msgJob);
            }

            //追加属性
            let real_i:number = 1;
            if(sp) {
                for(let i:number = 1; i <= 13; i++) {
                    let inc:any = null;
                    if(i == 1) {
                        if(item.incPAD > 0) inc = "攻击力： +" + item.incPAD;
                    }
                    else if(i == 2) {
                        if(item.incMAD > 0) inc = "魔法力： +" + item.incMAD;
                    }
                    else if(i == 3) {
                        if(item.incPDD > 0) inc = "物理防御力： +" + item.incPDD;
                    }
                    else if(i == 4) {
                        if(item.incMDD > 0) inc = "魔法防御力： +" + item.incMDD;
                    }
                    else if(i == 5) {
                        if(item.incSTR > 0) inc = "力量： +" + item.incSTR;
                    }
                    else if(i == 6) {
                        if(item.incDEX > 0) inc = "敏捷： +" + item.incDEX;
                    }
                    else if(i == 7) {
                        if(item.incINT > 0) inc = "智力： +" + item.incINT;
                    }
                    else if(i == 8) {
                        if(item.incLUK > 0) inc = "运气： +" + item.incLUK;
                    }
                    else if(i == 9) {
                        if(item.incMHP > 0) inc = "HP： +" + item.incMHP;
                    }
                    else if(i == 10) {
                        if(item.incMMP > 0) inc = "MP： +" + item.incMMP;
                    }
                    else if(i == 11) {
                        if(item.incACC > 0) inc = "命中率： +" + item.incACC;
                    }
                    else if(i == 12) {
                        if(item.incEVA > 0) inc = "回避率： +" + item.incEVA;
                    }
                    else if(i == 13) {
                        if(item.tuc > 0) inc = "可升级次数： " + item.tuc + "回";
                    }
                    if(inc) {
                        // let img:Laya.Image = new Laya.Image();
                        // img.alpha = 0.7;
                        // img.skin = "res/UI/body.png";
                        // img.pos(260, 170 + 105 + (real_i + 1) * 21);
                        // this.m_eqp_sp.addChild(img);
                        head.height += 21;

                        let msgJob:Laya.Label = new Laya.Label();
                        msgJob.fontSize = 14;
                        msgJob.strokeColor = "#000000";
                        msgJob.stroke = 1;
                        msgJob.text = inc;
                        msgJob.bold = true;
                        msgJob.color = "#FFFFFF";
                        msgJob.pos(260 + 140 - msgJob.width / 2, 170 + 105 + (real_i + 1) * 21);
                        this.m_eqp_sp.addChild(msgJob);
                        real_i = real_i + 1;
                    }
                }
            }

            head.height += 15;
            // let end:Laya.Image = new Laya.Image();
            // end.skin = "res/UI/ending.png";
            // end.alpha = 0.7;
            // end.pos(260, 170 + 105 + (real_i + 1) * 21);
            // this.m_eqp_sp.addChild(end);
        }

        public equipLoadShow2(itemId:any, P:any, do1_txt:string, do2_txt:string, key:number) : void {
            this.m_eqp_sp = new Laya.Sprite();
            this.m_eqp_sp.zOrder = 9999999;
            this.m_eqp_sp.name = "eqpmsg";
            // this.m_eqp_sp.pos((Laya.stage.width - 800) / 2,(Laya.stage.height - 600) / 2);
            this.m_eqp_sp.x = (Laya.stage.width - 800) / 2;
            this.m_eqp_sp.width = Laya.stage.width;
            this.m_eqp_sp.height = Laya.stage.height;
            Laya.stage.addChild(this.m_eqp_sp);
            this.m_eqp_sp.width = 800;
            this.m_eqp_sp.height = 600;
            let index_path:string = msMoudle.getEqpIndex(itemId);
            ////需要加载
            if(!Laya.loader.getRes(index_path)) {
                let res:Array<any> = [];
                res.push({ url: index_path });
                msLoad.load(res).done(dlg => {
                    if(!msMoudle.wz[itemId + ".img"]) {
                        let cs:CssParser.Txt = new CssParser.Txt();
                        msMoudle.wz[itemId + ".img"] = msMoudle.loadWZ(cs, index_path, "ms");
                    }
                    this.equipLoadShow2__(itemId, P, do1_txt, do2_txt, key);
                });
            }
            else {
                if(!msMoudle.wz[itemId + ".img"]) {
                    let cs:CssParser.Txt = new CssParser.Txt();
                    msMoudle.wz[itemId + ".img"] = msMoudle.loadWZ(cs, index_path, "ms");
                }
                this.equipLoadShow2__(itemId, P, do1_txt, do2_txt, key);
            }
        }

        equipLoadShow2__(itemId:any, P:any, do1_txt:string, do2_txt:string, key:number) : void {
            let item:any = msMoudle.getEqpMsg(itemId);
            this.m_eqp_sp.on("click", this, ()=> {
                this.m_eqp_sp.removeSelf();
            });

            //head
            let head:Laya.Image = new Laya.Image();
            head.skin = "event/Delivery.Send_Info.backgrnd.png"
            head.sizeGrid = "25,25,25,25";
            head.height = 105;
            head.width = 280;
            head.pos(260, 170);
            this.m_eqp_sp.addChild(head);
            //icon
            let msgiconk:Laya.Image = new Laya.Image();
            msgiconk.pos(275, 190);
            this.m_eqp_sp.addChild(msgiconk);
            let msgicon:Laya.Image = new Laya.Image();
            msgicon.skin = item.img;
            msgicon.width = 44;
            msgicon.height = 44;
            msgiconk.addChild(msgicon);

            //name
            let msgname:Laya.Label = new Laya.Label();
            msgname.fontSize = 16;
            msgname.text = item.name;
            msgname.bold = true;
            msgname.color = "#FFFFFF";
            msgname.strokeColor = "#000000";
            msgname.stroke = 3;
            msgname.pos(260 + 130 - msgname.width / 2, 170 + msgname.height / 2);
            this.m_eqp_sp.addChild(msgname);

            let msgReq:Laya.Label = new Laya.Label();
            msgReq.fontSize = 14;
            // msgReq.align = "right";
            // msgReq.text = "\n价格： " + item.price;
            msgReq.leading = 8;
            msgReq.text = "要求等级： " + item.reqLevel +
                        "\n出售价格： " + Math.round( (Number(item.reqLevel)+1) * 10);
            //reqLevel
            // msgReq.text = "要求等级： " + item.reqLevel +
            //             "\n出售价格： " + Math.round(Number(item.price) / 2);
            //             "\n要求力量： " + item.reqSTR +
            //             "\n要求敏捷： " + item.reqDEX +
            //             "\n要求智力： " + item.reqINT +
            //             "\n要求运气： " + item.reqLUK;
            msgReq.color = "#FFFFFF";
            msgReq.bold = true;
            msgReq.strokeColor = "#000000";
            msgReq.stroke = 1;
            // msgReq.pos(425, 170 + 30);
            msgReq.pos(260 + 80, 170 + 30);
            this.m_eqp_sp.addChild(msgReq);

            for(let i:number = 0; i < 1; i++) {
                // let img:Laya.Image = new Laya.Image();
                // img.alpha = 0.7;
                // img.skin = "res/UI/body.png";
                // img.pos(260, 170 + 105 + i * 21);
                // this.m_eqp_sp.addChild(img);
                head.height += 21;

                let msgJob:Laya.Label = new Laya.Label();
                msgJob.fontSize = 14;
                msgJob.text = "新手     战士     魔法师     弓箭手     飞侠";
                // msgJob.text = "全部     战士     法师     弓箭手";
                // msgJob.text = "全部     战士     魔法师     弓箭手     肥大";
                msgJob.bold = true;
                msgJob.color = "#FFFFFF";
                msgJob.strokeColor = "#000000";
                msgJob.stroke = 1;
                msgJob.pos(260 + 15, 170 + 105 + i * 21);
                this.m_eqp_sp.addChild(msgJob);
            }

            //基础属性
            for(let i:number = 0; i < 1; i++) {
                // let img:Laya.Image = new Laya.Image();
                // img.alpha = 0.7;
                // img.skin = "res/UI/body.png";
                // img.pos(260, 170 + 105 + (i + 1) * 21);
                // this.m_eqp_sp.addChild(img);
                head.height += 21;

                let msgJob:Laya.Label = new Laya.Label();
                msgJob.fontSize = 14;
                if(msMoudle.isCap(itemId)) msgJob.text = "装备分类： 帽子";
                else if(msMoudle.isCape(itemId)) msgJob.text = "装备分类： 披风";
                else if(msMoudle.isShoes(itemId)) msgJob.text = "装备分类： 鞋子";
                else if(msMoudle.isCoat(itemId)) msgJob.text = "装备分类： 上衣";
                else if(msMoudle.isPants(itemId)) msgJob.text = "装备分类： 裤子";
                else if(msMoudle.isLongCoat(itemId)) msgJob.text = "装备分类： 套装";
                else if(msMoudle.isShield(itemId)) msgJob.text = "装备分类： 盾牌";
                else if(msMoudle.isGlove(itemId)) msgJob.text = "装备分类： 手套";
                else if(msMoudle.isAccessory1(itemId)) msgJob.text = "装备分类： 脸饰";
                else if(msMoudle.isAccessory2(itemId)) msgJob.text = "装备分类： 眼饰";
                else if(msMoudle.isAccessory3(itemId)) msgJob.text = "装备分类： 耳饰";
                else if(msMoudle.isAccessory4(itemId)) msgJob.text = "装备分类： 坠子";
                else if(msMoudle.isAccessory5(itemId)) msgJob.text = "装备分类： 腰带";
                else if(msMoudle.isAccessory6(itemId)) msgJob.text = "装备分类： 勋章";
                else msgJob.text = "武器分类： " + msMoudle.getWeaponType(itemId);
                msgJob.bold = true;
                msgJob.color = "#FFFFFF";
                msgJob.strokeColor = "#000000";
                msgJob.stroke = 1;
                msgJob.pos(260 + 140 - msgJob.width / 2, 170 + 105 + (i + 1) * 21);
                this.m_eqp_sp.addChild(msgJob);
            }

            //追加属性
            let real_i:number = 1;
            // if(sp) {
            //     for(let i:number = 1; i <= 13; i++) {
            //         let inc:any = null;
            //         if(i == 1) {
            //             if(item.incPAD > 0) inc = "攻击力： +" + item.incPAD;
            //         }
            //         else if(i == 2) {
            //             if(item.incMAD > 0) inc = "魔法力： +" + item.incMAD;
            //         }
            //         else if(i == 3) {
            //             if(item.incPDD > 0) inc = "物理防御力： +" + item.incPDD;
            //         }
            //         else if(i == 4) {
            //             if(item.incMDD > 0) inc = "魔法防御力： +" + item.incMDD;
            //         }
            //         else if(i == 5) {
            //             if(item.incSTR > 0) inc = "力量： +" + item.incSTR;
            //         }
            //         else if(i == 6) {
            //             if(item.incDEX > 0) inc = "敏捷： +" + item.incDEX;
            //         }
            //         else if(i == 7) {
            //             if(item.incINT > 0) inc = "智力： +" + item.incINT;
            //         }
            //         else if(i == 8) {
            //             if(item.incLUK > 0) inc = "运气： +" + item.incLUK;
            //         }
            //         else if(i == 9) {
            //             if(item.incMHP > 0) inc = "HP： +" + item.incMHP;
            //         }
            //         else if(i == 10) {
            //             if(item.incMMP > 0) inc = "MP： +" + item.incMMP;
            //         }
            //         else if(i == 11) {
            //             if(item.incACC > 0) inc = "命中率： +" + item.incACC;
            //         }
            //         else if(i == 12) {
            //             if(item.incEVA > 0) inc = "回避率： +" + item.incEVA;
            //         }
            //         else if(i == 13) {
            //             if(item.tuc > 0) inc = "可升级次数： " + item.tuc + "回";
            //         }
            //         if(inc) {
            //             let img:Laya.Image = new Laya.Image();
            //             img.alpha = 0.7;
            //             img.skin = "res/UI/body.png";
            //             img.pos(260, 170 + 105 + (real_i + 1) * 21);
            //             this.m_eqp_sp.addChild(img);

            //             let msgJob:Laya.Label = new Laya.Label();
            //             msgJob.fontSize = 14;
            //             msgJob.strokeColor = "#000000";
            //             msgJob.stroke = 1;
            //             msgJob.text = inc;
            //             msgJob.bold = true;
            //             msgJob.color = "#FFFFFF";
            //             msgJob.pos(260 + 140 - msgJob.width / 2, 170 + 105 + (real_i + 1) * 21);
            //             this.m_eqp_sp.addChild(msgJob);
            //             real_i = real_i + 1;
            //         }
            //     }
            // }
            // else {
                for(let i:number = 1; i <= 3; i++) {
                    // let img:Laya.Image = new Laya.Image();
                    // img.alpha = 0.7;
                    // img.skin = "res/UI/body.png";
                    // img.pos(260, 170 + 105 + (real_i + 1) * 21);
                    // this.m_eqp_sp.addChild(img);
                    head.height += 21;
                    real_i = real_i + 1;
                }
            // }

            head.height += 15;
            // let end:Laya.Image = new Laya.Image();
            // end.skin = "res/UI/ending.png";
            // end.alpha = 0.7;
            // end.pos(260, 170 + 105 + (real_i + 1) * 21);
            // this.m_eqp_sp.addChild(end);

            if(do1_txt != "" && do2_txt != "") {
                //////////////
                let btn1:Laya.Image = new Laya.Image();
                btn1.skin = "res/UI/character_title_7.png";
                btn1.width = 80
                btn1.pos(260 + 45, 170 + 105 + (real_i - 1) * 21 + 10);
                this.m_eqp_sp.addChild(btn1);

                let btn1_txt:Laya.Label = new Laya.Label();
                btn1_txt.fontSize = 16;
                btn1_txt.text = do1_txt;
                btn1_txt.bold = true;
                btn1_txt.pos(40 - 16, 15 - 7);
                btn1.addChild(btn1_txt);

                let btn2:Laya.Image = new Laya.Image();
                btn2.skin = "res/UI/character_title_7.png";
                btn2.width = 80
                btn2.pos(260 + 85 + 65, 170 + 105 + (real_i - 1) * 21 + 10);
                this.m_eqp_sp.addChild(btn2);


                let btn2_txt:Laya.Label = new Laya.Label();
                btn2_txt.fontSize = 16;
                btn2_txt.text = do2_txt;
                btn2_txt.bold = true;
                btn2_txt.pos(40 - 16, 15 - 7);
                btn2.addChild(btn2_txt);

                btn1.on("click", this, ()=> {
                    if(btn1_txt.text == "装备") {
                        if(P) {
                            P.onCellDo(key);
                        }
                    }
                });
                btn2.on("click", this, ()=> {
                    if(btn2_txt.text == "丢弃") {
                        if(P) {
                            P.onRmvDo(key);
                        }
                    }
                });
            }
            else if(do1_txt != "") {
                //////////////
                let btn1:Laya.Image = new Laya.Image();
                btn1.skin = "res/UI/character_title_7.png";
                btn1.width = 80
                btn1.pos(260 + 97, 170 + 105 + (real_i - 1) * 21 + 10);
                this.m_eqp_sp.addChild(btn1);

                let btn1_txt:Laya.Label = new Laya.Label();
                btn1_txt.fontSize = 16;
                btn1_txt.text = do1_txt;
                btn1_txt.bold = true;
                btn1_txt.pos(40 - 16, 15 - 7);
                btn1.addChild(btn1_txt);
                btn1.on("click", this, ()=> {
                    if(btn1_txt.text == "卸下") {
                        if(P) {
                            P.onEqpDo(key);
                        }
                    }

                });
            }
        }

        public equipShow(data:app.model.Equip, do1_txt:string = "", do2_txt:string = "", suoshow:boolean = true) : void {
            this.m_eqp_sp = new Laya.Sprite();
            this.m_eqp_sp.zOrder = 9999999;
            Laya.stage.addChild(this.m_eqp_sp);
            // this.m_eqp_sp.pos((Laya.stage.width - 800) / 2,(Laya.stage.height - 600) / 2);
            this.m_eqp_sp.x = (Laya.stage.width - 800) / 2;
            this.m_eqp_sp.width = Laya.stage.width;
            this.m_eqp_sp.height = Laya.stage.height;
            this.m_eqp_sp.width = 800;
            this.m_eqp_sp.height = 600;
            let index_path:string = msMoudle.getEqpIndex(data.id);
            ////需要加载
            if(!Laya.loader.getRes(index_path)) {
                let res:Array<any> = [];
                res.push({ url: index_path });
                msLoad.load(res).done(dlg => {
                    if(!msMoudle.wz[data.id + ".img"]) {
                        let cs:CssParser.Txt = new CssParser.Txt();
                        msMoudle.wz[data.id + ".img"] = msMoudle.loadWZ(cs, index_path, "ms");
                    }
                    this.equipShow__(data, do1_txt, do2_txt, suoshow);
                });
            }
            else {
                if(!msMoudle.wz[data.id + ".img"]) {
                    let cs:CssParser.Txt = new CssParser.Txt();
                    msMoudle.wz[data.id + ".img"] = msMoudle.loadWZ(cs, index_path, "ms");
                }
                this.equipShow__(data, do1_txt, do2_txt, suoshow);
            }
        }

        equipShow__(data:app.model.Equip, do1_txt:string = "", do2_txt:string = "", suoshow:boolean) : void {
            let item:any = msMoudle.getEqpMsg(data.id);
            this.m_eqp_sp.on("click", this, ()=> {
                this.m_eqp_sp.removeSelf();
            });
            //head
            let head:Laya.Image = new Laya.Image();
            head.skin = "event/Delivery.Send_Info.backgrnd.png"
            head.sizeGrid = "25,25,25,25";
            head.height = 105;
            head.width = 280;
            head.pos(260, 170);
            head.name = "head";
            this.m_eqp_sp.addChild(head);
            //icon
            let msgiconk:Laya.Image = new Laya.Image();
            msgiconk.pos(275, 190);
            this.m_eqp_sp.addChild(msgiconk);
            let msgicon:Laya.Image = new Laya.Image();
            msgicon.skin = item.img;
            msgicon.width = 44;
            msgicon.height = 44;
            msgiconk.addChild(msgicon);
            //name
            let msgname:Laya.Label = new Laya.Label();
            msgname.fontSize = 16;
            msgname.color = "#FFFFFF";
            if(data.suc == 0) msgname.text = item.name;
            else {
                msgname.text = item.name + "（+" + data.suc + "）";
                if(data.suc >= 10) msgname.color = "#f08d18";//红
                else if(data.suc >= 8) msgname.color = "#fedb63";//橙
                else if(data.suc >= 6) msgname.color = "#e258fd";//紫
                else if(data.suc >= 4) msgname.color = "#6afe63";//绿
                else if(data.suc >= 2) msgname.color = "#3aa4fe";//蓝
            }



            msgname.bold = true;
            msgname.strokeColor = "#000000";
            msgname.stroke = 3;
            msgname.pos(260 + 130 - msgname.width / 2, 170 + msgname.height / 2);
            this.m_eqp_sp.addChild(msgname);

            let msgReq:Laya.Label = new Laya.Label();
            msgReq.fontSize = 14;
            // msgReq.width = 100;
            // msgReq.align = "right";
            // msgReq.text = "\n价格： " + item.price;
            msgReq.leading = 8;
            msgReq.text = "要求等级： " + item.reqLevel +
                        "\n出售价格： " + Math.round( (Number(item.reqLevel)+1) * 10);
            // msgReq.text = "要求等级： " + item.reqLevel +
            //             "\n出售价格： " + Math.round(Number(item.price));
            //             "\n要求力量： " + item.reqSTR +
            //             "\n要求敏捷： " + item.reqDEX +
            //             "\n要求智力： " + item.reqINT +
            //             "\n要求运气： " + item.reqLUK;
            msgReq.color = "#FFFFFF";
            msgReq.bold = true;
            msgReq.strokeColor = "#000000";
            msgReq.stroke = 1;
            // msgReq.pos(425, 170 + 30);
            msgReq.pos(260 + 80, 170 + 30);
            this.m_eqp_sp.addChild(msgReq);

            if(do1_txt == "" && do2_txt == "") {}
            else {
                if(suoshow) {
                    let suotxt:Laya.Label = new Laya.Label();
                    suotxt.bold = true;
                    suotxt.stroke = 1;
                    suotxt.fontSize = 20;
                    if(data.suo) {
                        suotxt.text = "  解锁  \n      ";
                        suotxt.color = "#842c16";
                        suotxt.strokeColor = "#FFFFFF";
                    }
                    else {
                        suotxt.text = "  加锁  \n      ";
                        suotxt.color = "#FFFFFF";
                        suotxt.strokeColor = "#000000";
                    }
                    suotxt.pos(260 + 215, 180 + 20);
                    this.m_eqp_sp.addChild(suotxt);
                    suotxt.on("click", this, ()=> {
                        ms.herodata.suoEquip(data);
                        ui.manager.getDialogByName("app.char.charDlg").dlg.onBag();
                    });
                }
            }

            for(let i:number = 0; i < 1; i++) {
                // let img:Laya.Image = new Laya.Image();
                // img.alpha = 0.7;
                // img.skin = "res/UI/body.png";
                // img.pos(260, 170 + 105 + i * 21);
                // this.m_eqp_sp.addChild(img);
                head.height += 21;

                let msgJob:Laya.Label = new Laya.Label();
                msgJob.fontSize = 14;
                msgJob.text = "新手     战士     魔法师     弓箭手     飞侠";
                // msgJob.text = "全部     战士     法师     弓箭手";
                // msgJob.text = "全部     武器     防具     披风     盾牌";
                msgJob.color = "#FFFFFF";
                msgJob.bold = true;
                msgJob.strokeColor = "#000000";
                msgJob.stroke = 1;
                msgJob.pos(260 + 15, 170 + 105 + i * 21);
                this.m_eqp_sp.addChild(msgJob);
            }

            //基础属性
            for(let i:number = 0; i < 1; i++) {
                // let img:Laya.Image = new Laya.Image();
                // img.alpha = 0.7;
                // img.skin = "res/UI/body.png";
                // img.pos(260, 170 + 105 + (i + 1) * 21);
                // this.m_eqp_sp.addChild(img);
                head.height += 21;

                let msgJob:Laya.Label = new Laya.Label();
                msgJob.fontSize = 14;
                if(msMoudle.isCap(data.id)) msgJob.text = "装备分类： 帽子";
                else if(msMoudle.isCape(data.id)) msgJob.text = "装备分类： 披风";
                else if(msMoudle.isShoes(data.id)) msgJob.text = "装备分类： 鞋子";
                else if(msMoudle.isCoat(data.id)) msgJob.text = "装备分类： 上衣";
                else if(msMoudle.isPants(data.id)) msgJob.text = "装备分类： 裤子";
                else if(msMoudle.isLongCoat(data.id)) msgJob.text = "装备分类： 套装";
                else if(msMoudle.isShield(data.id)) msgJob.text = "装备分类： 盾牌";
                else if(msMoudle.isGlove(data.id)) msgJob.text = "装备分类： 手套";
                else if(msMoudle.isAccessory1(data.id)) msgJob.text = "装备分类： 脸饰";
                else if(msMoudle.isAccessory2(data.id)) msgJob.text = "装备分类： 眼饰";
                else if(msMoudle.isAccessory3(data.id)) msgJob.text = "装备分类： 耳饰";
                else if(msMoudle.isAccessory4(data.id)) msgJob.text = "装备分类： 坠子";
                else if(msMoudle.isAccessory5(data.id)) msgJob.text = "装备分类： 腰带";
                else if(msMoudle.isAccessory6(data.id)) msgJob.text = "装备分类： 勋章";
                else msgJob.text = "武器分类： " + msMoudle.getWeaponType(data.id);
                msgJob.color = "#FFFFFF";
                msgJob.bold = true;
                msgJob.strokeColor = "#000000";
                msgJob.stroke = 1;
                msgJob.pos(260 + 140 - msgJob.width / 2, 170 + 105 + (i + 1) * 21);
                this.m_eqp_sp.addChild(msgJob);
            }

            //追加属性
            let real_i:number = 1;
            for(let i:number = 1; i <= 13; i++) {
                let inc:any = null;
                if(i == 1) {
                    if(data.PADamage.GetSum() > 0) inc = "攻击力： +" + data.PADamage.GetSum();
                }
                else if(i == 2) {
                    if(data.MADamage.GetSum() > 0) inc = "魔法力： +" + data.MADamage.GetSum();
                }
                else if(i == 3) {
                    if(data.PDDamage.GetSum() > 0) inc = "物理防御力： +" + data.PDDamage.GetSum();
                }
                else if(i == 4) {
                    if(data.MDDamage.GetSum() > 0) inc = "魔法防御力： +" + data.MDDamage.GetSum();
                }
                else if(i == 5) {
                    if(data.Str.GetSum() > 0) inc = "力量： +" + data.Str.GetSum();
                }
                else if(i == 6) {
                    if(data.Dex.GetSum() > 0) inc = "敏捷： +" + data.Dex.GetSum();
                }
                else if(i == 7) {
                    if(data.Inte.GetSum() > 0) inc = "智力： +" + data.Inte.GetSum();
                }
                else if(i == 8) {
                    if(data.Luck.GetSum() > 0) inc = "运气： +" + data.Luck.GetSum();
                }
                else if(i == 9) {
                    if(data.MaxHP.GetSum() > 0) inc = "HP： +" + data.MaxHP.GetSum();
                }
                else if(i == 10) {
                    if(data.MaxMP.GetSum() > 0) inc = "MP： +" + data.MaxMP.GetSum();
                }
                else if(i == 11) {
                    if(data.Accurate.GetSum() > 0) inc = "命中率： +" + data.Accurate.GetSum();
                }
                else if(i == 12) {
                    if(data.Evasion.GetSum() > 0) inc = "回避率： +" + data.Evasion.GetSum();
                }
                else if(i == 13) {
                    inc = "可升级次数： " + data.tuc + "回";
                }
                if(inc) {
                    // let img:Laya.Image = new Laya.Image();
                    // img.alpha = 0.7;
                    // img.skin = "res/UI/body.png";
                    // img.pos(260, 170 + 105 + (real_i + 1) * 21);
                    // this.m_eqp_sp.addChild(img);
                    head.height += 21;

                    let msgJob:Laya.Label = new Laya.Label();
                    msgJob.fontSize = 14;
                    msgJob.strokeColor = "#000000";
                    msgJob.stroke = 1;
                    msgJob.text = inc;
                    msgJob.color = "#FFFFFF";
                    msgJob.bold = true;
                    msgJob.pos(260 + 140 - msgJob.width / 2, 170 + 105 + (real_i + 1) * 21);
                    this.m_eqp_sp.addChild(msgJob);
                    real_i = real_i + 1;
                }
            }

            head.height += 55;
            // let end:Laya.Image = new Laya.Image();
            // end.skin = "res/UI/end.png";
            // end.alpha = 0.7;
            // end.pos(260, 170 + 105 + (real_i + 1) * 21);
            // end.name = "end";
            // this.m_eqp_sp.addChild(end);

            if(do1_txt != "" && do2_txt != "") {
                //////////////
                let btn1:Laya.Image = new Laya.Image();
                btn1.skin = "res/UI/character_title_7.png";
                btn1.width = 80
                btn1.pos(260 + 45, 170 + 105 + (real_i + 1) * 21 + 10);
                this.m_eqp_sp.addChild(btn1);

                let btn1_txt:Laya.Label = new Laya.Label();
                btn1_txt.fontSize = 16;
                btn1_txt.text = do1_txt;
                btn1_txt.bold = true;
                btn1_txt.pos(40 - 16, 15 - 7);
                btn1.addChild(btn1_txt);

                let btn2:Laya.Image = new Laya.Image();
                btn2.skin = "res/UI/character_title_7.png";
                btn2.width = 80
                btn2.pos(260 + 85 + 65, 170 + 105 + (real_i + 1) * 21 + 10);
                this.m_eqp_sp.addChild(btn2);

                let btn2_txt:Laya.Label = new Laya.Label();
                btn2_txt.fontSize = 16;
                btn2_txt.text = do2_txt;
                btn2_txt.bold = true;
                btn2_txt.pos(40 - 16, 15 - 7);
                btn2.addChild(btn2_txt);

                btn1.on("click", this, ()=> {
                    if(btn1_txt.text == "更换") {
                        if(ms.herodata.Lv >= data.reqLevel) {
                            ms.herodata.wearEquip(data);
                            if(data.part == 0) ui.manager.getDialogByName("app.char.charDlg").dlg.char.changePart(msMoudle.partType.tWeapon, data.id + ".img");
                        }
                        else {
                            msMoudle.toast("等级不足");
                        }
                    }
                    else if(btn1_txt.text == "卸下") {
                        ms.herodata.putoffEquip(data);
                        if(data.part == 0) ui.manager.getDialogByName("app.char.charDlg").dlg.char.changePart(msMoudle.partType.tWeapon, "N");
                    }
                    ui.manager.getDialogByName("app.char.charDlg").dlg.onBag();
                    ui.manager.getDialogByName("app.char.charDlg").dlg.onEqp();
                    ui.manager.getDialogByName("app.char.charDlg").dlg.onAbi();
                });
                btn2.on("click", this, ()=> {
                    if(btn2_txt.text == "分解") {
                        // console.log("出售" + data.price)
                        msMoudle._(); msMoudle.updateJinBi( (Number(item.reqLevel) + 1) * 10);
                        ms.herodata.sellEquip(data);
                    }
                    else if(btn2_txt.text == "砸卷") {
                        // ui.show(app.select.selectDlg, {params:[data], black:true});
                        ui.show(app.select.selectDlg, {params:[data], white:true});
                    }
                    ui.manager.getDialogByName("app.char.charDlg").dlg.onBag();
                    ui.manager.getDialogByName("app.char.charDlg").dlg.onEqp();
                    ui.manager.getDialogByName("app.char.charDlg").dlg.onAbi();
                });
            }
            else if(do1_txt != "") {
                //////////////
                let btn1:Laya.Image = new Laya.Image();
                btn1.skin = "res/UI/character_title_7.png";
                btn1.width = 80
                btn1.pos(260 + 97, 170 + 105 + (real_i + 1) * 21 + 10);
                this.m_eqp_sp.addChild(btn1);

                let btn1_txt:Laya.Label = new Laya.Label();
                btn1_txt.fontSize = 16;
                btn1_txt.text = do1_txt;
                btn1_txt.bold = true;
                btn1_txt.pos(40 - 16, 15 - 7);
                btn1.addChild(btn1_txt);
                btn1.on("click", this, ()=> {
                    if(btn1_txt.text == "上架") {
                        ///删除背包里面的

                        if(data.suc > 10) {
                            msMoudle.toast("该装备无法出售");
                        }
                        else {
                            ui.show(app.homeland.upDlg, {params:[data.openid, 1], black:true});
                            ui.manager.getDialogByName("app.homeland.maiDlg").dlg.close();
                        }


                    }
                    else if(btn1_txt.text == "购买") {
                        //添加进入背包
                        ui.manager.getDialogByName("app.homeland.ziyouDlg").dlg.buyWood();
                    }
                    else if(btn1_txt.text == "下架") {
                        //添加进入背包
                        ui.manager.getDialogByName("app.homeland.ziyouDlg").dlg.offWood();
                    }
                });
            }
        }

        public cailiaoSkillShow(item:any, P?:any, _text?:string) : void {
            // let item:any = msMoudle.getEqpMsg(itemId);
            this.m_eqp_sp = new Laya.Sprite();
            this.m_eqp_sp.zOrder = 9999999;
            this.m_eqp_sp.name = "eqpmsg";
            this.m_eqp_sp.width = 800;
            this.m_eqp_sp.height = 600;
            this.m_eqp_sp.on("click", this, ()=> {
                this.m_eqp_sp.removeSelf();
            });
            // this.m_eqp_sp.pos((Laya.stage.width - 800) / 2,(Laya.stage.height - 600) / 2);
            this.m_eqp_sp.x = (Laya.stage.width - 800) / 2;
            this.m_eqp_sp.width = Laya.stage.width;
            this.m_eqp_sp.height = Laya.stage.height;
            Laya.stage.addChild(this.m_eqp_sp);
            //head
            let head:Laya.Image = new Laya.Image();
            head.skin = "event/Delivery.Send_Info.backgrnd.png"
            head.sizeGrid = "25,25,25,25";
            head.height = 105;
            head.width = 280;
            head.pos(260, 170);
            this.m_eqp_sp.addChild(head);
            //icon
            let msgiconk:Laya.Image = new Laya.Image();
            // msgiconk.skin = "homeland/img_pingzhikuang1.png";
            msgiconk.pos(260 + 10, 170 + 35);
            this.m_eqp_sp.addChild(msgiconk);
            let msgicon:Laya.Image = new Laya.Image();
            msgicon.skin = item.img;
            msgicon.width = 44;
            msgicon.height = 44;
            // msgicon.pos(5, 5);
            msgiconk.addChild(msgicon);

            //name
            let msgname:Laya.Label = new Laya.Label();
            msgname.fontSize = 16;
            msgname.text = item.name;
            msgname.bold = true;
            msgname.color = "#FFFFFF";
            msgname.strokeColor = "#000000";
            msgname.stroke = 3;
            msgname.pos(260 + 130 - msgname.width / 2, 170 + msgname.height / 2);
            this.m_eqp_sp.addChild(msgname);

            //描述
            let msgReq:Laya.Label = new Laya.Label();
            msgReq.fontSize = 16;
            msgReq.text = item.desc;
            msgReq.bold = true;
            msgReq.color = "#FFFFFF";
            msgReq.strokeColor = "#000000";
            msgReq.stroke = 1;
            msgReq.width = 200;
            msgReq.wordWrap = true;
            msgReq.pos(260 + 80, 170 + 65);
            this.m_eqp_sp.addChild(msgReq);
            //用途
            //来源

            let real_i:number = 0;
            if(P) {
                head.height += 55;
                // let end:Laya.Image = new Laya.Image();
                // end.skin = "res/UI/end.png";
                // end.alpha = 0.7;
                // end.pos(260, 170 + 105 + (real_i) * 21);
                // end.name = "end";
                // this.m_eqp_sp.addChild(end);
                //////////////
                let btn:Laya.Image = new Laya.Image();
                let btn_txt:Laya.Label = new Laya.Label();

                if(_text == "卸下" || _text == "装备" || _text == "更换") {
                    btn.skin = "res/UI/character_title_7.png";
                    btn.width = 80;
                    btn.pos(320 + 45, 170 + 105 + (real_i) * 21 + 10);
                    this.m_eqp_sp.addChild(btn);

                    btn_txt.fontSize = 16;
                    btn_txt.text = _text;
                    btn_txt.bold = true;
                    btn_txt.pos(40 - 16, 15 - 7);
                    btn.addChild(btn_txt);
                }

                btn.on("click", this, ()=> {
                    // console.log(btn_txt.text)
                    if(btn_txt.text == "卸下") {
                        P.putOffSkill(item.id);
                    }
                    else if(btn_txt.text == "装备") {
                        let is_all:boolean = true;
                        let sum = 0;
                        for(let i:number = 0; i < ms.wear_skill.length; i++) {
                            if(ms.wear_skill[i]) {
                                sum++;
                            }
                        }
                        // if(sum == 0) {
                        //     if(ms.herodata.Lv >=5) {}
                        //     else {
                        //         msMoudle.toast("不能装备更多的技能了");
                        //         return ;
                        //     }
                        // }
                        // else if(sum <= 1) {
                        //     if(ms.herodata.Lv >= 10) {}
                        //     else {
                        //         msMoudle.toast("不能装备更多的技能了");
                        //         return ;
                        //     }
                        // }
                        // else if(sum <= 2) {
                        //     if(ms.herodata.Lv >= 15) {}
                        //     else {
                        //         msMoudle.toast("不能装备更多的技能了");
                        //         return ;
                        //     }
                        // }
                        // else if(sum <= 3) {
                        //     if(ms.herodata.Lv >= 20) {}
                        //     else {
                        //         msMoudle.toast("不能装备更多的技能了");
                        //         return ;
                        //     }
                        // }
                        for(let i:number = 0; i < ms.wear_skill.length; i++) {
                            if(ms.wear_skill[i] == null) {
                                ms.wear_skill[i] = item.id;
                                P.putOnSkill();
                                is_all = false;
                                // msMoudle.judgeMuBiao(4);
                                break;
                            }
                        }
                        if(is_all) {
                            msMoudle.toast("不能装备更多的技能了");
                        }
                    }
                    else if(btn_txt.text == "更换") {
                        ui.show(app.char.skillDlg, {black:true});
                    }
                });

            }
            else {
                // let end:Laya.Image = new Laya.Image();
                // end.skin = "res/UI/ending.png";
                // end.alpha = 0.7;
                // end.pos(260, 170 + 105 + (real_i) * 21);
                // this.m_eqp_sp.addChild(end);
                head.height += 15;
            }


            // let end:Laya.Image = new Laya.Image();
            // end.skin = "res/UI/ending.png";
            // end.alpha = 0.7;
            // end.pos(260, 170 + 105 + (real_i) * 21);
            // this.m_eqp_sp.addChild(end);
        }
//////////////////////

        //
    }
}