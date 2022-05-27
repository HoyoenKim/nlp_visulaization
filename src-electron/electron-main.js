import { app, BrowserWindow, nativeTheme, ipcMain } from "electron";
import path from "path";
import os from "os";

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === "win32" && nativeTheme.shouldUseDarkColors === true) {
    require("fs").unlinkSync(
      path.join(app.getPath("userData"), "DevTools Extensions")
    );
  }
} catch (_) {}

let mainWindow;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, "icons/icon.png"), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on("devtools-opened", () => {
      mainWindow.webContents.closeDevTools();
    });
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

function read_json() {
  const fs = require("fs");
  var filePath = path.join(process.cwd(), "music_raw_data", "cralwer_ret.json");
  const jsonFile = fs.readFileSync(filePath, "utf8");
  const jsonData = JSON.parse(jsonFile);
  return jsonData;
}

ipcMain.on("read_csv", (event, data) => {
  //__dirname
  console.log(`Received [${data}] from renderer browser`);
  mainWindow.webContents.send("read_csv_finish", read_json());
});

import { PythonShell } from "python-shell";
ipcMain.on("send_searchkeyword", (event, data) => {
  //__dirname
  console.log(`Received [${data}] from renderer browser`);
  var python_options = {
    mode: "text",
    pythonPath: "python",
    pythonOption: ["-u"],
    scriptPath: path.join(process.cwd(), "python"), //__dirname, //process.cwd()
    args: [data],
  };

  PythonShell.run("kobert.py", python_options, function (err, emot_ret) {
    if (err) {
      console.log(err);
    }
    console.log(emot_ret);
    mainWindow.webContents.send("send_searchkeyword_finish", emot_ret);
  });
});
