/// <reference path="./../../../core/ms/Maple/ReactorItem.ts" />

module ReactorRole {

    import cssReactorItem = ReactorItemRole.Reactor;

    export class Reactor extends Laya.Sprite {

        private m_parent:any;
        private reactors:Array<any> = [];
        private rnk:number = 1;

        public clearUp() : void {
            Laya.timer.clearAll(this);
            for(let i:number = 0; i < this.reactors.length; i++) {
                this.reactors[i].removeSelf();
                this.reactors[i].clearUp();
                this.reactors[i] = null;
            }
        }

        public loadReactor(data:any, P:any) : void {
            // this.rnk = msMoudle.getRandValue(1, 0, 3);
            this.rnk = 3;
            this.m_parent = P;
            let reactorInfo:any = data["reactor"];
            if(reactorInfo) {
                let i:number = 0;
                while(true) {
                    let id:string = "reactor." + i + ".id";
                    if(reactorInfo[id]) {
                        this.linkReactor(i, reactorInfo, id);
                        i = i + 1;
                    }
                    else break;
                }
            }
        }

        private linkReactor(i:number, reactorInfo:any, id:string) : void {
            // console.log(reactorInfo)
            // console.log(id)
            if(i > this.rnk) return ;
            this.reactors[i] = new cssReactorItem();
            this.reactors[i].loadReactorItem(this.m_parent, i, reactorInfo, id);
        }

        ///

    }

}