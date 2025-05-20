// /// <reference path="../model/data.ts" />
// /// <reference path="./PlayerManager.ts" />
/// <reference path="./ChatManager.ts" />

namespace app {
    class Manager {
        // player = new PlayerManager();
        chat = new ChatManager();
    }

    export var manager = new Manager();
}