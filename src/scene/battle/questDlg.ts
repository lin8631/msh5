/// <reference path="./../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../core/ms/Maple/BasicEff.ts" />

module app.battle {
    import cssMsg = MsgRole.Msg;
    import cssBasicEff = BasicEffRole.BasicEff;

    export class questDlg extends ui.battle.questDlgUI implements ui.battle.IquestDlgUI {
        public static className = "app.battle.questDlg";

        private m_data:any;
        private m_msg:cssMsg;

        constructor(params:any){
            super();

            // this.x = (Laya.stage.width - 380) / 2;
            // this.y = (Laya.stage.height - 240) / 2;

            // this.m_data = params;
        }

        onInitialize(){

            this.x = (Laya.stage.width - 380) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 240) / 2 - (Laya.stage.height - 600) / 2;

            let a = true;
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = false;
                    }
                }
            }

            // this.m_msg = new cssMsg();
            this.updateData();
        }

        onBtnYesClick(e: Laya.Event): void {

            if(msMoudle.online == false) {
                msMoudle.toast("当前网络不稳定");
                return ;
            }

            if(ms.herodata.BagSlots.length > msMoudle.BAGMAX - 1) {
                msMoudle.toast("背包已满")
                return ;
            }

            // this.isTure(1);
            // if(ms.herodata.Lv >= 10) {
            if(ms.zuanshi() >= Number(msMoudle.maplejson["扭蛋费用"])) {
                msMoudle._(); msMoudle.updateZuanShi(-Number(msMoudle.maplejson["扭蛋费用"]), 203);
                let rnk = msMoudle.getRandValue(0, 0, 100);
                if(ms.shops[0] > 0 && ms.shops[0] % 199 == 0) {
                    //只有充值500以上才会获取
                    let srnk = msMoudle.getRandValue(0, 0, 100);
                    if(srnk < 33) {
                        msMoudle._(); msMoudle.getWeapon("01382235")   //阿丽莎
                    }
                    else if(srnk < 33) {
                        msMoudle._(); msMoudle.getWeapon("01005140")   //999
                    }
                    else {
                        msMoudle._(); msMoudle.getWeapon("01402180")   //真01402180
                    }
                }
                //神秘卷轴
                else if(rnk < Number(msMoudle.maplejson["扭蛋神秘卷轴几率"]) * 100){
                    msMoudle.mainT.m_msgList.msgShow(0, "获得神秘卷轴", true);
                    msMoudle._(); msMoudle.getItem("2040599")
                    this.rwtxt.text = "获得神秘卷轴";
                }
                //百倍经验卡
                else if(rnk < Number(msMoudle.maplejson["扭蛋神秘卷轴几率"]) * 100 + Number(msMoudle.maplejson["扭蛋百倍经验卡几率"]) * 100){
                    msMoudle.mainT.m_msgList.msgShow(0, "获得百倍经验卡", true);
                    // msMoudle._(); msMoudle.getItem("900000010")
                    ms.Exp100 += 1;
                    this.rwtxt.text = "获得百倍经验卡";
                }
                else if(rnk < Number(msMoudle.maplejson["扭蛋神秘卷轴几率"]) * 100 + Number(msMoudle.maplejson["扭蛋百倍经验卡几率"]) * 100 + Number(msMoudle.maplejson["扭蛋神器几率"]) * 100){
                    // if(ms.test_cz < 500 || ms.shops[0] < 100) {
                        msMoudle.mainT.m_msgList.msgShow(0, "获得神秘卷轴", true);
                        msMoudle._(); msMoudle.getItem("2040599")
                        this.rwtxt.text = "获得神秘卷轴";
                    // }
                    // else {
                    //     //只有充值500以上才会获取
                    //     let srnk = msMoudle.getRandValue(0, 0, 100);
                    //     if(srnk < 33) msMoudle._(); msMoudle.getWeapon("01382235")   //阿丽莎
                    //     else if(srnk < 33) msMoudle._(); msMoudle.getWeapon("01005140")   //999
                    //     else msMoudle._(); msMoudle.getWeapon("01402180")   //真01402180
                    // }

                }
                else {
                    let srnk = msMoudle.getRandValue(0, 0, 100);
                    //装备
                    if(rnk < 50){
                        let itemId = msMoudle.rnkEqp(200);
                        let item:any = msMoudle.getEqpMsg(itemId);
                        msMoudle.mainT.m_msgList.msgShow(0, "获得" +item.name, true);
                        msMoudle._(); msMoudle.getWeapon(itemId);
                        this.rwtxt.text = "获得" +item.name
                    }
                    //卷轴
                    else {
                        let itemId = msMoudle.rnkJuanZhou(true);
                        let item:any = msMoudle.getItemMsg(Number(itemId));
                        msMoudle.mainT.m_msgList.msgShow(0, "获得" + item.name, true);
                        msMoudle._(); msMoudle.getItem(itemId);
                        this.rwtxt.text = "获得" + item.name
                    }
                }
                ms.shops[0]++;  //扭蛋次数+1
                ms.saveServer();
            }
            else {
                msMoudle.toast("黑金不足" + Number(msMoudle.maplejson["扭蛋费用"]));
                this.close();
            }
            // }

        }
        onBtnNoClick(e: Laya.Event): void {
            // this.isTure(0);
            this.close();
        }

        // isTure(your_daan:number) : void {
        //     if(your_daan == this.daan) {
        //         msMoudle.team_guanka_num++;
        //         msMoudle.taskShow2();
        //         this.close();

        //         if(msMoudle.team_guanka_num > 4) {
        //             msMoudle.Effect("quest.party.clear");
        //             Laya.timer.once(3000, this, ()=> {
        //                 msMoudle.team_guanka++;
        //                 msMoudle.gameP.gotoScene("000020000_gai.img");
        //             });
        //             this.close();
        //             return ;
        //         }
        //         else {
        //             ui.show(app.battle.questDlg, {params:[]});
        //         }
        //     }
        //     else {
        //         msMoudle.Effect("quest.party.wrong_kor");
        //         this.close();
        //         ui.show(app.battle.questDlg, {params:[]});
        //     }
        // }

        onClose() {
            let a = true;
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = true;
                    }
                }
            }
            ui.show(app.battle.moveDlg, {black:true});
        }

        // daan:number = 0;
        updateData(){

            // let ox = msMoudle.oxjson[msMoudle.getRandValue(1, 0, msMoudle.oxjson.length - 1)];
            // this.content.text = ox.queset;
            // this.daan = ox.result

        }

    }
}