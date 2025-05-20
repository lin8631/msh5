/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.fuben {
    import cssMsg = MsgRole.Msg;

    export class msgDlg extends ui.fuben.msgDlgUI implements ui.fuben.ImsgDlgUI {
        public static className = "app.fuben.msgDlg";

        m_params:string;
        m_center:boolean = true;
        constructor(params:any, index:number, center:boolean = true){
            super();
            this.m_params = params;
            this.m_center = center;
        }

        flag:boolean = false;
        onInitialize(){
            this.x = (Laya.stage.width - 380) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 240) / 2 - (Laya.stage.height - 600) / 2;

            this.updateData();
        }

        updateData(){
            this._txt.text = this.m_params;
            if(!this.m_center) this._txt.align = "left";
            if(this._txt.text == "环境不正常/当前处于VPN环境，请下线！"|| this._txt.text == "该帐号涉嫌挂机,请联系管理" ||
            this._txt.text == "帐号未认证，请加联系QQ2717069196完成认证并领取500枫叶" || this._txt.text == "充值不到账/福利请联系Q1044571564或Q2717069196" || this._txt.text == "该帐号涉嫌加速,请联系管理" || this._txt.text == "体验时间不足,请联系Q1044571564永久激活" || this._txt.text == "连接断开，重连中") {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = false;
                    }
                }
            }

            if(this._txt.text == "该账号已在其他设备登陆" || this._txt.text == "服务器失去了连接" || this._txt.text == "环境异常" || this._txt.text.indexOf("数据异常") >= 0) {
                Laya.timer.scale = 0;
            }
        }


        onBtnBackClick(e: Laya.Event): void {
            if(this._txt.text.indexOf("发现开挂") >= 0) return ;
            if(this._txt.text == "该帐号涉嫌挂机,请联系管理" || this._txt.text == "帐号未认证，请加联系QQ2717069196完成认证并领取500枫叶" || this._txt.text == "充值不到账/福利请联系Q1044571564或Q2717069196" || this._txt.text == "该帐号涉嫌加速,请联系管理" || this._txt.text == "体验时间不足,请联系Q1044571564永久激活") {
                //
                if(this._txt.text == "帐号未认证，请加联系QQ2717069196完成认证并领取500枫叶" ||
                this._txt.text == "充值不到账/福利请联系Q1044571564或Q2717069196") {
                    if(msMoudle.mainT) {
                        if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                            msMoudle.mainT.cz_sp.visible = true;
                        }
                    }
                }
                else {
                    if(ms.error == 0) ms.saveServer();
                }
            }
            if(this._txt.text == "环境不正常/当前处于VPN环境，请下线！" || this._txt.text == "该帐号涉嫌挂机,请联系管理" || this._txt.text == "该帐号涉嫌加速,请联系管理" || this._txt.text == "体验时间不足,请联系Q1044571564永久激活")

            return ;

            if(this._txt.text == "该账号已在其他设备登陆" || this._txt.text == "服务器失去了连接" || this._txt.text == "环境异常") {
                return ;
            }
            if(this._txt.text.indexOf("数据异常") >= 0) {
                ms.saveServer();
                return ;
            }

            if("连接断开，重连中" == this._txt.text) {
                if(msMoudle.wsocket && msMoudle.wsocket.myState != 1) return;
            }

            this.close();

            if(this._txt.text == "连接断开，重连中") {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = true;
                    }
                }
            }
        }

        onClose() {

        }
        //
    }
}