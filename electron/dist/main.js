"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var win;
// Enable live reload for all the files inside your project directory and Electron too
require('electron-reload')(path.join(__dirname, "/../../src"), {
    electron: path.join(__dirname, "/../../node_modules/.bin/electron")
});
function createWindow() {
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        width: 1281,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // and load the index.html of the app.
    // win.loadFile('dist/angular-electron-poc/index.html')
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/angular-electron-poc/index.html"),
        protocol: "file:",
        slashes: true
    }));
    // Open the DevTools.
    // win.webContents.openDevTools()
    // Emitted when the window is closed.
    win.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//# sourceMappingURL=main.js.map