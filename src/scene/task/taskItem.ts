module app.task {

    export class taskItem extends ui.task.taskItemUI {
        public static className = "app.task.taskItem";

        updateData(data: any, index: number) {
            this.taskname.text = "";
            this.taskdesc.text = "";
            this.taskprosp.visible = false;
            let rewards = [this.reward1, this.reward2, this.reward3];
            let reward_num = [this.reward_num1, this.reward_num2, this.reward_num3];
            let reward_item = [this.reward_item1, this.reward_item2, this.reward_item3];
            for(let i:number = 0; i < 3; i++) {
                rewards[i].skin = "";
                reward_num[i].text = "";
            }
            if(data) {
                this.taskname.text = data.name;
                this.taskdesc.text = data.desc;
                if(data.isok == 1) {
                   this.jindu.text = "已完成";
                   this.jindu.color = "#8d1e1d";
                   this.jindu.stroke = 2;
                   this.jindu.strokeColor = "#FFFFFF";
                }
                else {
                    this.jindu.color = "#FFFFFF";
                    this.jindu.stroke = 0;
                    let jindu:any = data.item.split("#");
                    let bag_num:number = 0;
                    //统计背包的
                    for(let i:number = 0; i < ms.bagsdata.length; i++) {
                        if(ms.bagsdata[i]) {
                            if(ms.bagsdata[i].id == jindu[0]) bag_num = ms.bagsdata[i].num;
                        }
                    }
                    //统计关卡
                    if(bag_num == 0) {
                        if(jindu[0] >= 501 && jindu[0] <= 510) {
                            if(ms.bossguanka + 500 > jindu[0]) bag_num = 1;
                        }
                    }
                    //统计消灭怪物的
                    if(bag_num == 0) {
                        if(ms.killmobsdata) {
                            for(let u:number = 0; u < ms.killmobsdata.length; u++) {
                                if(ms.killmobsdata[u]) {
                                    if(ms.killmobsdata[u].id == jindu[0]) {
                                        bag_num = ms.killmobsdata[u].num;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    //统计关卡
                    if(jindu[0] <= 200) {
                        if(bag_num == 0) {
                            if(ms.guanka > jindu[0]) bag_num = 1;
                        }
                    }
                    //每日
                    if(jindu[0] >= 600 && jindu[0] <= 608) {
                        if(jindu[0] == 600) bag_num = ms.d600;
                        if(jindu[0] == 601) bag_num = ms.d601;
                        if(jindu[0] == 602) bag_num = ms.d602;
                        if(jindu[0] == 603) bag_num = ms.d603;
                        if(jindu[0] == 604) bag_num = ms.d604;
                        if(jindu[0] == 605) bag_num = ms.d605;
                        if(jindu[0] == 606) bag_num = ms.d606;
                        if(jindu[0] == 607) bag_num = ms.d607;
                        if(jindu[0] == 608) bag_num = ms.d608;
                    }
                    if(bag_num >= jindu[1]) {
                        this.jindu.text = "完成";
                        this.taskprosp.visible = true;
                    }
                    else {
                        this.jindu.text = bag_num  + "/" + jindu[1];
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
                    else if(rw[0] == "700000000") {
                        rewards[0].skin = "homeland/04001017.info.icon.png";
                    }
                    else if(rw[0] == "800000000") {
                        rewards[0].skin = "homeland/04001129.info.icon.png";
                    }
                    else if(rw[0] == "600000002") {
                        rewards[0].skin = "homeland/04001190.info.icon.png";
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
                    else if(rw[2] == "700000000") {
                        rewards[1].skin = "homeland/04001017.info.icon.png";
                    }
                    else if(rw[2] == "800000000") {
                        rewards[1].skin = "homeland/04001129.info.icon.png";
                    }
                    else if(rw[2] == "600000002") {
                        rewards[1].skin = "homeland/04001190.info.icon.png";
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
                    else if(rw[4] == "700000000") {
                        rewards[2].skin = "homeland/04001017.info.icon.png";
                    }
                    else if(rw[4] == "800000000") {
                        rewards[2].skin = "homeland/04001129.info.icon.png";
                    }
                    else if(rw[4] == "600000002") {
                        rewards[2].skin = "homeland/04001190.info.icon.png";
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
            }
        }

        onClose() {

        }

        /////

    }
}