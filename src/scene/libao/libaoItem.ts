module app.libao {

    export class libaoItem extends ui.libao.libaoItemUI {
        public static className = "app.libao.libaoItem";

        updateData(data: any, index: number) {
            this.taskname.text = "";
            // this.taskdesc.text = "";
            this.taskprosp.visible = false;
            let rewards = [this.reward1, this.reward2, this.reward3, this.reward4];
            let reward_num = [this.reward_num1, this.reward_num2, this.reward_num3, this.reward_num4];
            let reward_item = [this.reward_item1, this.reward_item2, this.reward_item3, this.reward_item4];
            for(let i:number = 0; i < 4; i++) {
                rewards[i].skin = "";
                reward_num[i].text = "";
            }
            if(data) {
                this.taskname.text = data.name;
                // this.taskdesc.text = data.desc;
                if(data.isok == 1) {
                   this.jindu.text = "已领取";
                   this.jindu.color = "#8d1e1d";
                   this.jindu.stroke = 2;
                   this.jindu.strokeColor = "#FFFFFF";
                }
                else {
                    this.jindu.color = "#FFFFFF";
                    this.jindu.stroke = 0;

                    let jindu:any = data.item.split("#");
                    let bag_num:number = ms.herodata.Lv;
                    //充值
                    if(jindu[0] >= 901 && jindu[0] <= 908) {
                        if(jindu[0] == 901) jindu[1] = 5;
                        else if(jindu[0] == 902) jindu[1] = 10;
                        else if(jindu[0] == 903) jindu[1] = 30;
                        else if(jindu[0] == 904) jindu[1] = 50;
                        else if(jindu[0] == 905) jindu[1] = 100;
                        else if(jindu[0] == 906) jindu[1] = 200;
                        else if(jindu[0] == 907) jindu[1] = 300;
                        else if(jindu[0] == 908) jindu[1] = 500;
                        bag_num = ms.czValue;
                        if(bag_num == jindu[1]) {
                            this.jindu.text = "完成";
                            this.taskprosp.visible = true;
                        }
                        else {
                            this.jindu.text = "0/" + jindu[1];
                        }
                    }
                    else {
                        if(bag_num >= jindu[1]) {
                            this.jindu.text = "完成";
                            this.taskprosp.visible = true;
                        }
                        else {
                            this.jindu.text = bag_num  + "/" + jindu[1];
                        }
                    }
                }
                let rw:any = data.reward.split("#");
                if(rw[0]) {
                    reward_item[0].visible = true;
                    if(rw[0] == "9000000") {
                        rewards[0].skin = "homeland/02022995.info.icon.png";
                    }
                    else if(rw[0] == "1234561") {
                        rewards[0].skin = "homeland/02028044.info.icon.png";
                    }
                    else if(rw[0] == "1234562") {
                        rewards[0].skin = "homeland/02048719.info.icon.png";
                    }
                    else if(rw[0] == "987654321") {
                        rewards[0].skin = "homeland/04000334.info.icon.png";
                    }
                    else if(rw[0] == "700000000") {
                        rewards[0].skin = "homeland/04001017.info.icon.png";
                    }
                    else if(rw[0] == "900000000") {
                        rewards[0].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[0] == "800000000") {
                        rewards[0].skin = "homeland/04001129.info.icon.png";
                    }
                    else if(rw[0] == "600000002") {
                        rewards[0].skin = "homeland/04001190.info.icon.png";
                    }
                    else if(rw[0] == "1234531") {
                        rewards[0].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[0] == "1234532") {
                        rewards[0].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[0] == "1234533") {
                        rewards[0].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[0] == "1234534") {
                        rewards[0].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[0] == "1234535") {
                        rewards[0].skin = "homeland/04001374.info.icon.png";
                    }

                    else if(msMoudle.isJuanZhou(Number(rw[0]))) {
                        let item = msMoudle.getItemMsg(Number(rw[0]));
                        rewards[0].skin = item.img;
                    }
                    else {
                        let item = msMoudle.getEqpMsg(rw[0]);
                        rewards[0].skin = item.img;
                    }
                    reward_num[0].text = rw[1];
                }
                else {
                    reward_item[0].visible = false;
                }
                if(rw[2]) {
                    reward_item[1].visible = true;
                    if(rw[2] == "9000000") {
                        rewards[1].skin = "homeland/02022995.info.icon.png";
                    }
                    else if(rw[2] == "1234561") {
                        rewards[1].skin = "homeland/02028044.info.icon.png";
                    }
                    else if(rw[2] == "1234562") {
                        rewards[1].skin = "homeland/02048719.info.icon.png";
                    }
                    else if(rw[2] == "987654321") {
                        rewards[1].skin = "homeland/04000334.info.icon.png";
                    }
                    else if(rw[2] == "700000000") {
                        rewards[1].skin = "homeland/04001017.info.icon.png";
                    }
                    else if(rw[2] == "900000000") {
                        rewards[1].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[2] == "800000000") {
                        rewards[1].skin = "homeland/04001129.info.icon.png";
                    }
                    else if(rw[2] == "600000002") {
                        rewards[1].skin = "homeland/04001190.info.icon.png";
                    }
                    else if(rw[2] == "1234531") {
                        rewards[1].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[2] == "1234532") {
                        rewards[1].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[2] == "1234533") {
                        rewards[1].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[2] == "1234534") {
                        rewards[1].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[2] == "1234535") {
                        rewards[1].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(msMoudle.isJuanZhou(Number(rw[2]))) {
                        let item = msMoudle.getItemMsg(Number(rw[2]));
                        rewards[1].skin = item.img;
                    }
                    else {
                        let item = msMoudle.getEqpMsg(rw[2]);
                        rewards[1].skin = item.img;
                    }
                    reward_num[1].text = rw[3];
                }
                else {
                    reward_item[1].visible = false;
                }
                if(rw[4]) {
                    reward_item[2].visible = true;
                    if(rw[4] == "9000000") {
                        rewards[2].skin = "homeland/02022995.info.icon.png";
                    }
                    else if(rw[4] == "1234561") {
                        rewards[2].skin = "homeland/02028044.info.icon.png";
                    }
                    else if(rw[4] == "1234562") {
                        rewards[2].skin = "homeland/02048719.info.icon.png";
                    }
                    else if(rw[4] == "987654321") {
                        rewards[2].skin = "homeland/04000334.info.icon.png";
                    }
                    else if(rw[4] == "700000000") {
                        rewards[2].skin = "homeland/04001017.info.icon.png";
                    }
                    else if(rw[4] == "900000000") {
                        rewards[2].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[4] == "800000000") {
                        rewards[2].skin = "homeland/04001129.info.icon.png";
                    }
                    else if(rw[4] == "600000002") {
                        rewards[2].skin = "homeland/04001190.info.icon.png";
                    }
                    else if(rw[4] == "1234531") {
                        rewards[2].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[4] == "1234532") {
                        rewards[2].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[4] == "1234533") {
                        rewards[2].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[4] == "1234534") {
                        rewards[2].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[4] == "1234535") {
                        rewards[2].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(msMoudle.isJuanZhou(Number(rw[4]))) {
                        let item = msMoudle.getItemMsg(Number(rw[4]));
                        rewards[2].skin = item.img;
                    }
                    else {
                        let item = msMoudle.getEqpMsg(rw[4]);
                        rewards[2].skin =  item.img;
                    }
                    reward_num[2].text = rw[5];
                }
                else {
                    reward_item[2].visible = false;
                }
                if(rw[6]) {
                    reward_item[3].visible = true;
                    if(rw[6] == "9000000") {
                        rewards[3].skin = "homeland/02022995.info.icon.png";
                    }
                    else if(rw[6] == "1234561") {
                        rewards[3].skin = "homeland/02028044.info.icon.png";
                    }
                    else if(rw[6] == "1234562") {
                        rewards[3].skin = "homeland/02048719.info.icon.png";
                    }
                    else if(rw[6] == "987654321") {
                        rewards[3].skin = "homeland/04000334.info.icon.png";
                    }
                    else if(rw[6] == "700000000") {
                        rewards[3].skin = "homeland/04001017.info.icon.png";
                    }
                    else if(rw[6] == "900000000") {
                        rewards[3].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[6] == "800000000") {
                        rewards[3].skin = "homeland/04001129.info.icon.png";
                    }
                    else if(rw[6] == "600000002") {
                        rewards[3].skin = "homeland/04001190.info.icon.png";
                    }
                    else if(rw[6] == "1234531") {
                        rewards[3].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[6] == "1234532") {
                        rewards[3].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[6] == "1234533") {
                        rewards[3].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[6] == "1234534") {
                        rewards[3].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(rw[6] == "1234535") {
                        rewards[3].skin = "homeland/04001374.info.icon.png";
                    }
                    else if(msMoudle.isJuanZhou(Number(rw[6]))) {
                        let item = msMoudle.getItemMsg(Number(rw[6]));
                        rewards[3].skin = item.img;
                    }
                    else {
                        let item = msMoudle.getEqpMsg(rw[6]);
                        rewards[3].skin =  item.img;
                    }
                    reward_num[3].text = rw[7];
                }
                else {
                    reward_item[3].visible = false;
                }
            }
        }

        show(rw:string, rewards:any) : void {
            if(rw == "9000000") {
                rewards.skin = "homeland/02022995.info.icon.png";
            }
            else if(rw == "1234561") {
                rewards.skin = "homeland/02028044.info.icon.png";
            }
            else if(rw == "1234562") {
                rewards.skin = "homeland/02048719.info.icon.png";
            }
            else if(rw == "987654321") {
                rewards.skin = "homeland/04000334.info.icon.png";
            }
            else if(rw == "700000000") {
                rewards.skin = "homeland/04001017.info.icon.png";
            }
            else if(rw == "900000000") {
                rewards.skin = "homeland/04001374.info.icon.png";
            }
            else if(rw == "800000000") {
                rewards.skin = "homeland/04001129.info.icon.png";
            }
            else if(rw[0] == "600000002") {
                rewards.skin = "homeland/04001190.info.icon.png";
            }
        }

        onClose() {

        }

        /////

    }
}