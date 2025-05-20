module app.yingxiong {

    export class querenDlg extends ui.yingxiong.querenDlgUI implements ui.yingxiong.IquerenDlgUI {
        public static className = "app.yingxiong.querenDlg";
        private m_data:any;

        constructor(params:any){
            super();
            this.m_data = params;
        }

        onInitialize(){
            this.x = (Laya.stage.width - 300) / 2;
            this.y = (Laya.stage.height - 180) / 2;

            this.updateData();
        }

        updateData(){
            this._show.text = "是否将此英雄喂食掉？";
        }

         onBtn_querenClick(e: Laya.Event): void {
            //当前英雄增加经验
            let openid:number = ms.otherheroservedata[this.m_data.m_index].openid;

            for(let i:number = 0; i < this.m_data.yc_heroArray.length; i++) {
                //选中的那些
                if(this.m_data.yc_heroArray[i]) {
                    if(this.m_data.yc_heroArray[i].sel) {
                        ms.otherheroservedata[this.m_data.m_index].Exp +=
                        this.m_data.yc_heroArray[i]["json"].lv * 100;
                    }
                }
            }

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
            for(let j:number = 0; j < this.m_data.yc_heroArray.length; j++) {
                if(this.m_data.yc_heroArray[j]) {
                    if(this.m_data.yc_heroArray[j].sel) {
                        for(let i:number = 0; i < ms.otherheroservedata.length; i++) {
                            if(ms.otherheroservedata[i].openid == this.m_data.yc_heroArray[j]["json"].openid) {
                                ms.otherheroservedata.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            }

            for(let j:number = 0; j < this.m_data.yc_heroArray.length; j++) {
                if(this.m_data.yc_heroArray[j]) {
                    if(this.m_data.yc_heroArray[j].sel) {
                        for(let i:number = 0; i < ms.herosdata.length; i++) {
                            if(ms.herosdata[i].openid == this.m_data.yc_heroArray[j]["json"].openid){
                                ms.herosdata.splice(i, 1);
                                break;
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
            this.m_data.yc_heroArray = new Array(8);
            this.m_data.updataYCList(null);
            //更新属性
            this.m_data.updateSelf(this.m_data.m_index);
            this.m_data.updataList(this.m_data.m_index);

            // for(let _:number = 0; _ < 6; _++) {
            //     if(ms.otherherodata[_]) {
            //         msMoudle.gameP.updataHero(_ + 2, true);
            //     }
            // }
            msMoudle.gameP.updataHead();
            this.close();
         }

        onBtn_closeClick(e: Laya.Event): void {
            this.close();
        }

        onClose() {

        }
        //
    }
}