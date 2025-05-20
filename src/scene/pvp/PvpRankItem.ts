module app.pvp {

    export class PvpRankItem extends ui.pvp.PvpRankItemUI {
        public static className = "app.pvp.PvpRankItem";

        updateData(data: any, index: number) {
            this.msg.text = "0 / 0 / 0";
            if(data) {
                // this.lblRank.text = data.rank;
                this.lblName.text = data.name;
                this.lblLV.text = "等级 " + data.lv;
                // this.lblRank.text = data.rank;
                this.lblRank2.text = "NO." + (index + 1);
                // if(data.msg) this.msg.text = data.msg;///暂时不处理
                // this.imgHead.skin = "homeland/head" + (data.sex + 1) + ".png";
                if((index + 1) < data.myrnk) this.battle.visible = true;
                else this.battle.visible = false;

                if(data.id == ms._user) this.self.visible = true;
                else this.self.visible = false;

                if((index + 1) == 1) {
                    this.rank.skin = "homeland/img_wangguna1.png";
                    this.lblName.color = "#f08d18";//红//strokeColor
                    // this.lblRank.strokeColor = "#f08d18";//红
                    this.lblLV.color = "#f08d18";//红
                    this.lblRank2.color = "#f08d18";//红
                }
                else if((index + 1) <= 3) {
                    this.rank.skin = "homeland/img_wangguna2.png";
                    this.lblName.color = "#e258fd";//紫
                    // this.lblRank.strokeColor = "#e258fd";//紫
                    this.lblLV.color = "#e258fd";//红
                    this.lblRank2.color = "#e258fd";//红
                }
                else {
                    this.rank.skin = "homeland/img_wangguna3.png";
                    this.lblName.color = "#3aa4fe";//蓝
                    // this.lblRank.strokeColor = "#3aa4fe";//蓝
                    this.lblLV.color = "#3aa4fe";//红
                    this.lblRank2.color = "#3aa4fe";//红
                }

            }
        }

        onClose() {

        }

        /////

    }
}