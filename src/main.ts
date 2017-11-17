import {app, BrowserWindow, Menu} from 'electron';
import {shell} from 'electron';

var mainForm;

app.on('ready', () => {
    mainForm = new BrowserWindow({
        webPreferences: {
            nodeIntegrationInWorker: true
        },

        width: 1200,
        height: 700,
        minWidth: 1200,
        minHeight: 700,
        center: true,
        title: "PlayPerium Comet"
    })

    mainForm.loadURL(`file://${__dirname}/main.html`);
    setFormMenu();
})

app.once('window-all-closed', app.quit);

function setFormMenu() {
    var formMenu = [
    {
        label: "Comet",
        submenu: [
            {
                label: "Developer Tools",
                click() {mainForm.toggleDevTools();}
            },
            {
                label: "Exit",
                click() {app.quit();}
            }
        ]
    },
    {
        label: "Help",
        submenu: [
            {
                label: "License",
                click() {shell.openExternal('https://github.com/PlayPerium/Comet/blob/master/LICENSE');}
            }
        ]
    },
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(formMenu));
}
