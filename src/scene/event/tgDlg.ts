/// <reference path="./../../core/ms/Maple/Msg.ts" />
/// <reference path="./../../core/ms/Maple/Character.ts" />

module app.event {

    export class tgDlg extends ui.event.tgDlgUI implements ui.event.ItgDlgUI {
        public static className = "app.event.tgDlg";

        protected onInitialize() {

            this.bg.graphics.drawRect(0, 0, 640, 430, "#FFFFFF");
            // msMoudle.popShow(this, (800 - 600) / 2, (600 - 400) / 2);
            this.x = (Laya.stage.width - 640) / 2 - (Laya.stage.width - 800) / 2;
            this.y = (Laya.stage.height - 480) / 2 - (Laya.stage.height - 600) / 2;

            this.updateData();
        }

        onClose():void {

        }

        m_select:number = 0;
        updateData() {
            this.onSel_zfbClick(null);

            this.rshow.text = "特权开启联系QQ：" + msMoudle.maplejson["客服QQ"] + "\n代理游戏联系QQ：2768820569"
        }

        m1 = [
            "累计邀请5名好友进公告群(" + msMoudle.maplejson["玩家交流群"] + ")，然后截图给管家即可激活特权",
            "累计邀请15名好友进公告群(" + msMoudle.maplejson["玩家交流群"] + ")，然后截图给管家即可激活特权",
            "累计邀请30名好友进公告群(" + msMoudle.maplejson["玩家交流群"] + ")，然后截图给管家即可激活特权"
            ];
        m2 = [
            "1.打怪经验永久增加10%\n2.每日登录礼包提升50%\n3.神秘卷轴X1,枫叶X1000,黑金X100\n4.枫叶帽子X1",
            "1.打怪经验永久增加20%\n2.每日登录礼包提升100%\n3.神秘卷轴X3,枫叶X3000,黑金X500\n4.扎昆帽子X1",
            "1.打怪经验永久增加30%\n2.每日登录礼包提升150%\n3.神秘卷轴X6,枫叶X10000,黑金X1000\n4.GM帽子X1"
        ]

        onSel_zfbClick(e: Laya.Event): void {
            this.m_select = 0;
            this.sel_zfb.alpha = 0.2;
            this.sel_wx.alpha = 0;
            this.sel_qq.alpha = 0;
            this.req.text = this.m1[this.m_select];
            this.reward.text = this.m2[this.m_select];
        }
        onSel_wxClick(e: Laya.Event): void {
            this.m_select = 1;
            this.sel_zfb.alpha = 0;
            this.sel_wx.alpha = 0.2;
            this.sel_qq.alpha = 0;
            this.req.text = this.m1[this.m_select];
            this.reward.text = this.m2[this.m_select];
        }
        onSel_qqClick(e: Laya.Event): void {
            this.m_select = 2;
            this.sel_zfb.alpha = 0;
            this.sel_wx.alpha = 0;
            this.sel_qq.alpha = 0.2;
            this.req.text = this.m1[this.m_select];
            this.reward.text = this.m2[this.m_select];
        }

        onBtnBackClick(e: Laya.Event): void {
            // msMoudle.popClose(this, 300, 200);
            this.close();
            ui.show(app.battle.moveDlg, {black:true});
        }

        //

    }

}
