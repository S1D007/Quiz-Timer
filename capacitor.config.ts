import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Quiz Timer',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    cleartext:true
  },
  plugins:{
    GoogleAuth:{
      scopes:["profile","email"],
      serverClientId:"574074411601-1m9e7id3kj4lj0cr6ceqcfmjllr446l2.apps.googleusercontent.com",
      forceCodeForRefreshToken:true
    }
  }
};

export default config;
