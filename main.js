const {app, BrowserWindow, Menu, ipcRenderer} = require('electron')
const path = require('path')
const MAIN_HTML = path.join('file://', __dirname, 'main.html')
const prompt = require('electron-prompt')

let parent = null

const onAppReady = () => {
  parent = new BrowserWindow({
    x: 0,
    y: 0,
    width: 700,
    height: 700,
    transparent: true,
    frame: false,
    fullscreenable: false,
    simpleFullscreen: true
  })

  parent.setIgnoreMouseEvents(true)
  parent.setFocusable(false)
  parent.setAlwaysOnTop(true, 'status')
  parent.maximize()

  parent.once('close', () => {
    parent = null
  })

  parent.loadURL(MAIN_HTML)
}

const template = [
  {
    label: 'View',
    submenu: [
      {
        role: 'help',
        label: 'Change input',
        click (menuItem, browserWindow, event) {
          prompt({
            title: 'Prompt example',
            label: 'Optional text:',
            type: 'input'
          }).then((r) => {
            console.log(r)
            if (r === null) {
              console.log('user cancelled')
            } else if (parent && parent.webContents) {
              parent.webContents.executeJavaScript(`
                document.getElementById('p2').innerText = "${r.toString().trim()}"
              `, true).then((result) => {
                console.log(result) // will be your innherhtml
              })
            } else {
              alert('Parent window not yet ready')
            }
          }).catch(console.error)
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

app.on('ready', onAppReady)