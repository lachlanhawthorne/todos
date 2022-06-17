// causing webpack issue
import '@tamagui/core/reset.css'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'

import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import { Provider } from 'app/provider'
import Head from 'next/head'
import React, { useMemo } from 'react'
import type { SolitoAppProps } from 'solito'
import 'raf/polyfill'

import App from 'next/app'
import { supabaseClient } from 'data-access'
import { UserProvider } from 'data-access/src/contexts/user'
import type { User } from '@supabase/supabase-js'

interface MyAppProps extends SolitoAppProps {
  ssrUserData?: User | null
}

function MyApp({ Component, pageProps, ssrUserData }: MyAppProps) {
  const [theme, setTheme] = useRootTheme()
  
  const contents = useMemo(() => {
    return (
      // @ts-ignore
      <Component {...pageProps} />
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageProps])
  
  return (
    <>
      <Head>
        <title>Tamagui Example App</title>
        <meta name="description" content="Tamagui, Solito, Expo & Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextThemeProvider onChangeTheme={setTheme}>
        <Provider disableRootThemeClass defaultTheme={theme}>
          <UserProvider ssrUserData={ssrUserData}>
            {contents}
          </UserProvider>
        </Provider>
      </NextThemeProvider>
    </>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

MyApp.getInitialProps = async (appContext: any) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  const { data: userData, token  } = await supabaseClient
    .auth
    .api
    .getUserByCookie(appContext.ctx.req)

  return { 
    ...appProps, 
    ssrUserData: userData ?? null,
  }
}

export default MyApp
