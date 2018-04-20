import {app, BrowserWindow, Menu} from "electron";
import {shell} from "electron";

let mainForm;

app.on("ready", () => {
    mainForm = new BrowserWindow({
        webPreferences: {
            nodeIntegrationInWorker: true
        },

        center: true,
        minHeight: 700,
        minWidth: 1200,
        title: "PlayPerium Comet",
        width: 1200
    });

    mainForm.loadURL(`file://${__dirname}/main.html`);
    setFormMenu();
});

app.once("window-all-closed", app.quit);

function setFormMenu() {
    const formMenu = [
    {
        label: "Comet",
        submenu: [
            {
                label: "Developer Tools",
                click() {mainForm.toggleDevTools(); }
            },
            {
                label: "Exit",
                click() {app.quit(); }
            }
        ]
    },
    {
        label: "Help",
        submenu: [
            {
                label: "Documentation",
                click() {shell.openExternal("https://github.com/PlayPerium/Comet/wiki"); }
            },
            {
                label: "License",
                click() {shell.openExternal("https://github.com/PlayPerium/Comet/blob/master/LICENSE"); }
            }
        ]
    },
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(formMenu));
}
