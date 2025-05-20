/**
 * Utils 工具类
 * 禁止引用core,utils,sdk目录以外的其他类,防止循环引用问题
 */

declare class Long{
    low: number;
    high: number;
    toNumber():number;
};

enum CHAT_TYPE {
    ALL = 0,
    SYSTEM = 1,
    WORLD = 2
}

namespace app.utils {

    export function getBaseResPath():string{
        return "res"+version.ver.replace(/[.]/ig,"")+"/";
    }

    /**
     *  1.具有MediaStreamTrack支持特性的Android的QQ内核
     *  2.具有私有相机功能接口的iOS版QQ浏览器
     *  3.其他不符合1和2点中条件的浏览器
     *  @returns {number}
     */

    export function getSiteURL():string{
        // if (hGame){
        //     return hGame.fullGameUrl;
        // }
        return window.location.href;
    }

    // 获得URL参数
    export function getURLParameter(name:string, url?:string) :string {
        if (!url) url = utils.getSiteURL();
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    // 格式化秒到 type 1: 00:00:00 2:00小时00分00秒
    export function formatSeconds(value:number,type:number = 1):string {
        let theTime:number = _.floor(value);// 秒
        let theTime1:number = 0;// 分
        let theTime2:number = 0;// 小时
        if(theTime >= 60) {
            theTime1 = _.floor(theTime/60);
            theTime = theTime%60;
            if(theTime1 >= 60) {
                theTime2 = _.floor(theTime1/60);
                theTime1 = theTime1%60;
            }
        }
        let ret:string = "";
        if (type == 3) {
            if(theTime2 > 0) {
                ret = theTime2 +"小时";
                if(theTime1 > 0)
                    ret += theTime1 +"分钟";
            }
            else if(theTime1 > 0){
                ret = theTime1 +"分钟";
                if(theTime > 0)
                    ret += theTime+"秒";
            }
            else {
                ret = theTime+"秒";
            }
        }
        else if (type == 2){
            if(theTime2 > 0)
                ret = theTime2 +"小时"+theTime1 +"分"+theTime+"秒";
            else if(theTime1 > 0)
                ret = theTime1 +"分"+theTime+"秒";
            else
                ret = theTime+"秒";

        }else{
            if (theTime<10)
                ret = "0"+ theTime;
            else
                ret = theTime+"";

            if (theTime1<10)
                ret = "0"+ theTime1 +":"+ret;
            else
                ret = theTime1 +":"+ret;

            if (theTime2<10)
                ret = "0"+ theTime2 +":"+ret;
            else
                ret = theTime2 +":"+ret;
        }
        return ret;
    }

    export function formatSeconds2(value:number,format:string = "YYYY-MM-DD hh:mm:ss"):string {
        let date = new Date(value * 1000);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        let ret = format;
        if(ret.search("YYYY") > -1) {
            ret = ret.replace("YYYY", date.getFullYear() + "");
        }
        if(ret.search("MM") > -1) {
            ret = ret.replace("MM", (month < 10 ? "0" : "") + month);
        }
        else {
            ret = ret.replace("M", month + "");
        }
        if(ret.search("DD") > -1) {
            ret = ret.replace("DD", (day < 10 ? "0" : "") + day);
        }
        else {
            ret = ret.replace("D", day + "");
        }
        if(ret.search("hh") > -1) {
            ret = ret.replace("hh", (hour < 10 ? "0" : "") + hour);
        }
        else {
            ret = ret.replace("h", hour + "");
        }
        if(ret.search("mm") > -1) {
            ret = ret.replace("mm", (min < 10 ? "0" : "") + min);
        }
        else {
            ret = ret.replace("m", min + "");
        }
        if(ret.search("ss") > -1) {
            ret = ret.replace("ss", (sec < 10 ? "0" : "") + sec);
        }
        else {
            ret = ret.replace("s", sec + "");
        }
        return ret;
    }

    export function formatSeconds3(value:number,format:string = "YYYY-MM-DD"):string {
        let date = new Date(value * 1000);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        let ret = format;
        if(ret.search("YYYY") > -1) {
            ret = ret.replace("YYYY", date.getFullYear() + "");
        }
        if(ret.search("MM") > -1) {
            ret = ret.replace("MM", (month < 10 ? "0" : "") + month);
        }
        else {
            ret = ret.replace("M", month + "");
        }
        if(ret.search("DD") > -1) {
            ret = ret.replace("DD", (day < 10 ? "0" : "") + day);
        }
        else {
            ret = ret.replace("D", day + "");
        }
        return ret;
    }

    export function getNextClockTS(clock:string,nowTime:number):number{
        let times = _.split(clock,',');
        for (let i = 0;i<times.length;i++){
            let date1=new Date();
            date1.setHours(_.parseInt(times[i]),0,0,0);
            if (date1.getTime() >= nowTime){
                return date1.getTime() - nowTime;
            }
        }

        // 如果都没有,则要加一天
        //TODO:js不知道师傅要自己处理31号问题
        let date1=new Date();
        date1.setDate(date1.getDate()+1);
        date1.setHours(_.parseInt(times[0]),0,0,0);

        return date1.getTime() - nowTime;

    }

    //ts in millionseconds
    export function getLocalDate(ts:number):string{

        let t = new Date(ts);
        let month = t.getMonth() + 1;

        return t.getFullYear() + "/" + month + "/" +t.getDate();

    }

    //ts in millionseconds
    export function formatDate(ts:number, separate:string = "-"):string{
        let t = new Date(ts);
        let month = t.getMonth() + 1;

        return t.getFullYear() + separate + month + separate +t.getDate();
    }

    //sec to hour, min, sec
    export function getHMS(sec:number): Array<number> {
        let arr : Array<number> = [];
        arr[0] = Math.floor(sec / 3600);
        arr[1] = Math.floor((sec - 3600 * arr[0]) / 60);
        arr[2] = Math.floor(sec % 60);
        return arr;
    }

    //sec
    export function getLetters(sec:number): Array<number> {
        let arr : Array<number> = this.getHMS(sec);
        let res : Array<number> = [];
        for(let i=0; i<3; ++i) {
            if(arr[i] < 10) {
                res[2 * i] = 0;
                res[2 * i + 1] = arr[i];
            }
            else {
                res[2 * i] = Math.floor(arr[i] / 10);
                res[2 * i + 1] = Math.floor(arr[i] % 10);
            }
        }
        return res;
    }

    export function getMonthDayCount(year: number, month: number) {
        month++;
        if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            return 31;
        }
        if(month == 4 || month == 6 || month == 9 || month == 11) {
            return 30;
        }
        if(year % 4 == 0 && (year % 400) != 0) {
            return 29;
        }
        return 28;
    }

}
