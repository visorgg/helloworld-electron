const {app, BrowserWindow} = require('electron');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
      height: 600,
      width: 800
  });

  mainWindow.webContents.openDevTools({mode: "detach"});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
});
