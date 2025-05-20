module app.login {

    export class loginDlg extends ui.login.loginDlgUI implements ui.login.IloginDlgUI {
        public static className = "app.login.loginDlg";
        private version = 127;

        onInitialize(){

            this.updateData();
        }

        onClose() {
            if(this.banhao) {
                this.banhao.removeSelf();
                this.banhao = null;
            }
        }

        img1:any;
        img2:any;
        updateData(){
            this.img2.width = Laya.stage.width;
            this.img2.height = Laya.stage.height;

            this.banhao.text = "版本号：0.1.0.5" + '(' + msMoudle.banben + ')';;
            Laya.stage.addChild(this.banhao);
            this.banhao.pos(10, 5);

            let __ = laya.net.LocalStorage.getJSON("youke");

            if(__) {
                ms._user = __;
                this._zh.text = ms._user;
            }
            else {
                let a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's',
                't', 'w', 'z', 'y', 'x'];
                let b = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's',
                't', 'w', 'z', 'y', 'x'];
                __ = a[msMoudle.getRandValue(0, 0, a.length)] + b[msMoudle.getRandValue(0, 0, b.length)] + msMoudle.getRandValue(0, 0, 99999);
                ms._user = __;
                this._zh.text = ms._user;
            }

            this.fu.x = 5;

            this.server_sp.on(Laya.Event.CLICK, this, ()=> {
                ui.show(app.login.ServerListDlg, {black:true}).done(dlg => {
                    this.banhao.visible = false;
                    dlg.on(Laya.Event.CLOSE, this, ()=> {
                        this.banhao.visible = true;
                    });
                });
            });

            ui.show(app.event.sysDlg, {black:true});

        }

        m_size:number = 1;
        private _frameLoop() : void {
            if(this.c_sp) {
                if(this.m_size < 20) {
                    this.c_sp.visible = true;
                    this.img2.visible = true;
                    this.m_size += 0.05;
                    this.c_sp.scale(this.m_size, this.m_size)
                    this.img2.mask = this.c_sp;
                }
            }
        }

        private _frameLoop2() : void {
            if(this.c_sp) {
                if(this.m_size > 0) {
                    this.m_size -= 0.1;
                    this.c_sp.scale(this.m_size, this.m_size)
                    this.img2.mask = this.c_sp;
                }
                else {
                    this.c_sp.visible = false;
                    this.img2.visible = false;
                }
            }
        }

        c_sp:Laya.Image;
        private onD () : void {
            if(this.c_sp) {
                this.c_sp.pos(Laya.stage.mouseX, Laya.stage.mouseY);
                this.img2.mask = this.c_sp;
                this.img2.zOrder = 9999;

                this.m_size = 1;
                Laya.timer.clear(this, this._frameLoop2);
                Laya.timer.frameLoop(1, this, this._frameLoop);
            }
        }

        private onM () : void {
        }
        private onU () : void {
            Laya.timer.clear(this, this._frameLoop);
            Laya.timer.frameLoop(1, this, this._frameLoop2);
        }
        private onO () : void {
            this.onU();
        }

        private gotoCreateChar() : void {
            ms.getMSData();
            console.log("####")
            Laya.timer.clear(this, this._frameLoop);
            Laya.timer.clear(this, this._frameLoop2);
            if(this.img1) {
                this.img1.removeSelf();
                this.img1 = null;
            }
            if(this.img2) {
                this.img2.removeSelf();
                this.img2 = null;
            }
            if(this.c_sp) {
                this.c_sp.removeSelf();
                this.c_sp = null;
            }

            this.close();
        }

        onBtnipClick(e: Laya.Event): void {
            ui.show(app.login.keyDlg, {black:true});
        }

        private initNet() {
            msMoudle.wsocket = new Net.SocketManage();
            msMoudle.wsocket.Connet(this);
        }

        public ConnetedOK() : void {
            let url = app.utils.getSiteURL();
            let porurl = msMoudle.maplejson["服务器"].split(":")[0];

            Laya.loader.maxLoader= 8;
            this.starGame();
        }

        public updataServer() : void {
        }

        starGame() : void {
            msMoudle.gameP = this;
            if(this._zh.text != "") {
                ms._user = this._zh.text;
                if(this.verifyName(ms._user)) {
                    if(ms._user != "log" && ms._user != "pay" && ms._user != "ziyou") {
                        let P = this;
                        Laya.timer.once(250, this, ()=> {
                            this.gotoCreateChar();
                            laya.net.LocalStorage.setJSON("youke", ms._user);
                        });
                    }
                    else {
                        msMoudle.toast2("该名字不可用");
                    }
                }
                else {
                    msMoudle.toast2("账号不合法,必须包含字母和数字");
                }
            }
            else {
                msMoudle.toast2("请输入账号");
            }
        }

        stopcc:boolean = true;
        onBtnStartClick(e: Laya.Event): void {
            if(this.stopcc) {
                ///防止cc攻击
                this.stopcc = false;
                Laya.timer.once(1000, this, ()=> {
                    this.stopcc = true;
                });

                this.initNet();
                this.btnStart.visible = false;
            }
            else {
                msMoudle.toast("点击太快了");
            }
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

         onBtnYouKeClick(e: Laya.Event): void {
            this.close();
            ui.show(app.common.LoaderDlg);
         }
    }
}