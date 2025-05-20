module ChatBalloonRole {

    export class ChatBalloon extends Laya.Sprite {

        public m_sp:Laya.Sprite;
        private m_parent:any;
        private m_x:number = 0;
        private m_y:number = 0;
        private chatbox_arrow:Laya.Image;
        private chatbox:Laya.Image;
        private chatbox_w:Laya.Image;
        private chatbox_e:Laya.Image;
        private chatbox_s:Laya.Image;
        private chatbox_n:Laya.Image;
        private chatbox_ne:Laya.Image;
        private chatbox_nw:Laya.Image;
        private chatbox_se:Laya.Image;
        private chatbox_sw:Laya.Image;
        private m_data:any;

        public loadChatBalloon(P:any, msg:any, tamingmob:boolean = false) : void {
            if(this.m_sp) {
                this.m_sp.removeSelf();
                this.m_sp = null;
            }
            let t = "npc";
            let data:any = msMoudle.wz["ChatBalloon.img"][t];
            this.m_data = data;
            this.m_parent = P;
            this.m_sp = new Laya.Sprite();
            if(tamingmob == false)
                this.m_sp.pos(0, -90);
            else
                this.m_sp.pos(0, -165);
            if(this.m_parent.m_nametag_sp)
                this.m_parent.m_nametag_sp.addChild(this.m_sp);

            let re:Array<any> = [];
            re.push("res/ChatBalloon.img/" + t + ".arrow.png");
            re.push("res/ChatBalloon.img/" + t + ".c.png");
            re.push("res/ChatBalloon.img/" + t + ".s.png");
            re.push("res/ChatBalloon.img/" + t + ".n.png");
            re.push("res/ChatBalloon.img/" + t + ".w.png");
            re.push("res/ChatBalloon.img/" + t + ".e.png");
            re.push("res/ChatBalloon.img/" + t + ".nw.png");
            re.push("res/ChatBalloon.img/" + t + ".se.png");
            re.push("res/ChatBalloon.img/" + t + ".ne.png");
            re.push("res/ChatBalloon.img/" + t + ".sw.png");

            let res:Array<any> = [];
            for(let i:number = 0; i < re.length; i++) {
                if(!Laya.loader.getRes(re[i])) {
                    res.push({ url: re[i] });
                }
            }

            if(res.length > 0) {
                msLoad.load(res).done(dlg => {
                    for(let __u:number = 0; __u < res.length; __u++) this.m_loadRes.push(res[__u].url);

                    msMoudle.resTip(res, true);
                    this.doSomeThing(t, msg);
                });
            }
            else {
                this.doSomeThing(t, msg);
            }
        }
        m_loadRes:Array<any> = [];
        public doSomeThing(t:any, msg:any) : void {
            this.clearImg();
            if(this.m_sp) {
                let sizew = 0;
                let sizeh = 0;
                let x = 0;
                let y = 0;
                let chattxt = new Laya.Text();
                chattxt.text = msg;
                chattxt.fontSize = 16;
                chattxt.width = 170;
                chattxt.wordWrap = true;
                //出现
                let ori:any = msMoudle.Vec2FromArr(this.m_data[t + ".arrow.origin"]);
                this.chatbox_arrow = new Laya.Image();
                this.chatbox_arrow.loadImage("res/ChatBalloon.img/" + t + ".arrow.png");
                this.chatbox_arrow.pos(x-ori.x, y-ori.y);
                this.m_sp.addChild(this.chatbox_arrow);
                //中间
                this.chatbox = new Laya.Image();
                this.chatbox.skin = "res/ChatBalloon.img/" + t + ".c.png";
                sizew = this.chatbox.width;  //原始大小
                sizeh = this.chatbox.height;
                this.chatbox.width = chattxt.textWidth;//九宫大小textWidth
                this.chatbox.height = chattxt.textHeight;
                this.chatbox.pos(x - this.chatbox.width/2+this.chatbox_arrow.width/2, y - chattxt.textHeight);
                this.chatbox.sizeGrid = "5, 5, 5, 5";
                this.m_sp.addChild(this.chatbox);
                //左
                let ori_w:any = msMoudle.Vec2FromArr(this.m_data[t + ".w.origin"]);
                this.chatbox_w = new Laya.Image();
                this.chatbox_w.skin = "res/ChatBalloon.img/" + t + ".w.png";
                this.chatbox_w.height = this.chatbox.height;//九宫大小
                this.chatbox_w.pos(x-ori_w.x - this.chatbox.width/2+this.chatbox_arrow.width/2, y-ori_w.y-this.chatbox.height);
                this.chatbox_w.sizeGrid = "2, 0, 2, 0";
                this.m_sp.addChild(this.chatbox_w);
                //右
                let ori_e:any = msMoudle.Vec2FromArr(this.m_data[t + ".e.origin"]);
                this.chatbox_e = new Laya.Image();
                this.chatbox_e.skin = "res/ChatBalloon.img/" + t + ".e.png";
                this.chatbox_e.height = this.chatbox.height;//九宫大小
                this.chatbox_e.pos(x-ori_e.x+this.chatbox.width - this.chatbox.width/2+this.chatbox_arrow.width/2, y-ori_e.y-this.chatbox.height);
                this.chatbox_e.sizeGrid = "2, 0, 2, 0";
                this.m_sp.addChild(this.chatbox_e);
                //上
                let ori_n:any = msMoudle.Vec2FromArr(this.m_data[t + ".n.origin"]);
                this.chatbox_n = new Laya.Image();
                this.chatbox_n.skin = "res/ChatBalloon.img/" + t + ".n.png";
                this.chatbox_n.width = this.chatbox.width;//九宫大小
                this.chatbox_n.pos(x-ori_n.x - this.chatbox.width/2+this.chatbox_arrow.width/2, y-ori_n.y-this.chatbox.height);
                this.chatbox_n.sizeGrid = "0, 2, 0, 2";
                this.m_sp.addChild(this.chatbox_n);
                //下
                let ori_s:any = msMoudle.Vec2FromArr(this.m_data[t + ".s.origin"]);
                this.chatbox_s = new Laya.Image();
                this.chatbox_s.skin = "res/ChatBalloon.img/" + t + ".s.png";
                this.chatbox_s.width = this.chatbox.width;//九宫大小
                this.chatbox_s.pos(x-ori_s.x - this.chatbox.width/2+this.chatbox_arrow.width/2, y-ori_s.y);
                this.chatbox_s.sizeGrid = "0, 2, 0, 2";
                this.m_sp.addChild(this.chatbox_s);
                //右上
                let ori_ne:any = msMoudle.Vec2FromArr(this.m_data[t + ".ne.origin"]);
                this.chatbox_ne = new Laya.Image();
                this.chatbox_ne.loadImage("res/ChatBalloon.img/" + t + ".ne.png");
                this.chatbox_ne.pos(x-ori_ne.x+this.chatbox.width - this.chatbox.width/2+this.chatbox_arrow.width/2, y-ori_ne.y-this.chatbox.height);
                this.m_sp.addChild(this.chatbox_ne);
                //左上
                let ori_nw:any = msMoudle.Vec2FromArr(this.m_data[t + ".nw.origin"]);
                this.chatbox_nw = new Laya.Image();
                this.chatbox_nw.loadImage("res/ChatBalloon.img/" + t + ".nw.png");
                this.chatbox_nw.pos(x-ori_nw.x - this.chatbox.width/2+this.chatbox_arrow.width/2, y-ori_nw.y-this.chatbox.height);
                this.m_sp.addChild(this.chatbox_nw);
                //右下
                let ori_se:any = msMoudle.Vec2FromArr(this.m_data[t + ".se.origin"]);
                this.chatbox_se = new Laya.Image();
                this.chatbox_se.loadImage("res/ChatBalloon.img/" + t + ".se.png");
                this.chatbox_se.pos(x-ori_se.x+this.chatbox.width - this.chatbox.width/2+this.chatbox_arrow.width/2, y-ori_se.y);
                this.m_sp.addChild(this.chatbox_se);
                //左下
                let ori_sw:any = msMoudle.Vec2FromArr(this.m_data[t + ".sw.origin"]);
                this.chatbox_sw = new Laya.Image();
                this.chatbox_sw.loadImage("res/ChatBalloon.img/" + t + ".sw.png");
                this.chatbox_sw.pos(x-ori_sw.x - this.chatbox.width/2+this.chatbox_arrow.width/2, y-ori_sw.y);
                this.m_sp.addChild(this.chatbox_sw);

                //聊天内容显示
                chattxt.pos(x - this.chatbox.width/2+this.chatbox_arrow.width/2, y - chattxt.textHeight);
                this.m_sp.addChild(chattxt);
            }
        }

        public clearImg() : void {
            if(this.chatbox_arrow) {
                this.chatbox_arrow.removeSelf();
                this.chatbox_arrow.destroy(true);
                this.chatbox_arrow = null;
            }
            if(this.chatbox) {
                this.chatbox.removeSelf();
                this.chatbox.destroy(true);
                this.chatbox = null;
            }
            if(this.chatbox_w) {
                this.chatbox_w.removeSelf();
                this.chatbox_w.destroy(true);
                this.chatbox_w = null;
            }
            if(this.chatbox_e) {
                this.chatbox_e.removeSelf();
                this.chatbox_e.destroy(true);
                this.chatbox_e = null;
            }
            if(this.chatbox_s) {
                this.chatbox_s.removeSelf();
                this.chatbox_s.destroy(true);
                this.chatbox_s = null;
            }
            if(this.chatbox_n) {
                this.chatbox_n.removeSelf();
                this.chatbox_n.destroy(true);
                this.chatbox_n = null;
            }
            if(this.chatbox_ne) {
                this.chatbox_ne.removeSelf();
                this.chatbox_ne.destroy(true);
                this.chatbox_ne = null;
            }
            if(this.chatbox_nw) {
                this.chatbox_nw.removeSelf();
                this.chatbox_nw.destroy(true);
                this.chatbox_nw = null;
            }
            if(this.chatbox_se) {
                this.chatbox_se.removeSelf();
                this.chatbox_se.destroy(true);
                this.chatbox_se = null;
            }
            if(this.chatbox_sw) {
                this.chatbox_sw.removeSelf();
                this.chatbox_sw.destroy(true);
                this.chatbox_sw = null;
            }
        }

        public clearUp() : void {
            Laya.timer.clearAll(this);
            Laya.loader.cancelLoadByUrls(this.m_loadRes);
            this.clearImg();
            if(this.m_sp) {
                this.m_sp.removeSelf();
                this.m_sp.destroy(true);
                this.m_sp = null;
            }
        }
        //
    }

}
