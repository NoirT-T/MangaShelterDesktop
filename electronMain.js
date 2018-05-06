const electronMain = require('electron');
const app = electronMain.app;
const BrowserWindow = electronMain.BrowserWindow;
const path = require('path');
// require('electron-react-devtools').install();
const isProduction = false;

app.on('ready', function (lounchInfo) {
    console.log(lounchInfo);

    const mainWindow = new BrowserWindow({
        minHeight: 500,
        minWidth: 900,
        height: 500,
        width: 900,
        title: 'MangaShelter Desktop',
        icon:path.join(__dirname,'favicon.png'),
        webPreferences:{
            webSecurity:false
        }
    });
    if (isProduction === false)
        mainWindow.loadURL('http://localhost:9000');
    else
        mainWindow.loadURL(path.join(__dirname, 'dist/index.html'));

    mainWindow.webContents.openDevTools({
        mode: 'bottom'
    });
});