/// <reference path="./../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../core/ms/Maple/Character.ts" />

module app.event {

    import cssMsg = MsgRole.Msg;
    import cssCharacter = CharacterRole.Character;

    export class FirstRechargeDlg extends ui.event.FirstRechargeDlgUI implements ui.event.IFirstRechargeDlgUI {
        public static className = "app.event.FirstRechargeDlg";

        private m_msg:cssMsg;
        h:cssCharacter;
        protected onInitialize() {

            // msMoudle.popShow(this, 0, 0);
            this.x = (Laya.stage.width - 800) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 600) / 2 - (Laya.stage.height - 600) / 2;

            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = false;
                    }
                }
            }

            this.updateData();
        }

        onClose():void {
            if(this.h) {
                this.h.clearUp();
                this.h = null;
            }
        }

        showReward:Array<any> = [];
        updateData() {
            this.m_msg = new cssMsg();

            this.h = new cssCharacter();
            let E:any = {};
            E.fweapon = msMoudle.herojson[1].fweapon;
            E.cap = msMoudle.herojson[1].cap;
            E.longcoat = msMoudle.herojson[1].longcoat;
            E.weapon = msMoudle.herojson[1].weapon;
            this.h.m_name = msMoudle.herojson[1].name;
            this.h.changeAll(this.hero, E, 0, 0);


            let rws:Array<any> = [this.rw1, this.rw2, this.rw3, this.rw4]
            for(let i:number = 0; i < 4; i++) {
                let tIndex:number = this.showReward.length;
                this.showReward[tIndex] = new Object();
                if(i == 0) {
                    this.showReward[tIndex].pinzhi = 4;
                    this.showReward[tIndex].num = 9999;
                    this.showReward[tIndex].type = 0;
                    this.showReward[tIndex].itemid = "9000000";
                    this.showReward[tIndex].name = "金币";
                    this.showReward[tIndex].img = "homeland/02022995.info.icon.png";
                }
                else if(i == 1) {
                    this.showReward[tIndex].pinzhi = 4;
                    this.showReward[tIndex].num = 100;
                    this.showReward[tIndex].type = 0;
                    this.showReward[tIndex].itemid = "1234561";
                    this.showReward[tIndex].name = "枫叶";
                    this.showReward[tIndex].img = "homeland/02028044.info.icon.png";
                }
                else if(i == 2) {
                    let _reward = msMoudle.getItemMsg(Number(2043012));
                    this.showReward[tIndex].pinzhi = 5;
                    this.showReward[tIndex].num = 1;
                    this.showReward[tIndex].type = 0;
                    this.showReward[tIndex].itemid = _reward.id;
                    this.showReward[tIndex].name = _reward.name;
                    this.showReward[tIndex].img = _reward.img;
                }
                else if(i == 3) {
                    let _reward = msMoudle.getEqpMsg("01302032");
                    this.showReward[tIndex].pinzhi = 5;
                    this.showReward[tIndex].num = 1;
                    this.showReward[tIndex].type = 1;
                    this.showReward[tIndex].itemid = _reward.id;
                    this.showReward[tIndex].name = _reward.name;
                    this.showReward[tIndex].img = _reward.img;
                }
                rws[i].updateData(this.showReward[tIndex], i);
            }

        }

        onRw1Click2(e: Laya.Event): void {
            let tIndex:number = 0;
            if(this.showReward[tIndex].type == 0) this.m_msg.itemShow(Number(this.showReward[tIndex].itemid));
            else if(this.showReward[tIndex].type == 1) this.m_msg.equipLoadShow(this.showReward[tIndex].itemid);
        }
        onRw2Click2(e: Laya.Event): void {
            let tIndex:number = 1;
            if(this.showReward[tIndex].type == 0) this.m_msg.itemShow(Number(this.showReward[tIndex].itemid));
            else if(this.showReward[tIndex].type == 1) this.m_msg.equipLoadShow(this.showReward[tIndex].itemid);
        }
        onRw3Click2(e: Laya.Event): void {
            let tIndex:number = 2;
            if(this.showReward[tIndex].type == 0) this.m_msg.itemShow(Number(this.showReward[tIndex].itemid));
            else if(this.showReward[tIndex].type == 1) this.m_msg.equipLoadShow(this.showReward[tIndex].itemid);
        }
        onRw4Click2(e: Laya.Event): void {
            let tIndex:number = 3;
            if(this.showReward[tIndex].type == 0) this.m_msg.itemShow(Number(this.showReward[tIndex].itemid));
            else if(this.showReward[tIndex].type == 1) this.m_msg.equipLoadShow(this.showReward[tIndex].itemid);
        }

        onBtnPayClick(e: Laya.Event): void {
            ui.show(app.event.payDlg, {black:true});
            this.close();
        }

        onBtnBackClick(e: Laya.Event): void {
            // msMoudle.popClose(this, 400, 300);
            this.close();
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = true;
                    }
                }
            }
        }

    }

}
