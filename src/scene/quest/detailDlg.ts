/// <reference path="./../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../core/ms/Maple/BasicEff.ts" />

module app.quest {
    import cssMsg = MsgRole.Msg;
    import cssBasicEff = BasicEffRole.BasicEff;

    export class detailDlg extends ui.quest.detailDlgUI implements ui.quest.IdetailDlgUI {
        public static className = "app.quest.detailDlg";
        private m_msg:cssMsg;

        constructor(params:any){
            super();

            this.x = (Laya.stage.width - 380) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 240) / 2 - (Laya.stage.height - 600) / 2;

            let a = true;
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = false;
                    }
                }
            }


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

            let data = msMoudle.wz["Quest.img"][ms.QuestId];
            if(data) {
                let name = data[ms.QuestId + ".name"];
                this.title.text = name;
                let root:string = ms.QuestId + "." + ms.QuestStep;
                let ctx:string = "";
                if(data[root]) ctx = data[root];
                if(!this.pEle) {
                    this.pEle = new Laya.HTMLDivElement();
                    this.pEle.style.fontSize = 18;
                    this.pEle.style.width = 345;
                    this.pEle.style.wordWrap = true;
                    this.pEle.style.leading = 5;
                    this.pEle.style.color = "#605a5a";
                    this.content.addChild(this.pEle);
                }
                msMoudle.createParagraph(this.pEle, ctx);
            }
        }

        onClose() {
            if(this.pEle) {
                this.pEle.removeSelf();
                this.pEle = null;
            }
            let a = true;
            if(msMoudle.isScreen()) {
                if(msMoudle.mainT) {
                    if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
                        msMoudle.mainT.cz_sp.visible = true;
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