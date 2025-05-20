module app.shop {

    export class shopItem extends ui.shop.shopItemUI {
        public static className = "app.shop.shopItem";

        updateData(data: any, index: number) {
            this.icon.skin = "";
            if(data) {
                let newdata:any = new Object();
                if(data.pricetype == 1) {              //金币
                    this.img2.skin = "homeland/02022995.info.icon.png";
                }
                else if(data.pricetype == 2) {         //荣誉
                    this.img2.skin = "homeland/02028044.info.icon.png";
                }
                else if(data.pricetype == 3) {         //黑金
                    this.img2.skin = "homeland/02048719.info.icon.png";
                }
                ///非装备类
                if(data.type == 0) {
                    if(data.id == "987654320") {
                        newdata.name = data._;
                        newdata.img = "homeland/04000334.info.icon.png";
                    }
                    else if(data.id == "987654321") {
                        newdata.name = data._;
                        newdata.img = "homeland/04000334.info.icon.png";
                    }
                    else if(data.id == "987654322") {
                        newdata.name = data._;
                        newdata.img = "homeland/04000334.info.icon.png";
                    }
                    else if(data.id == "987654328") {
                        newdata.name = data._;
                        newdata.img = "homeland/04000334.info.icon.png";
                    }
                    else if(data.id == "987654329") {
                        newdata.name = data._;
                        newdata.img = "homeland/04000334.info.icon.png";
                    }
                    else if(data.id == "1234554") {
                        newdata.name = data._;
                        newdata.img = "homeland/02010029.info.icon.png";
                    }
                    else if(data.id == "9999" || data.id == "9998") {
                        newdata.name = data._;
                        newdata.img = "homeland/QuestIcon.5.0.png";
                    }
                    //坐骑
                    else if(data.id == "01902000" || data.id == "01902028" || data.id == "01902032") {
                        newdata.name = data._;
                        newdata.img = "res/Character/TamingMob/" + data.id + ".img/info.icon.png";
                    }
                    else if(data.id == "700000000") {
                        newdata.name = data._;
                        newdata.img = "homeland/04001017.info.icon.png";
                    }
                    else if(data.id == "800000000") {
                        newdata.name = data._;
                        newdata.img = "homeland/04001129.info.icon.png";
                    }
                    else if(data.id == "700000001") {
                        newdata.name = data._;
                        newdata.img = "homeland/04001017.info.icon.png";
                    }
                    else if(data.id == "900000001") {
                        newdata.name = data._;
                        newdata.img = "homeland/04001190.info.icon.png";
                    }
                    else if(data.id == "900000002") {
                        newdata.name = data._;
                        newdata.img = "homeland/04001397.info.icon.png";
                    }
                    else if(data.id == "900000003") {
                        newdata.name = data._;
                        newdata.img = "homeland/04001397.info.icon.png";
                    }
                    else if(data.id == "900000010") {
                        newdata.name = data._;
                        newdata.img = "homeland/04001397.info.icon.png";
                    }
                    else if(data.id == "900000004") {
                        newdata.name = data._;
                        newdata.img = "homeland/04001397.info.icon.png";
                    }
                    else if(data.id == "900000005") {
                        newdata.name = data._;
                        newdata.img = "homeland/04001397.info.icon.png";
                    }

                    else if(data.id == "900000006") {
                        newdata.name = data._;
                        newdata.img = "homeland/04000412.info.icon.png";
                    }
                    else if(data.id == "900000007") {
                        newdata.name = data._;
                        newdata.img = "homeland/04000412.info.icon.png";
                    }
                    else if(data.id == "900000017") {
                        newdata.name = data._;
                        newdata.img = "homeland/04000412.info.icon.png";
                    }
                    else if(data.id == "900000067") {
                        newdata.name = data._;
                        newdata.img = "homeland/04000412.info.icon.png";
                    }
                    else if(data.id == "900000068") {
                        newdata.name = data._;
                        newdata.img = "homeland/04000412.info.icon.png";
                    }
                    else if(data.id == "900000069") {
                        newdata.name = data._;
                        newdata.img = "homeland/04000412.info.icon.png";
                    }
                    else if(data.id == "900000070") {
                        newdata.name = data._;
                        newdata.img = "homeland/04000412.info.icon.png";
                    }
                    else if(data.id == "900000008") {
                        newdata.name = data._;
                        newdata.img = "homeland/04000412.info.icon.png";
                    }
                    else if(data.id == "900000009") {
                        newdata.name = data._;
                        newdata.img = "homeland/04000412.info.icon.png";
                    }

                    else if(data.id == "600000001") {
                        newdata.name = data._;
                        newdata.img = "homeland/04001023.info.icon.png";
                    }
                    else if(data.id == "800000001") {
                        newdata.name = data._;
                        newdata.img = "homeland/04001129.info.icon.png";
                    }
                    else if(data.id == "900000000") {
                        newdata.name = data._;
                        newdata.img = "homeland/04001374.info.icon.png";
                    }
                    else {
                        if(msMoudle.findKeyFromArr(data.id, msMoudle.AllSkills)) newdata = msMoudle.getSkillMsg(data.id);
                        else newdata = msMoudle.getItemMsg(data.id);
                    }
                }
                //装扮
                else if(data.type == 1) newdata = msMoudle.getEqpMsg(data.id);
                //时装
                else if(data.type == 2) {
                    let names:Array<string> = ["白色纸箱", "泡泡袍", "大圣袍",
                    "黄金甲", "八戒装", "半兽人", "绿叶袍", "西红柿装", "牛牛装", "天师服",
                    "海豚服", "皮克品装", "鸡鸡装", "羊羊装", "天空战甲", "领主战甲", "魔王战装",
                    "阿道恩袍", "罗洛袍"];
                    newdata.img = "res/Character/LongCoat/" + data.id + ".img/info.icon.png"
                    newdata.name = names[data.shopid];
                }
                //宠物
                else if(data.type == 3) {
                    newdata.img = "res/Pet/" + data.id + ".img/info.icon.png";
                    if(msMoudle.wz["Pet.img"][data.id])
                        newdata.name = msMoudle.wz["Pet.img"][data.id][data.id + ".name"]
                    else
                        newdata.name = data.id;
                }
                //坐骑
                else if(data.type == 4) {
                    let names:Array<string> = ["苦力鸭","代步猪", "筋斗云", "赤兔马","恶灵","火凤凰","黑魔法龙","炎龙"];//"死神","蝴蝶花",
                    newdata.img = "res/Character/TamingMob/" + data.id + ".img/info.icon.png"
                    newdata.name = names[data.shopid];
                }
                //戒指
                else if(data.type == 5) {
                    let names:Array<string> = ["音符律动","彩虹的心", "星光闪耀", "爱心缠绕","爱的心情","爱的信号","c"];//"死神","蝴蝶花",
                    newdata.img = "res/Character/Ring/" + data.id + ".img/info.icon.png"
                    newdata.name = names[data.shopid];
                }
                //椅子
                else if(data.type == 6) {
                    let names:Array<string> = ["休闲椅子","蓝色椅子", "海豹椅(粉)", "落叶红椅","绿叶椅子","沙滩椅子","椰子椅子", "女巫椅子"];
                    newdata.img = "res/Character/Chair/0301.img/" + data.id + ".info.icon.png"
                    newdata.name = names[data.shopid];
                }
                this.icon.skin = newdata.img;
                this.shopname.text = newdata.name;
                this.shopprice.text = data.price;
            }
        }

        onClose() {

        }

        /////

    }
}