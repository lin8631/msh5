
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
        node : any = "";
        size : Point = new Point(0, 0);
        type : string = "";

        constructor(type?: string, node?: any, size?: Point) {
            this.type = type;
            this.node = node;
            this.size = size;
        }
    }

    /**
     * RichText
     */
    export class RichText extends Laya.Sprite {
        public static className = "app.mail.RichText";

        msgList : Array<any> = [];
        node_list_will_render : Array<any> = [];
        isLink = true;
        maxWidth = 355;          //最大宽度
        fontSize = 22;         //字体大小
        fontName = ""; //args.fontName or "fonts/BoldBlack.TTF"
        defaultColor = "#FFFFFF"; //默认颜色-白色
        verticalSpace = 0;   //行距
        lineHeight = 0;      //行高
        lineWidth = 0 ;      //当前行的长度
        totalWidth = 0;
        totalHeight = 0;
        offsetX = 0;
        offsetY = 0;
        is_center_x : boolean = false;
        is_center_y : boolean = false;

        //maxWidth : number, fontName : string, fontSize : number, color : string
        constructor(params : any){
            super();
            this.isLink = true
            this.maxWidth = params.maxWidth ? params.maxWidth : 22
            this.fontSize = params.fontSize ? params.fontSize : 22
            this.fontName = params.fontName ? params.fontName :  "fonts/BoldBlack.TTF"
            this.defaultColor = params.color ? params.color : "#FFFFFF";
            this.verticalSpace = 0
            this.lineHeight = 0
            this.lineWidth = 0
            this.totalWidth = 0
            this.totalHeight = 0
            this.offsetX = 0
            this.offsetY = 0
        }

        setVerticalSpace(space : number) {
            this.verticalSpace = space
            let node : Laya.Sprite = new Laya.Sprite();
            node.width
            node.getBounds()
        }

        setCenterX(is_center_x : boolean) {
            this.is_center_x = is_center_x
        }
        setCenterY(is_center_y : boolean) {
            this.is_center_y = is_center_y
        }
        getRealContentSize() : Point {
            return new Point(this.totalWidth, this.totalHeight)
        }

        //text : string, color : string, font : string, size : number, data : any, id ?: number, cb?: (id : number) => void
        addText(params : any) {
            //console.log("addText " + this.offsetX);
            // do {
                // for(let i=0; i<3; ++i) {
                //     let strAndPos : StrAndPos = this.GetString(text,0,i);
                //     let itemMsg = strAndPos.msg;
                //     let charPos = strAndPos.pos;
                //     console.log("test, " + i + ", msg=" + itemMsg + ", pos=" + charPos);
                // }
                // console.log("test, " + this.Utfstrlen(text))
                // console.log("test, len is " + text.length)
                // for(let i=0; i<text.length; ++i) {
                //     console.log("test, char is " + text.charCodeAt(i));
                // }
                //return;
            // }while(0);
            if(params.text == null || params.text == "") return;
            // var lines=text.replace(/\r\n/g,"\n").split("\n");
            let isnextLent = params.text.indexOf("\n");
            if(isnextLent > -1) {
                let msgtable = params.text.split("\n");//string.split(text_params.text,"\n");
                for(let i = 0; i < msgtable.length; ++i) {
                    if(i > 0) {
                        if(this.lineHeight == 0) {
                            this.lineHeight = this.fontSize;
                        }
                        this.offsetY += this.lineHeight + this.verticalSpace;
                        this.offsetX = 0
                        this.lineHeight = 0
                        this.node_list_will_render = [];
                    }
                    //console.log("split text is " + msgtable[i]);
                    this.appendText(msgtable[i],params.color,params.font,params.size,params.data,params.cb);
                }
            }
            else {
                this.appendText(params.text,params.color,params.font,params.size,params.data,params.cb);
            }
        }

        addImage(image : string, scale : number, opacity : number) {
            // console.log("addImage " + this.offsetX);
            let sprite : Laya.Image = new Laya.Image()
            sprite.skin = image;
            sprite.anchorX = 0.5;
            sprite.anchorY = 0.5;
            sprite.scale(scale, scale);
            sprite.alpha = opacity;
            this.addChild(sprite);

            let realWidth = sprite.width * Math.abs(scale);
            let realHeight = sprite.height * Math.abs(scale);
            // console.log("##addImage, realWidth=" + realWidth + ", realHeight=" + realHeight)
            // sprite.pivot(0.5 * realWidth, 0.5 * realHeight);
            if(realWidth + this.offsetX > this.maxWidth) { //一行放不下的，新开一行同时不再检测长度
                this.offsetY += this.lineHeight + this.verticalSpace;
                this.offsetX = 0;
                this.lineHeight = 0;
                this.node_list_will_render = [];
            }

            sprite.pos(this.offsetX + realWidth/2, 0)

            this.offsetX += realWidth;
            // console.log("addImage2 " + this.offsetX + ", realWidth is " +  realWidth);
            this.lineWidth = this.offsetX;
            if(this.lineHeight < realHeight) {
                this.lineHeight = realHeight;
            }

            this.node_list_will_render.push(new NodeInfo("image", sprite, new Point(realWidth, realHeight)));
            this.renderTextInLine(this.offsetY + this.lineHeight + this.verticalSpace);

            //self:addTouch(sprite, image_params.call_back)
        }

        appendText(msg : string, color : string, fontName : string, fontSize : number, data : any, cb?: (id?:number) => void, checkPrefix = false) {
            // if(checkPrefix && data && data.prefix) {
            //     for(let i=0; i<data.prefix.length)
            //     msg =
            // }
            // console.log("appendText: " + msg);
            let itemMsg : string = null;  //单位数据
            let node : Laya.Sprite = new Laya.Sprite();
            this.addChild(node);
            let label = this.createLabel(msg,color,fontName,fontSize,data);
            if(data && data.underline) {
                label.underline = true;
            }
            node.addChild(label);
            // let contentSize = new Point(label.width, label.height);
            let contentSize = new Point(label.textWidth, label.textHeight);
            // console.log("appendText: label.width=" + contentSize.x + ",label.height=" + contentSize.y + ",this.offsetX=" + this.offsetX);
            let msgWidth = contentSize.x;//Laya.Browser.context.measureText(msg).width;//contentSize.x;// + self:getExtraWidthWithSpace(msg, fontName, fontSize)
            let msgHeight = contentSize.y;
            // console.log("apd, Laya.Browser.context.measureText = " + msgWidth)
            let charPos = 0;
            let draw_node : Laya.Node = null;
            let underline_color = "#FFFFFF";

            if(msgWidth + this.offsetX > this.maxWidth) { //一行放不下的
                let j = 0;
                let nowWidth = 0;
                while(this.offsetX+nowWidth < this.maxWidth) {
                    ++j;
                    label.text = msg.substr(0, j);
                    nowWidth = label.textWidth;
                    // let strAndPos : StrAndPos = this.GetString(msg,0,j-1);
                    // itemMsg = strAndPos.msg;
                    // charPos = strAndPos.pos;
                    // label.text = itemMsg;
                    // nowWidth = label.width; //+ self:getExtraWidthWithSpace(itemMsg, fontName, fontSize)
                }
                if(this.offsetX == 0 && j == 1) { //空的一行放不下一个字，强制放进去，防错
                    j = 2;
                }
                if(j > 1) {
                    --j;
                    // let strAndPos : StrAndPos = this.GetString(msg,0,j-1);
                    // itemMsg = strAndPos.msg;
                    // charPos = strAndPos.pos;
                    // label.text = itemMsg;
                    label.text = msg.substr(0, j);
                    nowWidth = label.width; //+ self:getExtraWidthWithSpace(itemMsg, fontName, fontSize)

                    //charPos = charPos ? charPos : 0;
                    charPos = 1;
                    if(charPos > 0) {
                        if(this.lineHeight < msgHeight) {
                            this.lineHeight = msgHeight;
                        }
                        node.x = this.offsetX;
                        // if draw_node ~= nil then
                        //     draw_node:drawLine(cc.p(0, 0), cc.p(nowWidth, 0), underline_color)
                        // end
                        this.node_list_will_render.push(new NodeInfo("label", node, new Point(nowWidth, label.height)));
                    }
                    this.offsetY += this.lineHeight + this.verticalSpace;
                    this.lineWidth = this.offsetX + nowWidth;
                    this.offsetX = 0;
                    this.renderTextInLine(this.offsetY);
                }
                else {
                    nowWidth = 0;
                    charPos = 0;
                    j = 0;
                    node.removeChild(label);
                    this.offsetY += this.lineHeight + this.verticalSpace;
                    this.lineWidth = this.offsetX + nowWidth
                    this.offsetX = 0;
                }

                this.node_list_will_render = [];
                this.lineHeight = 0;

                let lastMsg = msg.substr(j);
                // let lastMsg = msg.substr(charPos);//string.sub(msg,charPos+1,-1)
                // logf("###appendText, charPos is " .. charPos .. ", str is " .. lastMsg)
                this.appendText(lastMsg,color,fontName,fontSize,data,cb, true);
            }
            else{
                // logf("##NewRichText:appendText2, " .. msg)
                node.x = this.offsetX;

                this.offsetX += msgWidth;
                this.lineWidth = this.offsetX;
                if(this.lineHeight < msgHeight)
                    this.lineHeight = msgHeight


                // if draw_node ~= nil then
                //     draw_node:drawLine(cc.p(0, 0), cc.p(msgWidth, 0), underline_color)
                // end
                this.node_list_will_render.push(new NodeInfo("label", node, new Point(msgWidth, label.height)));

                this.renderTextInLine(this.offsetY + this.lineHeight + this.verticalSpace)
            }

            // if(data && data.touch)
                // this.addTouch(label, data, cb);
        }

        createLabel(text : string, color : string, fontName : string, size : number, data : any) : Laya.Text {
            //console.log("createLabel " + color)
            color = color ? color : this.defaultColor;
            //console.log("createLabel 2" + color)
            fontName = fontName ? fontName : this.fontName;
            size = size ? size : this.fontSize;
            let label = new Laya.Text(); //Laya.Label(text);
            // label.anchorX = 0;
            // label.anchorY = 0;
            label.pivot(0, 0);
            label.fontSize = size;
            label.color = color;
            label.text = "123";
            label.text = text;
            // if(data && data.bold) {
                // label.bold = true;
            // }
            if(color == "#ffff00") {
                label.stroke = 2;
                label.strokeColor = "#4c4c49";
            }
            return label;
        }

        renderTextInLine(posY : number) {
            this.totalHeight = posY;
            let temp_x = 0;
            let cur_line_width = 0;
            for(let i=0; i<this.node_list_will_render.length; ++i) {
                let node_info = this.node_list_will_render[i];
                cur_line_width = cur_line_width + node_info.size.x;
                let node_type = node_info.type;
                let node : Laya.Node = node_info.node as Laya.Node;
                if(node != null) {
                    let size : Point  = node_info.size as Point;
                    if(this.is_center_x) {
                        if(cur_line_width < this.maxWidth)
                            cur_line_width = this.maxWidth;
                        let offset_x = (this.maxWidth - this.lineWidth) / 2;
                        if(node_type == "label") {
                            (node as Laya.Label).x = temp_x + offset_x;
                        }
                        else {
                            (node as Laya.Image).x = temp_x + offset_x + size.x/2;
                        }
                        temp_x = temp_x + node_info.size.x;
                    }
                    if(this.is_center_y) {
                        if(node_type == "label") {
                            (node as Laya.Label).y = posY + (-this.lineHeight - size.y) / 2;
                        }
                        else {
                            (node as Laya.Image).y = posY - this.lineHeight / 2;
                        }
                    }
                    else {
                        if(node_type == "label") {
                            (node as Laya.Label).y = posY - size.y;
                        }
                        else {
                            (node as Laya.Image).y = posY - size.y / 2;
                        }
                    }
                }
            }

            if(cur_line_width > this.totalWidth) {
                this.totalWidth = cur_line_width;
            }
        }

        addTouch(node : Laya.Node, data : any, cb?: (id?:number) => void) {
            // node.on(laya.events.Event.CLICK, this,this.openDetails, [data]);
        }

        openDetails(data : any) {
            console.log("openDetails, itemType=" + data.itemType)

        }

        //todo: utf
        /*
        Utfstrlen(str : string) : number {
            if(str == null)
                return 0;
            let len = str.length;
            let left = len;
            let cnt = 0;
            let arr : Array<number> = [0,0xc0,0xe0,0xf0,0xf8,0xfc];
            while(left != 0) {
                let tmp = str.charCodeAt(len - left);
                tmp &= 0xFF;
                console.log("Utfstrlen, tmp is " + tmp);
                let i = arr.length;
                while(arr[i - 1]) {
                    if(tmp >= arr[i - 1]) {
                        left -= i;
                        break;
                    }
                    --i;
                }
                ++cnt;
            }
            return cnt;
        }

        GetString(msg : string, start : number, length : number) : StrAndPos {
            for(let k = start; k < msg.length; ++k) {
                let g = this.TruncateUTF8String(msg, start, k).msg;
                if(this.Utfstrlen(g) == length)
                    return new StrAndPos(g, k);
            }
            return null;
        }
        TruncateUTF8String(s : string, start : number, n : number) : StrAndPos {
            let dropping = s.charCodeAt(n) & 0xFF;
            if(dropping != null) {
                if(dropping >= 128 && dropping < 92) {
                    return this.TruncateUTF8String(s, start, n - 1);
                }
            }
            return new StrAndPos(s.substr(start, n), 0);
        }
        */

        addSingle(str : string, color : string, fontName : string, fontSize : number, data : any) {
            let contents = str.split(";");
            let type = -1;
            let name = "";
            let index = -1;
            let id = -1;
            let realColor = color ? color : this.defaultColor;
            let info: any = {};
            let skill = "";
            let lvl = 0;
            let star = 0;
            if(contents.length > 0) {
                let sep = contents[0].indexOf("=");
                if(sep > 0) {
                    let key = contents[0].substr(0, sep);
                    let value = contents[0].substr(sep + 1);
                    type = Number(value);
                }
                else {
                    return "";
                }
                //加一个额外类型，纯文本的
                if(type == 99) {
                    let text = "";
                    let bold = false;
                    for(let i=1;i<contents.length;++i) {
                        let content = contents[i];
                        let sep = content.indexOf("=");
                        if(sep > 0) {
                            let key = content.substr(0, sep);
                            let value = content.substr(sep + 1);
                            if(key == "color") {
                                realColor = value;
                            }
                            else if(key == "text") {
                                text = value;
                            }
                            else if(key == "bold") {
                                bold = (value == "1");
                            }
                        }
                    }
                    this.addText({"text":text, "color":realColor, "font":null, "size" : null, "data":{bold:bold}});
                    return text;
                }
                else if(type == 100) { //图片
                    let url = "";
                    let scale = 1;
                    let alpha = 1;
                    for(let i=1;i<contents.length;++i) {
                        let content = contents[i];
                        let sep = content.indexOf("=");
                        if(sep > 0) {
                            let key = content.substr(0, sep);
                            let value = content.substr(sep + 1);
                            if(key == "url") {
                                url = value;
                            }
                            else if(key == "scale") {
                                scale = Number(value);
                            }
                            else if(key == "alpha") {
                                alpha = Number(alpha);
                            }
                            else if(key == "name") {
                                name = value;
                            }
                        }
                    }
                    // console.log("add image, url=" + url);
                    this.addImage(url, scale, alpha);
                    return name;
                }
                //
                for(let i=1;i<contents.length;++i) {
                    let content = contents[i];
                    let sep = content.indexOf("=");
                    if(sep > 0) {
                        let key = content.substr(0, sep);
                        let value = content.substr(sep + 1);
                        if(key == "index") {
                            index = Number(value);
                        }
                        else if(key == "id") {
                            id = Number(value);
                        }
                        else if(key == "name") {
                            name = value;
                        }
                        else if(key == "color") {
                            realColor = value;
                        }
                        else if(key == "info") {
                            // console.log("XX info is " + value)
                            info = JSON.parse(value);
                        }
                        else if(key == "skill") {
                            skill = value;
                        }
                        else if(key == "lvl") {
                            lvl = Number(value);
                        }
                        else if(key == "star") {
                            star = Number(value);
                        }
                    }
                }

                if(type > -1) {
                    console.log("###addSingle, type=" + type)
                    if(data == null)
                        data = {};
                    data.index = index;
                    data.id = id;
                    data.itemType = type;
                    data.info = info;
                    data.skill = skill;
                    data.lvl = lvl;
                    data.star = star;
                    data.touch = true;
                    // data.bold = true;
                    data.underline = true;
                    this.addText({"text":name, "color":realColor, "font":null, "size" : null, "data":data})
                }
            }
            return name;
        }

        addContent(str : string, params : any) {
            // console.log("##addContent, str_xml is " + str);
            if(str == null || str == "") {
                return "";
            }
            //聊天表情提前处理(目前在ChatItem已处理)
            // str = this.processEmoji(str);
            //
            let strRes = "";
            //str.search()
            // str.match()
            let start = str.indexOf("<");
            let end = str.indexOf("/>");
            if(start > -1 && end > -1 && start < end) {
                if(start > 0) {
                    let text = str.substr(0, start);
                    this.addText({"text":text, "color":null, "font":null, "size" : null, "data":params});
                    strRes += text;
                }
                if(end - start > 2) {
                    let text = str.substr(start+1, end-start-1);
                    strRes += this.addSingle(text, null, null, null, params);
                }
                if(end < str.length - 2) {
                    strRes += this.addContent(str.substr(end+2), params);
                }
            }
            else {
                // this.appendText(str, null, null, 22, null);
                this.addText({"text":str, "color":null, "font":null, "size" : null, "data":params});
                strRes = str;
            }
            return strRes;
        }

        processEmoji(str: string) {
            let start = str.indexOf("|");
            let end = str.indexOf("/|");
            let strRes = "";
            if(start > -1 && end > -1 && start < end) {
                if(start > 0) {
                    strRes += str.substr(0, start);
                }
                if(end - start > 2) {
                    let tmp = str.substr(start+1, end-start-1);
                    strRes += "<type=100";
                    strRes += ";url=" + "common/img_jinbi3.png";
                    strRes += ";name=" + tmp;
                    // strRes += ";scale=1";
                    // strRes += ";alpha=1";
                    strRes += "/>";
                }
                if(end < str.length - 1) {
                    strRes += this.processEmoji(str.substr(end+1));
                }
            }
            else {
                return str;
            }
            return strRes;
        }

        updateData(data: any, index:number) {

            // let html:string = "<span color='#e3d26a'>" + data + "</span>";
/*
            this.divChatMsg.innerHTML = t.CHAT_TEST.format(data,data);

            this.divChatMsg.style.fontSize = 20;
            this.divChatMsg.style.align = "left";
            this.divChatMsg.color = "#00ffff";
            this.divChatMsg.width = 680;

            this.imgChatBg.visible = false;
            */
            // this.imgChatBg.skin = "common/img_lbl_bg.png"
            // this.imgChatBg.width = this.divChatMsg.width;
            // this.imgChatBg.sizeGrid = "13,60,12,54";
            // this.imgChatBg.x = this.divChatMsg.contextWidth + 10;
            // this.divPlayerName.x = this.imgChatBg.x + 5;



        }
    }
}