module Net{
	export class Message{
		public seq:number; //用于处理ack
		public code:number; //状态码
		public xieyi:number; //消息码
		public msdata:any; //消息内容
	}
}

module Net{
	import Socket = Laya.Socket;
	import Byte = Laya.Byte;
	export class SocketManage{
		public socket: Socket;
		private sequence:number = 1;
		private callbackPool: Object = {};
		public myState = 0;

		constructor() {
			this.socket = new Socket();
			this.socket.timeout = 10000;
		}


		public Connet(params:any) : void {
			this.myState = 0;
			this.socket.connectByUrl("ws://localhost:8080");
			this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen, [params]);
			this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
			this.socket.on(Laya.Event.MESSAGE, this, this.onMessageReveived);
			this.socket.on(Laya.Event.ERROR, this, this.onConnectError);
		}


		timecnt = 0;
		private sendHeart() {
			// var curTime = new Date();
			// console.log("##sendHeart", curTime.getHours(), curTime.getMinutes(), curTime.getSeconds())
			Sync.sendHeartBeat((res: number)=>{

			});
		}

		private sendReconnectSync() {
			if(this.myState != 0) {
				return;
			}
			Sync.sendReconnect((res: number)=>{
				if(this.myState != 0) {
					return;
				}
				if(res == 0) {
					// msMoudle.toast("重新链接成功了");
					this.myState = 1;

					let dlg = ui.manager.getDialogByName("app.fuben.msgDlg");
					if(dlg && dlg.dlg) {
						dlg.dlg.onBtnBackClick({});
					}
				}
				else if(res == -1) {
					msMoudle.toast2("服务器失去了连接");
					Laya.timer.clear(this, this.sendHeart);
					this.myState = -1;
				}
			}, ()=>{
				// console.log("##re send")
				setTimeout(() => {
					this.sendReconnectSync();
				}, 100);
			});
		}

		public ReConnet() : void {
			if(this.socket) {
				this.socket.off(Laya.Event.OPEN, this, this.onSocketOpen);
				this.socket.off(Laya.Event.OPEN, this, this.onSocketReOpen2);
				// this.socket.off(Laya.Event.CLOSE, this, this.onSocketClose);
				// this.socket.off(Laya.Event.MESSAGE, this, this.onMessageReveived);
				// this.socket.off(Laya.Event.ERROR, this, this.onConnectError);

				this.socket.connectByUrl("ws://localhost:8080");
				// this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
				// this.socket.on(Laya.Event.MESSAGE, this, this.onMessageReveived);
				// this.socket.on(Laya.Event.ERROR, this, this.onConnectError);
				// Laya.timer.once(3000, this, this.reLoad);
			}
		}
		private onSocketReOpen2() : void {
			msMoudle.online = true;

			if(ui.manager.getDialogByName("app.homeland.MajorCityDlg")) {
				this.myState = 0;
				this.sendReconnectSync();
			}
			// console.log("重新链接成功了");
		}
		private onSocketReOpen() : void {
			msMoudle.online = true;
			// msMoudle.toast("重新链接成功了");
			// Laya.timer.scale = 1;
			Laya.timer.clear(this, this.reLoad);
			this.loadtime = 0;
			this.isload = false;
			// Laya.timer.loop(1000, this, this.reLoad);
		}

		isload:boolean = true;
		loadtime:number = 0;
		private onSocketOpen(params:any): void {
			console.log("链接成功了");
			msMoudle.online = true;
			params.ConnetedOK();

			Laya.timer.clear(this, this.reLoad);
			this.loadtime = 0;
			this.isload = false;
			// Laya.timer.loop(1000, this, this.reLoad);

			Laya.timer.clear(this, this.sendHeart);
			Laya.timer.loop(3000, this, this.sendHeart);
			// this.sendcnt = 0;
			// this.timecnt = new Date().getTime();
			// Laya.timer.frameLoop(1, this, this.sendHeart);

			// Laya.timer.clear(this, this.sendMsg);
			// Laya.timer.frameLoop(1, this, this.sendMsg);
		}
		private onSocketClose(): void {
			// Laya.timer.scale = 0;
			msMoudle.online = false;
			console.log("连接断开了");

			if(this.myState != -1) {
				this.ReConnet();
			}
		}
		private onConnectError(params:any): void {
			console.log("链接失败了");
			msMoudle.online = false;

			msMoudle.toast2("服务器失去了连接");
			Laya.timer.clear(this, this.sendHeart);
			this.myState = -1;
			return;
			if(this.myState != -1) {
				this.ReConnet();
			}
		}
		private userOperateError() {
			this.myState = -1;
			Laya.timer.clear(this, this.sendHeart);
		}

		request(url: string, method:string, param?:string): P.Promise<string> {
            let d = P.defer<string>();
            let http = new XMLHttpRequest();
            // http.withCredentials = true;
            let paramStr = param ? param : "";
            http.timeout = 10000;
            http.open(method, url, true);
            http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            http.responseType = "text"; // "arraybuffer" for binary
            http.onerror = e => { error() };
            http.onload = complete;
            http.ontimeout = e => { error("499") };
            http.send(paramStr);
            return d.promise();
            function complete() {
                console.log("返回结果", http.responseText);
            }
            function error(err?: string) {
                err = err || "499";
                d.reject({message: err});
            }

        }

		reLoad() : void {
			this.loadtime++;
			// console.log("reload	" + this.loadtime)
			if(this.loadtime > 3) {
				// this.loadtime = 0;
				if(this.isload == false) {
					console.log("断线了");
					Laya.timer.clear(this, this.reLoad);
					this.ReConnet();
					// msMoudle.toast("已重新链接服务器");
				}
				else {
					this.loadtime = 0;
					this.isload = false;
				}
			}
			else {
				if(this.isload == false) {
					let message = new Net.Message();
					message.xieyi = 105 + ms._dpip;
					message.msdata = { 'user': 'Susake', 'password':'123456'};
					// msMoudle.wsocket.requestApi(message).done(data => {
					msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
						if(data["code"] == 0) {}
					}});
				}
			}
		}

		onMessageReveived(data:any) : void {
			// console.log(data);
			data = this.decode(data);
			// console.log("111", data);
			if(data) {
				// console.log(data);
				//聊天
				// if(data["msdata"] && data["xieyi"] && data["xieyi"] == 555 + ms._dpip) {

				///后面这里都要修改
				if(data.indexOf("findid") < 0) {
					let _ = JSON.parse(data);

					if(_.xieyi) {
						let xieyi = Number(_.xieyi || 0);

						if(xieyi == 555 + ms._dpip) {
							if(msMoudle.mainT)
								if(msMoudle.mainT.m_msgList) {
									let txt = _["msdata"].split("wz$$")[1];
									let distxt = msMoudle.distxt.split(",");
									if(distxt && distxt.length > 0) {
										for(let i:number = 0; i < distxt.length; i++) {
											if(txt.indexOf(distxt[i]) >= 0) {
												txt = "口口口口口口口口";
												break;
											}
										}
									}
									msMoudle.mainT.m_msgList.msgShow(0, txt, true);
								}
							return ;
						}
						if(xieyi == 666 + ms._dpip) {
							// if(msMoudle.mapP && _["msdata"]) {
							// 	let str =  _["msdata"].split("w#z")[1];
							// 	msMoudle.playMusic("res/Sound/" + str + ".mp3");

							// 	msMoudle.mapP.payAvatarMegaphone(0, false, "玩家:" +  _["msdata"].split("w#z")[0] + " 向全服点播了一首" + str);
							// }
							return ;
						}
						if(xieyi > 10000) {
							this.parseResponse(_);
							return;
						}
					}

					if(_["code"] == 0) {
						if(_["msdata"]) {
							if(_["msdata"]._context) {
								// if(typeof _["msdata"]._context == "string") {}
								// else {
									if(_["msdata"]._context.indexOf("点击了支付") < 0) {
										// if(typeof _["msdata"]._context == "string") {}
										// else {
										///至少要进入主城才行
										if(msMoudle.intoGame == true) {
											let msg:any = JSON.parse(_["msdata"]._context);
											if(msg.pay) {
												if(msg.pay == "Susake_pay") {
													if(ms._user == msg.id) {

														let m = msg.num;

														///告诉支付程序我成功拿到了奖励
														msMoudle.mapP.payAvatarMegaphone(m);
														///告诉后台成功了
														let message = new Net.Message();
														message.xieyi = 108 + ms._dpip;
														message.msdata = {};
														msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
															//////
															if(data["code"] == 0) {

																let isFirst:boolean = false;
                                                				if(ms.test_cz == 0) isFirst = true;

																///这里才接受奖励
																if(Number(msg.num) > ms.czValue)
																	ms.czValue = Number(msg.num);
																if(msMoudle.mainT && msMoudle.mainT.cz_sp) {
																	msMoudle.mainT.cz_sp.getChildByName("礼包").visible = true;
																}
																msMoudle.toast2("成功充值了" + String(m) + "元");
																if(m == 5) {
																	msMoudle._(); msMoudle.updateRongYu(525);
																	if(isFirst) {
																		msMoudle._(); msMoudle.updateRongYu(525);
																	}
																}
																else if(m == 10) {
																	msMoudle._(); msMoudle.updateZuanShi(105, 101);
																	if(isFirst) {
																		msMoudle._(); msMoudle.updateZuanShi(105, 101);
																	}
																}
																else if(m == 30) {
																	msMoudle._(); msMoudle.updateZuanShi(320, 101);
																	if(isFirst) {
																		msMoudle._(); msMoudle.updateZuanShi(320, 101);
																	}
																}
																else if(m == 50) {
																	msMoudle._(); msMoudle.updateZuanShi(550, 101);
																	if(isFirst) {
																		msMoudle._(); msMoudle.updateZuanShi(550, 101);
																	}
																}
																else if(m == 100) {
																	msMoudle._(); msMoudle.updateZuanShi(1150, 101);
																	if(isFirst) {
																		msMoudle._(); msMoudle.updateZuanShi(1150, 101);
																	}
																}
																else if(m == 200) {
																	msMoudle._(); msMoudle.updateZuanShi(2400, 101);
																	if(isFirst) {
																		msMoudle._(); msMoudle.updateZuanShi(2400, 101);
																	}
																}
																else if(m == 300) {
																	msMoudle._(); msMoudle.updateZuanShi(3600, 101);
																	if(isFirst) {
																		msMoudle._(); msMoudle.updateZuanShi(3600, 101);
																	}
																}
																else if(m == 500) {
																	msMoudle._(); msMoudle.updateZuanShi(6000, 101);
																	if(isFirst) {
																		msMoudle._(); msMoudle.updateZuanShi(6000, 101);
																	}
																}
																if(m >= 1) {
																	ms.test_cz += Number(m);
																	ms.czly.push(Number(m));
																	ms.acz += Number(m);

																	if(isFirst) {
																		ms.test_cz += Number(m);
																		ms.czly.push(Number(m));
																		ms.acz += Number(m);
																	}

																	if(isFirst) {
																		msMoudle._(); msMoudle.updateJinBi(9999);
																		msMoudle._(); msMoudle.updateRongYu(100);
																		msMoudle._(); msMoudle.getWeapon("01302032");
																		msMoudle._(); msMoudle.getItem("2043012");
																		msMoudle._(); msMoudle.buyOneHero(1);
																	}
																	// msMoudle._(); msMoudle.buyOneHero(13);
																}

																//这里不要连着发
																// Laya.timer.once(500, this, ()=> {
																	ms.saveServer(true);
																// });
																///
															}
														}});

													}
												}
												else if(msg.pay == "Susake_reload") {
													// msMoudle.toast("重连");
													console.log("连接正常");
													this.isload = true;
												}
												//发送奖励
												else if(msg.pay == "Susake_reward") {
													if(ms._user == msg.id) {
														let m:number = Number(msg.num);
														if(m == 110 || m == 111 || m == 112 ||
															m == 120 || m == 121 || m == 122) {
															msMoudle.toast2("恭喜你认证成功了");

															if(m == 110) {
																ms.m_tg = 1;
																ms.test_cz += 5;
																ms.czly.push(5);
																ms.acz += 5;
																msMoudle._(); msMoudle.updateRongYu(1000);
																msMoudle._(); msMoudle.updateZuanShi(100, 103);
																msMoudle._(); msMoudle.getWeapon("01002419");
																for(let i:number = 0; i < 1; i++) {
																	msMoudle._(); msMoudle.getItem("2040599")
																}
															}
															else if(m == 111) {
																ms.m_tg = 2;
																ms.test_cz += 30;
																ms.czly.push(30);
																ms.acz += 30;
																msMoudle._(); msMoudle.updateRongYu(3000);
																msMoudle._(); msMoudle.updateZuanShi(500, 103);
																msMoudle._(); msMoudle.getWeapon("01002357");
																for(let i:number = 0; i < 3; i++) {
																	msMoudle._(); msMoudle.getItem("2040599")
																}
															}
															else if(m == 112) {
																ms.m_tg = 3;
																ms.test_cz += 100;
																ms.czly.push(100);
																ms.acz += 100;
																msMoudle._(); msMoudle.updateRongYu(10000);
																msMoudle._(); msMoudle.updateZuanShi(1000, 103);
																msMoudle._(); msMoudle.getWeapon("01002140");
																for(let i:number = 0; i < 6; i++) {
																	msMoudle._(); msMoudle.getItem("2040599")
																}
															}
															if(msMoudle.maplejson["充值QQ"] == 1044571564) {
																//QQ推广
																if(m == 120) {
																	msMoudle._(); msMoudle.getWeapon("01382235")   //阿丽莎
																	if(ms.shops[0]< 100) {
																		ms.shops[0]+=100;
																		ms.zsly[1]+=25*100;
																		ms.zsxh[0]-=25*100;
																	}
																}
																//抖音推广
																else if(m == 121) {
																	msMoudle._(); msMoudle.getWeapon("01005140")   //999
																	if(ms.shops[0]< 100) {
																		ms.shops[0]+=100;
																		ms.zsly[1]+=25*100;
																		ms.zsxh[0]-=25*100;
																	}
																}
																//快手推广
																else if(m == 122) {
																	msMoudle._(); msMoudle.getWeapon("01402180")   //真01402180
																	if(ms.shops[0]< 100) {
																		ms.shops[0]+=100;
																		ms.zsly[1]+=25*100;
																		ms.zsxh[0]-=25*100;
																	}
																}
															}

														}
														//枫叶
														else if(m == 100 || m == 200 || m == 500 || m == 1000 || m == 2000 || m == 3000 || m == 5000 || m == 10000) {
															msMoudle.toast2("系统发放了" + msg.num + "枫叶");
															msMoudle._(); msMoudle.updateRongYu(m);
															// if(m == 500) {
															// 	ms.fuli = 1;
															// }
														}
														//英雄
														else if(m >= 1001 && m <= 1020) {
															msMoudle._(); msMoudle.buyOneHero(m - 1001);
															msMoudle.toast2("系统发放了英雄" + m);
														}
														//卷轴(
														else if(msMoudle.isJuanZhou(Number(msg.num))) {
															let item = msMoudle.getItemMsg(Number(msg.num));
															if(item) {
																msMoudle.toast2("系统发放了" + item.name);
																msMoudle._(); msMoudle.getItem(msg.num);
																//如果在背包界面还得刷新背包
															}
														}
														//装备
														else {
															let item = msMoudle.getEqpMsg(msg.num);
															if(item) {
																msMoudle.toast2("系统发放了" + item.name);
																msMoudle._(); msMoudle.getWeapon(msg.num);
																//如果在背包界面还得刷新背包
															}
														}

														///告诉后台成功了
														let message = new Net.Message();
														message.xieyi = 108 + ms._dpip;
														message.msdata = {};
														msMoudle.wsocket.sendMsg({param: message, success: (data: any) => {
															if(data["code"] == 0) {}
														}});
														//这里不要连着发
														// Laya.timer.once(500, this, ()=> {
															ms.saveServer(true);
														// });
													}
												}
											}
										}
										// }
									}
								// }
							}
							else {
								if(_["msdata"].curtime && _["msdata"].ctime) {



									// if(msMoudle.last_time == -100) {
									// 	msMoudle.last_time = Number(_["msdata"].curtime);	//时间
									// 	// msMoudle.server_time = Number(_["msdata"].ctime);	//次数
									// }
									// else {
									// 	let curtime = Number(_["msdata"].curtime);
									// 	// let cishu = Number(_["msdata"].ctime);
									// 	if(curtime == msMoudle.last_time) {
									// 		//使用了加速器
									// 		// msMoudle.server_time = 9000;
									// 		msMoudle.error_time++;
									// 		if(msMoudle.error_time > 100) {
									msMoudle.server_time = 900000;
									// 		}
									// 	}
									// 	else {
									// 		msMoudle.last_time = Number(_["msdata"].curtime);	//时间
									// 		// msMoudle.server_time = Number(_["msdata"].ctime);	//次数
									// 	}
									// }
									//时间和存储次数
									// console.log("xxx " + _["msdata"].curtime + "  " + _["msdata"].ctime);
								}
							}
						}
					}
				}
			}
		}

		parseResponse(data: any) {
			// console.log("111. ", data.xieyi, ms._dpip)
			if(!msMoudle.mapP) return;
			// console.log("22. ", data.xieyi, ms._dpip)
			if(data.xieyi == 10185 + ms._dpip) {
				// Sync.otherEnter(data.msdata);
				msMoudle.toast2("环境异常", true);
				// Laya.timer.scale = 0;
				this.userOperateError();
			}
			else if(data.xieyi == 10186 + ms._dpip) {
				// Sync.otherEnter(data.msdata);
				msMoudle.toast2("该账号已在其他设备登陆", true);
				// Laya.timer.scale = 0;
				this.userOperateError();
			}
			else if(data.xieyi == 10187 + ms._dpip) {
				Sync.otherEnter(data.msdata);
			}
			else if(data.xieyi == 10197 + ms._dpip) {
				Sync.otherAction(data.msdata, data.seq);
			}
			else if(data.xieyi == 10188 + ms._dpip || data.xieyi == 10189 + ms._dpip) {
				Sync.otherLeave(data.msdata, data.isTheOne, data.xieyi == 10189 + ms._dpip);
			}
			else if(data.xieyi == 10190 + ms._dpip) {
				Sync.otherChangeFashion(data.msdata);
			}
			else if(data.xieyi == 10191 + ms._dpip) {
				Sync.updateMobs(data.msdata, data.mapId, data.seq);
			}
			else if(data.xieyi == 10192 + ms._dpip) {
				Sync.otherAttackMob(data.msdata, data.exp, data.atkId);
			}
			else if(data.xieyi == 10193 + ms._dpip) {
				Sync.otherPickItem(data.msdata);
			}
			else if(data.xieyi == 10194 + ms._dpip) {
				Sync.isTheOne = true;
			}
			else if(data.xieyi == 10195 + ms._dpip) {
				Sync.itemDisappear(data.arr);
			}
			else if(data.xieyi == 10196 + ms._dpip) {
				Sync.otherBeAttack(data.msdata);
			}
			else if(data.xieyi == 10198 + ms._dpip) {
				Sync.otherJoinParty(data.playerId, data.playerName);
			}
			else if(data.xieyi == 10199 + ms._dpip) {
				Sync.otherQuitParty(data.playerId);
			}
			else if(data.xieyi == 10200 + ms._dpip) {
				Sync.otherOperate(data.msdata, data.seq);
			}
			else if(data.xieyi == 10201 + ms._dpip) {
				// console.log("##rece, ", data)
				if(data.playerId) {
					if(data.playerId == ms.user) {
						Sync.beKickoutParty();
					}
					else {
						Sync.otherQuitParty(data.playerId);
					}
				}
			}
			else if(data.xieyi == 10202 + ms._dpip) {
				Sync.enterTeamBoss(data.mapId);
			}
			else if(data.xieyi == 10203 + ms._dpip) {
				Sync.bossRelive(data.msdata);
			}
		}

		// toBase64(buffer: ArrayBuffer): string {
		// 	let bytes: Uint8Array = new Uint8Array(buffer);
		// 	let len: number = bytes.length;
		// 	let base64: string = "";

		// 	for (let i: number = 0; i < len; i+=3) {
		// 		base64 += chars[bytes[i] >> 2];
		// 		base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
		// 		base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
		// 		base64 += chars[bytes[i + 2] & 63];
		// 	}

		// 	if ((len % 3) === 2) {
		// 		base64 = base64.substring(0, base64.length - 1) + "=";
		// 	} else if (len % 3 === 1) {
		// 		base64 = base64.substring(0, base64.length - 2) + "==";
		// 	}

		// 	return base64;
		// }

		// //字符串转base64
		encode(str:string){
			// 对字符串进行编码
			var encode = encodeURI(str);
			// 对编码的字符串转化base64
			var b64 = base64.encode(encode);
			// var base64 = btoa(encode);
			return b64;
		}

		// // base64转字符串
		decode(b64:any){
			// 对base64转编码
			var decode = base64.decode(b64);
			// var decode = atob(base64);
			// 编码转字符串
			var str = decodeURI(decode);
			return str;
		}

		// // private property
		// _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

		// // private method for UTF-8 encoding
		// _utf8_encode (string:string) {
		// 	string = string.replace(/\r\n/g,"\n");
		// 	let utftext = "";
		// 	for (let n = 0; n < string.length; n++) {
		// 		let c = string.charCodeAt(n);
		// 		if (c < 128) {
		// 			utftext += String.fromCharCode(c);
		// 		} else if((c > 127) && (c < 2048)) {
		// 			utftext += String.fromCharCode((c >> 6) | 192);
		// 			utftext += String.fromCharCode((c & 63) | 128);
		// 		} else {
		// 			utftext += String.fromCharCode((c >> 12) | 224);
		// 			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
		// 			utftext += String.fromCharCode((c & 63) | 128);
		// 		}

		// 	}
		// 	return utftext;
		// }

		// // private method for UTF-8 decoding
		// _utf8_decode (utftext:any) {
		// 	let string = "";
		// 	let i = 0;
		// 	let c = 0;
		// 	let c1 = 0;
		// 	let c2 = 0;
		// 	let c3 = 0;
		// 	while ( i < utftext.length ) {
		// 		c = utftext.charCodeAt(i);
		// 		if (c < 128) {
		// 			string += String.fromCharCode(c);
		// 			i++;
		// 		} else if((c > 191) && (c < 224)) {
		// 			c2 = utftext.charCodeAt(i+1);
		// 			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
		// 			i += 2;
		// 		} else {
		// 			c2 = utftext.charCodeAt(i+1);
		// 			c3 = utftext.charCodeAt(i+2);
		// 			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
		// 			i += 3;
		// 		}
		// 	}
		// 	return string;
		// }

		// // public method for encoding
		// encode(input:any):any {
		// 	let output = "";
		// 	let chr1:any, chr2:any, chr3:any, enc1:any, enc2:any, enc3:any, enc4:any;
		// 	let i = 0;
		// 	input = this._utf8_encode(input);
		// 	while (i < input.length) {
		// 		chr1 = input.charCodeAt(i++);
		// 		chr2 = input.charCodeAt(i++);
		// 		chr3 = input.charCodeAt(i++);
		// 		enc1 = chr1 >> 2;
		// 		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		// 		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		// 		enc4 = chr3 & 63;
		// 		if (isNaN(chr2)) {
		// 			enc3 = enc4 = 64;
		// 		} else if (isNaN(chr3)) {
		// 			enc4 = 64;
		// 		}
		// 		output = output +
		// 		this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
		// 		this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
		// 	}
		// 	return output;
		// }

		// // public method for decoding
		// decode(input:any) : any {
		// 	let output = "";
		// 	let chr1:any, chr2:any, chr3:any;
		// 	let enc1:any, enc2:any, enc3:any, enc4:any;
		// 	let i = 0;
		// 	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		// 	while (i < input.length) {
		// 		enc1 = this._keyStr.indexOf(input.charAt(i++));
		// 		enc2 = this._keyStr.indexOf(input.charAt(i++));
		// 		enc3 = this._keyStr.indexOf(input.charAt(i++));
		// 		enc4 = this._keyStr.indexOf(input.charAt(i++));
		// 		chr1 = (enc1 << 2) | (enc2 >> 4);
		// 		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		// 		chr3 = ((enc3 & 3) << 6) | enc4;
		// 		output = output + String.fromCharCode(chr1);
		// 		if (enc3 != 64) {
		// 			output = output + String.fromCharCode(chr2);
		// 		}
		// 		if (enc4 != 64) {
		// 			output = output + String.fromCharCode(chr3);
		// 		}
		// 	}
		// 	output = this._utf8_decode(output);
		// 	return output;
		// }

		// public requestApi<T>(param: Message) : P.Promise<T> {
		// 	// param.seq = this.sequence++;
		// 	let d = P.defer<T>();
        //     this.socket.once(Laya.Event.MESSAGE, this, onResp);
		// 	let b64 = JSON.stringify(param);
		// 	b64 = b64.replace("xieyi", "m1l1ll1");
		// 	b64 = b64.replace("msdata", "n11lll1");


		// 	b64 = this.encode(b64);

		// 	this.socket.send(b64);
        //     // this.socket.send(JSON.stringify(param));					///发送
		// 	this.socket.flush();
        //     function onResp(message: any): void {
		// 		// if (typeof message == "string") {
		// 			let data = JSON.parse(this.decode(message));
		// 			d.resolve(data);
		// 		// else if(typeof message == ArrayBuffer) {
		// 		// }
        //     }
		// 	return d.promise();
		// }

		// sendList: any[] = [];
		allSendNum:number = 0;

		sendLst:Array<any> = [];
		public loopSendMsg() : void {
			// if(this.sendList.length > 0) {
			// 	let msg:any = this.sendList[0];
			// 	this.send2Msg(msg);
			// 	this.sendList = this.sendList.splice(0, 1);
			// }
		}

		// public sendMsg(msg?: any) {
		// 	this.sendList.push(msg);
		// 	this.loopSendMsg();
		// }



		string2buffer (str: string) {
			// 首先将字符串转为16进制
			let val = ""
			for (let i = 0; i < str.length; i++) {
			  if (val === '') {
				val = str.charCodeAt(i).toString(16)
			  } else {
				val += ',' + str.charCodeAt(i).toString(16)
			  }
			}
			// 将16进制转化为ArrayBuffer
			return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function (h) {
			  return parseInt(h, 16)
			})).buffer
		}


		public sendMsg(msg?: any) {
			// console.log("xxxxx", msg.param.xieyi, msg.param);

			if(!msMoudle.online) {
				console.log("网络不稳定");
				return ;
			}

			if(msg && msg.param) {
				if(msMoudle.intoGame == false) {
					this.allSendNum++;
					if(this.allSendNum > 120) {
						return ;
					}
				}
				msMoudle.wsocket.requestWsApi(msg.param).done(data => {
					if(msg.success) msg.success(data);
				});
				// }).fail(err => {
				// 	if(msg.fail) {
				// 		msg.fail(err);
				// 		console.log("失败", err, msg);
				// 	}
				// });
			}
		}

		public sendFastMsg(msg?: any) {

			if(!msMoudle.online) {
				console.log("网络不稳定");
				return ;
			}

			if(msg && msg.param) {
				if(msMoudle.intoGame == false) {
					this.allSendNum++;
					if(this.allSendNum > 250) {
						return ;
					}
				}
				msMoudle.wsocket.requestFastWsApi(msg.param);
			}
		}

		public requestWsApi<T>(param: Message) : P.Promise<T> {  //暂时不使用repeat参数，因为最好延迟调用重发
			let d = P.defer<T>();
			param.seq = this.sequence++;
			this.socket.on(Laya.Event.MESSAGE, this, onResp);
			let b64 = JSON.stringify(param);
			b64 = b64.replace("xieyi", "m1l1ll1");
			b64 = b64.replace("msdata", "n11lll1");
			b64 = this.encode(b64);
			this.socket.send(b64);

			// let timeout = false;
			// let resOk = false;
            function onResp(message: any): void {
				// if(timeout) {
					// return;
				// }
				let data = JSON.parse(this.decode(message));
				if(param.xieyi == data.xieyi && param.seq == data.seq) {
					// console.log("##xieyi ok, ", data.xieyi)
					// resOk = true;
					this.socket.off(Laya.Event.MESSAGE, this, onResp);
					// Laya.timer.clear(this, sendErr);
					d.resolve(data);
				}
			}
			// var sendErr = ()=>{
			// 	timeout = true;
			// 	this.socket.off(Laya.Event.MESSAGE, this, onResp);
			// 	if(!resOk) {
			// 		d.reject({message: ""});	//
			// 	}
			// }
			// Laya.timer.once(3000, this, sendErr, [], false);
			return d.promise();
		}

		public requestFastWsApi(param: Message) {
			param.seq = this.sequence++;
			let b64 = JSON.stringify(param);
			b64 = b64.replace("xieyi", "m1l1ll1");
			b64 = b64.replace("msdata", "n11lll1");
			b64 = this.encode(b64);
			this.socket.send(b64);
		}

		// public requestWsApi<T>(param: Message, repeat = false) : P.Promise<T> {  //暂时不使用repeat参数，因为最好延迟调用重发
		// 	let d = P.defer<T>();
		// 	if(!msMoudle.online || !this.socket || !this.socket.connected) {
		// 		if(repeat) {
		// 			return this.requestWsApi<T>(param, repeat);
		// 		}
		// 		d.reject({message: ""});
		// 		return d.promise();
		// 	}
		// 	param.seq = this.sequence++;
		// 	// this.socket.once(Laya.Event.MESSAGE, this, onResp);
		// 	this.socket.on(Laya.Event.MESSAGE, this, onResp);
		// 	// this.socket.on(Laya.Event.ERROR, this, sendErr);
		// 	let b64 = JSON.stringify(param);
		// 	b64 = b64.replace("xieyi", "m1l1ll1");
		// 	b64 = b64.replace("msdata", "n11lll1");
		// 	b64 = this.encode(b64);
		// 	// try {
		// 		this.socket.send(b64);
		// 		// this.socket.output.writeUTFBytes(b64);
		// 		// this.socket.flush();
		// 	// } catch (error) {
		// 	// 	console.log("###send error, ", error)
		// 	// }
		// 	// this.socket.send(b64);
        //     // this.socket.send(JSON.stringify(param));					///发送
		// 	// this.socket.flush();
		// 	let timeout = false;
		// 	let resOk = false;
        //     function onResp(message: any): void {
		// 		if(timeout) {
		// 			return;
		// 		}
		// 		let data = JSON.parse(this.decode(message));
		// 		if(param.xieyi == data.xieyi && param.seq == data.seq) {
		// 			// console.log("##xieyi ok, ", data.xieyi)
		// 			resOk = true;
		// 			this.socket.off(Laya.Event.MESSAGE, this, onResp);
		// 			Laya.timer.clear(this, sendErr);
		// 			d.resolve(data);
		// 		}
		// 	}
		// 	var sendErr = ()=>{
		// 		timeout = true;
		// 		this.socket.off(Laya.Event.MESSAGE, this, onResp);
		// 		if(!resOk) {
		// 			if(repeat) {
		// 				this.resend(param, b64, d, repeat);
		// 			}
		// 			else {
		// 				d.reject({message: ""});
		// 			}
		// 		}
		// 	}
		// 	Laya.timer.once(3000, this, sendErr);
		// 	return d.promise();
		// }

		// private resend<T>(param: any, b64: any, d: P.Deferred<T>, repeat: boolean) {
		// 	console.log("##resend")
		// 	this.socket.on(Laya.Event.MESSAGE, this, onResp);
		// 	this.socket.send(b64);
		// 	this.socket.flush();

		// 	let resOk = false;
		// 	function onResp(message: any): void {
		// 		let data = JSON.parse(this.decode(message));
		// 		if(param.xieyi == data.xieyi && param.seq == data.seq) {
		// 			// console.log("##xieyi ok, ", data.xieyi)
		// 			resOk = true;
		// 			this.socket.off(Laya.Event.MESSAGE, this, onResp);
		// 			d.resolve(data);
		// 		}
		// 	}
		// 	var sendErr = ()=>{
		// 		this.socket.off(Laya.Event.MESSAGE, this, onResp);
		// 		if(!resOk) {
		// 			if(repeat) {
		// 				this.resend(param, b64, d, repeat);
		// 			}
		// 			else {
		// 				d.reject({message: ""});
		// 			}
		// 		}
		// 	}
		// 	setTimeout(() => {
		// 		sendErr();
		// 	}, this.socket.timeout);
		// }

		//
	}
}