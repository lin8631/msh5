/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.qiandao {

    import cssMsg = MsgRole.Msg;
    export class qiandaoDlg extends ui.qiandao.qiandaoDlgUI implements ui.qiandao.IqiandaoDlgUI {
        public static className = "app.qiandao.qiandaoDlg";
        private m_msg:cssMsg;
        private tArr:Array<any> = [];

        onInitialize(){
            this.updateData();
            msMoudle.popShow(this, (800 - 720) / 2, (600 - 480) / 2);

            //时间接口
            // console.log(utils.formatSeconds2(new Date().getTime() / 1000));
        }

        updateData() : void {
            this.lstQianDao.vScrollBarSkin = "";

            this.m_msg = new cssMsg();

            for(let i:number = 0; i < msMoudle.qiandaojson.length; i++) {
                this.tArr[i] = new Object();
                this.tArr[i].json = msMoudle.qiandaojson[i];
                this.tArr[i].select = false;
                if(i < ms.qiandao - 1) this.tArr[i].lingqu = true;
                else this.tArr[i].lingqu = false;
            }
            this.tArr[ms.qiandao - 1].select = (ms.is_qiandao == false) ? true : false;
            this.tArr[ms.qiandao - 1].lingqu = ms.is_qiandao;
            this.lstQianDao.dataSource = this.tArr;
        }

        onLstQianDaoCellChildClick(e: Laya.Event, index: number, childVarName: string): void {
            if(childVarName == "btnReward") {

                let showReward:Array<any> = [];




                showReward[0] = new Object();
                showReward[0].itemid = this.tArr[index]["json"].id;
                showReward[0].name = this.tArr[index]["json"]._;
                showReward[0].img = this.tArr[index]["json"].icon;
                showReward[0].pinzhi = 1;




                ui.show(app.battle.rewardDlg, {params:[showReward]});

                ms.is_qiandao = true;

                this.tArr[index].lingqu = true;
                this.tArr[index].select = false;
                this.lstQianDao.dataSource = this.tArr;
            }
            else {
                this.m_msg.itemShow(this.tArr[index]["json"].id);
            }
        }

        onBtnBackClick(e: Laya.Event): void {
            msMoudle.popClose(this, 360, 240);
        }

        onClose() {

        }

        //
    }
}