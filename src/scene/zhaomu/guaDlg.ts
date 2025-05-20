module app.zhaomu {

    export class guaDlg extends ui.zhaomu.guaDlgUI implements ui.zhaomu.IguaDlgUI  {

        public static className = "app.zhaomu.guaDlg";

        onInitialize(){
            // Laya.timer.scale = 3;
            this.visible = false;
            Laya.timer.once(1000, this, ()=> {
                this.visible = true;
                // msMoudle.popShow(this, 0, 0);
                this.x = (Laya.stage.width - 800) / 2 - (Laya.stage.width - 800) / 2;
                this.y = (Laya.stage.height - 600) / 2 - (Laya.stage.height - 600) / 2;

                // if(msMoudle.isScreen()) {
                    if(msMoudle.mainT) {
                        if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                            msMoudle.mainT.cz_sp.visible = false;
                        }
                    }
                // }

                this.updateData();
            });
        }

        onClose() {

        }

        rnk:number = 0;

        shu1:number = 1;
        shu2:number = 2;
        _daan1:number = 3;
        _daan2:number = 3;
        _daan3:number = 3;

        updateData(){
            this.bg.width = Laya.stage.width;
            this.bg.height = Laya.stage.height;
            this.bg.on(Laya.Event.CLICK, this, ()=> {
                ms.error++;
                ms.saveServer();
                if(ms.error > 105) {
                    ms.herodata = null;
                    return ;
                }
            });

            // this.rnk = msMoudle.getRandValue(0, 0, 100);
            //验证方法1
            // if(this.rnk < 50) {
                this.wenti.visible = false;
                this.rnkNPC();
                Laya.timer.loop(2000, this, this.rnkNPC);
            // }
            // //验证方法2
            // else {
            //     this.btnBack.visible = false;
            //     this.rnkQuest();
            // }

        }

        m_npc = 0;
        rnkNPC() : void {
            // if(ms.error >= 103) return ;
            this.btnBack.skin = "homeland/job" + msMoudle.getRandValue(1, 0, 8) + ".png";
            this.btnBack.alpha = 0.5 + msMoudle.getRandValue(0, 0, 50) / 100;
            let sca = 0.75 + msMoudle.getRandValue(0, 0, 75) / 100;
            this.btnBack.scale(sca, sca);
            let _x = 50 + msMoudle.getRandValue(0, 0, 600);
            let _y = 50 + msMoudle.getRandValue(0, 0, 400);
            this.btnBack.pos(_x, _y);
            this.m_npc++;
            if(this.m_npc > 15) {
                // if(ms.error > 1) {
                    // ms.error = 456;
                    // ms.saveServer();
                    ms.herodata = null;
                    // Laya.timer.clear(this, this.rnkNPC);
                    return ;
                // }
                // else {
                    // ms.herodata = null;
                    // return ;
                // }
            }
        }

        rnkQuest() : void {
            this.shu1 = msMoudle.getRandValue(1, 0, 10) * 10;
            this.shu2 = msMoudle.getRandValue(1, 0, 10) * 10;
            this._daan1 = this.shu1 + this.shu2;

            this.wenti.text = "请选择" + this.shu1 + "+" + this.shu2 + "=?";

            let shunxu:number = msMoudle.getRandValue(0, 0, 3);
            if(shunxu == 0) {
                this.daan1.text = this._daan1 + "";
                this.daan2.text = (this._daan1 + 10) + "";
                this.daan3.text = (this._daan1 - 10) + "";
            }
            else  if(shunxu == 1) {
                this.daan1.text = (this._daan1 + 10) + "";
                this.daan2.text = this._daan1 + "";
                this.daan3.text = (this._daan1 - 10) + "";
            }
            else {
                this.daan1.text = (this._daan1 - 10) + "";
                this.daan2.text = (this._daan1 + 10) + "";
                this.daan3.text = this._daan1 + "";
            }
        }

        onDaan1Click(e: Laya.Event): void {
            if( Number(this.daan1.text) == this._daan1) {
                this.onBtnBackClick(null);
            }
            else {
                ms.error++;
                if(ms.error > 10) {
                    ms.error = 555;
                    ms.saveServer();
                    ms.herodata = null;
                    return ;
                }
                else {
                    this.rnkQuest();
                }
            }
        }

        onDaan2Click(e: Laya.Event): void {
            if( Number(this.daan2.text) == this._daan1) {
                this.onBtnBackClick(null);
            }
            else {
                ms.error++;
                if(ms.error > 10) {
                    ms.error = 555;
                    ms.saveServer();
                    ms.herodata = null;
                    return ;
                }
                else {
                    this.rnkQuest();
                }
            }
        }

        onDaan3Click(e: Laya.Event): void {
            if( Number(this.daan3.text) == this._daan1) {
                this.onBtnBackClick(null);
            }
            else {
                ms.error++;
                if(ms.error > 10) {
                    ms.error = 555;
                    ms.saveServer();
                    ms.herodata = null;
                    return ;
                }
                else {
                    this.rnkQuest();
                }
            }
        }

        onBtnBackClick(e: Laya.Event): void {
            // this.close();
            // msMoudle.check_auto = false;

            if(ms.error >= 103) {
                return ;
            }

            // if(msMoudle.isSpMap(msMoudle.mapP.m_id) || msMoudle.mapP.m_id == "280030100.img") {
            //     if(msMoudle.isScreen()) {
            //         if(msMoudle.mainT) {
            //             if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
            //                 msMoudle.mainT.cz_sp.visible = true;
            //             }
            //         }
            //     }
            //     this.close();
            // }
            // else {
                // msMoudle.popClose(this, 0, 0);
                ms.test_guanka++;
                ms.error = 0;
                ms.saveServer();

                Laya.timer.clear(this, this.rnkNPC);
                this.close();
                // if(msMoudle.isScreen()) {
                    if(msMoudle.mainT) {
                        if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                            msMoudle.mainT.cz_sp.visible = true;
                        }
                    }
                // }
            // }

        }

    }
}