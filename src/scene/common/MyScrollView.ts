
module app.mail {

    import Point = laya.maths.Point;

    class StrAndPos {
        msg : string = "";
        pos : number = 0;

        constructor(msg?: string, pos?: number) {
            this.msg = msg;
            this.pos = pos;
        }
    }

    class NodeInfo {
        node : Laya.Box;
        height : number;
        margin : number;

        constructor(node?: Laya.Box, height?: number, margin?: number) {
            this.node = node;
            this.height = height;
            this.margin = margin;
        }
    }

    /**
     * MyScrollView
     */
    export class MyScrollView extends Laya.Panel {
        public static className = "app.mail.MyScrollView";

        _width : number;
        _height : number;
        _margin : number;

        touchLayout : Laya.Image;
        nodeContainer : Laya.Sprite;
        items : Array<NodeInfo> = [];
        curHeight : number = 0;

        //scroll
        startX : number = -1;
        startY : number = -1;
        isMouseDown : boolean = false;
        hasOperate = false;

        constructor(width ?: number, height ?: number, margin ?: number){
            super();

            this._width = width;
            this._height = height;
            this._margin = margin;
            this.vScrollBarSkin = "";
            this.mouseEnabled = false;      //取消滑动

            //触摸响应层
            this.touchLayout = new Laya.Image();
            this.touchLayout.width = width;
            this.touchLayout.height = height;
            this.touchLayout.mouseThrough = true;
            this.addChild(this.touchLayout);
            // this.touchLayout.on(laya.events.Event.MOUSE_DOWN, this,this.onMouseDown);
            // this.touchLayout.on(laya.events.Event.MOUSE_UP, this,this.onMouseUp);
            // this.touchLayout.on(laya.events.Event.MOUSE_OUT, this,this.onMouseOut);
            // this.touchLayout.on(laya.events.Event.MOUSE_MOVE, this,this.onMouseMove);

            //容器层
            this.nodeContainer = new Laya.Sprite();
            this.touchLayout.addChild(this.nodeContainer);

            //添加遮罩，设置显示区域
            let mask : Laya.Sprite = new Laya.Sprite();
            mask.graphics.drawRect(0, 0, width, height, "#000000");
            mask.width = width;
            mask.height = height;
            this.mask = mask;
        }

        addItem(node : Laya.Box, height : number, margin : number, autoScroll : boolean = true) {
            margin = margin ? margin : this._margin;

            // if(this.items.length < 10) {
            // this.items.push(new NodeInfo(node, margin, height));
            this.nodeContainer.addChild(node);

            node.y = this.curHeight + margin;
            this.curHeight += margin + height + 3;

            this.touchLayout.size(this._width, this.curHeight);

            this.refresh();
            // if(autoScroll) {
            //     if(this.curHeight > this._height) {
            //         if(!this.hasOperate || (this.vScrollBar.value - (this.curHeight - (margin + height))) > -(66 + this._height)) {
            //             this.refresh();
            //             this.scrollTo(0, this.curHeight - this._height)
            //         }
            //     }
            // }
        }

        /*
        if(this.items.length < 10) {
                let nodeInfo = new NodeInfo();
                nodeInfo.init(node, margin, height);
                this.items.push(nodeInfo);
                // this.nodeContainer.addChild(node);

                node.y = this.curHeight + margin;
                this.curHeight += margin + height;
            }
            else {
                for(let i:number = 0; i < 10; i++) {
                    this.items[i].removeSelf();
                }
                ///优化
                for(let i:number = 1; i < 10; i++) {
                    this.items[i - 1] = this.items[i];
                }
                let nodeInfo = new NodeInfo();
                nodeInfo.init(node, margin, height);
                this.items[9] = nodeInfo;
                for(let i:number = 0; i < 10; i++) {
                    this.items[i].removeSelf();
                }
            }
        */

        // onMouseDown() {
        //     this.startY = Laya.stage.mouseY;
        //     this.isMouseDown = true;
        //     this.hasOperate = true;
        // }

        // onMouseUp() {
        //     // console.log("onMouseUp, x=" + Laya.stage.mouseX + ",y=" + Laya.stage.mouseY);
        //     this.isMouseDown = false;
        // }

        // onMouseOut() {
        //     // console.log("onMouseUp, x=" + Laya.stage.mouseX + ",y=" + Laya.stage.mouseY);
        //     this.isMouseDown = false;
        // }

        // onMouseMove() {
        //     // console.log("onMouseMove, x=" + Laya.stage.mouseX + ",y=" + Laya.stage.mouseY);
        //     if(this.isMouseDown && this.curHeight > this._height) {
        //         this.nodeContainer.y += Laya.stage.mouseY - this.startY;
        //         this.startY = Laya.stage.mouseY;

        //         if(this.nodeContainer.y > 0) {
        //             this.nodeContainer.y = 0;
        //         }
        //         else if(this.nodeContainer.y < (this._height - this.curHeight)) {
        //             this.nodeContainer.y = this._height - this.curHeight;
        //         }
        //     }
        // }

        clearAll() {
            this.nodeContainer.removeChildren();
            this.nodeContainer.y = 0;
            this.curHeight = 0;
        }

    }
}