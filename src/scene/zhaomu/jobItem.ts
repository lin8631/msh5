/// <reference path="./../../core/ms/Maple/Character.ts" />
module app.zhaomu {
    import cssCharacter = CharacterRole.Character;

    export class jobItem extends ui.zhaomu.jobItemUI  {
        public static className = "app.zhaomu.jobItem";
        private hero: cssCharacter;

        jobmob:Array<any> = ["6130101", "6300005", "8130100", "4130103", "5220004", "8500001", "8520000", "8510000", "8180000", "8180001"];
        updateData(data: any, index: number) {
            this.head.skin = "";
            this.changeJob.visible = false;
            this.num.color = "#FFFFFF";
            if(data) {
                this.head.skin = "common/" + data.job + ".png";
                this.changeJob.visible = data.can;
                this.msg.text = "击杀" + data.jobmsg;
                if(data.can) {
                    let num = 0;
                    if(ms.killmobsdata) {
                        for(let u:number = 0; u < ms.killmobsdata.length; u++) {
                            if(ms.killmobsdata[u].id == this.jobmob[index]) {
                                num = ms.killmobsdata[u].num;
                                break;
                            }
                        }
                    }
                    this.num.text = num + "/" + data.need;
                    if(num >= data.need) this.num.color = "#35f904";
                }
                else {
                    this.num.text = "已完成";
                }
            }
        }
        /*
        {"id":800101, "skill":"1211009","name":"生命恢复", "desc":"全体恢复25%的生命", "img":"res/Skill/121.img/skill.1211009.icon.png", "time":100},
        {"id":800102, "skill":"1320006", "name":"觉醒力量", "desc":"全体增加25%的攻击力", "img":"res/Skill/132.img/skill.1320006.icon.png", "time":100},
        {"id":800103, "skill":"1301006", "name":"极限防御", "desc":"全体增加25%防御力", "img":"res/Skill/130.img/skill.1301006.icon.png", "time":100},
        {"id":800104, "skill":"1221000", "name":"暴击激化", "desc":"全体增加25%的暴击率", "img":"res/Skill/122.img/skill.1221000.icon.png", "time":100},
        {"id":800105, "skill":"1221002", "name":"自在极意", "desc":"全体增加25%的闪避率", "img":"res/Skill/122.img/skill.1221002.icon.png", "time":100},
        {"id":800106, "skill":"3001003", "name":"精准之力", "desc":"全体增加25%的命中率", "img":"res/Skill/300.img/skill.3001003.icon.png", "time":100},
        {"id":800107, "skill":"4101004", "name":"二档速度", "desc":"全体增加25%的速度", "img":"res/Skill/410.img/skill.4101004.icon.png", "time":100},
        {"id":800108, "skill":"2321003", "name":"圣龙", "desc":"召唤圣龙（召唤兽继承主角100%的属性）", "img":"res/Skill/232.img/skill.2321003.icon.png", "time":100},
        {"id":800109, "skill":"3121006", "name":"火凤凰", "desc":"召唤火凤凰（召唤兽继承主角50%的属性）", "img":"res/Skill/312.img/skill.3121006.icon.png", "time":100},
        {"id":800110, "skill":"3221005", "name":"冰凤凰", "desc":"召唤冰凤凰（召唤兽继承主角50%的属性）", "img":"res/Skill/322.img/skill.3221005.icon.png", "time":100},
        {"id":800111, "skill":"1311006", "name":"龙息", "desc":"对敌方全体造成大量伤害（会触发所有怪物的仇恨）", "img":"res/Skill/131.img/skill.1311006.icon.png", "time":100}
        */

        onClose() {

        }

        /////

    }
}