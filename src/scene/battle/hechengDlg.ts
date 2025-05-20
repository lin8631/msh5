module app.battle {

    export class hechengDlg extends ui.battle.hechengDlgUI implements ui.battle.IhechengDlgUI {
        public static className = "app.battle.hechengDlg";
        private yc_heroArray:Array<any> = [];

        constructor(params:any){
            super();

        }

        onInitialize(){

            this.x = (Laya.stage.width - 480) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 320) / 2 - (Laya.stage.height - 600) / 2;

            this.updateData();
        }

        updateData(){

            this.lstYuCheng.vScrollBarSkin = "";

            this.yc_heroArray = new Array(8);
            this.updataYCList(null);
        }

        updataYCList(index:number) : void {
            if(index == null) {
                let _t:number = 0;
                for(let i:number = 0; i < ms.otherheroservedata.length; i++) {
                    this.yc_heroArray[_t] = new Object();
                    this.yc_heroArray[_t].json = ms.otherheroservedata[i];
                    this.yc_heroArray[_t].sel = false;
                    _t++;
                }
            }
            else {
                this.yc_heroArray[index].sel = this.yc_heroArray[index].sel ? false : true;
            }
            this.lstYuCheng.dataModel = this.yc_heroArray;
        }

        onLstYuChengCellClick(e: Laya.Event, index: number): void {
            if(this.yc_heroArray[index]) {
                this.updataYCList(index);
            }
        }


        onBtn_querenClick(e: Laya.Event): void {
            let have_sel:boolean = false;

            let n_num = 0;
            let r_num = 0;
            let sr_num = 0;
            let ssr_num = 0;

            for(let i:number = 0; i < this.yc_heroArray.length; i++) {
                //选中的那些
                if(this.yc_heroArray[i]) {
                    if(this.yc_heroArray[i].sel) {
                        have_sel = true;
                        // break;
                        if(this.yc_heroArray[i]["json"].pinzhi == 1) n_num++;
                        else if(this.yc_heroArray[i]["json"].pinzhi == 2) r_num++;
                        else if(this.yc_heroArray[i]["json"].pinzhi == 3) sr_num++;
                        else if(this.yc_heroArray[i]["json"].pinzhi == 4) ssr_num++;
                    }
                }
            }

            let addR:boolean = false;
            let addSR:boolean = false;
            let addSSR:boolean = false;
            let addNR:boolean = false;
            if(n_num > 0 && r_num == 0 && sr_num == 0 && ssr_num == 0) {
                if(n_num == 5) {
                    addR = true;
                }
                else {
                    msMoudle.toast("请确认是否选择了5张N卡")
                    return;
                }
            }
            else if(n_num == 0 && r_num > 0 && sr_num == 0 && ssr_num == 0) {
                if(r_num == 5) {
                    addSR = true;
                }
                else {
                    msMoudle.toast("请确认是否选择了5张R卡")
                    return;
                }
            }
            else if(n_num == 0 && r_num == 0 && sr_num > 0 && ssr_num == 0) {
                if(sr_num == 5) {
                    addSSR = true;
                }
                else {
                    msMoudle.toast("请确认是否选择了5张SR卡")
                    return;
                }
            }
            else if(n_num == 0 && r_num == 0 && sr_num == 0 && ssr_num > 0) {
                if(ssr_num == 3) {
                    addNR = true;
                }
                else {
                    msMoudle.toast("请确认是否选择了3张SSR卡")
                    return;
                }
            }
            else {
                msMoudle.toast("当前合成配方错误")
                return;
            }

            ////已经选择了
            if(have_sel) {
                ////保存最新的服务器数据
                for(let j:number = 0; j < this.yc_heroArray.length; j++) {
                    if(this.yc_heroArray[j]) {
                        if(this.yc_heroArray[j].sel) {
                            for(let i:number = 0; i < ms.otherheroservedata.length; i++) {
                                if(ms.otherheroservedata[i].openid == this.yc_heroArray[j]["json"].openid) {
                                    // ms.wanfabag[ms.wanfabag.length] = ms.otherheroservedata[i].eqp[1];
                                    ms.otherheroservedata.splice(i, 1);
                                    break;
                                }
                            }
                        }
                    }
                }

                for(let j:number = 0; j < this.yc_heroArray.length; j++) {
                    if(this.yc_heroArray[j]) {
                        if(this.yc_heroArray[j].sel) {
                            for(let i:number = 0; i < ms.herosdata.length; i++) {
                                if(ms.herosdata[i].openid == this.yc_heroArray[j]["json"].openid){
                                    ms.herosdata.splice(i, 1);
                                    break;
                                }
                            }
                            for(let _:number = 0; _ < 6; _++) {
                                if(ms.otherherodata[_]) {
                                    if(ms.otherherodata[_].openid == this.yc_heroArray[j]["json"].openid) {
                                        ////这里可能有问题
                                        // ms.otherherodata[_] = null;
                                        ms.otherherodata.splice(_, 1);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

                let pinzhi5 = [1014, 1004, 1020];
                let pinzhi4 = [1001, 1002, 1011];
                let pinzhi3 = [1006, 1007, 1008, 1019, 1015];
                let pinzhi2 = [1003, 1005, 1009, 1010, 1012, 1016, 1018];//2和1的概率一致
                let pinzhi1 = [1016, 1013, 1017];//2和1的概率一致



                //新增一张卡片
                if(addR) {
                    let rnk = msMoudle.getRandValue(0, 0, pinzhi2.length);
                    msMoudle._(); msMoudle.buyOneHero(pinzhi2[rnk] - 1001);
                    msMoudle.toast("合成成功，获得一张R卡");
                }
                else if(addSR) {
                    let rnk = msMoudle.getRandValue(0, 0, pinzhi3.length);
                    if(msMoudle.getRandValue(0, 0, 100) < 80) {
                        msMoudle._(); msMoudle.buyOneHero(pinzhi3[rnk] - 1001);
                        msMoudle.toast("合成成功，获得一张SR卡");
                    }
                    else {
                        msMoudle.toast("合成失败");
                    }
                }
                else if(addSSR) {
                    let rnk = msMoudle.getRandValue(0, 0, pinzhi4.length);
                    if(msMoudle.getRandValue(0, 0, 100) < 55) {
                        msMoudle._(); msMoudle.buyOneHero(pinzhi4[rnk] - 1001);
                        msMoudle.toast("合成成功，获得一张SSR卡");
                    }
                    else {
                        msMoudle.toast("合成失败");
                    }
                }
                else if(addNR) {
                    let rnk = msMoudle.getRandValue(0, 0, pinzhi5.length);
                    if(msMoudle.getRandValue(0, 0, 100) < 20) {
                        msMoudle._(); msMoudle.buyOneHero(pinzhi5[rnk] - 1001);
                        msMoudle.toast("合成成功，获得一张神卡");
                    }
                    else {
                        msMoudle.toast("合成失败");
                    }
                }

                ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updataHead();
                ms.saveServer();
            }
            this.close();
         }

        onBtn_closeClick(e: Laya.Event): void {
            this.close();
            ui.manager.getDialogByName("app.zhaomu.zhaomuDlg").dlg.btnBack.visible = true;
        }

        onClose() {}

    }
}