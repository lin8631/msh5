module app.quest {

    export class speckDlg extends ui.quest.speckDlgUI implements ui.quest.IspeckDlgUI {
        public static className = "app.quest.speckDlg";
        m_params:any;
        m_params2:any;

        constructor(params:any, params2:any = true){
            super();

            this.m_params = params;
            this.m_params2 = params2;

            this.x = (Laya.stage.width - 380) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 240) / 2 - (Laya.stage.height - 600) / 2;

            if(this.m_params2) {
                if(msMoudle.isScreen()) {
                    if(msMoudle.mainT) {
                        if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                            msMoudle.mainT.cz_sp.visible = false;
                        }
                    }
                }
            }

            // console.log("xxxx", params);
        }

        pEle: Laya.HTMLDivElement;
        onInitialize(){
            //只是为了顺便显示标题
            this.updateData();
        }

        onBtnContinueClick(e: Laya.Event): void {
            this.close();
        }

        //
        updateData(){
            this.content.vScrollBarSkin = "";

            let tle = this.m_params.split("@");

            this.title.text = tle[0];

            let ctx:string = tle[1];

            if(!this.pEle) {
                this.pEle = new Laya.HTMLDivElement();
                this.pEle.style.fontSize = 18;
                this.pEle.style.width = 345;
                this.pEle.style.wordWrap = true;
                this.pEle.style.leading = 5;
                this.pEle.style.color = "#605a5a";
                this.content.addChild(this.pEle);
            }
            this.createParagraph(this.pEle, ctx);
        }

        createParagraph(pEle:Laya.HTMLDivElement, txt:string, show:boolean = true): void {
            let txtArr = txt.split("#");
            let newhtml = "";
            // console.log(txt);
            let res:Array<any> = [];
            for(let i:number = 0; i < txtArr.length; i++) {
                // console.log(data[i])
                //换行
                ////
                if(txtArr[i].indexOf("k") >= 0) {
                    let str = txtArr[i];
                    let h = false;
                    if(str.indexOf("\\n\\n") >= 0) {
                        str = str.replace("\\n\\n", "")
                        h = true;
                    }
                    else if(str.indexOf("\\n") >= 0) {
                        str = str.replace("\\n", "")
                        h = true;
                    }
                    str = str.replace("k", "")
                    newhtml += "<span>" + str + "</span>";

                    if(h) newhtml += "<br />";
                }
                else if(txtArr[i].indexOf("b") >= 0) {
                    let str = txtArr[i];
                    let h = false;
                    if(str.indexOf("\\n\\n") >= 0) {
                        str = str.replace("\\n\\n", "")
                        h = true;
                    }
                    else if(str.indexOf("\\n") >= 0) {
                        str = str.replace("\\n", "")
                        h = true;
                    }
                    str = str.replace("b", "")
                    newhtml += "<span style='color:#605a5a;font-weight:bold'>" + str + "</span>";
                    if(h) newhtml += "<br />";
                }
                else if(txtArr[i].indexOf("e") >= 0) {
                    let str = txtArr[i];
                    let h = false;
                    if(str.indexOf("\\n\\n") >= 0) {
                        str = str.replace("\\n\\n", "")
                        h = true;
                    }
                    else if(str.indexOf("\\n") >= 0) {
                        str = str.replace("\\n", "")
                        h = true;
                    }
                    str = str.replace("e", "")
                    newhtml += "<span style='color:#605a5a;font-weight:bold'>" + str + "</span>";
                    if(h) newhtml += "<br />";
                }
                else if(txtArr[i].indexOf("n") >= 0) {
                    let str = txtArr[i];
                    let h = false;
                    if(str.indexOf("\\n\\n") >= 0) {
                        str = str.replace("\\n\\n", "")
                        h = true;
                    }
                    else if(str.indexOf("\\n") >= 0) {
                        str = str.replace("\\n", "")
                        h = true;
                    }
                    str = str.replace("n", "")
                    newhtml += "<span style='color:#605a5a;font-weight:bold'>" + str + "</span>";
                    if(h) newhtml += "<br />";
                }
                else if(txtArr[i].indexOf("p") >= 0) {
                    let str = txtArr[i];
                    let h = false;
                    if(str.indexOf("\\n\\n") >= 0) {
                        str = str.replace("\\n\\n", "")
                        h = true;
                    }
                    else if(str.indexOf("\\n") >= 0) {
                        str = str.replace("\\n", "")
                        h = true;
                    }
                    str = str.replace("p", "")
                    let name:string = msMoudle.wz["Npc.img"][str] ? msMoudle.wz["Npc.img"][str][str + ".name"] : str;
                    newhtml += "<span color='#d26ae3'>" + name + "</span>";
                    if(h) newhtml += "<br />";
                }
                //地图名称
                else if(txtArr[i].indexOf("m") >= 0) {
                    let str = txtArr[i];
                    let h = false;
                    if(str.indexOf("\\n\\n") >= 0) {
                        str = str.replace("\\n\\n", "")
                        h = true;
                    }
                    else if(str.indexOf("\\n") >= 0) {
                        str = str.replace("\\n", "")
                        h = true;
                    }
                    str = str.replace("m", "")
                    let name = str;
                    for(let key in msMoudle.wz["Map.img"] ) {
                        // let id = msMoudle.rmvImg(this.m_id);
                        if(msMoudle.wz["Map.img"][key][key + "." + name + ".mapName"]) {
                            name = msMoudle.wz["Map.img"][key][key + "." + name + ".mapName"];
                            break;
                        }
                    }
                    // let name:string = msMoudle.wz["Npc.img"][str] ? msMoudle.wz["Npc.img"][str][str + ".name"] : str;
                    newhtml += "<span color='#d26ae3'>" + name + "</span>";
                    if(h) newhtml += "<br />";
                }
                //物品名称
                else if(txtArr[i].indexOf("i") >= 0) {
                    let str = txtArr[i];
                    let h = false;
                    if(str.indexOf("\\n\\n") >= 0) {
                        str = str.replace("\\n\\n", "")
                        h = true;
                    }
                    else if(str.indexOf("\\n") >= 0) {
                        str = str.replace("\\n", "")
                        h = true;
                    }
                    str = str.replace("i", "")
                    let item = msMoudle.getItemMsg(Number(str));
                    if(item) {
                        newhtml += "<span color='#d26ae3'>" + item.name + "</span>";
                        // newhtml += "<img src='" + item.img + "'></img>";
                        res.push({ url: item.img });
                    }
                    if(h) newhtml += "<br />";
                }
                //物品图标
                else if(txtArr[i].indexOf("t") >= 0) {
                    let str = txtArr[i];
                    let h = false;
                    if(str.indexOf("\\n\\n") >= 0) {
                        str = str.replace("\\n\\n", "")
                        h = true;
                    }
                    else if(str.indexOf("\\n") >= 0) {
                        str = str.replace("\\n", "")
                        h = true;
                    }
                    str = str.replace("t", "")
                    let item = msMoudle.getItemMsg(Number(str));
                    if(item) {
                        // newhtml += "<span color='#d26ae3'>" + item.name + "</span>";
                        newhtml += "<img src='" + item.img + "'></img>";
                        res.push({ url: item.img });
                    }
                    if(h) newhtml += "<br />";
                }
                else if(txtArr[i].indexOf("r") >= 0) {
                    //暂时什么都不处理

                }
                //背包中的数量
                else if(txtArr[i].indexOf("c") >= 0) {
                    //暂时什么都不处理
                    let str = txtArr[i];
                    let h = false;
                    if(str.indexOf("\\n\\n") >= 0) {
                        str = str.replace("\\n\\n", "")
                        h = true;
                    }
                    else if(str.indexOf("\\n") >= 0) {
                        str = str.replace("\\n", "")
                        h = true;
                    }
                    str = str.replace("c", "")
                    // let item = msMoudle.getItemMsg(Number(str));
                    // if(item) {
                    let itemNum = msMoudle.getItemNum(str);
                    newhtml += "<span color='#d26ae3'>" + itemNum + "</span>";
                        // newhtml += "<img src='" + item.img + "'></img>";
                        // res.push({ url: item.img });
                    // }
                    if(h) newhtml += "<br />";
                }
                else {
                    newhtml += "<span>" + txtArr[i] + "</span>";
                }
            }

            pEle.innerHTML = newhtml;
        }

        onClose() {
            if(this.pEle) {
                this.pEle.removeSelf();
                this.pEle = null;
            }
            if(this.m_params2) {
                let a = true;
                if(msMoudle.isScreen()) {
                    if(msMoudle.mainT) {
                        if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                            msMoudle.mainT.cz_sp.visible = true;
                        }
                    }
                }
            }
        }

        onBtnBackClick(e: Laya.Event): void {
            // this.close();
        }

        //
    }
}