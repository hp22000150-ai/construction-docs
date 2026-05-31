const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

let mainWindow;

function getDataDir() {
  const dir = app.isPackaged
    ? path.join(path.dirname(app.getPath('exe')), 'data')
    : path.join(__dirname, 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

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

ipcMain.handle('data-save', (e, filename, content) => {
  const dir = getDataDir();
  fs.writeFileSync(path.join(dir, filename), content, 'utf8');
  return dir;
});

ipcMain.handle('data-list', () => {
  const dir = getDataDir();
  return fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort().reverse();
});

ipcMain.handle('data-read', (e, filename) => {
  const dir = getDataDir();
  return fs.readFileSync(path.join(dir, filename), 'utf8');
});

ipcMain.handle('data-dir-path', () => getDataDir());

app.on('window-all-closed', () => {
  app.quit();
});
