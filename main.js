const path = require("path");
const {app, BrowserWindow, ipcMain} = require('electron');
const {outputFile} = require("fs-extra");
const isDev = require("electron-is-dev");
const fs = require("fs");
const xml2js = require('xml2js');
const child_process = require("child_process");

let mainWindow;
const FOLDER_PATH = isDev ? __dirname : app.getPath("videos");

// const ioHook = require("iohook");
// ioHook.on("keydown", (evt) => {
//   console.log(">> KEY DOWN: ", evt);
// });

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  });
  mainWindow.webContents.openDevTools({mode: "detach"});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  // ioHook.start();


  mainWindow.on("close", (event) => {
    app.quit()
  });

//   const filename = path.join(app.getPath("userData"), "dx.xml");
//   console.log(filename);
//   child_process.exec(`dxdiag /x ${filename}"`, {}, () => {
//     console.log("done!")
//     var parser = new xml2js.Parser({explicitArray: false, trim: true});
//     fs.readFile(filename, (err, data) => {
//       console.log("read file")
//       if (err) {
//         console.log(err);
//         return;
//       }
//       parser.parseString(data, function (err, result) {
//         const inputDevices = result["DxDiag"]["DirectInput"]["DirectInputDevices"]["DirectInputDevice"];
//         const devices = {};
//         inputDevices.forEach(id => {
//           const name = id["DeviceName"];
//           if (name === "Mouse" || name === "Keyboard") {
//             return;
//           }
//           devices[name] = true;
//         })
//         console.log(Object.keys(devices));
//       });
//     });
//   });
//
});
//
// let counter = 0;
// ipcMain.on("SAVE_FILE_EVENT", (event, fileName, buffer) => {
//   counter +=1;
//   const pathname = path.join(FOLDER_PATH, "tmp", fileName + counter + ".webm");
//   // console.log(pathname);
//   outputFile(pathname, buffer, err => {
//       if (err) {
//           event.sender.send("ERROR", err.message)
//       } else {
//           event.sender.send("SAVED_FILE_EVENT", path)
//       }
//   })
// })
