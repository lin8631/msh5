/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.shop {

    import cssMsg = MsgRole.Msg;

    export class shopDlg extends ui.shop.shopDlgUI implements ui.shop.IshopDlgUI {
        public static className = "app.shop.shopDlg";
        private m_msg:cssMsg;

        onInitialize(){
            // msMoudle.popShow(this, (800 - 720) / 2, (600 - 480) / 2);
            this.x = (Laya.stage.width - 720) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 480) / 2 - (Laya.stage.height - 600) / 2;

            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = false;
                    }
                }
            }

            this.m_msg = new cssMsg();
            this.shoplist.vScrollBarSkin = "";
            this.onBtnShopClick2(null);
        }

        onBtnShopClick2(e: Laya.Event): void {
            this.btnShop.gray = false;
            this.btnChair.gray = true;
            this.btnPet.gray = true;
            this.btnTamingMob.gray = true;
            this.btnRing.gray = true;

            this.data = [];
            for(let key in msMoudle.shopjson)
                this.data[this.data.length] = msMoudle.shopjson[key];
            this.shoplist.dataSource = this.data;
        }
        onBtnChairClick2(e: Laya.Event): void {
            this.btnShop.gray = true;
            this.btnChair.gray = false;
            this.btnPet.gray = true;
            this.btnTamingMob.gray = true;
            this.btnRing.gray = true;

            this.data = [];
            // for(let i:number = 0; i < msMoudle.AllFashion.length; i++) {


                for(let key in msMoudle.payjson) {
                    if(msMoudle.payjson[key].type == 6) {
                        let i = this.data.length;
                        this.data[i] = new Object();
                        this.data[i].shopid = i;
                        this.data[i].id = msMoudle.payjson[key].id;
                        let ___ = msMoudle.payjson[key];
                        this.data[i].price = ___.price;
                        this.data[i].pricetype = ___.pricetype;
                        this.data[i].type = ___.type;
                        this.data[i]._ = ___._;
                    }
                }

            // }
            this.shoplist.dataSource = this.data;
        }
        onBtnPetClick2(e: Laya.Event): void {
            this.btnShop.gray = true;
            this.btnChair.gray = true;
            this.btnPet.gray = false;
            this.btnTamingMob.gray = true;
            this.btnRing.gray = true;

            this.data = [];
            for(let i:number = 0; i < msMoudle.AllPet.length; i++) {
                this.data[i] = new Object();
                this.data[i].shopid = i;
                this.data[i].id = String(msMoudle.AllPet[i]);

                for(let key in msMoudle.payjson) {
                    if(msMoudle.payjson[key].id == this.data[i].id) {
                        let ___ = msMoudle.payjson[key];
                        this.data[i].price = ___.price;
                        this.data[i].pricetype = ___.pricetype;
                        this.data[i].type = ___.type;
                        this.data[i]._ = ___._;
                        break;
                    }
                }
            }
            this.shoplist.dataSource = this.data;
        }
        onBtnTamingMobClick2(e: Laya.Event): void {
            this.btnShop.gray = true;
            this.btnChair.gray = true;
            this.btnPet.gray = true;
            this.btnTamingMob.gray = false;
            this.btnRing.gray = true;

            this.data = [];
            for(let i:number = 0; i < msMoudle.AllTamingMob.length; i++) {
                this.data[i] = new Object();
                this.data[i].shopid = i;
                this.data[i].id = String(msMoudle.AllTamingMob[i]);

                for(let key in msMoudle.payjson) {
                    if(msMoudle.payjson[key].id == this.data[i].id) {
                        let ___ = msMoudle.payjson[key];
                        this.data[i].price = ___.price;
                        this.data[i].pricetype = ___.pricetype;
                        this.data[i].type = ___.type;
                        this.data[i]._ = ___._;
                        break;
                    }
                }
            }
            this.shoplist.dataSource = this.data;
        }

        onBtnRingClick2(e: Laya.Event): void {
            this.btnShop.gray = true;
            this.btnChair.gray = true;
            this.btnPet.gray = true;
            this.btnTamingMob.gray = true;
            this.btnRing.gray = false;

            this.data = [];
            for(let i:number = 0; i < msMoudle.AllRing.length; i++) {
                this.data[i] = new Object();
                this.data[i].shopid = i;
                this.data[i].id = String(msMoudle.AllRing[i]);

                for(let key in msMoudle.payjson) {
                    if(msMoudle.payjson[key].id == this.data[i].id) {
                        let ___ = msMoudle.payjson[key];
                        this.data[i].price = ___.price;
                        this.data[i].pricetype = ___.pricetype;
                        this.data[i].type = ___.type;
                        this.data[i]._ = ___._;
                        break;
                    }
                }
            }
            this.shoplist.dataSource = this.data;
        }

        onClose() {

        }

        data:Array<any> = [];
        updateData(){

        }

        onShoplistCellChildClick(e: Laya.Event, index: number, childVarName: string): void {
            if(childVarName == "icon") {
                this.onShowMsgD(this.data[index]);
            }
            else if(childVarName == "buy") {
                if(msMoudle.online == false) {
                    msMoudle.toast("当前网络不稳定");
                    return ;
                }
                if(this.btnPet.gray == false) {
                    for(let i:number = 0; i < ms.petbagsdata.length; i++) {
                        if(ms.petbagsdata[i]) {
                            if(ms.petbagsdata[i].id == this.data[index].id) {
                                msMoudle.toast("该宠物你已经有了");
                                return ;
                            }
                        }
                    }
                }
                else if(this.btnTamingMob.gray == false) {
                    for(let i:number = 0; i < ms.tamingmobbagsdata.length; i++) {
                        if(ms.tamingmobbagsdata[i]) {
                            if(ms.tamingmobbagsdata[i].id == this.data[index].id) {
                                msMoudle.toast("该椅子你已经有了");
                                return ;
                            }
                        }
                    }
                }
                else if(this.btnChair.gray == false) {
                    for(let i:number = 0; i < ms.chairbagsdata.length; i++) {
                        if(ms.chairbagsdata[i]) {
                            if(ms.chairbagsdata[i].id == this.data[index].id) {
                                msMoudle.toast("该椅子你已经有了");
                                return ;
                            }
                        }
                    }
                }
                else if(this.btnRing.gray == false) {
                    for(let i:number = 0; i < ms.ringbagsdata.length; i++) {
                        if(ms.ringbagsdata[i]) {
                            if(ms.ringbagsdata[i].id == this.data[index].id) {
                                msMoudle.toast("该戒指你已经有了");
                                return ;
                            }
                        }
                    }
                }
                this.onBuy(this.data[index], index);
            }
        }

        public onShowMsgD(data:any) : void {
            if(data.type == 0) this.m_msg.itemShow(data.id);
            else if(data.type == 1) this.m_msg.equipLoadShow(data.id);
            //时装
            else if(data.type == 2) this.m_msg.lifeShow(data.id, data.type);
            //宠物
            else if(data.type == 3) this.m_msg.lifeShow(data.id, data.type);
            //坐骑
            else if(data.type == 4) this.m_msg.lifeShow(data.id, data.type);
            //戒指
            else if(data.type == 5) this.m_msg.lifeShow(data.id, data.type);
            //椅子
            else if(data.type == 6) this.m_msg.lifeShow(data.id, data.type);
        }

        public onBuy(data:any, index:number) : void {

            if(data.pricetype == 1) {
                if(ms.jinbi() < data.price) {
                    msMoudle.toast("金币不足");
                    return ;
                }
            }
            else if(data.pricetype == 2) {
                if(ms.rongyu() < data.price) {
                    msMoudle.toast("枫叶不足");
                    return ;
                }
            }
            else if(data.pricetype == 3) {
                if(ms.zuanshi() < data.price) {
                    msMoudle.toast("黑金不足");
                    return ;
                }
                // if(data.price >= 1500) {
                //     if(ms.herodata.Lv < 160) {
                //         msMoudle.toast("需要角色达到160级")
                //         return ;
                //     }
                // }
            }
            if(data.type == 0 || data.type == 1)
                ui.show(app.shop.querenDlg, {params:[data, index], black:true});
            else
                ui.show(app.shop.queren2Dlg, {params:[data, index], black:true});
        }

        onBtn_closeClick(e: Laya.Event): void {
            // msMoudle.popClose(this, 360, 240);
            this.close();
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = true;
                    }
                }
            }
        }

    }
}