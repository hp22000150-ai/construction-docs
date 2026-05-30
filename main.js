const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: '공사일지',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.on('print-window', () => {
  if (!mainWindow) return;
  mainWindow.webContents.printToPDF({
    pageSize: 'A4',
    printBackground: true,
    margins: { marginType: 'none' }
  }).then(data => {
    const tmpPath = path.join(os.tmpdir(), `작업일보_${Date.now()}.pdf`);
    fs.writeFileSync(tmpPath, data);
    shell.openPath(tmpPath);
  }).catch(err => {
    console.error('PDF 생성 실패:', err);
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
