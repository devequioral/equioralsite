import '@/styles/grid.css';
import '@/styles/globals.css';

import { AppProvider } from '@/context/AppContext';
import { Roboto } from 'next/font/google';
import { Unlock } from 'next/font/google';

const primary_font = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const secondary_font = Unlock({
  subsets: ['latin'],
  weight: ['400'],
});

import { NextUIProvider } from '@nextui-org/react';

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <NextUIProvider>
        <style jsx global>{`
          :root {
            --primary-color: #38ac9f;
            --secondary-color: #00a9f2;
            --black-color: #353434;
            --white-color: #e6e4e4;
            --primary-font: ${primary_font.style.fontFamily};
            --secondary-font: ${secondary_font.style.fontFamily};
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        `}</style>
        <Component {...pageProps} />
      </NextUIProvider>
    </AppProvider>
  );
}
