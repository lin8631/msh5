/// <reference path="./../../core/ms/Maple/Msg.ts" />

module app.fuben {

    export class hitView extends ui.fuben.hitViewUI {
        public static className = "app.fuben.hitView";

        private moles: Array<Mole> = [];
        private moleNum: number = 9;
        private score:number;

        constructor(){
            super();
        }

        clearUp() : void {

        }

        onInitialize(){

            // this.updateData();
        }

        // timeBar:number = 1;
        //
        loadGame(){
            this.moles = new Array<Mole>()
            this.score = 0
            var hitCallBackHd: Laya.Handler = Laya.Handler.create(this, this.setScore, null, false)
            for (var i = 0; i < this.moleNum; i++) {
                var box: Laya.Box = this.getChildByName('item' + i) as Laya.Box
                var mole: Mole = new Mole(
                    box.getChildByName('normal') as Laya.Image,
                    box.getChildByName('hit') as Laya.Image,
                    21, hitCallBackHd)
                this.moles.push(mole)
            }
            // 创建事件循环
            this.gameStart()
        }

        private onLoop ():void {

            // this.timeBar -= (1 / 10)
            // if (this.timeBar <= 0) {
            //     // 游戏结束
            //     this.gameOver()
            //     return
            // }
            var index:number = Math.floor(Math.random() * this.moleNum)
            this.moles[index].show()
        }
        public gameStart ():void {

            let timeTick = new Date().getTime() / 1000 + 30;
            this.startShowTime(timeTick);

            // this.timeBar = 1
            this.score = 0
            Laya.timer.loop(1000, this, this.onLoop)
        }
        // 游戏结束
        private gameOver ():void {
            // 清除事件循环
            Laya.timer.clear(this, this.onLoop)
            // msMoudle.toast("游戏结束！")
            ui.show(app.fuben.gameRes, {black:true});
        }
        /**
         * @description 设置分数
         */
        private setScore (type: number):void {
            // this.score += type === 1 ? -100 : 100
            // if (this.score < 0) this.score = 0
            // this.updateScoreUI()
            if(type === 1) {
                msMoudle._(); msMoudle.updateRongYu(10);
                msMoudle.toast("枫叶+10");
            }
            else {
                if(ms.rongyu() >= 0) {
                    msMoudle._(); msMoudle.updateRongYu(-10);
                }
                msMoudle.toast("枫叶-10");
            }
        }

        timeTick:number;
        imgTimes : Array<Laya.Clip> = [this.clip1, this.clip2, this.clip3, this.clip4, this.clip5, this.clip6];
        startShowTime(_time:number) {

            this.timeTick = _time;

            let date = new Date();
            let curTime = Math.floor(date.getTime() / 1000);
            // this.timeTick = 5000;
            // console.log("###enter fish, curTime=" + curTime + ", this.timeTick=" + this.timeTick)
            if(curTime < this.timeTick) {
                let arr = utils.getLetters(this.timeTick - curTime);
                for(let i=0; i<this.imgTimes.length; ++i) {
                    this.updateImgNum(this.imgTimes[i], arr[i]);
                }
                Laya.timer.clear(this, this.updateTime);
                Laya.timer.loop(1000, this, this.updateTime);
            }
        }

        updateTime() {
            let date = new Date();
            let curTime = Math.floor(date.getTime() / 1000);
            if(curTime < this.timeTick) {
                let arr = utils.getLetters(this.timeTick - curTime);
                for(let i=0; i<this.imgTimes.length; ++i) {
                    this.updateImgNum(this.imgTimes[i], arr[i]);
                }
            }
            else {
                //
                // console.log("时间到了");
                Laya.timer.clear(this, this.updateTime);
                // 游戏结束
                this.gameOver()
            }
        }

        updateImgNum(clip : Laya.Clip, num : number) {
            if(num < 0 || num > 9) return;
            clip.index = (num + 9) % 10;
        }

        //
    }
}