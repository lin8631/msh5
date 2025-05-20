
/// <reference path="../../utils/Utils.ts" />

let dir_up:string = 'w';
let dir_down:string = 's';
let dir_left:string = 'a';
let dir_right:string = 'd';

module app.skill {

    import cssMsg = MsgRole.Msg;

    export class skillView extends ui.skill.skillViewUI {
        public static className = "app.skill.skillView";
        private m_msg:cssMsg;

        onInitialize() {
            this.pan.vScrollBarSkin = "";
            this.pan.mouseEnabled = true;
            this.updateData(1);

            this.m_msg = new cssMsg();
            // Laya.timer.loop(2000, this, this.updateData, [1])
        }

        clearUp() : void {
            for(let i:number = 0; i < this.trees.length; i++) {
                if(this.trees[i]) {
                    this.trees[i].removeSelf();
                    this.trees[i] = null;
                }
            }
            for(let i:number = 0; i < this.lines.length; i++) {
                if(this.lines[i]) {
                    this.lines[i].removeSelf();
                    this.lines[i] = null;
                }
            }
            this.trees = [];
            this.lines = [];
            this.natureTree = new Object()
            this.missTree = new Object()
            this.m_data = new Object()
            this.show.height = 0;
        }

        trees:Array<skillItem> = [];   //显示
        lines:Array<lineItem> = [];     //
        natureTree:any = new Object();  //表数据
        missTree:any = new Object();    //缺失的那些
        m_data:any = new Object();      //实际数据
        maxw = 3;
        maxh = 0;
        m_page:number = 1;
        h_skills:Array<number> = [];
        //已经点亮的技能
        addNum = 0;

        public updateData(page:number = 1){

            this.clearUp();

            // this.h_skills = [10001,10002,10003,10004,10005,10006,10007,10008,10009,10011,10012,10013,10014,10015,10016];
            // this.h_skills.length = this.addNum++;

            this.m_page = page;


            this.natureTree["1000000"] = {page:1,coordinates:"1,1"}
            this.natureTree["1000001"] = {page:1,coordinates:"2,1",pre_pos:"1000000"}
            this.natureTree["1000002"] = {page:1,coordinates:"3,1",pre_pos:"1000001"}
            this.natureTree["1001003"] = {page:1,coordinates:"4,1",pre_pos:"1000002"}
            this.natureTree["1001004"] = {page:1,coordinates:"5,1",pre_pos:"1001003"}
            this.natureTree["1001005"] = {page:1,coordinates:"6,1",pre_pos:"1001004"}

            this.natureTree["1100000"] = {page:1,coordinates:"1,2"}
            this.natureTree["1100001"] = {page:1,coordinates:"2,2",pre_pos:"1100000"}
            this.natureTree["1100002"] = {page:1,coordinates:"4,2",pre_pos:"1000002"}
            this.natureTree["1100003"] = {page:1,coordinates:"6,2",pre_pos:"1101004"}


            this.natureTree["1101005"] = {page:1,coordinates:"1,3"}
            this.natureTree["1101006"] = {page:1,coordinates:"2,3",pre_pos:"1101005"}
            this.natureTree["1101007"] = {page:1,coordinates:"4,3",pre_pos:"1101006"}
            this.natureTree["1101004"] = {page:1,coordinates:"5,3",pre_pos:"1101007"}
            this.natureTree["1110000"] = {page:1,coordinates:"6,3",pre_pos:"1101004"}

            //key 为技能id
            for(let key in this.natureTree) {
                if(!this.m_data[key] && this.natureTree[key].page == this.m_page) {
                    let tPos = this.natureTree[key].coordinates.split(",");
                    if(this.show.height < 212 * tPos[0]) {
                        this.maxh = tPos[0];
                    }
                }
            }
            this.show.height = 212 * this.maxh;

            ///赋予数据
            for(let key in this.natureTree) {
                if(!this.m_data[key] && this.natureTree[key].page == this.m_page) {
                    this.m_data[key] = new Object();
                    let pos = this.natureTree[key].coordinates.split(",");
                    //当前位置
                    this.m_data[key].posX = pos[1]; //行
                    this.m_data[key].posY = pos[0]; //列
                    this.m_data[key].key = key;
                    this.m_data[key].pre = this.natureTree[key].pre_pos;
                    let pre = this.m_data[key].pre;
                    //前置位置
                    if(pre) {
                        let ppos = this.natureTree[pre].coordinates.split(",");
                        this.m_data[key].preX = ppos[1];
                        this.m_data[key].preY = ppos[0];
                    }
                }
            }


            for(let i:number = 0; i < this.maxw; i++) {
                for(let j:number = 0; j < this.maxh; j++) {
                    let tIndex:number = this.lines.length;
                    this.lines[tIndex] = new lineItem();
                    this.show.addChild(this.lines[tIndex]);
                    this.lines[tIndex].pos(222 * i, 212 * j);
                    this.lines[tIndex].updateData(null);
                    this.lines[tIndex].setPos(i + 1, j + 1);    //行列
                }
            }

            //全部显示
            for(let i:number = 0; i < this.maxw; i++) {
                for(let j:number = 0; j < this.maxh; j++) {
                    let tIndex:number = this.trees.length;
                    this.trees[tIndex] = new skillItem();
                    this.trees[tIndex].img.on(Laya.Event.CLICK, this, this.selectTree, [i + 1, j + 1])
                    this.show.addChild(this.trees[tIndex]);
                    let data = this.findDataByPos(i + 1, j + 1);
                    this.trees[tIndex].pos(222 * i, 212 * j);
                    this.trees[tIndex].updateData(data, tIndex);
                    this.trees[tIndex].setPos(i + 1, j + 1);    //行列
                }
            }

            //初步处理
            for(let i:number = 0; i < this.trees.length; i++) {
                let find = false;
                for(let key in this.m_data) {
                    if(this.trees[i].m_x == this.m_data[key].posX && this.trees[i].m_y == this.m_data[key].posY) {
                        find = true;
                        break;
                    }
                }
                //空节点保留连接处即可
                if(find == false) {
                    this.trees[i].hideAll();
                    this.lines[i].hideAll();
                }
                //真实节点暂时隐藏四周
                else {
                    this.trees[i].hideArrod();
                    this.lines[i].hideArrod();
                }
            }
            //逐一判读前置技能
            for(let i:number = 0; i < this.maxw; i++) {
                for(let j:number = 0; j < this.maxh; j++) {
                    let tree = this.findTreeByPos(i + 1, j + 1);
                    let line = this.findLineByPos(i + 1, j + 1);
                    let data = this.findDataByPos(i + 1, j + 1);
                    if(data) {      //含有数据的节点
                        if(data.pre) {
                            console.log("当前位置", data.posX, data.posY, "前置位置", data.preX, data.preY)
                            //简单画线测试
                            if(Math.abs(data.posX - data.preX) + Math.abs(data.posY - data.preY) == 1) {
                                let light = msMoudle.findKeyFromArr(Number(data.key), this.h_skills)
                                console.log("################当前位置", data.posX, data.posY, "前置位置", data.preX, data.preY, data.key, data.pre, light)
                                tree.runto(this.judegeDir(data.posX, data.posY, data.preX, data.preY), light)
                                line.runto(this.judegeDir(data.posX, data.posY, data.preX, data.preY), light)
                            }
                            else {
                                //复杂处理
                                this.fillPaths(data.posX, data.posY, data.preX, data.preY);
                            }
                        }
                        let light = msMoudle.findKeyFromArr(Number(data.key), this.h_skills)
                        tree._img.gray = !light;
                    }
                    //
                }
            }
            //
        }

        selectTree(x:number, y:number) : void {
            // console.log("DIANJI")
            let data = this.findDataByPos(x, y);
            this.m_msg.itemShow(data.key);
        }

        //我的位置，参照物位置
        //当前位置需要延申的方向
        judegeDir(x1:number, y1:number, x2:number, y2:number) : string {
            if(x1 == x2) {
                if(y1 > y2) return dir_up;
                if(y1 < y2) return dir_down;
            }
            else if(y1 == y2) {
                if(x1 > x2) return dir_left;
                if(x1 < x2) return dir_right;
            }
            return null;
        }

        lastdir = "";
        //填充路线
        fillPaths(x1:number, y1:number, x2:number, y2:number) : void {
            let cur_x:number = Number(x1);
            let cur_y:number = Number(y1);
            this.lastdir = "";  //记录上一次的方位

            let light = false;
            let bdata = this.findDataByPos(x1, y1);
            let edata = this.findDataByPos(x2, y2);
            if(bdata && edata) {
                if(msMoudle.findKeyFromArr(Number(bdata.key), this.h_skills) && msMoudle.findKeyFromArr(Number(edata.key), this.h_skills)) light = true;;
            }

            while(true) {
                if(cur_x == x2 && cur_y == y2) break;       //到达目的地
                let tree = this.findTreeByPos(cur_x, cur_y);
                let line = this.findLineByPos(cur_x, cur_y);
                let data = this.findDataByPos(cur_x, cur_y);

                if(cur_x == x2) {
                    if(cur_y < y2 && (cur_y + 1 <= this.maxh)) {
                        if(this.lastdir == 'a') {
                            tree.ricle('aw', light)
                            line.ricle('aw', light)
                        }
                        else if(this.lastdir == 'd') {
                            tree.ricle('dw', light)
                            line.ricle('dw', light)
                        }
                        else if(this.lastdir == 's' || this.lastdir == 'w') {
                            tree.showY(light);
                            line.showY(light);
                        }
                        tree.runto('s', light)
                        line.runto('s', light)
                        this.lastdir = 's';
                        ;
                        // console.log("@@@@@@@@@@@@@@@@", cur_x, cur_y, "s")
                        cur_y = cur_y + 1
                        // console.log("-------------", cur_x, cur_y)
                    }
                    else if(cur_y > y2 && (cur_y - 1 >= 1)) {
                        if(this.lastdir == 'a') {
                            tree.ricle('as', light)
                            line.ricle('as', light)
                        }
                        else if(this.lastdir == 'd') {
                            tree.ricle('ds', light)
                            line.ricle('ds', light)
                        }
                        else if(this.lastdir == 's' || this.lastdir == 'w') {
                            tree.showY(light);
                            line.showY(light);
                        }
                        tree.runto('w', light)
                        line.runto('w', light)
                        this.lastdir = 'w';
                        ;
                        // console.log("@@@@@@@@@@@@@@@@", cur_x, cur_y, "w")
                        cur_y = cur_y - 1
                        // console.log("-------------", cur_x, cur_y)
                    }
                    else {
                        console.log("111111111111111111")
                        break; //无解
                    }
                }
                else if(cur_y == y2) {
                    if(cur_x > x2 && (cur_x - 1 >= 1)) {// && this.findDataByPos(cur_x - 1, cur_y) == null
                        if(this.lastdir == 'w') {
                            tree.ricle('as', light)
                            line.ricle('as', light)
                        }
                        else if(this.lastdir == 's') {
                            tree.ricle('aw', light)
                            line.ricle('aw', light)
                        }
                        else if(this.lastdir == 'a' || this.lastdir == 'd') {
                            tree.showX(light);
                            line.showX(light);
                        }
                        tree.runto('a', light)
                        line.runto('a', light)
                        this.lastdir = 'a';
                        ;
                        // console.log("@@@@@@@@@@@@@@@@", cur_x, cur_y, "a")
                        cur_x = cur_x - 1
                        console.log("-------------", cur_x, cur_y)
                    }
                    else if(cur_x < x2 && (cur_x + 1 <= this.maxw)) {
                        if(this.lastdir == 'w') {
                            tree.ricle('ds', light)
                            line.ricle('ds', light)
                        }
                        else if(this.lastdir == 's') {
                            tree.ricle('dw', light)
                            line.ricle('dw', light)
                        }
                        else if(this.lastdir == 'a' || this.lastdir == 'd') {
                            tree.showX(light);
                            line.showX(light);
                        }
                        tree.runto('d', light)
                        line.runto('d', light)
                        this.lastdir = 'd';
                        ;
                        // console.log("@@@@@@@@@@@@@@@@", cur_x, cur_y, "d")
                        cur_x = cur_x + 1
                        console.log("-------------", cur_x, cur_y)
                    }
                    else {
                        console.log("22222222222222222")
                        break; //无解
                    }
                }
                else {
                    ///优先走空节点
                    if(cur_y < y2 && this.findDataByPos(cur_x, cur_y + 1) == null && (cur_y + 1 <= this.maxh)) {
                        // //下
                        tree.runto('s', light)
                        line.runto('s', light)
                        this.lastdir = 's';
                        ;
                        // console.log("@@@@@@@@@@@@@@@@", cur_x, cur_y, "s")
                        cur_y = cur_y + 1
                        console.log("-------------", cur_x, cur_y)
                    }
                    else if(cur_y > y2 && this.findDataByPos(cur_x, cur_y - 1) == null && (cur_y - 1 >= 1)) {
                        //上
                        tree.runto('w', light)
                        line.runto('w', light)
                        this.lastdir = 'w';
                        ;
                        // console.log("@@@@@@@@@@@@@@@@", cur_x, cur_y, "w")
                        cur_y = cur_y - 1
                        console.log("-------------", cur_x, cur_y)
                    }
                    else if(cur_x > x2 && this.findDataByPos(cur_x - 1, cur_y) == null && (cur_x - 1 >= 1)) {
                        //左
                        tree.runto('a', light)
                        line.runto('a', light)
                        this.lastdir = 'a';
                        // console.log("@@@@@@@@@@@@@@@@", cur_x, cur_y, "a")
                        cur_x = cur_x - 1
                        console.log("-------------", cur_x, cur_y)
                    }
                    else if(cur_x < x2 && this.findDataByPos(cur_x + 1, cur_y) == null && (cur_x + 1 <= this.maxw)) {
                        //右
                        tree.runto('d', light)
                        line.runto('d', light)
                        this.lastdir = 'd';
                        // console.log("@@@@@@@@@@@@@@@@", cur_x, cur_y, "d")
                        cur_y = cur_y + 1
                        console.log("-------------", cur_x, cur_y)
                    }
                    else {
                        console.log("333333333333333333")
                        break; //无解
                    }
                }
            }
        }

        //显示节点
        public findTreeByPos(x:number, y:number) : any {
            for(let i:number = 0; i < this.trees.length; i++) {
                if(this.trees[i].m_x == x && this.trees[i].m_y == y) {
                    return this.trees[i];
                }
            }
            return null;
        }
        //显示线
        public findLineByPos(x:number, y:number) : any {
            for(let i:number = 0; i < this.lines.length; i++) {
                if(this.lines[i].m_x == x && this.lines[i].m_y == y) {
                    return this.lines[i];
                }
            }
            return null;
        }
        //数据节点
        public findDataByPos(x:number, y:number) : any {
            for(let key in this.m_data) {
                if(this.m_data[key].posX == x && this.m_data[key].posY == y) {
                    return this.m_data[key];
                }
            }
            return null;
        }

        onClose() {
            // Laya.timer.clear(this, this.updateData)
        }

    }
}

