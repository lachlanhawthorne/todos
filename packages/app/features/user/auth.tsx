import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Platform, View } from 'react-native'
import { Button, Fieldset, Form, H1, Input, Label, Paragraph, Separator, XStack, YStack } from '@my/ui'
import { supabaseClient } from 'data-access'
import React, { useState } from 'react'
import { ApiError } from '@supabase/supabase-js'

export function AuthScreen() {
  const [loading, setLoading] = useState(false)

  const [authType, setAuthType] = useState<'sign-in' | 'register'>('sign-in')
  const [authError, setAuthError] = useState<ApiError | null>(null)
  const [confirmEmailSent, setConfirmEmailSent] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailInputRef = React.useRef<HTMLInputElement>(null)  
  const passwordInputRef = React.useRef<HTMLInputElement>(null)

  async function signInWithEmail() {
    setLoading(true)
    const { user, error } = await supabaseClient.auth.signIn({
      email: email,
      password: password,
    })
    if (error) setAuthError(error)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { user, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
    })

    if (error) setAuthError(error)
    if (user) setConfirmEmailSent(true)
    setLoading(false)
  }

  async function signOut() {
    setLoading(true)
    await supabaseClient.auth.signOut()
    setLoading(false)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView 
          keyboardShouldPersistTaps={'handled'} 
          contentContainerStyle={{ 
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            flexGrow: 1
          }}
        >
            <YStack space="$4" maw={600} w="100%">

              <H1 size={'$9'} ta="center">Account</H1>

              <XStack mb="$4">
                <Button
                  f={1}
                  size={'$5'}
                  borderRadius={0}
                  backgroundColor="$backgroundTransparent"
                  borderWidth={0}
                  borderBottomWidth={2}
                  borderColor={authType === 'sign-in' ? '#fff' : '#444'}
                  focusStyle={{ backgroundColor: '#111', borderColor: '#fff' }}
                  onClick={(e: any) => {
                    e.preventDefault()
                    setAuthError(null)
                    setConfirmEmailSent(false)
                    setAuthType('sign-in')
                  }}
                >
                  Sign in
                </Button>
                <Button
                  f={1}
                  size={'$5'}
                  borderRadius={0}
                  backgroundColor="$backgroundTransparent"
                  borderWidth={0}
                  borderBottomWidth={2}
                  borderColor={authType === 'register' ? '#fff' : '#444'}
                  focusStyle={{ backgroundColor: '#111', borderColor: '#fff' }}
                  onClick={(e: any) => {
                    e.preventDefault()
                    setAuthError(null)
                    setConfirmEmailSent(false)
                    setAuthType('register')
                  }}
                >
                  Register
                </Button>
              </XStack>
              

              {
                authError?.message && (
                  <XStack 
                    backgroundColor="$red2Dark"
                    borderColor="$red9"
                    borderWidth={1}
                    py={10}
                    px={15}
                    borderRadius="$4"
                    mb={10}
                  >
                    <Paragraph size={'$5'} color="$red9">{authError.message}</Paragraph>
                  </XStack>
                )
              }

              {
                confirmEmailSent && (
                  <XStack 
                    backgroundColor="$green2Dark"
                    borderColor="$green9"
                    borderWidth={1}
                    py={10}
                    px={15}
                    borderRadius="$4"
                    mb={10}
                  >
                    <Paragraph size={'$5'} color="$green9">Please confirm your email address</Paragraph>
                  </XStack>
                )
              }

              <Form>

                <Fieldset>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    f={1} 
                    id="email" 
                    placeholder="Email Address"
                    keyboardType='email-address'
                    returnKeyType='next'
                    returnKeyLabel='Continue'
                    keyboardAppearance='dark'
                    onChangeText={(text) => setEmail(text)} 
                  />
                </Fieldset>

                <Fieldset>
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    f={1} 
                    id="password" 
                    placeholder="Password"
                    keyboardType='default'
                    returnKeyType='done'
                    returnKeyLabel='Sign In'
                    keyboardAppearance='dark'
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    ref={passwordInputRef}
                  />
                </Fieldset>
              </Form>

              <Separator my={'$4'} />

              <Button
                onPress={(e) => {
                  e.preventDefault()
                  authType === 'sign-in' ? signInWithEmail() : signUpWithEmail()
                }}
              >
                { authType === 'sign-in' ? 'Sign in' : 'Register' }
              </Button>
            </YStack>

        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}