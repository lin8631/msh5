/// <reference path="./Base.ts" />
namespace app.model {
    export class Chat extends Base {

        @field()
        id: number = 0;
        @field()
        subType: number = 0;
        @field()
        args: Array<string> = [];
        @field()
        name:string="";
        @field()
        sendTime: number = 0;

        @field()
        roleId: number = 0;
        @field()
        serverIndex: number = 0;
        @field()
        nickName: string = "";
        @field()
        gender: number = 0;
        @field()
        leadIndex: number = 0;

        chatMode: number = 0;
        toRoleName: string;
        showWords: string = "";
    }
}