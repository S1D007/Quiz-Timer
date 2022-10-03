import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Quiz Timer',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    "androidScheme": "http",
    "allowNavigation": [
      "http://31.187.75.162:1111"
    ]
  }
};

export default config;
