/// <reference path="./../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../core/ms/Maple/Character.ts" />

module app.event {

    import cssMsg = MsgRole.Msg;
    import cssCharacter = CharacterRole.Character;

    export class payDlg extends ui.event.payDlgUI implements ui.event.IpayDlgUI {
        public static className = "app.event.payDlg";

        private m_msg:cssMsg;
        h:cssCharacter;
        protected onInitialize() {

            // msMoudle.popShow(this, (800 - 600) / 2, (600 - 400) / 2);
            this.x = (Laya.stage.width - 600) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 500) / 2 - (Laya.stage.height - 600) / 2;

            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = false;
                    }
                }
            }

            this.bg.graphics.drawRect(0, 0, 600, 400, "#FFFFFF");

            this.updateData();

            // if(msMoudle.daili)
            //     this.stip.text = "截图扫码可进行自助充值购买虚拟点卡";
        }

        // copyButton:any;
        // buttonClick:any;
        // private createBtn(): void {
        //     let layaContainer = Laya.Browser.getElementById("layaContainer");
        //     this.copyButton = Laya.Browser.createElement("button");//生成一个按钮
        //     this.copyButton.id = "btnCopy";
        //     this.copyButton.className = "btnCopy";//指定class属性
        //     this.copyButton.style.position = "absolute";
        //     this.copyButton.style["font-size"] = '28px';
        //     this.copyButton.style.color = '#ffffff';
        //     this.copyButton.style["opacity"] = '0';
        //     layaContainer.appendChild(this.copyButton);//把按钮添加到layacontainer中
        //     this.btnClickFun()

        //     this.fitDOM();//初始化的时候先将按钮和laya的按钮映射一把。
        //     // 每次舞台尺寸变更时，都会调用Utils.fitDOMElementInArea设置copy按钮位置
        //     Laya.stage.on(Laya.Event.RESIZE, this, this.fitDOM);
        // }

        // private fitDOM = function(){
        //     Laya.timer.once(100, null, ()=> {
        //         Laya.Utils.fitDOMElementInArea(this.copyButton, this.km, 0, 0, this.km.width, this.km.height);
        //     });
        // }

        // private btnClickFun(){
        //     //此处使用的clipboad.js内封装的方法，这里text的返回的就是需要复制的文本内容。
        //     this.buttonClick = new ClipboardJS('.btnCopy',{
        //         text: function(){
        //             console.log("Xxx")
        //             msMoudle.toast("链接已复制,将链接复制到微信里打开即可")
        //             return "https://www.580ka.com/UI6VtI2/Sindex.html";
        //         }
        //     });
        // }

        onClose():void {
            // if(msMoudle.daili) {
            //     Laya.stage.off(Laya.Event.RESIZE, this, this.fitDOM);
            //     if(this.copyButton) {
            //         this.copyButton.remove()
            //         this.copyButton = null;
            //     }
            //     if(this.buttonClick) {
            //         this.buttonClick.destroy();
            //     }
            // }
        }

        showReward:Array<any> = [];
        m_select:number = 0;
        updateData() {
            this.m_msg = new cssMsg();
            this.img2.visible = true;
            this.img1.visible = false;

            this.btnkefu.text = "充值不到账/福利请联系Q" + msMoudle.maplejson["充值QQ"];
            this.tip.text = "由于微信/支付宝/QQ可能会限额，若无法付款请联系Q" + msMoudle.maplejson["充值QQ"];

            this.onBtnzfbClick2(null);
            // this.onBtnwxClick2(null);

            this.btnkm.visible = false;

            // if(msMoudle.maplejson["充值QQ"] != 1044571564) {
                this.tip2.visible = true;
            // }

            ////需要进一步提醒，防止支付问题
            // if(ms.test_cz == 0) {
            //     this.tip2.visible = false;
            // }

            // if(msMoudle.maplejson["充值QQ"] != 1044571564) {
                this.btnPay1.visible = false;
                this.btnPay2.visible = false;

            //     this.onBtnPay1Click(null);
            // }
            // else {
            //     if(msMoudle.maplejson["卡密服"] == 1) {
            //         this.btnPay1.visible = false;
            //         this.btnPay2.visible = false;


            //     }
            //     else {
                    this.onBtnPay1Click(null);
                // }
            // }

            // if(msMoudle.daili) {
            //     this.tip.text = "若无法付款/充值不到账请联系Q" + msMoudle.maplejson["充值QQ"];
            // }

            // msMoudle.toast("xxx" + msMoudle.maplejson["活动倍数"])

        }

        onBtnPay1Click(e: Laya.Event): void {
            msMoudle.daili = false;

            this.btnPay1.gray = false;
            this.btnPay2.gray = true;

            this.km2.visible = false;
            this.km.visible = false;
            this.img2.visible = true;
            this.zfb.visible = true;
            this.qq.visible = true;
            this.wx.visible = true;
            this.img1.visible = false;
        }
        onBtnPay2Click(e: Laya.Event): void {

            msMoudle.daili = true;
            if(msMoudle.qudao == false)
                this.km.skin = "km.jpg";
            else
                this.km.skin = "km2.jpg";

            this.btnPay1.gray = true;
            this.btnPay2.gray = false;

            this.onBtnkmClick2(null);
        }

        // m = [5, 10, 30, 50, 100, 200, 300, 500];
        onBtn1Click(e: Laya.Event): void {
            this.___();

            if(msMoudle.maplejson["充值QQ"] == 1044571564 && msMoudle.maplejson["卡密服"] == 1) {
                this.onBtnPay2Click(null);
                return ;
            }

            this.PaytoNet(5);
        }
        onBtn2Click(e: Laya.Event): void {
            this.___();

            if(msMoudle.maplejson["充值QQ"] == 1044571564 && msMoudle.maplejson["卡密服"] == 1) {
                this.onBtnPay2Click(null);
                return ;
            }
            this.PaytoNet(10);
        }
        onBtn3Click(e: Laya.Event): void {
            this.___();

            if(msMoudle.maplejson["充值QQ"] == 1044571564 && msMoudle.maplejson["卡密服"] == 1) {
                this.onBtnPay2Click(null);
                return ;
            }
            this.PaytoNet(30);
        }
        onBtn4Click(e: Laya.Event): void {
            this.___();

            if(msMoudle.maplejson["充值QQ"] == 1044571564 && msMoudle.maplejson["卡密服"] == 1) {
                this.onBtnPay2Click(null);
                return ;
            }
            this.PaytoNet(50);
        }
        onBtn5Click(e: Laya.Event): void {
            this.___();

            if(msMoudle.maplejson["充值QQ"] == 1044571564 && msMoudle.maplejson["卡密服"] == 1) {
                this.onBtnPay2Click(null);
                return ;
            }
            this.PaytoNet(100);
        }
        onBtn6Click(e: Laya.Event): void {
            this.___();

            if(msMoudle.maplejson["充值QQ"] == 1044571564 && msMoudle.maplejson["卡密服"] == 1) {
                this.onBtnPay2Click(null);
                return ;
            }
            this.PaytoNet(200);
        }
        onBtn7Click(e: Laya.Event): void {
            this.___();

            if(msMoudle.maplejson["充值QQ"] == 1044571564 && msMoudle.maplejson["卡密服"] == 1) {
                this.onBtnPay2Click(null);
                return ;
            }
            this.PaytoNet(300);
        }
        onBtn8Click(e: Laya.Event): void {
            this.___();

            if(msMoudle.maplejson["充值QQ"] == 1044571564 && msMoudle.maplejson["卡密服"] == 1) {
                this.onBtnPay2Click(null);
                return ;
            }
            this.PaytoNet(500);
        }

        ___() : void {
            this.img1.visible = true;
            this.img2.visible = false;
        }

        onBtnzfbClick2(e: Laya.Event): void {
            // if(true) {
            //     msMoudle.toast("支付宝支付临时维护,请使用其他支付方式")
            //     return ;
            // }
            this.m_select = 0;
            this.zfb.visible = true;
            this.wx.visible = false;
            this.qq.visible = false;
            this.km2.visible = false;
            this.km.visible = false;
            this.sel_zfb.visible = true;
            this.sel_wx.visible = false;
            this.sel_qq.visible = false;

            this.zfb.skin = msMoudle.maplejson["ZFB"];

            // if(msMoudle.maplejson["pay"] == "1")
            //     this.payMob();
        }
        onBtnwxClick2(e: Laya.Event): void {
            // if(true) {
            //     msMoudle.toast("微信支付临时维护,请使用其他支付方式")
            //     return ;
            // }
            this.m_select = 1;
            this.zfb.visible = false;
            this.wx.visible = true;
            this.qq.visible = false;
            this.km2.visible = false;
            this.km.visible = false;
            this.sel_zfb.visible = false;
            this.sel_wx.visible = true;
            this.sel_qq.visible = false;

            this.wx.skin = msMoudle.maplejson["WX"];

            // if(msMoudle.maplejson["pay"] == "1")
            //     this.payMob();
        }
        onBtnqqClick2(e: Laya.Event): void {
            this.m_select = 2;
            this.zfb.visible = false;
            this.wx.visible = false;
            this.qq.visible = true;
            this.km2.visible = false;
            this.km.visible = false;
            this.sel_zfb.visible = false;
            this.sel_wx.visible = false;
            this.sel_qq.visible = true;

            this.qq.skin = msMoudle.maplejson["QQ"];

            // if(msMoudle.maplejson["pay"] == "1")
            //     this.payMob();
        }

        payMob() : void {

        }

        onBtnkmClick2(e: Laya.Event): void {
            this.zfb.visible = false;
            this.wx.visible = false;
            this.qq.visible = false;
            this.km2.visible = true;
            this.km.visible = true;
            this.___();


            //仅支持电脑浏览器和手机浏览器，不支持手机APP
            // this.createBtn();
        }

        stopcc:boolean = true;
        onBtnOKClick2(e: Laya.Event): void {
            if(this.stopcc) {
                ///防止cc攻击
                this.stopcc = false;
                Laya.timer.once(5000, this, ()=> {
                    this.stopcc = true;
                });
                //数据校验
                if(this.ka1.text == "") {
                    msMoudle.toast("卡号不能为空");
                }
                else {
                    //检查账号密码是否不符合规则
                    let ka1:string = this.ka1.text;
                    let ka2:string = this.ka2.text;
                    if(ka1.indexOf(",") >= 0 || ka1.indexOf("，") >= 0 ||
                    ka1.indexOf("[") >= 0 || ka1.indexOf("【") >= 0 ||
                    ka1.indexOf("]") >= 0 || ka1.indexOf("】") >= 0 ||
                    ka1.indexOf("{") >= 0 || ka1.indexOf("}") >= 0 ||
                    ka1.indexOf(" ") >= 0 || ka1.indexOf(" ") >= 0 ||
                    ka1.indexOf("。") >= 0 || ka1.indexOf(".") >= 0 ||
                    ka1.indexOf("；") >= 0 || ka1.indexOf(";") >= 0 || ka1.indexOf("：") >= 0 ||
                    ka1.indexOf("‘") >= 0 ||
                    ka1.indexOf("、") >= 0) {
                        msMoudle.toast("卡号含有非法字符");
                        return ;
                    }
                    if(this.verifyName(ka1)) {// && this.verifyName(ka2)
                        //将账号密码发送至服务器
                        this.onReward(ka1, "123456");
                    }
                    else {
                        msMoudle.toast("卡号不合法,必须包含字母和数字");
                    }
                }
            }
        }

        onReward(kahao:string, mima:string = "123456") : void {
            let message = new Net.Message();
            message.xieyi = 113 + ms._dpip;
            message.msdata = new Object();
            message.msdata.user = ms._user; //用户
            message.msdata.kahao = kahao;   //卡号
            message.msdata.mima = "123456";     //密码
            // message.msdata.daili = msMoudle.banben; //代理商
            msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
                // console.log(data);
                if(data["msdata"] && data["xieyi"] == 113 + ms._dpip) {
                    if(data["msdata"]._km.length > 0) {
                        let ___ = JSON.parse(data["msdata"]._km);
                        // console.log("1111", ___);
                        if(___.pay) {
                            if(___.pay.length > 0) {
                                if(___.pay == "km_succ") {
                                    if(___.id == ms._user) {
                                        let isFirst:boolean = false;
                                        if(ms.test_cz == 0) isFirst = true;
                                        if(Number(___.num) > ms.czValue)
                                            ms.czValue = Number(___.num);
                                        if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                                            msMoudle.mainT.cz_sp.getChildByName("礼包").visible = true;
                                        }
                                        msMoudle.toast2("成功充值了" + ___.num + "元");
                                        let m = Number(___.num);

                                        //活动倍数
                                        let beishu = 1;
                                        if(msMoudle.qudao == false) {
                                            beishu = msMoudle.maplejson["活动倍数"];
                                        }

                                        if(m == 5) {
                                            msMoudle._(); msMoudle.updateRongYu(525);
                                            if(isFirst) {
                                                msMoudle._(); msMoudle.updateRongYu(525);
                                            }
                                            if(beishu > 1) {
                                                msMoudle._(); msMoudle.updateRongYu(525 * (beishu - 1) );
                                            }
                                        }
                                        else if(m == 10) {
                                            msMoudle._(); msMoudle.updateZuanShi(105, 101);
                                            if(isFirst) {
                                                msMoudle._(); msMoudle.updateZuanShi(105, 101);
                                            }
                                            if(beishu > 1) {
                                                msMoudle._(); msMoudle.updateZuanShi(105 * (beishu - 1), 101);
                                            }
                                        }
                                        else if(m == 30) {
                                            msMoudle._(); msMoudle.updateZuanShi(320, 101);
                                            if(isFirst) {
                                                msMoudle._();
                                                msMoudle.updateZuanShi(320, 101);
                                            }
                                            if(beishu > 1) {
                                                msMoudle._(); msMoudle.updateZuanShi(320 * (beishu - 1), 101);
                                            }
                                        }
                                        else if(m == 50) {
                                            msMoudle._(); msMoudle.updateZuanShi(550, 101);
                                            if(isFirst) {
                                                msMoudle._(); msMoudle.updateZuanShi(550, 101);
                                            }
                                            if(beishu > 1) {
                                                msMoudle._(); msMoudle.updateZuanShi(550 * (beishu - 1), 101);
                                            }
                                        }
                                        else if(m == 100) {
                                            msMoudle._(); msMoudle.updateZuanShi(1150, 101);
                                            if(isFirst) {
                                                msMoudle._(); msMoudle.updateZuanShi(1150, 101);
                                            }
                                            if(beishu > 1) {
                                                msMoudle._(); msMoudle.updateZuanShi(1150 * (beishu - 1), 101);
                                            }
                                        }
                                        else if(m == 200) {
                                            msMoudle._(); msMoudle.updateZuanShi(2400, 101);
                                            if(isFirst) {
                                                msMoudle._(); msMoudle.updateZuanShi(2400, 101);
                                            }
                                            if(beishu > 1) {
                                                msMoudle._(); msMoudle.updateZuanShi(2400 * (beishu - 1), 101);
                                            }
                                        }
                                        else if(m == 300) {
                                            msMoudle._(); msMoudle.updateZuanShi(3600, 101);
                                            if(isFirst) {
                                                msMoudle._(); msMoudle.updateZuanShi(3600, 101);
                                            }
                                            if(beishu > 1) {
                                                msMoudle._(); msMoudle.updateZuanShi(3600 * (beishu - 1), 101);
                                            }
                                        }
                                        else if(m == 500) {
                                            msMoudle._(); msMoudle.updateZuanShi(6000, 101);
                                            if(isFirst) {
                                                msMoudle._(); msMoudle.updateZuanShi(6000, 101);
                                            }
                                            if(beishu > 1) {
                                                msMoudle._(); msMoudle.updateZuanShi(6000 * (beishu - 1), 101);
                                            }
                                        }

                                        if(m >= 1) {
                                            ms.test_cz += Number(m);
                                            ms.czly.push(Number(m));
                                            ms.acz += Number(m);

                                            if(isFirst) {
                                                ms.test_cz += Number(m);
                                                ms.czly.push(Number(m));
                                                ms.acz += Number(m);
                                            }
                                            if(beishu > 1) {
                                                for(let i:number = 0; i < beishu - 1; i++) {
                                                    ms.test_cz += Number(m);
                                                    ms.czly.push(Number(m));
                                                    ms.acz += Number(m);
                                                }
                                            }

                                            if(isFirst) {
                                                msMoudle._(); msMoudle.updateJinBi(9999);
                                                msMoudle._(); msMoudle.updateRongYu(100);
                                                msMoudle._(); msMoudle.getWeapon("01302032");
                                                msMoudle._(); msMoudle.getItem("2043012");
                                                msMoudle._(); msMoudle.buyOneHero(1);
                                            }

                                            //如果充值金额大于500送高级认证
                                            if(ms.test_cz >= 500 && ms.m_tg != 3) {
                                                ms.m_tg = 3;
                                                ms.test_cz += 100;
                                                ms.czly.push(100);
                                                ms.acz += 100;
                                                msMoudle._(); msMoudle.updateRongYu(10000);
                                                msMoudle._(); msMoudle.updateZuanShi(1000, 103);
                                                msMoudle._(); msMoudle.getWeapon("01002140");
                                                for(let i:number = 0; i < 6; i++) {
                                                    msMoudle._(); msMoudle.getItem("2040599")
                                                }
                                            }



                                            // //如果充值金额大于1000送神器1
                                            // if(ms.test_cz >= 1000) {
                                            //     msMoudle._(); msMoudle.getWeapon("01382235")   //阿丽莎
                                            //     if(ms.shops[0]< 100) {
                                            //         ms.shops[0]+=100;
                                            //         ms.zsly[1]+=25*100;
                                            //         ms.zsxh[0]-=25*100;
                                            //     }
                                            // }
                                            // //如果充值金额大于1500送神器2
                                            // else if(ms.test_cz >= 1500) {
                                            //     msMoudle._(); msMoudle.getWeapon("01005140")   //999
                                            //     if(ms.shops[0]< 100) {
                                            //         ms.shops[0]+=100;
                                            //         ms.zsly[1]+=25*100;
                                            //         ms.zsxh[0]-=25*100;
                                            //     }
                                            // }
                                            // //如果充值金额大于2000送神器3
                                            // else if(ms.test_cz >= 2000) {
                                            //     msMoudle._(); msMoudle.getWeapon("01402180")   //真01402180
                                            //     if(ms.shops[0]< 100) {
                                            //         ms.shops[0]+=100;
                                            //         ms.zsly[1]+=25*100;
                                            //         ms.zsxh[0]-=25*100;
                                            //     }
                                            // }

                                        }
                                        ///告诉支付程序我成功拿到了奖励
                                        msMoudle.mapP.payAvatarMegaphone(m);
                                        ///告诉后台成功了
                                        // let message = new Net.Message();
                                        // message.xieyi = 112 + ms._dpip;
                                        // message.msdata = { "user": msg[1], "state":msg[0], "num" : msg[2]};
                                        // msMoudle.wsocket.requestApi(message).done(data => {
                                        //     if(data["code"] == 0) {}
                                        // });

                                        //这里不要连着发
                                        // Laya.timer.once(500, this, ()=> {
                                            ms.saveServer(true);
                                        // });
                                    }
                                }
                                else if(___.pay == "km_fail") {
                                    msMoudle.toast("卡号错误或已被使用");
                                }
                            }
                        }
                    }
                }
            }});
        }

        verifyName(obj:any)  {
            if(obj.length == 0) return false;
            var tmp = obj;
            let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
            if(reg.test(tmp)) return false;

            //数字&&字母
            // var pattern = /^([a-zA-Z0-9_-])+/;
            var pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/;
            let flag = pattern.test(tmp);

            if(!flag) return false;
            pattern =/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
            flag = pattern.test(tmp);
            if(flag) return false;
            return true;
        }

        onBtnkefuClick(e: Laya.Event): void {
            // msMoudle.toast2("充值问题请联系客服QQ:" + msMoudle.maplejson["充值QQ"] + "");
        }
        onBtnsjpayClick2(e: Laya.Event): void {
            msMoudle.toast2("将二维码截图后使用微信/支付宝付款即可(或者直接找客服" + msMoudle.maplejson["充值QQ"] + ")");
        }

        onBtnBackClick(e: Laya.Event): void {
            // msMoudle.popClose(this, 300, 200);
            this.close();
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = true;
                    }
                }
            }
        }

        PaytoNet(num:number) : void {
            let date = new Date();
            let time = utils.formatSeconds2(date.getTime()/1000);
            console.log(time)
            let message = new Net.Message();
            message.xieyi = 104 + ms._dpip;
            message.msdata = { "user": ms._user, "password":"123456", "num":num, "time":time, "select":this.m_select};
            msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
                if(data["code"] == 0) {
                    console.log("掉了比");
                }
            }});
        }

    }

}
