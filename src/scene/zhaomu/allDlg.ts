module app.zhaomu {
    import cssMsg = MsgRole.Msg;
    export class allDlg extends ui.zhaomu.allDlgUI implements ui.zhaomu.IallDlgUI  {

        public static className = "app.zhaomu.allDlg";
        private m_msg:cssMsg;

        onInitialize(){
            this.x = (Laya.stage.width - 600) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 400) / 2 - (Laya.stage.height - 600) / 2;

            // if(msMoudle.mainT) {
            //     if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
            //         msMoudle.mainT.cz_sp.visible = false;
            //     }
            // }
            this.m_msg = new cssMsg();
            this.lstShow.vScrollBarSkin = "";
            this.updateData();
        }

        onLstShowCellClick(e: Laya.Event, index: number): void {
            if(this.tArr[index].type == 0)
                this.m_msg.itemShow(this.tArr[index].id)
            else if(this.tArr[index].type == 1) {
                this.m_msg.equipLoadShow(this.tArr[index].id)
                // msMoudle.toast(this.tArr[index].id)
            }
            // msMoudle.toast(this.tArr[index].id)
        }

        onClose() {

        }

        onLoading(pro:number) : void {}
        onAssetLoaded(allJson:any, res:any, tArr:any) : void {
            let cs:CssParser.Txt = new CssParser.Txt();
            for(let i:number = 0; i < res.length; i++) {
                msMoudle.wz[allJson[i] + ".img"] = msMoudle.loadWZ(cs, res[i].url, "ms");
            }
            let m = "[";
            for(let i:number = 0; i < allJson.length; i++) {
                let item = msMoudle.getEqpMsg2(allJson[i]);
                if(item.cash == 1) m += "\"" + allJson[i] + "\","
            }
            // console.log(m)
            this.lstShow.dataSource = tArr;
            this.lstShow.scrollBar.value = 0;
        }

        m_show:Array<Laya.Label> = [this.btnItem, this.btnWeapon, this.btnLongCoat, this.btnCape, this.btnShield, this.btnGlove,
        this.btnShoes, this.btnCap, this.btnAccessory, this.btnMob];

        onBtnAccessoryClick2(e: Laya.Event): void {
            for(let i:number = 0; i < this.m_show.length;i ++)
                this.m_show[i].color = "#5a5857";
            this.btnAccessory.color = "#be531e";

            this.tArr = [];
            let allJson = this.allAccessory();
            for(let i:number = 0; i < allJson.length; i++) {
                this.tArr[i] = new Object();
                this.tArr[i].num = 0;
                this.tArr[i].id = allJson[i];
                this.tArr[i].type = 1;
            }

            this.lstShow.dataSource = this.tArr;
            this.lstShow.scrollBar.value = 0;
        }
        onBtnItemClick2(e: Laya.Event): void {
            for(let i:number = 0; i < this.m_show.length;i ++)
                this.m_show[i].color = "#5a5857";
            this.btnItem.color = "#be531e";

            this.tArr = [];
            let allJson = msMoudle.allJuanZhou(true);
            for(let i:number = 0; i < allJson.length; i++) {
                this.tArr[i] = new Object();
                this.tArr[i].num = 0;
                this.tArr[i].id = allJson[i];
                this.tArr[i].type = 0;
            }
            this.lstShow.dataSource = this.tArr;
            this.lstShow.scrollBar.value = 0;
        }
        onBtnWeaponClick2(e: Laya.Event): void {
            for(let i:number = 0; i < this.m_show.length;i ++)
                this.m_show[i].color = "#5a5857";
            this.btnWeapon.color = "#be531e";

            this.tArr = [];
            let allJson = this.allWeapon();
            for(let i:number = 0; i < allJson.length; i++) {
                this.tArr[i] = new Object();
                this.tArr[i].num = 0;
                this.tArr[i].id = allJson[i];
                this.tArr[i].type = 1;
            }
            this.lstShow.dataSource = this.tArr;
            this.lstShow.scrollBar.value = 0;
        }
        onBtnLongCoatClick2(e: Laya.Event): void {
            for(let i:number = 0; i < this.m_show.length;i ++)
                this.m_show[i].color = "#5a5857";
            this.btnLongCoat.color = "#be531e";

            this.tArr = [];
            let allJson = msMoudle.AllLongCoat;
            for(let i:number = 0; i < allJson.length; i++) {
                this.tArr[i] = new Object();
                this.tArr[i].num = 0;
                this.tArr[i].id = allJson[i];
                this.tArr[i].type = 1;
            }
            this.lstShow.dataSource = this.tArr;
            this.lstShow.scrollBar.value = 0;
        }
        onBtnCapeClick2(e: Laya.Event): void {
            for(let i:number = 0; i < this.m_show.length;i ++)
                this.m_show[i].color = "#5a5857";
            this.btnCape.color = "#be531e";

            this.tArr = [];
            let allJson = msMoudle.AllCape;
            for(let i:number = 0; i < allJson.length; i++) {
                this.tArr[i] = new Object();
                this.tArr[i].num = 0;
                this.tArr[i].id = allJson[i];
                this.tArr[i].type = 1;
            }
            this.lstShow.dataSource = this.tArr;
            this.lstShow.scrollBar.value = 0;
        }
        onBtnShieldClick2(e: Laya.Event): void {
            for(let i:number = 0; i < this.m_show.length;i ++)
                this.m_show[i].color = "#5a5857";
            this.btnShield.color = "#be531e";

            this.tArr = [];
            let allJson = msMoudle.AllShield;
            for(let i:number = 0; i < allJson.length; i++) {
                this.tArr[i] = new Object();
                this.tArr[i].num = 0;
                this.tArr[i].id = allJson[i];
                this.tArr[i].type = 1;
            }
            this.lstShow.dataSource = this.tArr;
            this.lstShow.scrollBar.value = 0;
        }
        onBtnGloveClick2(e: Laya.Event): void {
            for(let i:number = 0; i < this.m_show.length;i ++)
                this.m_show[i].color = "#5a5857";
            this.btnGlove.color = "#be531e";

            this.tArr = [];
            let allJson = msMoudle.AllGlove;
            for(let i:number = 0; i < allJson.length; i++) {
                this.tArr[i] = new Object();
                this.tArr[i].num = 0;
                this.tArr[i].id = allJson[i];
                this.tArr[i].type = 1;
            }
            this.lstShow.dataSource = this.tArr;
            this.lstShow.scrollBar.value = 0;
        }
        onBtnShoesClick2(e: Laya.Event): void {
            for(let i:number = 0; i < this.m_show.length;i ++)
                this.m_show[i].color = "#5a5857";
            this.btnShoes.color = "#be531e";

            this.tArr = [];
            let allJson = msMoudle.AllShoes;
            for(let i:number = 0; i < allJson.length; i++) {
                this.tArr[i] = new Object();
                this.tArr[i].num = 0;
                this.tArr[i].id = allJson[i];
                this.tArr[i].type = 1;
            }
            this.lstShow.dataSource = this.tArr;
            this.lstShow.scrollBar.value = 0;
        }
        onBtnCapClick2(e: Laya.Event): void {
            for(let i:number = 0; i < this.m_show.length;i ++)
                this.m_show[i].color = "#5a5857";
            this.btnCap.color = "#be531e";

            this.tArr = [];
            let allJson = msMoudle.AllCap;
            for(let i:number = 0; i < allJson.length; i++) {
                this.tArr[i] = new Object();
                this.tArr[i].num = 0;
                this.tArr[i].id = allJson[i];
                this.tArr[i].type = 1;
            }
            this.lstShow.dataSource = this.tArr;
            this.lstShow.scrollBar.value = 0;
        }

        onBtnMobClick2(e: Laya.Event): void {
            for(let i:number = 0; i < this.m_show.length;i ++)
                this.m_show[i].color = "#5a5857";
            this.btnMob.color = "#be531e";

            /////全部材料
            // let data0 = msMoudle.wz["0400.img"];
            // let data1 = msMoudle.wz["0401.img"]
            // let data2 = msMoudle.wz["0402.img"]
            // let data3 = msMoudle.wz["0403.img"]

            this.tArr = [];
            for(let i:number = 0; i < msMoudle.ItemList.length; i++) {
                let key = msMoudle.ItemList[i];
                let item = msMoudle.getItemMsg(Number(key));
                if(item) {
                    if(item.name && item.desc) {
                        // console.log(key, item.name);
                        let tIndex:number = this.tArr.length;
                        this.tArr[tIndex] = new Object();
                        this.tArr[tIndex].num = ms.tBagsArr[tIndex];
                        this.tArr[tIndex].id = Number(key);
                        this.tArr[tIndex].type = 0;
                    }
                }
            }
            //
            this.lstShow.dataSource = this.tArr;
            this.lstShow.scrollBar.value = 0;
        }

        tArr:Array<any> = [];
        updateData(){
            this.onBtnItemClick2(null);
        }

        allWeapon() :any {
            let allWeapon:Array<string> = [];
            for(let i:number = 0; i < msMoudle.AllWeapon.length; i++)
                allWeapon[allWeapon.length] = msMoudle.AllWeapon[i];
            for(let i:number = 0; i < msMoudle.test_fweapon.length; i++)
                allWeapon[allWeapon.length] = msMoudle.test_fweapon[i];
            return allWeapon;
        }



        allAccessory():any {
            let allAccessory:Array<string> = [];
            for(let i:number = 0; i < msMoudle.AllAccessory1.length; i++)
                allAccessory[allAccessory.length] = msMoudle.AllAccessory1[i];
            for(let i:number = 0; i < msMoudle.AllAccessory2.length; i++)
                allAccessory[allAccessory.length] = msMoudle.AllAccessory2[i];
            for(let i:number = 0; i < msMoudle.AllAccessory3.length; i++)
                allAccessory[allAccessory.length] = msMoudle.AllAccessory3[i];
            for(let i:number = 0; i < msMoudle.AllAccessory4.length; i++)
                allAccessory[allAccessory.length] = msMoudle.AllAccessory4[i];
            for(let i:number = 0; i < msMoudle.AllAccessory5.length; i++)
                allAccessory[allAccessory.length] = msMoudle.AllAccessory5[i];
            for(let i:number = 0; i < msMoudle.AllAccessory6.length; i++)
                allAccessory[allAccessory.length] = msMoudle.AllAccessory6[i];
            let newEqp:Array<string> = [];
            for(let i:number = 0; i < allAccessory.length; i++) {
                let eqp:any = msMoudle.getEqpMsg(allAccessory[i]);
                newEqp[newEqp.length] = allAccessory[i];
            }
            return newEqp;
        }

        onBtnBackClick(e: Laya.Event): void {

            this.close();

            ///
        }

    }
}