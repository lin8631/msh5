/// <reference path="./../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../core/ms/Maple/Mob.ts" />

module app.boss {
    import cssMsg = MsgRole.Msg;
    import cssMob = MobRole.Mob;

    export class bossDlg extends ui.boss.bossDlgUI implements ui.boss.IbossDlgUI {
        public static className = "app.boss.bossDlg";
        private m_index:number = 0;
        private m_msg:cssMsg;
        private m_mob:cssMob;
        // private m_mob:Laya.Image;
        private m_data:Array<any> = [];
        private m_json:JSON;
        private m_scale:number = 1; ///有些怪物需要缩放
        private m_type:number = 1;
        private mFactory:Laya.Templet
        private mArmature:any;

        onInitialize(){

            // msMoudle.popShow(this, (800 - 720) / 2, (600 - 480) / 2);
            this.x = (Laya.stage.width - 720) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 480) / 2 - (Laya.stage.height - 600) / 2;

            // let a = true;
            // if(msMoudle.isScreen()) {
            //     if(msMoudle.mainT) {
            //         if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
            //             msMoudle.mainT.cz_sp.visible = false;
            //         }
            //     }
            // }

            this.m_msg = new cssMsg();

            this.lstBoss.hScrollBarSkin = "";
            this.m_json = msMoudle.mobjson;
            this.m_scale = 1;

            //防止意外
            if(ms.bossguanka > 8) ms.bossguanka = 8;
            if(ms.guanka > 75) ms.guanka = 75;

            this.onBtnPZ1Click2(null);
        }

        onBtnPZ1Click2(e: Laya.Event): void {
            this._name1.color = "#35f904";
            this._name2.color = "#a8a4a4";

            // this._desc.text = "只有强大的人才能生存，弱小就是罪恶...这是数百年前，你们人类赶走我们的时候给我们教训的东西吧？";
            this.m_type = 1;
            this.m_index = ms.guanka - 1;

            this.m_json = msMoudle.mobjson;
            this.m_scale = 1;
            this.updateData();
        }
        onBtnPZ2Click2(e: Laya.Event): void {
            if(ms.herodata.Lv >= 15) {
                this._name1.color = "#a8a4a4";
                this._name2.color = "#35f904";
                // this._desc.text = "什么都不能舍弃的人，就无法改变任何东西，如果非得超越怪物，连人性也可以舍弃。";
                this.m_type = 2;
                this.m_index = ms.bossguanka - 1;

                this.m_json = msMoudle.bossjson;
                this.m_scale = 1;
                this.updateData();
            }
            else {
                msMoudle.toast2("15级开启");
            }
        }

        public updataList() : void {
            let gkArr:Array<any> = [];
            if(this.m_json) {
                for(let key in this.m_json) {
                    gkArr[key] = new Object();
                    gkArr[key].json = this.m_json[key];
                    if(this.m_type == 1) {
                        if(ms.guanka - 1 > Number(key)) gkArr[key].state = 1;
                        else if(ms.guanka - 1 == Number(key)) gkArr[key].state = 2;
                        else gkArr[key].state = 0;
                    }
                    else if(this.m_type == 2) {
                        if(ms.bossguanka - 1 > Number(key)) gkArr[key].state = 1;
                        else if(ms.bossguanka - 1 == Number(key)) gkArr[key].state = 2;
                        else gkArr[key].state = 0;
                    }
                    else {
                        if(ms.herodata.Lv >= 20) gkArr[key].state = 1;
                        else gkArr[key].state = 0;
                    }
                }
            }
            this.m_data = gkArr;
            if(this.m_data.length > 0) {
                for(let i:number = 0; i < this.m_data.length; i++) {
                    this.m_data[i].select = false;
                }
                // this.lstGuaiWu.dataModel = new Array(8);
                if(this.m_type == 1) {
                    if(this.m_data[ms.guanka - 1]) this.m_data[ms.guanka - 1].select = true;
                    else this.m_data[ms.guanka - 2].select = true;
                }
                else if(this.m_type == 2) {
                    if(this.m_data[ms.bossguanka - 1]) this.m_data[ms.bossguanka - 1].select = true;
                    else this.m_data[ms.bossguanka - 2].select = true;
                }
                else if(this.m_type == 3) this.m_data[0].select = true;
            }
            this.lstBoss.dataModel = this.m_data;

            if(this.m_type == 1) this.lstBoss.scrollBar.value = ms.guanka >= 2 ? ((ms.guanka - 1) * 105 - 30) : 0;
            else if(this.m_type == 2) this.lstBoss.scrollBar.value = ms.bossguanka >= 2 ? ((ms.bossguanka - 1) * 105 - 30) : 0;
            else if(this.m_type == 3) {}
        }

        onItem1Click(e: Laya.Event): void {
            this.m_msg.itemShow(1234559);
        }
        onItem2Click(e: Laya.Event): void {
            this.m_msg.itemShow(1234561);
        }
        onItem3Click(e: Laya.Event): void {
            this.m_msg.itemShow(1234551);
        }
        onItem4Click(e: Laya.Event): void {
            this.m_msg.itemShow(1234552);
        }

        onLstBossCellChildClick(e: Laya.Event, index: number, childVarName: string): void {
            if(childVarName == "di") {
                if(this.m_data[index].state != 0) {
                    if(this.m_index != index) {
                        this.m_index = index;

                        this.showMob(this.m_index);

                        if(this.m_data.length > 0) {
                            for(let i:number = 0; i < this.m_data.length; i++) {
                                this.m_data[i].select = false;
                            }
                            this.m_data[index].select = true;
                        }
                        this.lstBoss.dataModel = this.m_data;

                        // this.btnFight.visible = (this.m_data[index].state == 0 ? false : true);
                    }
                }
                else {
                    msMoudle.toast2("请通过前置关卡！");
                }
            }
            else if(childVarName == "fight") {
                this.onBtnFightClick(null);
            }
        }

        onBtnFightClick(e: Laya.Event): void {
            if(this.m_type == 1) {
                ms.cur_guanka = this.m_index + 1;

                if(ms.cur_guanka >= ms.guanka + 1) {
                    msMoudle.toast2("该关卡还没有解锁");
                }
                else {
                    msMoudle.MapInit();

                    ui.show(app.battle.addTeamDlg, {params:[this], black:true});
                }
            }
            else if(this.m_type == 2) {
                msMoudle.MapInit();

                msMoudle.isBoss = true;

                ms.cur_bossguanka = this.m_index + 1;
                if(ms.cur_bossguanka >= ms.bossguanka + 1) {
                    msMoudle.toast2("该关卡还没有解锁");
                }
                else {
                    ui.show(app.battle.addTeamDlg, {params:[this], black:true});
                }
            }
        }

        onBtn_closeClick(e: Laya.Event): void {
            // msMoudle.popClose(this, 720/2, 480/2);
            this.close();
            let a = true;
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = true;
                    }
                }
            }
        }

        onClose() {
            if(this.m_mob) {
                this.m_mob.clearUp();
                // this.m_mob.removeSelf();
                this.m_mob = null;
            }
        }

        updateData(){
            this.updataList();
            if(this.m_type == 1) {
                if(this.m_data[ms.guanka - 1]) this.showMob(ms.guanka - 1);
                else this.showMob(ms.guanka - 2);
            }
            else if(this.m_type == 2) {
                if(this.m_data[ms.bossguanka - 1]) this.showMob(ms.bossguanka - 1);
                else this.showMob(ms.bossguanka - 2);
            }
            else if(this.m_type == 3) {
                this.showMob(0);
            }
            if(ms.herodata.Lv >= 1) this._tiaojian1.visible = false;
            if(ms.herodata.Lv >= 15) this._tiaojian2.visible = false;
        }

        private showMob(index:number) : void {
            if(this.m_mob) {
                this.m_mob.clearUp();
                // this.m_mob.removeSelf();
                this.m_mob = null;
            }

            if(this.m_json) {
                let id:string = this.m_json[index].id;
                if(id.length < 2 || this.m_json[index].boss.length > 2) id = this.m_json[index].boss;
                // console.log(msMoudle.wz[id + ".img"]["info"]);
                // let name:string = id;
                // if( msMoudle.wz["Mob.img"][id]) name = msMoudle.wz["Mob.img"][id][id + ".name"];
                // let info:any = msMoudle.wz[id + ".img"]["info"];
                // this._name.text = "名字：" + name;
                // this._lv.text = "等级：" + info["info.level"];
                // this._hp.text = "生命：" + info["info.maxHP"];
                // this._atk.text = "攻击：" + info["info.PADamage"];
                // this._def.text = "防御：" + (info["info.PDDamage"] ? info["info.PDDamage"] : 0);
                // this._target.text = "命中：" + info["info.acc"];
                // this._miss.text = "闪避：" + info["info.eva"];
                // this._baoji.text = "暴击：0";
                this.m_mob = new cssMob();
                // this.m_mob.anchorX = 0.5;
                // this.m_mob.anchorY = 1;
                // this._body.addChild(this.m_mob);
                // this.m_mob.skin = "res/Mob/" + id + ".img/stand.0.png";
                this.m_mob.force_scale = this.m_scale;
                let lifeMsg:any = new Object();
                lifeMsg.id = id;
                lifeMsg.x = 0;
                lifeMsg.y =  0;
                this.m_mob.m_nametag_show = false;
                this.m_mob.m_canf = false;
                this.m_mob.is_oneFrame = true;
                this.m_mob.changeAll(this._body, id + ".img", lifeMsg);
            }
        }
        //
    }
}