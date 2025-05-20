module msLoad {

    export var loadLst:Array<any> = [];  //loading列表

    /*
        设计思路[第一阶段需要优化内存，第二阶段需要优化性能]
        换皮不一定能成功、但是会多一个机会
    */

    export function load(res:any): P.Promise<string> {
        let d = P.defer<string>();
        Laya.loader.load(res, Laya.Handler.create(null,function(){
            d.resolve('')
        }));
        // if(true) {
        //     d.resolve('成功')
        // }
        // else {
        //     d.reject({message: "err"});
        // }
        return d.promise();
    }

    //第一次大Loading
    export function EnterGameLoad() : any {

    }

    //加载AvatarMegaphone
    //加载Back
    //加载BasicEff
    //加载BufEff
    //加载Bullet
    //加载Chair
    //加载Character
    //加载CharacterEffect
    //加载ChatBalloon
    //加载Item
    //加载Life
    //加载Map
    //加载Mob
    //加载Msg
    //加载NameTag
    //加载Npc
    //加载Obj
    //加载Pet
    //加载ReactorItem
    //加载SetEff
    //加载Skill
    //加载Summon
    //加载Tile
    //加载Hero

    // export function resTip(res:any, force:boolean = false) : void {
    //     for(let r:number = 0; r < res.length; r++) {
    //         let __tex = Laya.loader.getRes(res[r].url);
    //         if(__tex) {
    //             if(__tex.width >= 512 || __tex.height >= 512 || force) {
    //                 ///不放入大图和集里面
    //                 __tex.bitmap.enableMerageInAtlas = false;   //新增的这里
    //                 msMoudle.releaseRes[msMoudle.releaseRes.length] = res[r].url;
    //             }
    //         }
    //         else {
    //             console.log("资源标记错误" + res[r]);
    //             res.splice(r, 1);
    //         }
    //     }
    // }

    // export function loadWZ(cs:CssParser.Txt, str:string, ms:string, wzname:string = "") : any {
    //     let data = cs.loadHtml(Laya.loader.getRes(str), str, ms, wzname);
    //     //
    //     // for(let key in data) {
    //     //     console.log(str, key , "大小", data[key])
    //     // }
    //     msMoudle.doWZ(str);
    //     return data;
    // }
    // export function doWZ(str:string) : void {
    //     Laya.loader.clearRes(str, true);
    // }


}