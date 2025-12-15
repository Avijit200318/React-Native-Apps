import React from 'react'
import { Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik';

import logo from "../../assets/images/dinetimelogo.png"
import frameImg from "../../assets/images/Frame.png"
import { useRouter } from 'expo-router';
import { signInValidation } from '@/schemas/signinShcema';

export default function signin() {
  const router = useRouter();

  const handleSignUp = (values) => {
    console.log(values)
  }

  return (
    <SafeAreaView className="flex-1 bg-[#2b2b2b]">
      <StatusBar className="text-white bg-[#2b2b2b]" />
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full h-[70%] m-2 flex justify-center items-center gap-4">
            <Image source={logo} className="w-[18rem] h-[8rem] mb-20" />
            <View className='w-5/6'>
              <Formik initialValues={{ email: "", password: "" }} validationSchema={signInValidation} onSubmit={handleSignUp}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <View className='w-full'>
                    <Text className='text-orange-400 mb-3 mt-4'>Email</Text>
                    <TextInput placeholder='Email' keyboardType='email-address' value={values.email} onChangeText={handleChange("email")} onBlur={handleBlur("email")} className='border border-orange-400 rounded-md text-orange-400 placeholder:text-gray-600 p-3' />
                    {touched.email && errors.email && <Text className='text-red-500 text-sm font-semibold'>{errors.email}</Text>}
                    <Text className='text-orange-400 mb-3 mt-4'>Password</Text>
                    <TextInput placeholder='Password' secureTextEntry={true} value={values.password} onChangeText={handleChange("password")} onBlur={handleBlur("password")} className='border border-orange-400 rounded-md text-orange-400 placeholder:text-gray-600 p-3' />
                    {touched.password && errors.password && <Text className='text-red-500 text-sm font-semibold'>{errors.password}</Text>}

                    <TouchableOpacity onPress={() => handleSubmit()} className='w-full bg-orange-400 py-2.5 rounded-md mt-6'>
                      <Text className='text-white font-semibold text-lg text-center'>Sign in</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
            <View className="flex flex-row items-center gap-3 mt-2">
              <Text className="text-white text-lg">Don't have an account?</Text>
              <TouchableOpacity onPressOut={() => router.push("/signup")}><Text className="text-orange-400 font-semibold text-lg">Sign up</Text></TouchableOpacity>
            </View>
          </View>
          <View className="flex-1">
            <Image source={frameImg} className="w-full h-full" resizeMode="contain" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}