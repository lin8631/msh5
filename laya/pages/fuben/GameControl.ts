/**
 * LRK
 * 2018/7/26
 */
import Tween = laya.utils.Tween;

class GameControl {
    private gameBackGroundView: view.GameBackGroundView;
    private gameOverDialog: view.GameOverDialog;//游戏死亡 弹出框
    private repentDialog: view.RepentDialog;//悔棋窗口
    private youWinDialog: view.YouWinDialog; // 2048 达成窗口
    isSavedOperation: Boolean = false; //记录是否已经保存了上一步棋盘数据  再刷新棋盘数据的时候  改成false
    refreshListArrData = []; // 用于刷新LIST 数据棋盘使用
    refusingControl = false; //拒绝接受滑动指令
    gameMaxScore: Number = 0;//游戏最高得分
    keyDirection: Number = 0;//按下的方向
    gameScore = 0;//游戏得分
    gameIsOver = false;//游戏是否结束
    is2048Reach = false; //是否已经达成2048
    onLastStepNumber = 0; //当前悔棋数
    maxLastStepNumber = 3; // 悔棋数最大
    stepNumberPedometer = 0;//需要移动最少5次才能进行悔棋操作
    maxStepNumberPedometer = 10;//需要移动最少5次才能进行悔棋操作
    aniTime = 100; //方块移动时间   方块合并时间
    mouseMoveLength = 80; //手势滑动距离 达到这个像素长度才触发移动指令
    moveScore = 0;//记录每次移动获得的份

    mouseMoveX = 0;//鼠标移动  鼠标按下 鼠标抬起 XY
    mouseMoveY = 0;
    mouseDownX = 0;
    mouseDownY = 0;
    mouseUpX = 0;
    mouseUpY = 0;

    isMousDown: boolean = false; //鼠标按下
    isPlaySound: boolean = false; // 控制合并音效只调用一次

    //做悔棋用
    regretArr = [];
    arrNumber = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null]
    ];
    //游戏棋盘数据
    key = {
        38: 0, // Up
        39: 1, // Right
        40: 2, // Down
        37: 3, // Left
        75: 0, // Vim up
        76: 1, // Vim right
        74: 2, // Vim down
        72: 3, // Vim left
        87: 0, // W
        68: 1, // D
        83: 2, // S
        65: 3  // A
    };//操作对照表

    constructor() {
        this.gameBackGroundView = new view.GameBackGroundView();
        Laya.stage.addChild(this.gameBackGroundView);
        this.into();
        this.addEvents();
    }

    //初始化游戏数据
    into() {
        this.gameIsOver = false;
        this.is2048Reach = false;
        this.onLastStepNumber = 0;
        this.stepNumberPedometer = 0;
        this.gameScore = 0;
        this.openBoardEvent();
        this.gameBackGroundView._score.text = this.gameScore + '';
        this.ButRepentVisible(false);
        this.arrNumber = [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ];
        this.regretArr = [];
        this.addData();
        this.addData();
    }

    //添加监听
    addEvents() {
        //键盘按下事件
        document.addEventListener('keydown', (event) => {
            this.onClick(event);
        });
        // 新游戏刷新棋盘
        this.gameBackGroundView._newGame.on(laya.events.Event.CLICK, this, () => {
            this.into();
        });
        this.gameBackGroundView._butRepent.on(laya.events.Event.CLICK, this, () => {
            this.ejectRepentDialog();
        });
        this.gameBackGroundView._menu.on(laya.events.Event.CLICK, this, () => {
            this.outGame();
        });

        this.gameBackGroundView.on(laya.events.Event.MOUSE_DOWN, this, (event) => {
            this.mouseDownX = Laya.stage.mouseX;
            this.mouseDownY = Laya.stage.mouseY;
            this.mouseHandler(event);
            this.isMousDown = true;
        });
        this.gameBackGroundView.on(laya.events.Event.MOUSE_MOVE, this, (event) => {
            if (this.isMousDown) {
                this.mouseMoveX = Laya.stage.mouseX;
                this.mouseMoveY = Laya.stage.mouseY;
                this.mouseHandler(event);
            }
        });
        this.gameBackGroundView.on(laya.events.Event.MOUSE_UP, this, (event) => {
            this.mouseUpX = Laya.stage.mouseX;
            this.mouseUpY = Laya.stage.mouseY;
            this.isMousDown = false;
        });
        this.gameBackGroundView.on(laya.events.Event.MOUSE_OUT, this, (event) => {
            this.isMousDown = false;
        });

    }

    //退出游戏
    outGame() {
        this.gameBackGroundView.destroy();
    }
    // inGame(){
    //     this.gameBackGroundView.visible = true;
    // }

    //解析手指滑动 距离 和方向
    mouseHandler(e: Event) {
        switch (e.type) {
            case laya.events.Event.MOUSE_DOWN:
                break;
            case laya.events.Event.MOUSE_UP:
                break;
            case laya.events.Event.MOUSE_MOVE:
                this.mouseDirection();
                break;
            case laya.events.Event.MOUSE_OUT:
                break;
        }
    }
    mouseDirection() {
        const moveLength = this.mouseMoveLength;
        let moveX = this.mouseDownX - this.mouseMoveX;
        let moveY = this.mouseDownY - this.mouseMoveY;
        let keyUp = 0;
        let keyRight = 1;
        let keyDown = 2;
        let keyLeft = 3;
        let asbX = Math.abs(moveX) > moveLength ? Math.abs(moveX) : 0;
        let asbY = Math.abs(moveY) > moveLength ? Math.abs(moveY) : 0;
        if (asbX > asbY) {
            if (moveX > 0) {
                //左
                if (asbX !== 0) {
                    this.onClick(null, keyLeft);
                }
            } else {
                //右
                if (asbX !== 0) {
                    this.onClick(null, keyRight);
                }
            }
        } else {
            if (moveY < 0) {
                //下
                if (asbY !== 0) {
                    this.onClick(null, keyDown);
                }
            } else {
                //上
                if (asbY !== 0) {
                    this.onClick(null, keyUp);
                }
            }
        }
    }

    //键盘按下 滑动指令
    onClick(event?, mouseDirection?) {
        const speed = 130;
        if (this.gameIsOver) return;
        if (this.refusingControl) return;
        //设置一个操作间隔 以免出现 方格异常位移
        this.closeBoardEvent();
        Laya.timer.once(speed, this, () => {
            this.openBoardEvent();
        })
        this.isPlaySound = false;
        if (event) {
            if (this.key[event.which] === 0) {//上
                this.keyDirection = 0;
                this.onUp();
            } else if (this.key[event.which] === 1) {//右
                this.keyDirection = 1;
                this.onRight();
            } else if (this.key[event.which] === 2) {//下
                this.keyDirection = 2;
                this.onDown();
            } else if (this.key[event.which] === 3) {//左
                this.keyDirection = 3;
                this.onLeft();
            }
        } else if (mouseDirection || mouseDirection === 0) {
            this.isMousDown = false;
            if (mouseDirection === 0) {//上
                this.keyDirection = 0;
                this.onUp();
            } else if (mouseDirection === 1) {//右
                this.keyDirection = 1;
                this.onRight();
            } else if (mouseDirection === 2) {//下
                this.keyDirection = 2;
                this.onDown();
            } else if (mouseDirection === 3) {//左
                this.keyDirection = 3;
                this.onLeft();
            }
        }
    }
    //计算出 路径上 最末一个可移动到的目标位置  保存到 移动管理器里 排序
    onUp() {
        let once = 0;
        for (var i = 1; i < this.arrNumber.length; i++) {
            for (var j = 0; j < this.arrNumber[i].length; j++) {
                let alreadyMoved = true;//是否可以进行移动   
                var value = this.arrNumber[i][j];
                var preValue = null;
                var preValue2 = null;
                var preValue3 = null;
                if (value != null) {
                    for (var k = i; k > 0; k--) {
                        preValue = this.arrNumber[k - 1][j];
                        let box1 = k * 4 + j;//需要移动的块
                        let box2 = (k - 1) * 4 + j;//目标块
                        if (preValue === null) {
                            // 进入到这里就说明有移动操作了 所以 再这里进行保存移动之前的 棋盘数据 方便悔棋
                            if (!this.isSavedOperation) {
                                this.saveOperation();
                                this.isSavedOperation = true;
                            }
                            if (k > 1) {
                                for (var ak = k; ak > 1; ak--) {
                                    preValue2 = this.arrNumber[k - 2][j];
                                    if (preValue2 === null) {
                                        if (k > 2) {
                                            for (var bk = ak; bk > 2; bk--) {
                                                preValue3 = this.arrNumber[k - 3][j];
                                                if (preValue3 === null) {
                                                    if (alreadyMoved) {
                                                        alreadyMoved = false;
                                                        this.arrNumber[k - 3].splice(j, 1, value);
                                                        this.arrNumber[k].splice(j, 1, null);
                                                        this.listAnimation(k, j, k - 3, once++);
                                                    }
                                                } else if (preValue3 === value) {
                                                    if (alreadyMoved) {
                                                        alreadyMoved = false;
                                                        this.arrNumber[k - 3].splice(j, 1, 2 * value);
                                                        this.arrNumber[k].splice(j, 1, null);
                                                        this.listAnimation(k, j, k - 3, once++, true);
                                                        this.addScoreToLab(value);
                                                    }
                                                } else if (k === 3) {
                                                    if (alreadyMoved) {
                                                        alreadyMoved = false;
                                                        this.arrNumber[k - 2].splice(j, 1, value);
                                                        this.arrNumber[k].splice(j, 1, null);
                                                        this.listAnimation(k, j, k - 2, once++);
                                                    }
                                                } else {
                                                    break;
                                                }
                                            }
                                        } else {
                                            if (alreadyMoved) {
                                                alreadyMoved = false;
                                                this.arrNumber[k - 2].splice(j, 1, value);
                                                this.arrNumber[k].splice(j, 1, null);
                                                this.listAnimation(k, j, k - 2, once++);
                                            }
                                        }
                                    } else if (preValue2 === value) {
                                        if (alreadyMoved) {
                                            alreadyMoved = false;
                                            this.arrNumber[k - 2].splice(j, 1, 2 * value);
                                            this.arrNumber[k].splice(j, 1, null);
                                            this.listAnimation(k, j, k - 2, once++, true);
                                            this.addScoreToLab(value);
                                        }
                                    } else if (k === 2 || k === 3) {
                                        if (alreadyMoved) {
                                            alreadyMoved = false;
                                            this.arrNumber[k - 1].splice(j, 1, value);
                                            this.arrNumber[k].splice(j, 1, null);
                                            this.listAnimation(k, j, k - 1, once++);
                                        }
                                    } else {
                                        break;
                                    }
                                }
                            } else {
                                if (alreadyMoved) {
                                    alreadyMoved = false;
                                    this.arrNumber[k - 1].splice(j, 1, value);
                                    this.arrNumber[k].splice(j, 1, null);
                                    this.listAnimation(k, j, k - 1, once++);
                                }
                            }
                        } else if (preValue === value) {
                            if (!this.isSavedOperation) {
                                this.saveOperation();
                                this.isSavedOperation = true;
                            }
                            if (alreadyMoved) {
                                alreadyMoved = false;
                                this.arrNumber[k - 1].splice(j, 1, 2 * value);
                                this.arrNumber[k].splice(j, 1, null);
                                this.listAnimation(k, j, k - 1, once++, true);
                                this.addScoreToLab(value);
                            }
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    }

    onRight() {
        let once = 0;
        for (var i = 0; i < this.arrNumber.length; i++) {
            for (var j = this.arrNumber[i].length - 2; j >= 0; j--) {
                var value = this.arrNumber[i][j];
                let alreadyMoved = true;//是否可以进行移动   
                var nextValue = null;
                var nextValue2 = null;
                var nextValue3 = null;
                if (value != null) {
                    for (var k = j; k < this.arrNumber[i].length - 1; k++) {
                        nextValue = this.arrNumber[i][k + 1];
                        let box1 = i * 4 + k;//需要移动的块
                        let box2 = i * 4 + k + 1;//目标块
                        if (nextValue == null) {
                            if (!this.isSavedOperation) {
                                this.saveOperation();
                                this.isSavedOperation = true;
                            }
                            if (k < 2) {
                                for (var ak = k; k < 2; k++) {
                                    nextValue2 = this.arrNumber[i][k + 2];
                                    if (nextValue2 === null) {
                                        if (k < 1) {
                                            nextValue3 = this.arrNumber[i][k + 3];
                                            if (nextValue3 === null) {
                                                if (alreadyMoved) {
                                                    alreadyMoved = false;
                                                    this.arrNumber[i].splice(k + 3, 1, value);
                                                    this.arrNumber[i].splice(k, 1, null);
                                                    this.listAnimation(i, k, k + 3, once++);
                                                }
                                            } else if (nextValue3 === value) {
                                                if (alreadyMoved) {
                                                    alreadyMoved = false;
                                                    this.arrNumber[i].splice(k + 3, 1, 2 * value);
                                                    this.arrNumber[i].splice(k, 1, null);
                                                    this.listAnimation(i, k, k + 3, once++, true);
                                                    this.addScoreToLab(value);
                                                }
                                            } else if (k === 0) {
                                                if (alreadyMoved) {
                                                    alreadyMoved = false;
                                                    this.arrNumber[i].splice(k + 2, 1, value);
                                                    this.arrNumber[i].splice(k, 1, null);
                                                    this.listAnimation(i, k, k + 2, once++);
                                                }
                                            } else {
                                                break;
                                            }
                                        } else {
                                            if (alreadyMoved) {
                                                alreadyMoved = false;
                                                this.arrNumber[i].splice(k + 2, 1, value);
                                                this.arrNumber[i].splice(k, 1, null);
                                                this.listAnimation(i, k, k + 2, once++);
                                            }
                                        }
                                    } else if (nextValue2 === value) {
                                        if (alreadyMoved) {
                                            alreadyMoved = false;
                                            this.arrNumber[i].splice(k + 2, 1, 2 * value);
                                            this.arrNumber[i].splice(k, 1, null);
                                            this.listAnimation(i, k, k + 2, once++, true);
                                            this.addScoreToLab(value);
                                        }
                                    } else if (k === 1 || k === 0) {
                                        if (alreadyMoved) {
                                            alreadyMoved = false;
                                            this.arrNumber[i].splice(k + 1, 1, value);
                                            this.arrNumber[i].splice(k, 1, null);
                                            this.listAnimation(i, k, k + 1, once++);
                                        }
                                    } else {
                                        break;
                                    }
                                }
                            } else {
                                if (alreadyMoved) {
                                    alreadyMoved = false;
                                    this.arrNumber[i].splice(k + 1, 1, value);
                                    this.arrNumber[i].splice(k, 1, null);
                                    this.listAnimation(i, k, k + 1, once++);
                                }
                            }
                        } else if (nextValue == value) {
                            if (!this.isSavedOperation) {
                                this.saveOperation();
                                this.isSavedOperation = true;
                            }
                            if (alreadyMoved) {
                                alreadyMoved = false;
                                this.arrNumber[i].splice(k + 1, 1, 2 * value);
                                this.arrNumber[i].splice(k, 1, null);
                                this.listAnimation(i, k, k + 1, once++, true);
                                this.addScoreToLab(value);
                            }
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    }

    onDown() {
        let once = 0;
        for (var i = this.arrNumber.length - 2; i >= 0; i--) {
            for (var j = 0; j < this.arrNumber[i].length; j++) {
                let alreadyMoved = true;//是否可以进行移动   
                var value = this.arrNumber[i][j];
                var nextValue = null;
                var nextValue2 = null;
                var nextValue3 = null;
                if (value != null) {
                    for (var k = i; k < this.arrNumber.length - 1; k++) {
                        nextValue = this.arrNumber[k + 1][j];
                        let box1 = k * 4 + j;//需要移动的块
                        let box2 = (k + 1) * 4 + j;//目标块
                        if (nextValue == null) {
                            if (!this.isSavedOperation) {
                                this.saveOperation();
                                this.isSavedOperation = true;
                            }
                            if (k < 2) {
                                for (var ak = k; ak < 2; ak++) {
                                    nextValue2 = this.arrNumber[k + 2][j];
                                    if (nextValue2 === null) {
                                        if (k < 1) {
                                            for (var bk = k; bk < 1; bk++) {
                                                nextValue3 = this.arrNumber[k + 3][j];
                                                if (nextValue3 === null) {
                                                    if (alreadyMoved) {
                                                        alreadyMoved = false;
                                                        this.arrNumber[k + 3].splice(j, 1, value);
                                                        this.arrNumber[k].splice(j, 1, null);
                                                        this.listAnimation(k, j, k + 3, once++);
                                                    }
                                                } else if (nextValue3 === value) {
                                                    if (alreadyMoved) {
                                                        alreadyMoved = false;
                                                        this.arrNumber[k + 3].splice(j, 1, 2 * value);
                                                        this.arrNumber[k].splice(j, 1, null);
                                                        this.listAnimation(k, j, k + 3, once++, true);
                                                        this.addScoreToLab(value);
                                                    }
                                                } else if (k === 0) {
                                                    if (alreadyMoved) {
                                                        alreadyMoved = false;
                                                        this.arrNumber[k + 2].splice(j, 1, value);
                                                        this.arrNumber[k].splice(j, 1, null);
                                                        this.listAnimation(k, j, k + 2, once++);
                                                    }
                                                } else {
                                                    break;
                                                }
                                            }
                                        } else {
                                            if (alreadyMoved) {
                                                alreadyMoved = false;
                                                this.arrNumber[k + 2].splice(j, 1, value);
                                                this.arrNumber[k].splice(j, 1, null);
                                                this.listAnimation(k, j, k + 2, once++);
                                            }
                                        }
                                    } else if (nextValue2 === value) {
                                        if (alreadyMoved) {
                                            alreadyMoved = false;
                                            this.arrNumber[k + 2].splice(j, 1, 2 * value);
                                            this.arrNumber[k].splice(j, 1, null);
                                            this.listAnimation(k, j, k + 2, once++, true);
                                            this.addScoreToLab(value);
                                        }
                                    } else if (k === 1 || k === 0) {
                                        if (alreadyMoved) {
                                            alreadyMoved = false;
                                            this.arrNumber[k + 1].splice(j, 1, value);
                                            this.arrNumber[k].splice(j, 1, null);
                                            this.listAnimation(k, j, k + 1, once++);
                                        }
                                    } else {
                                        break;
                                    }
                                }
                            } else {
                                if (alreadyMoved) {
                                    alreadyMoved = false;
                                    this.arrNumber[k + 1].splice(j, 1, value);
                                    this.arrNumber[k].splice(j, 1, null);
                                    this.listAnimation(k, j, k + 1, once++);
                                }
                            }
                        } else if (nextValue == value) {
                            if (!this.isSavedOperation) {
                                this.saveOperation();
                                this.isSavedOperation = true;
                            }
                            if (alreadyMoved) {
                                alreadyMoved = false;
                                this.arrNumber[k + 1].splice(j, 1, 2 * value);
                                this.arrNumber[k].splice(j, 1, null);
                                this.listAnimation(k, j, k + 1, once++, true);
                                this.addScoreToLab(value);
                            }
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    }

    onLeft() {
        let once = 0;
        for (var i = 0; i < this.arrNumber.length; i++) {
            for (var j = 1; j < this.arrNumber[i].length; j++) {
                var value = this.arrNumber[i][j];
                let alreadyMoved = true;//是否可以进行移动   
                var preValue = null;
                var preValue2 = null;
                var preValue3 = null;
                if (value != null) {
                    for (var k = j; k > 0; k--) {
                        preValue = this.arrNumber[i][k - 1];
                        let box1 = i * 4 + k;//需要移动的块
                        let box2 = i * 4 + k - 1;//目标块
                        if (preValue == null) {
                            if (!this.isSavedOperation) {
                                this.saveOperation();
                                this.isSavedOperation = true;
                            }
                            if (k > 1) {
                                for (var ak = k; k > 1; k--) {
                                    preValue2 = this.arrNumber[i][k - 2];
                                    if (preValue2 === null) {
                                        if (k > 2) {
                                            for (var bk = k; k > 2; k--) {
                                                preValue3 = this.arrNumber[i][k - 3];
                                                if (preValue3 === null) {
                                                    if (alreadyMoved) {
                                                        alreadyMoved = false;
                                                        this.arrNumber[i].splice(k - 3, 1, value);
                                                        this.arrNumber[i].splice(k, 1, null);
                                                        this.listAnimation(i, k, k - 3, once++);
                                                    }
                                                } else if (preValue3 === value) {
                                                    if (alreadyMoved) {
                                                        alreadyMoved = false;
                                                        this.arrNumber[i].splice(k - 3, 1, 2 * value);
                                                        this.arrNumber[i].splice(k, 1, null);
                                                        this.listAnimation(i, k, k - 3, once++, true);
                                                        this.addScoreToLab(value);
                                                    }
                                                } else if (k === 3) {
                                                    if (alreadyMoved) {
                                                        alreadyMoved = false;
                                                        this.arrNumber[i].splice(k - 2, 1, value);
                                                        this.arrNumber[i].splice(k, 1, null);
                                                        this.listAnimation(i, k, k - 2, once++);
                                                    }
                                                } else {
                                                    break;
                                                }
                                            }
                                        } else {
                                            if (alreadyMoved) {
                                                alreadyMoved = false;
                                                this.arrNumber[i].splice(k - 2, 1, value);
                                                this.arrNumber[i].splice(k, 1, null);
                                                this.listAnimation(i, k, k - 2, once++);
                                            }
                                        }
                                    } else if (preValue2 === value) {
                                        if (alreadyMoved) {
                                            alreadyMoved = false;
                                            this.arrNumber[i].splice(k - 2, 1, 2 * value);
                                            this.arrNumber[i].splice(k, 1, null);
                                            this.listAnimation(i, k, k - 2, once++, true);
                                            this.addScoreToLab(value);
                                        }
                                    } else if (k === 2 || k === 3) {
                                        if (alreadyMoved) {
                                            alreadyMoved = false;
                                            this.arrNumber[i].splice(k - 1, 1, value);
                                            this.arrNumber[i].splice(k, 1, null);
                                            this.listAnimation(i, k, k - 1, once++);
                                        }
                                    } else {
                                        break;
                                    }
                                }
                            } else {
                                if (alreadyMoved) {
                                    alreadyMoved = false;
                                    this.arrNumber[i].splice(k - 1, 1, value);
                                    this.arrNumber[i].splice(k, 1, null);
                                    this.listAnimation(i, k, k - 1, once++);
                                }
                            }
                        } else if (preValue == value) {
                            if (!this.isSavedOperation) {
                                this.saveOperation();
                                this.isSavedOperation = true;
                            }
                            if (alreadyMoved) {
                                alreadyMoved = false;
                                this.arrNumber[i].splice(k - 1, 1, 2 * value);
                                this.arrNumber[i].splice(k, 1, null);
                                this.listAnimation(i, k, k - 1, once++, true);
                                this.addScoreToLab(value);
                            }
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    }

    //随机位置添加 2 或者 4
    addData() {
        // 随机一个位置
        let randx = Math.floor(Math.random() * 4);
        let randy = Math.floor(Math.random() * 4);
        let times = 0;
        let move = false;
        //随机50次筛选
        while (times < 50) {
            if (this.arrNumber[randx][randy] == null) {
                move = true;
                break;
            }
            randx = Math.floor(Math.random() * 4);
            randy = Math.floor(Math.random() * 4);
            times++;
        }
        //50次都没有选到 一个一个排查下去
        if (times == 50) {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (this.arrNumber[i][j] == null) {
                        randx = i;
                        randy = j;
                        move = true;
                    }
                }
            }
        }
        // 随机一个数字
        var randNumber = Math.random() < 0.5 ? 2 : 4;
        // 在随机位置显示随机数字
        if (move) {
            this.arrNumber[randx][randy] = randNumber;
            let Box = this.gameBackGroundView._listCheckerboard.getCell(randx * 4 + randy);
            Tween.to(Box, { scaleX: 1.2, scaleY: 1.2 }, 60, null, Laya.Handler.create(this, () => {
                Tween.to(Box, { scaleX: 1, scaleY: 1 }, 60, null, Laya.Handler.create(this, () => {
                }))
            }))
        }
        this.addDataToList();
        this.gameBackGroundView._score.text = this.gameScore + '';
        this.gameMaxScore = Laya.LocalStorage.getJSON('gameMaxScore');
        if (!this.gameMaxScore) {
            this.gameMaxScore = 0;
        }
        if (this.gameScore > this.gameMaxScore) {
            this.gameMaxScore = this.gameScore;
            Laya.LocalStorage.setJSON('gameMaxScore', this.gameScore);
        }
        this.gameBackGroundView._maxScore.text = Laya.LocalStorage.getJSON('gameMaxScore') ? Laya.LocalStorage.getJSON('gameMaxScore') : 0;

    }

    //添加数字到list里 刷新棋盘 顺便关闭弹窗 测试 游戏是否还有位置可以走
    addDataToList() {
        let newData = [];
        this.arrNumber.map((data, i) => {
            data.map((res, k) => {
                newData.push({ _labNum: { text: res }, _teImage: { skin: this.getNumberReturnSkin(res), visible: res > 0 && res !== null } });
            })
        })
        this.gameBackGroundView._listCheckerboard.array = newData;
        this.refreshListArrData = newData;
        this.isSavedOperation = false;
        if (this.gameOverDialog) {
            this.gameOverDialog.close();
        }
        if (this.repentDialog) {
            this.repentDialog.close();
        }
        this.if2048Over();
    }
    //单纯刷新棋盘数据
    refreshListData() {
        this.gameBackGroundView._listCheckerboard.array = this.refreshListArrData;
    }

    //每次有移动的时候保存一次  
    saveOperation() {
        this.moveScore = 0;
        this.stepNumberPedometer++;
        if (this.stepNumberPedometer >= this.maxStepNumberPedometer) {
            if (this.onLastStepNumber >= this.maxLastStepNumber) return;
            this.ButRepentVisible(true);
        }
        this.regretArr = [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ];
        this.arrNumber.map((data, i) => {
            data.map((res, k) => {
                this.regretArr[i][k] = res;
            })
        })
        return true;
    }
    //先判断 2048 是否已经集齐
    if2048Over() {
        for (var i = 0; i < this.arrNumber.length; i++) {
            for (var j = 0; j < this.arrNumber[i].length; j++) {
                if (this.arrNumber[i][j] == 2048 && !this.is2048Reach) {
                    this.winDialog();
                    return;
                }
            }
        }
        this.isGameOver();
    }
    //游戏结束
    isGameOver() {
        for (var i = 0; i < this.arrNumber.length; i++) {
            for (var j = 0; j < this.arrNumber[i].length; j++) {
                if (this.arrNumber[i][j] == null) {
                    return false;
                } else if (j < this.arrNumber[i].length - 1 && this.arrNumber[i][j] == this.arrNumber[i][j + 1]) {
                    return false;
                } else if (i < this.arrNumber.length - 1 && this.arrNumber[i][j] == this.arrNumber[i + 1][j]) {
                    return false;
                }
            }
        }
        this.overTips();
    }

    overTips() {
        this.gameIsOver = true;
        Laya.timer.once(500, this, () => {
            // alert("游戏结束");
            if (!this.gameOverDialog) {
                this.gameOverDialog = new view.GameOverDialog();
                this.gameOverDialog.isModal = true;
                this.gameOverDialog._butGiveUp.on(laya.events.Event.CLICK, this, () => {
                    this.ButRepentVisible(false);
                    this.gameOverDialog.close();
                })
                this.gameOverDialog._butContinuedLife.on(laya.events.Event.CLICK, this, () => {
                    this.continuedLife();
                })
                this.gameOverDialog.popup();
            } else {
                this.gameOverDialog.popup();
            }
            Laya.timer.clearAll(this);
        });
    }

    //达成2048 数字 的 win 窗口
    winDialog() {
        this.closeBoardEvent();
        if (!this.youWinDialog) {
            this.youWinDialog = new view.YouWinDialog();
            this.youWinDialog.isModal = true;
            this.youWinDialog._butGameOver.on(laya.events.Event.CLICK, this, () => {
                this.youWinDialog.close();
                this.ButRepentVisible(false);
                this.closeBoardEvent();
            });
            this.youWinDialog._butContinue.on(laya.events.Event.CLICK, this, () => {
                this.youWinDialog.close();
            })
            this.is2048Reach = true;
            this.youWinDialog.popup();
        } else {
            this.is2048Reach = true;
            this.youWinDialog.popup();
        }
    }

    //关闭 棋盘操作
    closeBoardEvent() {
        this.refusingControl = true; //拒绝接受滑动指令
    }
    //打开 棋盘操作
    openBoardEvent() {
        this.refusingControl = false; //拒绝接受滑动指令
    }
    //悔棋窗口
    ejectRepentDialog() {
        if (!this.repentDialog) {
            this.repentDialog = new view.RepentDialog();
            this.repentDialog.isModal = true;
            this.repentDialog._butGiveUp.on(laya.events.Event.CLICK, this, () => {
                this.repentDialog.close();
            })
            this.repentDialog._ButRepent.on(laya.events.Event.CLICK, this, () => {
                this.onLastStep();
            })
            this.repentDialog.popup();
        } else {
            this.repentDialog.popup();
        }
    }

    //回退一步
    onLastStep() {
        this.arrNumber = this.regretArr;
        this.onLastStepNumber++;
        this.reduceScoreToLab();
        this.ButRepentVisible(false);
        this.addDataToList();
    }
    //让悔棋按钮 不可选择
    ButRepentVisible(vis) {
        if (vis) {
            this.gameBackGroundView._butRepent.visible = true;
            this.gameBackGroundView._butRepent.mouseEnabled = true;
        } else {
            this.gameBackGroundView._butRepent.visible = false;
            this.gameBackGroundView._butRepent.mouseEnabled = false;
        }
    }
    //续命 保留当前最高一位 其他清空
    continuedLife() {
        this.maxStepNumberPedometer = 0;
        let maxNumber = 2;
        let x;
        let y;
        this.arrNumber.map((num, index) => {
            num.map((n, i) => {
                if (n >= maxNumber) {
                    maxNumber = n;
                    x = index;
                    y = i;
                }
            })
        });
        this.arrNumber = [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ];
        this.arrNumber[x][y] = maxNumber;
        this.gameIsOver = false;
        this.openBoardEvent();
        this.addData();
    }

    //添加积分 已经动态显示
    addScoreToLab(value) {
        this.moveScore = this.moveScore + value + value;
        this.gameBackGroundView._scoreWave.text = '+' + 2 * value;
        this.gameBackGroundView.scoreWave.play(0, false);
        this.gameScore = this.gameScore + value + value;
    }
    //悔棋减分
    reduceScoreToLab() {
        this.gameScore = this.gameScore - this.moveScore;
        this.gameBackGroundView._score.text = this.gameScore + '';
    }

    //获取到当前需要移动的块儿 arr[i][k] e为目标BOX的一个X或者Y  ，移动的 value 数字，目标数字 nextValue
    listAnimation(i, k, e, once, isWave?) {
        const speed = this.aniTime  //方块移动时间   方块放大缩小时间为这个的一半
        const scaleSpeed = speed * 0.7;
        const scale = 1.2   //方块 放大缩小比列
        let bgmBiu;
        let box1 = i * 4 + k;
        let box2;
        let data = this.gameBackGroundView._listCheckerboard.getCell(box1);
        let data2;
        if (this.keyDirection === 0) {//上
            box2 = e * 4 + k;
            data2 = this.gameBackGroundView._listCheckerboard.getCell(box2);
            let y = data.y;
            Tween.to(data, { y: data2.y }, speed, null, Laya.Handler.create(this, () => {
                data.y = y;
                if (once === 0) {
                    this.addData();
                }
                if (isWave) {
                    if (GameMain.Soundable && !this.isPlaySound) {
                        this.isPlaySound = true;
                        Laya.SoundManager.playSound("sounds/biuMp3.mp3", 1);
                    }
                    Tween.to(data2, { scaleX: scale, scaleY: scale }, scaleSpeed, null, Laya.Handler.create(this, () => {
                        Tween.to(data2, { scaleX: 1, scaleY: 1 }, scaleSpeed, null, Laya.Handler.create(this, () => {
                        }))
                    }))
                }
            }));
        } else if (this.keyDirection === 1) {//右
            box2 = i * 4 + e
            data2 = this.gameBackGroundView._listCheckerboard.getCell(box2);
            let x = data.x;
            Tween.to(data, { x: data2.x }, speed, null, Laya.Handler.create(this, () => {
                data.x = x;
                if (once === 0) {
                    this.addData();
                }
                if (isWave) {
                    if (GameMain.Soundable && !this.isPlaySound) {
                        this.isPlaySound = true;
                        Laya.SoundManager.playSound("sounds/biuMp3.mp3", 1);
                    }
                    Tween.to(data2, { scaleX: scale, scaleY: scale }, scaleSpeed, null, Laya.Handler.create(this, () => {
                        Tween.to(data2, { scaleX: 1, scaleY: 1 }, scaleSpeed, null, Laya.Handler.create(this, () => {
                        }))
                    }))
                }
            }));
        } else if (this.keyDirection === 2) {//下
            box2 = e * 4 + k;
            data2 = this.gameBackGroundView._listCheckerboard.getCell(box2);
            let y = data.y;
            Tween.to(data, { y: data2.y }, speed, null, Laya.Handler.create(this, () => {
                data.y = y;
                if (once === 0) {
                    this.addData();
                }
                if (isWave) {
                    if (GameMain.Soundable && !this.isPlaySound) {
                        this.isPlaySound = true;
                        Laya.SoundManager.playSound("sounds/biuMp3.mp3", 1);
                    }
                    Tween.to(data2, { scaleX: scale, scaleY: scale }, scaleSpeed, null, Laya.Handler.create(this, () => {
                        Tween.to(data2, { scaleX: 1, scaleY: 1 }, scaleSpeed, null, Laya.Handler.create(this, () => {
                        }))
                    }))
                }
            }));
        } else if (this.keyDirection === 3) {//左
            box2 = i * 4 + e;
            data2 = this.gameBackGroundView._listCheckerboard.getCell(box2);
            let x = data.x;
            Tween.to(data, { x: data2.x }, speed, null, Laya.Handler.create(this, () => {
                data.x = x;
                if (once === 0) {
                    this.addData();
                }
                if (isWave) {
                    if (GameMain.Soundable && !this.isPlaySound) {
                        this.isPlaySound = true;
                        Laya.SoundManager.playSound("sounds/biuMp3.mp3", 1);
                    }
                    Tween.to(data2, { scaleX: scale, scaleY: scale }, scaleSpeed, null, Laya.Handler.create(this, () => {
                        Tween.to(data2, { scaleX: 1, scaleY: 1 }, scaleSpeed, null, Laya.Handler.create(this, () => {
                        }))
                    }))
                }
            }));
        }
    }

    // 根据数字获得图片皮肤
    getNumberReturnSkin(number) {
        switch (number) {
            case 2: return 'index/2.png';
            case 4: return "index/4.png";
            case 8: return "index/8.png";
            case 16: return "index/16.png";
            case 32: return "index/32.png";
            case 64: return "index/64.png";
            case 128: return "index/128.png";
            case 256: return "index/256.png";
            case 512: return "index/512.png";
            case 1024: return "index/1024.png";
            case 2048: return "index/2048.png";
            case 4096: return "index/4096.png";
            default: return "index/4096.png";
        }
    }
    public dispose() {//因为显示对象是放在Stage上 故要显式释放资源
        // this.into();
        // this.inGame();
    }

}