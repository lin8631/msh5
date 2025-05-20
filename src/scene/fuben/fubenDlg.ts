/// <reference path="./../../core/ms/Maple/Mob.ts" />
/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.fuben {
    import cssMob = MobRole.Mob;
    import cssMsg = MsgRole.Msg;

    export class fubenDlg extends ui.fuben.fubenDlgUI implements ui.fuben.IfubenDlgUI {
        public static className = "app.fuben.fubenDlg";
        private m_mob:cssMob;
        // private m_mob:Laya.Image;
        private m_msg:cssMsg;
        private m_scale:number = 1;
        private tArr:Array<any> = [];

        onInitialize(){
            this.m_msg = new cssMsg();
            this.updateData();

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
        }

        _title:Array<any> = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
        updateData() : void {
            this.lstFuBen.vScrollBarSkin = "";

            for(let i:number = 0; i < 10; i++) {
                this.tArr[i] = new Object();
                this.tArr[i].title = this._title[i];
                this.tArr[i].ok = false;
                this.tArr[i].sel = false;
            }
            if(ms.fuben >= 10) ms.fuben = 10;

            ms.cur_fuben = ms.fuben;
            this.tArr[ms.cur_fuben - 1].sel = true;

            for(let i:number = 0; i < ms.fuben; i++) this.tArr[i].ok = true;

            this.lstFuBen.dataSource = this.tArr;

            this.m_mob = new cssMob();
            // this.m_mob.anchorX = 0.5;
            // this.m_mob.anchorY = 1;
            // this._body.addChild(this.m_mob);
            // this.m_mob.skin = "res/Mob/7130401.img/stand.0.png";
            this.m_mob.force_scale = this.m_scale;
            let lifeMsg:any = new Object();
            lifeMsg.id = 7130401;
            lifeMsg.x = 0;
            lifeMsg.y =  0;
            this.m_mob.changeAll(this._body, "7130401" + ".img", lifeMsg);

            this.lstFuBen.scrollBar.value = ms.cur_fuben >= 4 ? ((ms.cur_fuben - 3) * 56) : 0;
        }

        onLstFuBenCellClick(e: Laya.Event, index: number): void {
            ms.cur_fuben = (index + 1);
            if(ms.cur_fuben > ms.fuben){
                msMoudle.toast2("该关卡还没有开启");
                return ;
            }
            else {
                for(let i:number = 0; i < 10; i++) this.tArr[i].sel = false;
                this.tArr[index].sel = true;
                this.lstFuBen.dataSource = this.tArr;
            }
        }

        onItem1Click(e: Laya.Event): void {
            this.m_msg.itemShow(800000000);
        }
        onItem2Click(e: Laya.Event): void {
            this.m_msg.itemShow(800000003);
        }
        onItem3Click(e: Laya.Event): void {
            this.m_msg.itemShow(800000004);
        }
        onItem4Click(e: Laya.Event): void {
            this.m_msg.itemShow(800000005);
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

        onBtnOKClick(e: Laya.Event): void {

                msMoudle.MapInit();

                msMoudle.isFuben = true;
                msMoudle.team_guanka = 1;
                ui.show(app.battle.addTeamDlg, {params:[this, true], black:true});

        }

        onClose() {
            if(this.m_mob) {
                this.m_mob.clearUp();
                // this.m_mob.removeSelf();
                this.m_mob = null;
            }
        }

        //
    }
}