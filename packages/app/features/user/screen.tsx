import { YStack, Paragraph, Button } from "@my/ui";
import { supabaseClient, getUser } from "data-access";
import { AuthScreen } from "./auth";

export function UserScreen() {
  const user = getUser()

  return user
    ? (
      <YStack f={1} jc="center" ai="center">
        <Paragraph mb="$4">{user.email}</Paragraph>
        <Button onPress={() => supabaseClient.auth.signOut()}>Sign out</Button>
      </YStack>
    )
    : <AuthScreen />
}