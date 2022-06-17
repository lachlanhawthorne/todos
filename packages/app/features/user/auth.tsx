import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Platform, View } from 'react-native'
import { Button, Fieldset, Form, H1, Input, Label, Separator, XStack, YStack } from '@my/ui'
import { supabaseClient } from 'data-access'
import React, { useState } from 'react'
import { ApiError } from '@supabase/supabase-js'

export function AuthScreen() {
  const [loading, setLoading] = useState(false)

  const [authType, setAuthType] = useState<'sign-in' | 'register'>('sign-in')
  const [authError, setAuthError] = useState<ApiError | null>(null)

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
                    setAuthError(null)
                    e.preventDefault()
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
                    setAuthError(null)
                    e.preventDefault()
                    setAuthType('register')
                  }}
                >
                  Register
                </Button>
              </XStack>
              

              {
                authError?.message && (
                  <View style={{
                    backgroundColor: '#f00',
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}>
                    <Label size={'$5'} color="#fff">{authError.message}</Label>
                  </View>
                )
              }

              <Form>

                <Fieldset>
                  <Label justifyContent="flex-end" htmlFor="name">
                    Email Address
                  </Label>
                  <Input 
                    f={1} 
                    id="name" 
                    placeholder="Email Address"
                    keyboardType='email-address'
                    returnKeyType='next'
                    returnKeyLabel='Continue'
                    keyboardAppearance='dark'
                    onChangeText={(text) => setEmail(text)}
                    
                  />
                </Fieldset>

                <Fieldset mt={'$4'}>
                  <Label justifyContent="flex-end" htmlFor="password">
                    Password
                  </Label>
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

              <Button
                onPress={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign Out
              </Button>
            </YStack>

        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}