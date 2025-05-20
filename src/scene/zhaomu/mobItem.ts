module app.zhaomu {

    import cssMob = MobRole.Mob;

    export class mobItem extends ui.zhaomu.mobItemUI  {
        public static className = "app.zhaomu.mobItem";
        private m_mob:cssMob;

        updateData(data: any, index: number) {
            if(this.m_mob) {
                this.m_mob.clearUp();
                this.m_mob = null;
            }
            let id = data;
            if(id.length == 6) id = "0" + id;
            this.m_mob = new cssMob();
            this.m_mob.is_oneFrame = true;
            let lifeMsg:any = new Object();
            lifeMsg.id = id;
            lifeMsg.x = 0;
            lifeMsg.y =  0;
            this.m_mob.m_nametag_show = false;
            this.m_mob.changeAll(this.img, id + ".img", lifeMsg);
        }

        onClose() {
            if(this.m_mob) {
                this.m_mob.clearUp();
                this.m_mob = null;
            }
        }

        /////

    }
}