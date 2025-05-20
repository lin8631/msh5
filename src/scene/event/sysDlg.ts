module app.event {

    export class sysDlg extends ui.event.sysDlgUI implements ui.event.IsysDlgUI {
        public static className = "app.event.sysDlg";

        constructor(params:any){
            super();

            this.x = (Laya.stage.width - 480) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 320) / 2 - (Laya.stage.height - 600) / 2;
        }

        onInitialize(){
            this.lstAbi.vScrollBarSkin = "";

            this.updateData();
        }

        updateData(){
            let a:Array<string> = [];
            if(msMoudle.qudao == false) {
                a.push("非交易区额外5倍充值,交易区充值没有倍数");
                a.push("开放二区【交易区】");
                a.push("如发现bug可联系Q1044571564修复");
                a.push("三国版本玩家群：307157494");
                a.push("079版本玩家群：744911769");
                a.push("更新通知群：652044630");
            }
            a.push("其他已知问题修复");
            let txt = "";
            for(let i:number = 0; i < a.length; i++) txt += (i + 1) + "." + a[i] + "\n";
            this.showTxt.text = txt;
        }

        onBtnBackClick(e: Laya.Event): void {
            this.close();
        }

    }
}