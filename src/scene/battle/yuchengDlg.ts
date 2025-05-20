module app.battle {

    export class yuchengDlg extends ui.battle.yuchengDlgUI implements ui.battle.IyuchengDlgUI {
        public static className = "app.battle.yuchengDlg";
        private yc_heroArray:Array<any> = [];
        private m_index:number = 0;
        private m_data:any;

        constructor(params:any){
            super();
            this.m_index = params.m_index;
            this.m_data = params;
        }

        onInitialize(){

            this.x = (Laya.stage.width - 480) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 405) / 2 - (Laya.stage.height - 600) / 2;

            this.updateData();
        }

        updateData(){

            this.lstYuCheng.vScrollBarSkin = "";

            this.yc_heroArray = new Array(12);
            this.updataYCList(null);
        }

        updataYCList(index:number) : void {
            if(index == null) {
                let _t:number = 0;
                for(let i:number = 0; i < ms.otherheroservedata.length; i++) {
                    if(this.m_index != i) {
                        this.yc_heroArray[_t] = new Object();
                        this.yc_heroArray[_t].json = ms.otherheroservedata[i];
                        this.yc_heroArray[_t].sel = false;
                        _t++;
                    }
                }
            }
            else {
                this.yc_heroArray[index].sel = this.yc_heroArray[index].sel ? false : true;
            }
            this.lstYuCheng.dataModel = this.yc_heroArray;

            let addExp:number = 0;
            let curExp:number = ms.otherheroservedata[this.m_data.m_index].Exp;
            let curLv:number = ms.otherheroservedata[this.m_data.m_index].Lv;

            let yc_sum:number = 0;
            let yc_len:number = 0;
            for(let i:number = 0; i < this.yc_heroArray.length; i++) {
                //选中的那些
                if(this.yc_heroArray[i]) {
                    if(this.yc_heroArray[i].sel) {
                        let yc_lv = this.yc_heroArray[i]["json"].Lv;
                        yc_len++;
                        yc_sum += yc_lv * (yc_lv + 1) / 2;
                    }
                }
            }
            addExp += yc_sum * 100;
            addExp += yc_len * 50;
            curExp += addExp;

            let _need:number = msMoudle.getLvExp(curLv);
            if(curExp >= _need) {
                // if(curLv < 30) {
                    while(true) {
                        let _need:number = msMoudle.getLvExp(curLv);
                        if(curExp >= _need) {
                            curExp -= _need;
                            curLv++;
                        }
                        else break;
                    }
                // }
                // else {
                //     msMoudle.toast("该英雄已经满级了");
                // }
            }
            _need = msMoudle.getLvExp(curLv);
            this._pro.value = (curExp / _need);
            this._proText.text = curExp + "/" + _need;
            this._left.text = "Lv." + ms.otherheroservedata[this.m_data.m_index].Lv;
            this._right.text = "Lv." + curLv;
        }

        onLstYuChengCellClick(e: Laya.Event, index: number): void {
            if(this.yc_heroArray[index]) {
                this.updataYCList(index);
            }
        }

        onBtn_querenClick(e: Laya.Event): void {
            let have_sel:boolean = false;
            let yc_sum = 0;
            let yc_len:number = 0;
            let addExp:number = 0;
            let curExp:number = 0;
            for(let i:number = 0; i < this.yc_heroArray.length; i++) {
                //选中的那些
                if(this.yc_heroArray[i]) {
                    if(this.yc_heroArray[i].sel) {
                        let yc_lv = this.yc_heroArray[i]["json"].Lv;
                        yc_len++;
                        yc_sum += yc_lv * (yc_lv + 1) / 2;
                        have_sel = true;
                    }
                }
            }

            addExp += yc_sum * 100;
            addExp += yc_len * 50;
            curExp += addExp;

            if(have_sel) {
                ms.otherheroservedata[this.m_data.m_index].Exp += curExp;
                //当前英雄增加经验
                let openid:number = ms.otherheroservedata[this.m_data.m_index].openid;
                let leaveup:number = ms.otherheroservedata[this.m_data.m_index].Lv;
                let needjinbi:number = msMoudle.getLvExp(leaveup);

                if(ms.otherheroservedata[this.m_data.m_index].Exp >= needjinbi) {
                    // if(ms.otherheroservedata[this.m_data.m_index].Lv < 30) {
                        while(true) {
                            let _need:number = msMoudle.getLvExp(ms.otherheroservedata[this.m_data.m_index].Lv);
                            if(ms.otherheroservedata[this.m_data.m_index].Exp >= _need) {
                                ms.otherheroservedata[this.m_data.m_index].Exp -= _need;
                                ms.otherheroservedata[this.m_data.m_index].Lv++;
                            }
                            else break;
                        }
                    // }
                    // else {
                    //     msMoudle.toast("该英雄已经满级了");
                    // }
                }
                ///更新主城右侧
                // for(let _:number = 0; _ < 6; _++) {
                //     if(ms.otherherodata[_]) {
                //         if(ms.otherherodata[_].openid == openid) {
                //             ms.otherherodata[_].exp = ms.otherheroservedata[this.m_data.m_index].exp;
                //             ms.otherherodata[_].lv = ms.otherheroservedata[this.m_data.m_index].lv;
                //             //更新面板
                //             this.m_data._lv.text = "Lv." + ms.otherherodata[_].lv;
                //             break;
                //         }
                //     }
                // }
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

                //更新背包
                // ui.manager.getDialogByName("app.yingxiong.YXDlg").dlg.updataBag();

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

                for(let i:number = 0; i < ms.otherheroservedata.length; i++) {
                    if(ms.otherheroservedata[i].openid == openid) {
                        this.m_data.m_index = i;
                        break;
                    }
                }
                //更新界面
                this.yc_heroArray = new Array(12);
                // this.m_data.updataYCList(null);
                //更新属性
                this.m_data.updateSelf(this.m_data.m_index);
                this.m_data.updataList(this.m_data.m_index);

                // console.log(ms.otherherodata)
                // for(let _:number = 0; _ < 6; _++) {
                //     if(ms.otherherodata[_]) {
                //         msMoudle.gameP.updataHero(_ + 2, true);
                //     }
                //     else {
                //         msMoudle.gameP.updataHero(_ + 2, null);
                //     }
                // }

                ui.manager.getDialogByName("app.homeland.MajorCityDlg").dlg.updataHead();
            }
            this.close();
         }

        onBtn_closeClick(e: Laya.Event): void {
            this.close();
        }

        onClose() {}

    }
}