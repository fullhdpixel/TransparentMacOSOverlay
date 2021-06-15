const { app, BrowserWindow } = require('electron');
const path = require('path');

const MAIN_HTML = path.join('file://', __dirname, 'main.html');

const onAppReady = function () {
  let parent = new BrowserWindow({
    // center: true,
    x: 0,
    y: 0,
    width: 700,
    height: 700,
    transparent: true,
    frame: false,
    fullscreenable: false,
    simpleFullscreen: true
  });

  parent.setIgnoreMouseEvents(true)
  parent.setFocusable(false)
  parent.setAlwaysOnTop(true, 'status')
  parent.maximize()

  parent.once('close', () => {
    parent = null;
  });

  parent.loadURL(MAIN_HTML);
};

//~ app.on('ready', onAppReady);
app.on('ready', () => setTimeout(onAppReady, 500));