import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
// import { GoogleAnalytics } from '@next/third-parties/google'
// import { GoogleTagManager } from '@next/third-parties/google'
import GoogleAnalytics from './GoogleAnalytics';


export default function RootLayout(props) {
  const { children } = props;
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {children}

          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
      {/* <GoogleAnalytics gaId="G-CGHR9EN0JV" />
      <GoogleTagManager gtmId="G-CGHR9EN0JV" /> */}
    </html>
  );
}
