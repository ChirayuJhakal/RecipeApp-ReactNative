import wd from 'wd'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
const PORT = 4723;

const config = { 
    platformName: "Android",
    platformVersion: "8",
    deviceName: "Android Emulator",
    app: "/path/to/the/downloaded/app.apk",
    automationName: "UiAutomator2"
}