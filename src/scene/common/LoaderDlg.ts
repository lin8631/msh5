/// <reference path="./../../core/ms/Maple/CssParser.ts" />

module app.common {
    import cssParser = CssParser.Txt;
    import cssMob = MobRole.Mob;

    export class LoaderDlg extends ui.common.LoaderDlgUI{
        public static className = "app.common.LoaderDlg";
        private m_mob:cssMob;

        protected onInitialize() {

            this.imgBg.width = Laya.stage.width;
            this.imgBg.height = Laya.stage.height;
            this.shuoming.visible = true;

            ///显示mob
            let rnkmob = ["0100100", "0100101", "0120100", "0130101"];
            let rnk = msMoudle.getRandValue(0, 0, rnkmob.length)
            this.m_mob = new cssMob();
            this.m_mob.m_canf = false;
            let lifeMsg:any = new Object();
            lifeMsg.id = Number(rnkmob[rnk]);
            lifeMsg.x = 0;
            lifeMsg.y =  0;
            lifeMsg.action = "move";
            this.m_mob.changeAll(this.imgMogu, rnkmob[rnk] + ".img", lifeMsg);

            Laya.timer.once(1000, this, ()=> {
                this.shuoming.visible = false;
                this.logo.visible = true;
                this.loadRes();
            });
        }
        // test_tamingmob:Array<any> = [];
        // [
        //     "01902000","01902001","01902004","01902005","01902006","01902007","01902008","01902009","01902010","01902011","01902013","01902014","01902015","01902016","01902017","01902018","01902019","01902020",
        //     "01902021","01902024","01902028","01902031","01902032","01902033","01902034","01902035","01902036","01902037","01902038","01902039","01902040","01902041","01902042","01902045","01902047","01902048",
        //     "01902059","01902060","01902061","01902062","01912000","01912002","01912003","01912004","01912005","01912006","01912007","01912009","01912010","01912011","01912012","01912013","01912014","01912017",
        //     "01912021","01912024","01912025","01912026","01912027","01912028","01912029","01912030","01912031","01912032","01912033","01912034","01912035","01912038","01912040","01912041","01912052","01912053",
        //     "01912054","01930000","01930001","01932000","01932001","01932002","01932003","01932004","01932005",
        //     "01932006","01932007","01932008","01932009","01932010","01932011","01932012","01932013","01932014",
        //     "01932015","01932016","01932017","01932018","01932020","01932021","01932022","01932023","01932025",
        //     "01932026","01932027","01932028","01932029","01932030","01932031","01932032","01932033","01932034",
        //     "01932035","01932036","01932038","01932041","01932043","01932044","01932045","01932046","01932047",
        //     "01932048","01932049","01932050","01932051","01932052","01932053","01932054","01932055","01932056",
        //     "01932057","01932058","01932059","01932060","01932061","01932065","01932071","01932080","01932081",
        //     "01932084","01932086","01932087","01932088","01932089","01932090","01932091","01932092","01932096",
        //     "01932097","01932098","01932099","01932106","01932107","01932108","01932110","01932112","01932113",
        //     "01932114","01932116","01932117","01932118","01932123","01932124","01932126","01932132","01932133",
        //     "01932138","01932139","01932140","01932142","01932147","01932148","01932150","01932151","01932152",
        //     "01932153","01932155","01932156","01932157","01932158","01932159","01932161","01932162","01932163",
        //     "01932166","01932171","01932173","01932174","01932175","01932187","01932188","01932192","01932193",
        //     "01932198","01932199","01932200","01932201","01932203","01932204","01932205","01932207","01932211",
        //     "01932212","01932214","01932216","01932221","01932223","01932224","01932226","01932235","01932237",
        //     "01932238","01932239","01932240","01932241","01932242","01932243","01932244","01932245","01932246",
        //     "01932247","01932249","01932251","01932252","01932253","01932254","01932256","01932258","01932259",
        //     "01932261","01932263","01932264","01932265","01932266","01932267","01932268","01932269","01932270",
        //     "01932271","01932272","01932273","01932274","01932276","01932277","01932280","01932286","01932287",
        //     "01932290","01932291","01932293","01932296","01932300","01932301","01932302","01932306","01932311",
        //     "01932315","01932317","01932318","01932319","01932321","01932323","01932324","01932325","01932328",
        //     "01932333","01932334","01932336","01932337","01932339","01932341","01932342","01932344","01932346",
        //     "01932347","01932351","01932353","01932354","01932355","01932357","01932358","01932359","01932360",
        //     "01932361","01932363","01932366","01932369","01932371","01932373","01932374","01932375","01932376",
        //     "01932377","01932378","01932379","01932380","01932383","01932384","01932385","01932387","01932388",
        //     "01932389","01932390","01932391","01932392","01932393","01932394","01932396","01932398","01932401",
        //     "01932403","01932406","01932407","01932408","01932409","01932410","01932411","01932412","01932413",
        //     "01932414","01932415","01932416","01932418","01932419","01932420","01932421","01932422","01932425",
        //     "01932426","01932427","01932428","01932430","01932431","01932432","01932433","01932435","01932437",
        //     "01932438","01932439","01932440","01932441","01932442","01932445","01932446","01932448","01932449",
        //     "01932452","01932453","01932455","01932456","01932457","01939000","01939001","01939002","01939003",
        //     "01939004","01939005","01983000","01983001","01983002","01983003","01983004","01983005","01983006",
        //     "01983007","01983008","01983010","01983011","01983012","01983014","01983015","01983016","01983017",
        //     "01983018","01983019","01983020","01983021","01983022","01983024","01983025","01983027","01983029",
        //     "01983030","01983032","01983035","01983036","01983038","01983039","01983042","01983043","01983044",
        //     "01983048","01983049","01983050","01983051","01983053","01983055","01983056","01983057","01983058",
        //     "01983059","01983060","01983061","01983066","01983067","01983075","01983076","01983078","01983079","01983082","01983083","01983084","01983085","01983086","01983087","01983088","01983089","01983090",
        //     "01983091","01983093","01983095","01983100","01983101","01983102","01983104","01983105","01983106",
        //     "01983107","01983108","01983109","01983110","01983111","01983112","01983124","01983125","01983126",
        //     "01983127","01983128","01983129","01983130","01983131","01983132","01983133","01983134","01983135",
        //     "01983137","01983138","01983139","01983140","01983141","01983142","01983143","01983144","01983145",
        //     "01983146","01983152","01983153","01983154","01983157","01983161","01983162","01983164","01983168",
        //     "01983169","01983170","01983173","01983174","01983176","01983181","01983182","01983184","01983186",
        //     "01983187","01983188","01983191","01983207","01983209","01983210","01983224","01983229","01983230",
        //     "01983232","01983233","01983235","01983236","01983239","01983240","01983241","01983243","01983245",
        //     "01983248","01983251","01983252","01983256","01983257","01983258","01983259","01983260","01983264",
        //     "01983270","01983271","01983272","01983273","01983278","01983286","01983287","01983290","01983291",
        //     "01983292","01983293","01983295","01983297","01983304","01983306","01983307","01983308","01983309","01983310","01983318","01983320","01983322","01983323","01983324","01983325","01983326","01983333","01983334","01983337","01983338","01983341","01983342","01983343","01983353","01983354","01983355","01983356","01983357","01983358","01983359","01983360","01983361","01983363","01983364","01983369","01983380","01992003","01992004","01992005","01992006","01992007","01992009","01992013","01992015","01992027","01992030","01992031","01992033"
        // ];

        public loadRes() : void {

            // let message = new Net.Message();
            // message.xieyi = 10283 + ms._dpip;
            // message.msdata = "Susake_MXD";
            // msMoudle.wsocket.sendMsg({param: message, success:(data: any) => {}});

            let res:Array<any> = [];
            // for(let i:number = 0; i < msMoudle.AllBody.length; i++) {
            //     res.push({ url: "res/Character/Body/" + msMoudle.AllBody[i] + ".img/index.html" });
            // }
            res.push({ url: "res/Character/Body/00002000.img/index.html" });//这一个就有4M
            //角色皮肤
            for(let i:number = 0; i < msMoudle.AllBody.length; i++) {
                for(let j:number = 0; j < msMoudle.bodyPng.length; j++) {
                    res.push({ url: "res/Character/Body/" + msMoudle.AllBody[i] + ".img/" + msMoudle.bodyPng[j] + ".png" });
                }
            }
            //hit
            res.push({ url: "res/Character/Afterimage/hit.img/mace1.0.png" });
            res.push({ url: "res/Character/Afterimage/hit.img/mace1.1.png" });

            // for(let i:number = 0; i < msMoudle.AllHead.length; i++) {
            //     res.push({ url: "res/Character/Head/" + msMoudle.AllHead[i] + ".img/index.html" });
            // }
            // res.push({ url: "res/Character/Head/00012000.img/index.html" });
            // for(let i:number = 0; i < msMoudle.AllFace.length; i++) {
            //     res.push({ url: "res/Character/Face/" + msMoudle.AllFace[i] + ".img/index.html" });
            // }
            // res.push({ url: "res/Character/Face/00020012.img/index.html" });
            // for(let i:number = 0; i < this.test_weapon.length; i++) {
            //     res.push({ url: "res/Character/Weapon/" + this.test_weapon[i] + ".img/index.html" });
            // }
            for(let i:number = 0; i < msMoudle.test_fweapon.length; i++) {
                res.push({ url: "res/Character/Weapon/" + msMoudle.test_fweapon[i] + ".img/index.html" });
            }
            // for(let i:number = 0; i < msMoudle.AllWeapon.length; i++) {
            //     res.push({ url: "res/Character/Weapon/" + msMoudle.AllWeapon[i] + ".img/index.html" });
            // }
            // for(let i:number = 0; i < msMoudle.AllAccessory1.length; i++) {
            //     res.push({ url: "res/Character/Accessory1/" + msMoudle.AllAccessory1[i] + ".img/index.html" });
            // }
            // for(let i:number = 0; i < msMoudle.AllAccessory2.length; i++) {
            //     res.push({ url: "res/Character/Accessory2/" + msMoudle.AllAccessory2[i] + ".img/index.html" });
            // }
            // for(let i:number = 0; i < msMoudle.AllAccessory3.length; i++) {
            //     res.push({ url: "res/Character/Accessory3/" + msMoudle.AllAccessory3[i] + ".img/index.html" });
            // }
            // for(let i:number = 0; i < msMoudle.AllAccessory4.length; i++) {
            //     res.push({ url: "res/Character/Accessory4/" + msMoudle.AllAccessory4[i] + ".img/index.html" });
            // }
            // for(let i:number = 0; i < msMoudle.AllAccessory5.length; i++) {
            //     res.push({ url: "res/Character/Accessory5/" + msMoudle.AllAccessory5[i] + ".img/index.html" });
            // }
            // for(let i:number = 0; i < msMoudle.AllAccessory6.length; i++) {
            //     res.push({ url: "res/Character/Accessory6/" + msMoudle.AllAccessory6[i] + ".img/index.html" });
            // }
            // for(let i:number = 0; i < msMoudle.AllLongCoat.length; i++) {
            //     res.push({ url: "res/Character/LongCoat/" + msMoudle.AllLongCoat[i] + ".img/index.html" });
            // }
            // for(let i:number = 0; i < msMoudle.AllFashion.length; i++) {
            //     res.push({ url: "res/Character/LongCoat/" + msMoudle.AllFashion[i] + ".img/index.html" });
            // }
            // for(let i:number = 0; i < msMoudle.AllCape.length; i++) {
            //     res.push({ url: "res/Character/Cape/" + msMoudle.AllCape[i] + ".img/index.html" });
            // }
            // for(let i:number = 0; i < msMoudle.AllShield.length; i++) {
            //     res.push({ url: "res/Character/Shield/" + msMoudle.AllShield[i] + ".img/index.html" });
            // }
            for(let i:number = 0; i < msMoudle.AllRing.length; i++) {
                res.push({ url: "res/Character/Ring/" + msMoudle.AllRing[i] + ".img/index.html" });
            }
            // res.push({ url: "res/Skill/000.img/index.html" });
            for(let i:number = 0; i < msMoudle.skillList.length; i++) {
                if(!Laya.loader.getRes("res/Skill/" + msMoudle.skillList[i]
                + ".img/index.html")) {
                    res.push({ url: "res/Skill/" + msMoudle.skillList[i]
                + ".img/index.html" });
                }
            }
            //用来预加载body
            for(let i:number = 0; i < msMoudle.preSkillList.length; i++) {
                if(!Laya.loader.getRes("res/Skill/" + msMoudle.preSkillList[i]
                + ".img/index.html")) {
                    res.push({ url: "res/Skill/" + msMoudle.preSkillList[i]
                + ".img/index.html" });
                }
            }

            // for(let i:number = 0; i < this.test_longcoat.length; i++) {
            //     res.push({ url: "res/Character/LongCoat/" + this.test_longcoat[i] + ".img/index.html" });
            // }

            // for(let i:number = 0; i < msMoudle.AllCoat.length; i++) {
            //     res.push({ url: "res/Character/Coat/" + msMoudle.AllCoat[i] + ".img/index.html" });
            // }
            // res.push({ url: "res/Character/Coat/01040002.img/index.html" });
            // res.push({ url: "res/Character/Coat/01041002.img/index.html" });

            // for(let i:number = 0; i < msMoudle.AllPants.length; i++) {
            //     res.push({ url: "res/Character/Pants/" + msMoudle.AllPants[i] + ".img/index.html" });
            // }
            // res.push({ url: "res/Character/Pants/01060002.img/index.html" });
            // res.push({ url: "res/Character/Pants/01061001.img/index.html" });

            // for(let i:number = 0; i < msMoudle.AllGlove.length; i++) {
            //     res.push({ url: "res/Character/Glove/" + msMoudle.AllGlove[i] + ".img/index.html" });
            // }

            // for(let i:number = 0; i < msMoudle.AllHair.length; i++) {
            //     res.push({ url: "res/Character/Hair/" + msMoudle.AllHair[i] + ".img/index.html" });
            // }
            // res.push({ url: "res/Character/Hair/00030020.img/index.html" });
            // res.push({ url: "res/Character/Hair/00031000.img/index.html" });

            // for(let i:number = 0; i < msMoudle.AllShoes.length; i++) {
            //     res.push({ url: "res/Character/Shoes/" + msMoudle.AllShoes[i] + ".img/index.html" });
            // }
            // res.push({ url: "res/Character/Shoes/01072171.img/index.html" });
            // res.push({ url: "res/Character/Shoes/01070016.img/index.html" });

            // for(let i:number = 0; i < this.test_cape.length; i++) {
            //     res.push({ url: "res/Character/Cape/" + this.test_cape[i] + ".img/index.html" });
            // }

            // for(let i:number = 0; i < this.test_cap.length; i++) {
            //     res.push({ url: "res/Character/Cap/" + this.test_cap[i] + ".img/index.html" });
            // }

            res.push({ url: "res/Character/TamingMob/01932261.img/index.html" });
            res.push({ url: "res/Character/TamingMob/01932000.img/index.html" });
            for(let i:number = 0; i < msMoudle.AllTamingMob.length; i++) {
                res.push({ url: "res/Character/TamingMob/" + msMoudle.AllTamingMob[i] + ".img/index.html" });
            }
            // for(let i:number = 0; i < this.test_tamingmob.length; i++) {
            //     res.push({ url: "res/Character/TamingMob/" + this.test_tamingmob[i] + ".img/index.html" });
            // }

            //01902004 "01932211", "01932351", "01932152", "01932407"
            //鞍子
            res.push({ url: "res/Character/TamingMob/01912000.img/index.html" });
            res.push({ url: "res/Character/TamingMob/01912021.img/index.html" });
            res.push({ url: "res/Character/TamingMob/01912025.img/index.html" });
            res.push({ url: "res/Character/TamingMob/01912005.img/index.html" });

            // res.push({ url: "res/Mob/8240099.img/index.html" });
            // res.push({ url: "res/Mob/2400112.img/index.html" });
            // res.push({ url: "res/Mob/7130401.img/index.html" });
            // res.push({ url: "res/Mob/3501002.img/index.html" });
            // for(let i:number = 0; i < msMoudle.mobList.length; i++) {
            //     if(!Laya.loader.getRes("res/Mob/" + msMoudle.mobList[i] + ".img/index.html")) {
            //         res.push({ url: "res/Mob/" + msMoudle.mobList[i] + ".img/index.html" });
            //     }
            // }

            res.push({ url: "res/ItemUse/0206.img/index.html" });
            res.push({ url: "res/ItemUse/0207.img/index.html" });
            // res.push({ url: "res/ItemUse/0233.img/index.html" });
            // res.push({ url: "res/ItemUse/0502.img/index.html" });

            // for(let i:number = 0; i < msMoudle.AllPet.length; i++) {
            //     res.push({ url: "res/Pet/" + msMoudle.AllPet[i] + ".img/index.html" });
            // }
            // for(let i:number = 0; i < this.test_map.length; i++) {
            //     res.push({ url: "res/Map/Map/" + this.test_map[i] + ".img/index.html" });
            // }
            // for(let i:number = 0; i < msMoudle.AllNpc.length; i++) {
            //     res.push({ url: "res/Map/Npc/" + msMoudle.AllNpc[i] + ".img/index.html" });
            // }

            // res.push({ url: "res/Map/Reactor/0002001.img/index.html" });
            // res.push({ url: "res/Map/Reactor/1022003.img/index.html" });
            // res.push({ url: "res/Map/Reactor/1012000.img/index.html" });
            // res.push({ url: "res/Map/Reactor/1052004.img/index.html" });

            for(let i:number = 0; i < msMoudle.AllAfterimage.length; i++) {
                res.push({ url: "res/Character/Afterimage/" + msMoudle.AllAfterimage[i] + ".img/index.html" });
            }
            res.push({ url: "res/Character/Afterimage/hit.img/index.html" });

            res.push({ url: "res/Item/0900.img/index.html" });
            res.push({ url: "res/Item/0204.img/index.html" });
            res.push({ url: "res/Item/0400.img/index.html" });
            res.push({ url: "res/Item/0401.img/index.html" });
            res.push({ url: "res/Item/0402.img/index.html" });
            res.push({ url: "res/Item/0403.img/index.html" });
            // res.push({ url: "res/Item/0425.img/index.html" });
            // res.push({ url: "res/Character/Chair/0301.img/index.html" });

            res.push({ url: "res/String/Etc.img/index.html" });
            res.push({ url: "res/String/Consume.img/index.html" });
            res.push({ url: "res/String/Eqp.img/index.html" });
            res.push({ url: "res/String/Skill.img/index.html" });
            res.push({ url: "res/MonsterBook.img/index.html" });
            res.push({ url: "res/String/Mob.img/index.html" });
            res.push({ url: "res/String/Npc.img/index.html" });
            res.push({ url: "res/String/Pet.img/index.html" });

            res.push({ url: "res/Quest/Act.img/index.html" });
            res.push({ url: "res/Quest/Check.img/index.html" });
            res.push({ url: "res/Quest/QuestInfo.img/index.html" });
            res.push({ url: "res/Quest/Say.img/index.html" });

            res.push({ url: "res/Sound/Mob.img/index.html" });
            res.push({ url: "res/Sound/Skill.img/index.html" });

            res.push({ url: "res/NameTag.img/index.html" });
            res.push({ url: "res/ChatBalloon.img/index.html" });

            res.push({ url: "res/CharacterEff.img/index.html" });
            res.push({ url: "res/Map/MapHelper.img/index.html" });
            res.push({ url: "res/BasicEff.img/index.html" });
            res.push({ url: "res/QuestInfo.img/index.html" });      //任务
            res.push({ url: "res/QuestInfo.img/index2.html" });     //成就
            res.push({ url: "res/QuestInfo.img/index3.html" });     //每日任务
            res.push({ url: "res/QuestInfo.img/index4.html" });     //礼包
            res.push({ url: "res/QuestInfo.img/index5.html" });     //每日礼包
            res.push({ url: "res/QuestInfo.img/index6.html" });     //充值礼包
            res.push({ url: "res/Effect.img/index.html" });
            res.push({ url: "res/SetEff.img/index.html" });
            // res.push({ url: "res/Pet/PetEff.img/index.html" });
            res.push({ url: "res/Character/zmap_cn.img/index.html" });

            res.push({ url: "res/Data/character.json"});
            res.push({ url: "res/Data/shop2.json"});
            res.push({ url: "res/Data/guide.json"});
            res.push({ url: "res/Data/story.json"});
            res.push({ url: "res/Data/mob.json"});
            res.push({ url: "res/Data/boss.json"});
            res.push({ url: "res/Data/hero.json"});
            res.push({ url: "res/Data/skill.json"});
            res.push({ url: "res/Data/zhuanpan.json"});
            res.push({ url: "res/Data/pay.json"});

            res.push({ url: "res/Data/accessory1.json"});
            res.push({ url: "res/Data/accessory2.json"});
            res.push({ url: "res/Data/accessory3.json"});
            res.push({ url: "res/Data/accessory4.json"});
            res.push({ url: "res/Data/accessory5.json"});
            res.push({ url: "res/Data/accessory6.json"});
            res.push({ url: "res/Data/cap.json"});
            res.push({ url: "res/Data/cape.json"});
            res.push({ url: "res/Data/coat.json"});
            res.push({ url: "res/Data/longcoat.json"});
            res.push({ url: "res/Data/glove.json"});
            res.push({ url: "res/Data/pants.json"});
            res.push({ url: "res/Data/shield.json"});
            res.push({ url: "res/Data/shoes.json"});
            res.push({ url: "res/Data/weapon.json"});
            res.push({ url: "res/Data/map.json"});

            res.push({ url: "res/UI/head.png"});
            res.push({ url: "res/UI/ending.png"});
            res.push({ url: "res/UI/end.png"});
            res.push({ url: "res/UI/body.png"});
            res.push({ url: "res/UI/guide.png"});

            // res.push({ url: "res/Mob/8800000.img/stand.0.png"});
            // res.push({ url: "res/Mob/8800000.img/stand.1.png"});
            // res.push({ url: "res/Mob/8800000.img/stand.2.png"});
            // res.push({ url: "res/Mob/8800000.img/stand.3.png"});
            // res.push({ url: "res/Mob/8800000.img/stand.4.png"});
            // res.push({ url: "res/Mob/8800000.img/stand.5.png"});
            // res.push({ url: "res/Mob/8800000.img/stand.6.png"});
            // res.push({ url: "res/Mob/8800000.img/stand.7.png"});

            // res.push({ url: "res/Mob/8810008.img/stand.0.png"});
            // res.push({ url: "res/Mob/8810005.img/stand.0.png"});
            // res.push({ url: "res/Mob/8810005.img/stand.1.png"});
            // res.push({ url: "res/Mob/8810005.img/stand.2.png"});
            // res.push({ url: "res/Mob/8810005.img/stand.5.png"});
            // res.push({ url: "res/Mob/8810006.img/stand.0.png"});
            // res.push({ url: "res/Mob/8810006.img/stand.1.png"});
            // res.push({ url: "res/Mob/8810006.img/stand.2.png"});
            // res.push({ url: "res/Mob/8810006.img/stand.5.png"});
            res.push({url: "event/img_shouchonglibao.png"});

            for(let i:number = 1; i <= 12; i++) res.push({ url: "res/guide/guide_" + i + ".png"});
            for(let i:number = 1; i <= 29; i++) res.push({ url: "res/chouka/chouka_" + i + ".png"});

            this.shuoming.visible = false;
            this.imgBg.visible = true;
            this.prgLoading.visible = true;
            Laya.loader.load(res, Laya.Handler.create(this, this.onAssetLoaded),Laya.Handler.create(this, this.onLoading, null, false),Laya.Loader.IMAGE);

            Laya.timer.loop(25, this, this.xxAutoProgress);
            Laya.timer.loop(100, this, this.yyAutoProgress);
        }

        onClose(){
            if(this.m_mob) {
                this.m_mob.clearUp();
                this.m_mob = null;
            }
        }

        xxxx:number = 0;
        yyyy:number = 0;
        xxAutoProgress() {
            if(this.xxxx > 1) this.xxxx = 0;
            this.prgBar.value = 1 - this.xxxx;
            this.xxxx += 0.04;
        }
        yyAutoProgress() {
            if(this.yyyy < 1) this.yyyy += 0.01;
        }

        // 加载进度侦听器
        pro:number = 0;
        private onLoading(progress: number): void {
            this.pro = progress;
            if(progress > 0.95) {
                Laya.timer.clear(this, this.xxAutoProgress);
                this.prgBar.value = 0;
            }
            if(this.pro > this.yyyy)
                this.proMove(this.pro);
            else
                this.proMove(this.yyyy);
        }

        private onAssetLoaded(): void {
            Laya.timer.clear(this, this.xxAutoProgress);
            Laya.timer.clear(this, this.yyAutoProgress);
            // Laya.timer.once(100, this, ()=> {
                let cs:cssParser = new cssParser();
                msMoudle.wz["00002000.img"] = msMoudle.loadWZ(cs,"res/Character/Body/00002000.img/index.html", "ms");


                // for(let i:number = 0; i < msMoudle.AllBody.length; i++) {
                //     msMoudle.wz[msMoudle.AllBody[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Body/" + msMoudle.AllBody[i] + ".img/index.html", "ms");
                // }

                // msMoudle.wz["00012000.img"] = msMoudle.loadWZ(cs,"res/Character/Head/00012000.img/index.html", "ms");
                // for(let i:number = 0; i < msMoudle.AllHead.length; i++) {
                //     msMoudle.wz[msMoudle.AllHead[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Head/" + msMoudle.AllHead[i] + ".img/index.html", "ms");
                // }

                // msMoudle.wz["00020012.img"] = msMoudle.loadWZ(cs,"res/Character/Face/00020012.img/index.html", "ms", "face");
                // for(let i:number = 0; i < msMoudle.AllFace.length; i++) {
                //     msMoudle.wz[msMoudle.AllFace[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Face/" + msMoudle.AllFace[i] + ".img/index.html", "ms", "face");
                // }

                // for(let i:number = 0; i < this.test_weapon.length; i++) {
                //     if(!msMoudle.wz[this.test_weapon[i] + ".img"]) {
                //         msMoudle.wz[this.test_weapon[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Weapon/" + this.test_weapon[i] + ".img/index.html", "ms");
                //     }
                // }
                for(let i:number = 0; i < msMoudle.test_fweapon.length; i++) {
                    if(!msMoudle.wz[msMoudle.test_fweapon[i] + ".img"]) {
                        msMoudle.wz[msMoudle.test_fweapon[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Weapon/" + msMoudle.test_fweapon[i] + ".img/index.html", "ms2");
                    }
                }

                // for(let i:number = 0; i < msMoudle.AllWeapon.length; i++) {
                //     if(!msMoudle.wz[msMoudle.AllWeapon[i] + ".img"]) {
                //         msMoudle.wz[msMoudle.AllWeapon[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Weapon/" + msMoudle.AllWeapon[i] + ".img/index.html", "ms");
                //     }
                // }

                // for(let i:number = 0; i < msMoudle.AllAccessory1.length; i++) {
                //     if(!msMoudle.wz[msMoudle.AllAccessory1[i] + ".img"]) {
                //         msMoudle.wz[msMoudle.AllAccessory1[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Accessory1/" + msMoudle.AllAccessory1[i] + ".img/index.html", "ms");
                //     }
                // }
                // for(let i:number = 0; i < msMoudle.AllAccessory2.length; i++) {
                //     if(!msMoudle.wz[msMoudle.AllAccessory2[i] + ".img"]) {
                //         msMoudle.wz[msMoudle.AllAccessory2[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Accessory2/" + msMoudle.AllAccessory2[i] + ".img/index.html", "ms");
                //     }
                // }
                // for(let i:number = 0; i < msMoudle.AllAccessory3.length; i++) {
                //     if(!msMoudle.wz[msMoudle.AllAccessory3[i] + ".img"]) {
                //         msMoudle.wz[msMoudle.AllAccessory3[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Accessory3/" + msMoudle.AllAccessory3[i] + ".img/index.html", "ms");
                //     }
                // }
                // for(let i:number = 0; i < msMoudle.AllAccessory4.length; i++) {
                //     if(!msMoudle.wz[msMoudle.AllAccessory4[i] + ".img"]) {
                //         msMoudle.wz[msMoudle.AllAccessory4[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Accessory4/" + msMoudle.AllAccessory4[i] + ".img/index.html", "ms");
                //     }
                // }
                // for(let i:number = 0; i < msMoudle.AllAccessory5.length; i++) {
                //     if(!msMoudle.wz[msMoudle.AllAccessory5[i] + ".img"]) {
                //         msMoudle.wz[msMoudle.AllAccessory5[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Accessory5/" + msMoudle.AllAccessory5[i] + ".img/index.html", "ms");
                //     }
                // }
                // for(let i:number = 0; i < msMoudle.AllAccessory6.length; i++) {
                //     if(!msMoudle.wz[msMoudle.AllAccessory6[i] + ".img"]) {
                //         msMoudle.wz[msMoudle.AllAccessory6[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Accessory6/" + msMoudle.AllAccessory6[i] + ".img/index.html", "ms");
                //     }
                // }

                // for(let i:number = 0; i < msMoudle.AllLongCoat.length; i++) {
                //     if(!msMoudle.wz[msMoudle.AllLongCoat[i] + ".img"]) {
                //         msMoudle.wz[msMoudle.AllLongCoat[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/LongCoat/" + msMoudle.AllLongCoat[i] + ".img/index.html", "ms");
                //     }
                // }
                // for(let i:number = 0; i < msMoudle.AllFashion.length; i++) {
                //     if(!msMoudle.wz[msMoudle.AllFashion[i] + ".img"]) {
                //         msMoudle.wz[msMoudle.AllFashion[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/LongCoat/" + msMoudle.AllFashion[i] + ".img/index.html", "ms");
                //     }
                // }
                // for(let i:number = 0; i < msMoudle.AllCape.length; i++) {
                //     if(!msMoudle.wz[msMoudle.AllCape[i] + ".img"]) {
                //         msMoudle.wz[msMoudle.AllCape[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Cape/" + msMoudle.AllCape[i] + ".img/index.html", "ms");
                //     }
                // }
                // for(let i:number = 0; i < msMoudle.AllShield.length; i++) {
                //     if(!msMoudle.wz[msMoudle.AllShield[i] + ".img"]) {
                //         msMoudle.wz[msMoudle.AllShield[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Shield/" + msMoudle.AllShield[i] + ".img/index.html", "ms");
                //     }
                // }
                for(let i:number = 0; i < msMoudle.AllRing.length; i++) {
                    if(!msMoudle.wz[msMoudle.AllRing[i] + ".img"]) {
                        msMoudle.wz[msMoudle.AllRing[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Ring/" + msMoudle.AllRing[i] + ".img/index.html", "ms");
                    }
                }
                // msMoudle.wz["000.img"] = msMoudle.loadWZ(cs,"res/Skill/000.img/index.html", "ms2");
                // msMoudle.wz["122.img"] = msMoudle.loadWZ(cs,"res/Skill/122.img/index.html", "ms2");
                let bData:Array<string> = [
                    "alert", "dead", "fly", "heal", "jump", "ladder", "proneStab", "rope", "shoot1", "shoot2", "shootF", "sit", "stabO1", "stabO2", "stabOF", "stabT1", "stabT2", "stabTF", "stand1", "stand2", "swingO1", "swingO2", "swingO3", "swingOF", "swingP1", "swingP2", "swingPF", "swingT1", "swingT2", "swingT3", "swingTF", "walk1", "walk2"];
                for(let i:number = 0; i < msMoudle.skillList.length; i++) {
                    if(!msMoudle.wz[msMoudle.skillList[i] + ".img"]) {
                        msMoudle.wz[msMoudle.skillList[i] + ".img"] = msMoudle.loadWZ(cs,"res/Skill/" + msMoudle.skillList[i] + ".img/index.html", "ms2");
                        ///筛选动作
                        let sdata = msMoudle.wz[msMoudle.skillList[i] + ".img"];
                        for(let key in sdata) {
                            if(key != "info") {
                                for(let bkey in sdata[key]) {
                                    if(bkey.indexOf(".action") >= 0) {
                                        // console.log(sdata[key][bkey], bkey);
                                        if(msMoudle.findKeyFromArr(sdata[key][bkey], bData) == false)
                                            bData.push(sdata[key][bkey]);
                                    }
                                }

                            }
                        }
                    }
                }
                for(let i:number = 0; i < msMoudle.preSkillList.length; i++) {
                    if(!msMoudle.wz[msMoudle.preSkillList[i] + ".img"]) {
                        msMoudle.wz[msMoudle.preSkillList[i] + ".img"] = msMoudle.loadWZ(cs,"res/Skill/" + msMoudle.preSkillList[i] + ".img/index.html", "ms2");
                        ///筛选动作
                        let sdata = msMoudle.wz[msMoudle.preSkillList[i] + ".img"];
                        for(let key in sdata) {
                            if(key != "info") {
                                for(let bkey in sdata[key]) {
                                    if(bkey.indexOf(".action") >= 0) {
                                        // console.log(sdata[key][bkey], bkey);
                                        if(msMoudle.findKeyFromArr(sdata[key][bkey], bData) == false)
                                            bData.push(sdata[key][bkey]);
                                    }
                                }

                            }
                        }

                    }
                }

                //清除skilldata
                 for(let i:number = 0; i < msMoudle.preSkillList.length; i++)
                    msMoudle.wz[msMoudle.preSkillList[i] + ".img"] = null;
                // console.log(bData);
                let newbody:any = new Object();
                for(let key:number = 0; key < bData.length; key++) {
                    if(this.isRealNum(bData[key]) == false) {
                        newbody[bData[key]] = new Object();
                        newbody[bData[key]] = msMoudle.wz["00002000.img"][bData[key]];
                    }
                }
                // console.log(newbody)
                newbody["info"] = new Object();
                newbody["info"] = msMoudle.wz["00002000.img"]["info"];
                msMoudle.wz["00002000.img"] = newbody;

                // console.log(msMoudle.wz["00002000.img"])

                // console.log(xxx, bData.length)

                // for(let i:number = 0; i < msMoudle.AllCoat.length; i++) {
                //     msMoudle.wz[msMoudle.AllCoat[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Coat/" + msMoudle.AllCoat[i] + ".img/index.html", "ms");
                // }
                // msMoudle.wz["01040002.img"] = msMoudle.loadWZ(cs,"res/Character/Coat/01040002.img/index.html", "ms");
                // msMoudle.wz["01041002.img"] = msMoudle.loadWZ(cs,"res/Character/Coat/01041002.img/index.html", "ms");
                // for(let i:number = 0; i < msMoudle.AllPants.length; i++) {
                //     msMoudle.wz[msMoudle.AllPants[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Pants/" + msMoudle.AllPants[i] + ".img/index.html", "ms");
                // }
                // for(let i:number = 0; i < msMoudle.AllGlove.length; i++) {
                //     msMoudle.wz[msMoudle.AllGlove[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Glove/" + msMoudle.AllGlove[i] + ".img/index.html", "ms");
                // }
                // msMoudle.wz["01060002.img"] = msMoudle.loadWZ(cs,"res/Character/Pants/01060002.img/index.html", "ms");
                // msMoudle.wz["01061001.img"] = msMoudle.loadWZ(cs,"res/Character/Pants/01061001.img/index.html", "ms");
                // for(let i:number = 0; i < this.test_longcoat.length; i++) {
                //     if(!msMoudle.wz[this.test_longcoat[i] + ".img"]) {
                //         msMoudle.wz[this.test_longcoat[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/LongCoat/" + this.test_longcoat[i] + ".img/index.html", "ms");
                //     }
                // }

                // for(let i:number = 0; i < msMoudle.AllHair.length; i++) {
                //     msMoudle.wz[msMoudle.AllHair[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Hair/"
                //     + msMoudle.AllHair[i] + ".img/index.html", "ms");
                // }
                // msMoudle.wz["00030020.img"] = msMoudle.loadWZ(cs,"res/Character/Hair/00030020.img/index.html", "ms");
                // msMoudle.wz["00031000.img"] = msMoudle.loadWZ(cs,"res/Character/Hair/00031000.img/index.html", "ms");

                // for(let i:number = 0; i < msMoudle.AllShoes.length; i++) {
                //     msMoudle.wz[msMoudle.AllShoes[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Shoes/" + msMoudle.AllShoes[i] + ".img/index.html", "ms");
                // }
                // msMoudle.wz["01072171.img"] = msMoudle.loadWZ(cs,"res/Character/Shoes/01072171.img/index.html", "ms");
                // msMoudle.wz["01070016.img"] = msMoudle.loadWZ(cs,"res/Character/Shoes/01070016.img/index.html", "ms");

                // for(let i:number = 0; i < this.test_cape.length; i++) {
                //     msMoudle.wz[this.test_cape[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Cape/" + this.test_cape[i] + ".img/index.html", "ms");
                // }

                // for(let i:number = 0; i < this.test_cap.length; i++) {
                //     msMoudle.wz[this.test_cap[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Cap/" + this.test_cap[i] + ".img/index.html", "ms");
                // }

                //坐骑  01902000猪 01902028云   01912025马
                msMoudle.wz["01932261.img"] = msMoudle.loadWZ(cs,"res/Character/TamingMob/01932261.img/index.html", "ms");
                for(let i:number = 0; i < msMoudle.AllTamingMob.length; i++) {
                    msMoudle.wz[msMoudle.AllTamingMob[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/TamingMob/" + msMoudle.AllTamingMob[i] + ".img/index.html", "ms");
                }
                msMoudle.wz["01932000.img"] = msMoudle.loadWZ(cs,"res/Character/TamingMob/01932000.img/index.html", "ms");
                // for(let i:number = 0; i < this.test_tamingmob.length; i++) {
                //     msMoudle.wz[this.test_tamingmob[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/TamingMob/" + this.test_tamingmob[i] + ".img/index.html", "ms");
                // }
                //鞍子
                msMoudle.wz["01912000.img"] = msMoudle.loadWZ(cs,"res/Character/TamingMob/01912000.img/index.html", "ms2");//猪
                msMoudle.wz["01912021.img"] = msMoudle.loadWZ(cs,"res/Character/TamingMob/01912021.img/index.html", "ms2");//云
                msMoudle.wz["01912025.img"] = msMoudle.loadWZ(cs,"res/Character/TamingMob/01912025.img/index.html", "ms2"); //马
                msMoudle.wz["01912005.img"] = msMoudle.loadWZ(cs,"res/Character/TamingMob/01912005.img/index.html", "ms2"); //马

                msMoudle.wz["0206.img"] = msMoudle.loadWZ(cs,"res/ItemUse/0206.img/index.html", "ms");
                msMoudle.wz["0207.img"] = msMoudle.loadWZ(cs,"res/ItemUse/0207.img/index.html", "ms");
                // msMoudle.wz["0233.img"] = msMoudle.loadWZ(cs,"res/ItemUse/0233.img/index.html", "ms");
                // msMoudle.wz["0502.img"] = msMoudle.loadWZ(cs,"res/ItemUse/0502.img/index.html", "ms");

                // for(let i:number = 0; i < msMoudle.AllPet.length; i++) {
                //     if(!msMoudle.wz[msMoudle.AllPet[i] + ".img"]) {
                //         msMoudle.wz[msMoudle.AllPet[i] + ".img"] = msMoudle.loadWZ(cs,"res/Pet/" + msMoudle.AllPet[i] + ".img/index.html", "ms");
                //     }
                // }

                // msMoudle.wz["PetEff.img"] = msMoudle.loadWZ(cs,"res/Pet/PetEff.img/index.html", "ms");

                // for(let i:number = 0; i < msMoudle.AllNpc.length; i++) {
                //     if(!msMoudle.wz[msMoudle.AllNpc[i] + ".img"]) {
                //         msMoudle.wz[msMoudle.AllNpc[i] + ".img"] = msMoudle.loadWZ(cs,"res/Map/Npc/" + msMoudle.AllNpc[i] + ".img/index.html", "ms");
                //     }
                // }

                // msMoudle.wz["0002001.img"] = msMoudle.loadWZ(cs,"res/Map/Reactor/0002001.img/index.html", "ms");
                // msMoudle.wz["1022003.img"] = msMoudle.loadWZ(cs,"res/Map/Reactor/1022003.img/index.html", "ms");
                // msMoudle.wz["1012000.img"] = msMoudle.loadWZ(cs,"res/Map/Reactor/1012000.img/index.html", "ms");
                // msMoudle.wz["1052004.img"] = msMoudle.loadWZ(cs,"res/Map/Reactor/1052004.img/index.html", "ms");

                for(let i:number = 0; i < msMoudle.AllAfterimage.length; i++) {
                    if(!msMoudle.wz[msMoudle.AllAfterimage[i] + ".img"]) {
                        msMoudle.wz[msMoudle.AllAfterimage[i] + ".img"] = msMoudle.loadWZ(cs,"res/Character/Afterimage/" + msMoudle.AllAfterimage[i] + ".img/index.html", "ms");
                    }
                }

                msMoudle.wz["hit.img"] = msMoudle.loadWZ(cs, "res/Character/Afterimage/hit.img/index.html", "ms");

                msMoudle.wz["0900.img"] = msMoudle.loadWZ(cs,"res/Item/0900.img/index.html", "ms", "0900.img");
                msMoudle.wz["0204.img"] = msMoudle.loadWZ(cs,"res/Item/0204.img/index.html", "ms");
                msMoudle.wz["0400.img"] = msMoudle.loadWZ(cs,"res/Item/0400.img/index.html", "ms");
                msMoudle.wz["0401.img"] = msMoudle.loadWZ(cs,"res/Item/0401.img/index.html", "ms");
                msMoudle.wz["0402.img"] = msMoudle.loadWZ(cs,"res/Item/0402.img/index.html", "ms");
                msMoudle.wz["0403.img"] = msMoudle.loadWZ(cs,"res/Item/0403.img/index.html", "ms");
                // msMoudle.wz["0425.img"] = msMoudle.loadWZ(cs,"res/Item/0425.img/index.html", "ms");
                // msMoudle.wz["0301.img"] = msMoudle.loadWZ(cs,"res/Character/Chair/0301.img/index.html", "ms");

                msMoudle.wz["Etc.img"] = msMoudle.loadWZ(cs,"res/String/Etc.img/index.html", "ms", "etc");//道具名称
                msMoudle.wz["Consume.img"] = msMoudle.loadWZ(cs,"res/String/Consume.img/index.html","ms","consume");//卷轴
                msMoudle.wz["Eqp.img"] = msMoudle.loadWZ(cs,"res/String/Eqp.img/index.html", "ms", "eqp");//装备
                msMoudle.wz["Skill.img"] = msMoudle.loadWZ(cs,"res/String/Skill.img/index.html", "ms", "skill");//技能
                msMoudle.wz["Mob.img"] = msMoudle.loadWZ(cs,"res/String/Mob.img/index.html", "ms", "mob");
                msMoudle.wz["Npc.img"] = msMoudle.loadWZ(cs,"res/String/Npc.img/index.html", "ms", "npc");
                msMoudle.wz["Pet.img"] = msMoudle.loadWZ(cs,"res/String/Pet.img/index.html", "ms", "pet");
                msMoudle.wz["MonsterBook.img"] = msMoudle.loadWZ(cs,"res/MonsterBook.img/index.html", "ms", "mbook");//怪物手册

                msMoudle.wz["Act.img"] = msMoudle.loadWZ(cs,"res/Quest/Act.img/index.html", "ms");
                msMoudle.wz["Check.img"] = msMoudle.loadWZ(cs,"res/Quest/Check.img/index.html", "ms");
                msMoudle.wz["Quest.img"] = msMoudle.loadWZ(cs,"res/Quest/QuestInfo.img/index.html", "ms");
                msMoudle.wz["Say.img"] = msMoudle.loadWZ(cs,"res/Quest/Say.img/index.html", "ms");

                msMoudle.wz["SMob.img"] = msMoudle.loadWZ(cs,"res/Sound/Mob.img/index.html", "ms", "smob");
                msMoudle.wz["SSkill.img"] = msMoudle.loadWZ(cs,"res/Sound/Skill.img/index.html", "ms", "sskill");

                msMoudle.wz["NameTag.img"] = msMoudle.loadWZ(cs,"res/NameTag.img/index.html", "ms");
                msMoudle.wz["ChatBalloon.img"] = msMoudle.loadWZ(cs,"res/ChatBalloon.img/index.html", "ms");
                msMoudle.wz["CharacterEff.img"] = msMoudle.loadWZ(cs,"res/CharacterEff.img/index.html", "ms");
                msMoudle.wz["MapHelper.img"] = msMoudle.loadWZ(cs,"res/Map/MapHelper.img/index.html", "ms");
                msMoudle.wz["BasicEff.img"] = msMoudle.loadWZ(cs,"res/BasicEff.img/index.html", "ms");
                msMoudle.wz["Effect.img"] = msMoudle.loadWZ(cs,"res/Effect.img/index.html", "ms");
                msMoudle.wz["SetEff.img"] = msMoudle.loadWZ(cs,"res/SetEff.img/index.html", "ms");


                ////////
                msMoudle.wz["QuestInfo.img"] = msMoudle.loadWZ(cs,"res/QuestInfo.img/index.html", "ms");
                msMoudle.wz["QuestInfo2.img"] = msMoudle.loadWZ(cs,"res/QuestInfo.img/index2.html", "ms");
                msMoudle.wz["QuestInfo3.img"] = msMoudle.loadWZ(cs,"res/QuestInfo.img/index3.html", "ms");
                msMoudle.wz["QuestInfo4.img"] = msMoudle.loadWZ(cs,"res/QuestInfo.img/index4.html", "ms");
                msMoudle.wz["QuestInfo5.img"] = msMoudle.loadWZ(cs,"res/QuestInfo.img/index5.html", "ms");
                msMoudle.wz["QuestInfo6.img"] = msMoudle.loadWZ(cs,"res/QuestInfo.img/index6.html", "ms");
                msMoudle.zMap = cs.getZMapInfo(Laya.loader.getRes("res/Character/zmap_cn.img/index.html"));
                Laya.loader.clearRes("res/Character/zmap_cn.img/index.html");

                //测试
                msMoudle.characterjson = Laya.Loader.getRes("res/Data/character.json");
                msMoudle.shopjson = Laya.Loader.getRes("res/Data/shop2.json");
                msMoudle.guidejson = Laya.loader.getRes("res/Data/guide.json");
                msMoudle.storyjson = Laya.loader.getRes("res/Data/story.json");
                msMoudle.mobjson = Laya.loader.getRes("res/Data/mob.json");
                msMoudle.bossjson = Laya.loader.getRes("res/Data/boss.json");
                msMoudle.herojson = Laya.loader.getRes("res/Data/hero.json");
                msMoudle.skilljson = Laya.loader.getRes("res/Data/skill.json");
                msMoudle.zhuanpanjson = Laya.loader.getRes("res/Data/zhuanpan.json");
                msMoudle.payjson = Laya.loader.getRes("res/Data/pay.json");

                msMoudle.AllAccessory1 = Laya.loader.getRes("res/Data/accessory1.json")["_"].split(",");
                msMoudle.AllAccessory2 = Laya.loader.getRes("res/Data/accessory2.json")["_"].split(",");
                msMoudle.AllAccessory3 = Laya.loader.getRes("res/Data/accessory3.json")["_"].split(",");
                msMoudle.AllAccessory4 = Laya.loader.getRes("res/Data/accessory4.json")["_"].split(",");
                msMoudle.AllAccessory5 = Laya.loader.getRes("res/Data/accessory5.json")["_"].split(",");
                msMoudle.AllAccessory6 = Laya.loader.getRes("res/Data/accessory6.json")["_"].split(",");
                msMoudle.AllCap = Laya.loader.getRes("res/Data/cap.json")["_"].split(",");
                msMoudle.AllCape = Laya.loader.getRes("res/Data/cape.json")["_"].split(",");
                msMoudle.AllCoat = Laya.loader.getRes("res/Data/coat.json")["_"].split(",");
                msMoudle.AllLongCoat = Laya.loader.getRes("res/Data/longcoat.json")["_"].split(",");
                msMoudle.AllGlove = Laya.loader.getRes("res/Data/glove.json")["_"].split(",");
                msMoudle.AllPants = Laya.loader.getRes("res/Data/pants.json")["_"].split(",");
                msMoudle.AllShield = Laya.loader.getRes("res/Data/shield.json")["_"].split(",");
                msMoudle.AllShoes = Laya.loader.getRes("res/Data/shoes.json")["_"].split(",");
                msMoudle.AllWeapon = Laya.loader.getRes("res/Data/weapon.json")["_"].split(",");
                msMoudle.allMaps = Laya.loader.getRes("res/Data/map.json")["_"].split(",");

                ui.show(app.login.loginDlg);

                this.close();


            // });
        }

        isRealNum(val:any){
        　　if(val === "" || val ==null) return false;
            if(!isNaN(val)) return true;
            else return false;
        }


        public proMove(pro:number) : void {
            this.prgLoading.value = 1 - pro;
            let grid = this.prgLoading.sizeGrid;
            let arr = grid.split(",");
            let left=Number(arr[3]);
			let right=Number(arr[1]);
            let max=this.prgLoading.width-left-right;
            let sw=max *(1-pro);
            let width=left+right+sw;
            if(width <= left + right) width = left;

            this.imgMogu.x =  width;
        }


    }

}
