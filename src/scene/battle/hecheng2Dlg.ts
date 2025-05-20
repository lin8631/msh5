/// <reference path="./../../core/ms/Maple/Skill.ts" />
/// <reference path="./../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../core/ms/Maple/BasicEff.ts" />

module app.battle {

    import cssSkill = SkillRole.Skill;
    import cssMsg = MsgRole.Msg;
    import cssBasicEff = BasicEffRole.BasicEff;

    export class hecheng2Dlg extends ui.battle.hecheng2DlgUI implements ui.battle.Ihecheng2DlgUI {
        public static className = "app.battle.hecheng2Dlg";
        private yc_heroArray:Array<any> = [];
        private m_msg:cssMsg;

        constructor(params:any){
            super();

        }

        onInitialize(){

            this.x = (Laya.stage.width - 480) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 320) / 2 - (Laya.stage.height - 600) / 2;

            this.updateData();
        }

        updateData(){
            this.lstBag.vScrollBarSkin = "";

            this.m_msg = new cssMsg();

            this.onBag();
        }

        ckArr:Array<any> = [];
        onBag() : void {
            this.ckArr = new Array(24);
            let len = 0;
            for(let i:number = 0; i < ms.herodata.BagSlots.length; i++) {
                //保证是装备类型
                // if(ms.herodata.BagSlots[i].type == 1) {
                    this.ckArr[len] = new Object();
                    this.ckArr[len].json = ms.herodata.BagSlots[i];
                    this.ckArr[len].sel = false;
                    len++;
                // }
            }
            this.lstBag.dataModel = this.ckArr;
        }

        onLstBagCellClick(e: Laya.Event, index: number): void {
            if(this.ckArr[index]) {
                if(this.ckArr[index]["json"].type == 0) {
                    msMoudle.toast("当前选择的不是装备类型");
                    return ;
                }
                if(this.ckArr[index]["json"].suo) {
                    msMoudle.toast("该装备已上锁");
                    return ;
                }
                this.ckArr[index].sel = !this.ckArr[index].sel;
                this.lstBag.dataModel = this.ckArr;

                if(this.ckArr[index].sel) {
                    if(msMoudle.isEquip(this.ckArr[index]["json"].id)) this.m_msg.equipLoadShow(this.ckArr[index]["json"].id);
                    else this.m_msg.itemShow(Number(this.ckArr[index]["json"].id));
                }
            }
        }

        //合成
        onBtn_querenClick(e: Laya.Event): void {
            let len = 0;
            let rmvItems:Array<string> = [];
            for(let i:number = 0; i < this.ckArr.length; i++) {
                if(this.ckArr[i]) {
                    if(this.ckArr[i].sel) {
                        rmvItems[rmvItems.length] = this.ckArr[i]["json"].openid;
                        len++;
                    }
                }
            }
            if(len != 2) {
                msMoudle.toast("请选择你要合成的2件装备");
                return ;
            }
            else {
                this.btn_queren.visible = false;
                this.btn_quick.visible = false;
                this.showSucc();
                ///合成装备
                ms.herodata.heCheng(rmvItems);
                Laya.timer.once(2000, this, this.delayUpdate);
            }
        }

        //一键合成功能
        onBtn_quickClick(e: Laya.Event): void {
            let len = 0;
            let rmvItems:Array<string> = [];
            //统计可合成的数量
            for(let i:number = 0; i < this.ckArr.length; i++) {
                if(this.ckArr[i]) {
                    if(this.ckArr[i]["json"].type == 1 && this.ckArr[i]["json"].suo == false) {
                        len++;
                    }
                }
            }
            if(len % 2 != 0) len--;
            //保证是偶数
            if(len >= 2 && len % 2 == 0) {
                let sum = 0;
                for(let i:number = 0; i < this.ckArr.length; i++) {
                    if(this.ckArr[i]) {
                        if(this.ckArr[i]["json"].type == 1 && this.ckArr[i]["json"].suo == false) {
                            sum++;
                            //数量满足了
                            if(sum > len) {
                                break;
                            }
                            rmvItems[rmvItems.length] = this.ckArr[i]["json"].openid;
                        }
                    }
                }
            }
            ///
            if(len < 2) {
                msMoudle.toast("当前不满足合成的条件");
                return ;
            }
            else {
                this.btn_queren.visible = false;
                this.btn_quick.visible = false;
                this.showSucc();
                ///合成装备
                ms.herodata.heCheng(rmvItems);

                Laya.timer.once(3000, this, this.delayUpdate);
            }
        }

        delayUpdate() : void {
            //更新背包
            this.onBag();///这里更新不及时
            ms.saveServer();

            this.btn_queren.visible = true;
            this.btn_quick.visible = true;
            msMoudle.toast("合成成功");
        }

        skill:cssSkill;
        showSucc() : void {
            let be:cssBasicEff = new cssBasicEff();
            be.loadBasicEff(this.eff, "Success", 0, 0);
        }


        onBtn_closeClick(e: Laya.Event): void {
            this.close();
        }

        onClose() {
            // if(this.skill) {
            //     this.skill.clearUp();
            //     this.skill.removeSelf();
            //     this.skill = null;
            // }
        }

    }
}