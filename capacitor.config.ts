import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.86c5f81659304cb88422c3fca23dda89',
  appName: 'just-thai-talk',
  webDir: 'dist',
  server: {
    url: 'https://86c5f816-5930-4cb8-8422-c3fca23dda89.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;