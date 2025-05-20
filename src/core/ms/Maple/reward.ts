module msReward {
    //剧情
    export function _r1() : void {
        // ms.story = 0;
        if(ms.herodata.Lv == 1 && ms.story == 0) ms.story = 1;
        if(ms.zhaomu) ms.story = 0;

        // ms.story = 0;
    }
    //招募
    export function _r2() : boolean {
        return true;
    }
    //领主
    export function _r3() : boolean {
        return true;
    }
    //任务
    export function _r4() : boolean {
        if(ms.killmobsdata["3501002"]) {
            if(ms.killmobsdata["3501002"].num == 5) {
                return true;
            }
        }
        return false;
    }
    //精神修炼
     export function _r5() : boolean {
        return true;
    }
    //忍苦
     export function _r6() : boolean {
        return true;
    }

}