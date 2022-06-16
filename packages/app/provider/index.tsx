import Tamagui from '../tamagui.config'
import { Drawer } from '@tamagui/drawer'
import { NavigationProvider } from './navigation'
import { TamaguiProviderProps } from '@my/ui'

export function Provider({ children, ...rest }: TamaguiProviderProps) {
  return (
    <Tamagui.Provider disableInjectCSS defaultTheme="light" {...rest}>
      <NavigationProvider>
        <Drawer.Provider>{children}</Drawer.Provider>
      </NavigationProvider>
    </Tamagui.Provider>
  )
}
