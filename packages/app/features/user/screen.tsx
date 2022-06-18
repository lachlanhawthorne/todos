import { YStack, Paragraph, Button, Separator } from "@my/ui";
import { supabaseClient, getUser } from "data-access";
import { AuthScreen } from "./auth";
import { ChevronLeft } from "@tamagui/feather-icons";

import { useLink } from "solito/link";

export function UserScreen() {
  const user = getUser()

  const linkProps = useLink({
    href: '/',
  })

  return user
    ? (
      <YStack f={1} jc="center" ai="center" m="$4">
        <YStack w="100%" maxWidth={450} jc="center" ai="center">
          <Paragraph mb="$4">{user.email}</Paragraph>
          <Button w="100%" onPress={() => supabaseClient.auth.signOut()}>Sign out</Button>
          <Separator my="$4" />
          <Button icon={ChevronLeft} {...linkProps}>Back to Todos</Button>
        </YStack>
      </YStack>
    )
    : <AuthScreen />
}