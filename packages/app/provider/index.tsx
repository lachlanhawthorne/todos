import Tamagui from '../tamagui.config'
import { Drawer } from '@tamagui/drawer'
import { Provider as JotaiProvider } from 'jotai'
import { NavigationProvider } from './navigation'
import { TamaguiProviderProps } from '@my/ui'

export function Provider({ children, ...rest }: TamaguiProviderProps) {
  return (
    <JotaiProvider>
      <Tamagui.Provider disableInjectCSS defaultTheme="dark" {...rest}>
        <NavigationProvider>
          <Drawer.Provider>{children}</Drawer.Provider>
        </NavigationProvider>
      </Tamagui.Provider>
    </JotaiProvider>
  )
}
