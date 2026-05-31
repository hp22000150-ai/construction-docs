const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  print:       () => ipcRenderer.send('print-window'),
  dataSave:    (filename, content) => ipcRenderer.invoke('data-save', filename, content),
  dataList:    () => ipcRenderer.invoke('data-list'),
  dataRead:    (filename) => ipcRenderer.invoke('data-read', filename),
  dataDirPath: () => ipcRenderer.invoke('data-dir-path'),
});
