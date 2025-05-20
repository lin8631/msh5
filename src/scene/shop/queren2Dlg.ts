/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.shop {
    import cssMsg = MsgRole.Msg;

    export class queren2Dlg extends ui.shop.queren2DlgUI implements ui.shop.Iqueren2DlgUI {
        public static className = "app.shop.queren2Dlg";
        private m_index:number = 0;
        private m_msg:cssMsg;
        private m_data:any;
        private m_num:number = 1;
        constructor(params:any, index:number){
            super();
            this.m_data = params;
            this.m_index = index;
        }

        onInitialize(){
            // msMoudle.popShow(this, (800 - 720) / 2, (600 - 480) / 2);
            this.x = (800 - 400) / 2;
            this.y = (600 - 280) / 2;
            this.m_msg = new cssMsg();

            this.updateData();
        }

        updateData(){
            if(this.m_data && this.m_index >= 0) {
                if(this.m_data.pricetype == 1) this._show.text = "消耗" + this.m_data.price * this.m_num + "金币购买？";
                else if(this.m_data.pricetype == 2) this._show.text = "消耗" + this.m_data.price * this.m_num + "枫叶购买？";
                else if(this.m_data.pricetype == 3) this._show.text = "消耗" + this.m_data.price * this.m_num + "黑金购买？";
                // this._num.text = "数量：" + this.m_num;
            }

        }

         onBtn_querenClick(e: Laya.Event): void {

            if(this.m_data.pricetype == 1) {
                if(ms.jinbi() < this.m_data.price * this.m_num) {
                    msMoudle.toast("金币不足");
                    this.close();
                    return ;
                }
            }
            else if(this.m_data.pricetype == 2) {
                if(ms.rongyu() < this.m_data.price * this.m_num) {
                    msMoudle.toast("枫叶不足");
                    this.close();
                    return ;
                }
            }
            else if(this.m_data.pricetype == 3) {
                if(ms.zuanshi() < this.m_data.price * this.m_num) {
                    msMoudle.toast("黑金不足");
                    this.close();
                    return ;
                }
            }

            msMoudle.buyShop(this.m_data, this.m_num);
            this.close();
         }

        onBtn_closeClick(e: Laya.Event): void {
            this.close();
        }

        onBtnRmvClick(e: Laya.Event): void {
            if(this.m_num > 1) {
                this.m_num--;
                this.updateData();
            }
        }
        onBtnAddClick(e: Laya.Event): void {
            this.m_num++;
            this.updateData();
        }

        onClose() {

        }
        //
    }
}