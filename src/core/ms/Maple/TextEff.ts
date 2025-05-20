module TextEffMoudle {
    /*
    *   数据类 受击特效
    */
    import Handler      = Laya.Handler;
    export class TextEff extends Laya.Sprite {

        private testlist:Array<any> = ["生命", "攻击", "防御", "闪避", "暴击", "命中", "攻速", "移速"];
        private aryValue:Array<any> = [];
        private curIndex:number = 0;
        private tIndex:number = 0;
        public aryLabel:Array<any> = [];
        public aryImage:Array<any> = [];
        private delay = 160;

        public ShowTextEff(aryBef:any, aryLas:any) : void {
            this.tIndex = 0;
            this.curIndex = 0;
            let totalLen = this.testlist.length;

            for(let i:number = 0; i < totalLen; i++) {
                let change:number = aryLas[i] - aryBef[i];
                this.aryValue[i] = change;
            }
            this.showText();
        }

        public showText():void {
            let change:number = this.aryValue[this.curIndex];
            if( (change) != 0) {
                let txt:any = null;
                if(change > 0) {
                    if(change != Number(change.toFixed(0)) ) {
                        txt = this.testlist[this.curIndex] + "：+" + (change * 100).toFixed(0) + "%";
                    }
                    else
                        txt = this.testlist[this.curIndex] + "：+" + change.toFixed(0);
                }
                else {
                    if(change != Number(change.toFixed(0)) ) {
                        txt = this.testlist[this.curIndex] + "：" + (change * 100).toFixed(0) + "%";
                    }
                    else
                        txt = this.testlist[this.curIndex] + "：" + change.toFixed(0);
                }
                let label = this.createText(txt);
                this.aryLabel[this.tIndex] = label;

                // if(this.curIndex == this.testlist.length - 1) label.color = "#fff000";
                // else {
                    if(change > 0) label.color = "#00FF00";
                    else label.color = "#FF0000";
                // }

                let img = new Laya.Image();
                img.skin = "common/img_xiangs.png";
                img.anchorX = 0.5;
                img.anchorY = 0.5;
                img.zOrder = 300000;
                img.addChild(label);
                Laya.stage.addChild(img);
                img.scaleX = 0.8;
                img.scaleY = 0.8;
                img.width = 280;
                img.pos( (Laya.stage.width) >> 1, 300);
                this.aryImage[this.tIndex] = img;

                Laya.Tween.to(img, {scaleX:1, scaleY:1}, 100, Laya.Ease.quintInOut, null, 0);
                Laya.Tween.to(img, {y:img.y-300}, 1000, Laya.Ease.sineIn, Handler.create(this, this.onComplete, [this.tIndex]), 0);
                Laya.Tween.to(img, {alpha:0}, 200, Laya.Ease.sineIn, Handler.create(this, this.onComplete, [this.tIndex]), 4000);

                ++this.tIndex;
            }

            this.curIndex ++;
            if(this.curIndex<this.testlist.length) {
                let delay = this.delay;
                if(change == 0) delay = 0;
                Laya.timer.once(delay, this, this.showText);
            }
        }

        private createText(char:string):Laya.Label {
            let label = new Laya.Label();
            label.stroke = 2;
            label.strokeColor = "#000000";
            label.fontSize = 22;
            label.bold = true;
            label.centerX = 0;
            label.centerY = 3;
            if(char) label.text = (char);
            return label;
        }

        public onComplete(i:number):void {
            if(this.aryLabel[i]) {
                this.aryLabel[i].removeSelf();
                this.aryLabel[i] = null;
            }
            if(this.aryImage[i]) {
                this.aryImage[i].removeSelf();
                this.aryImage[i] = null;
            }
        }

    }

}
