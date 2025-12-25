import React, { useState } from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik';

import logo from "../../assets/images/dinetimelogo.png"
import frameImg from "../../assets/images/Frame.png"
import { useRouter } from 'expo-router';
import { signInValidation } from '@/schemas/signinShcema';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

type singInType = {
  email: string,
  password: string
}

export default function signin() {
  const router = useRouter();
  const auth = getAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async (values: singInType) => {
    setError(null);
    setLoading(true);
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredentials.user;

      // check if user is verified or not
      if (!user.emailVerified) {
        setError("User not verified please check your email");
        await signOut(auth);
        return;
      }

      // save user details into AsyncStorage
      const docRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(docRef);
      if (!userDoc.exists()) {
        setError("User not found");
        await signOut(auth);
        return;
      }

      await updateDoc(docRef, {
        verified: true
      });

      const userData = userDoc.data();
      await AsyncStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        name: userData.name,
        email: userData.email,
        verified: true,
        createdAt: userData.createdAt
      }));

      console.log("User loged successfully")
      router.push("/home")
    } catch (error: any) {
      console.log("Login error object: ", error);

      switch (error.code) {
        case 'auth/invalid-email':
          setError("The email address is not valid.");
          break;
        case 'auth/user-disabled':
          setError("This user account has been disabled.");
          break;
        case 'auth/user-not-found':
          setError("User not found with this email");
          break;
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          // Firebase now often returns 'invalid-credential' for both 
          // security reasons so hackers don't know which one is wrong.
          setError("Invalid email or password. Please try again.");
          break;
        case 'auth/too-many-requests':
          setError("Too many failed attempts. Please try again later.");
          break;
        case 'auth/network-request-failed':
          setError("Network error. Please check your internet connection.");
          break;
        default:
          // Check if it's a Firestore error or Auth error
          setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false)
    }
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
                      <Text className='text-white font-semibold text-lg text-center'>{loading ? <ActivityIndicator size={25} className='text-white' /> : 'Login'}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
            <View className="flex flex-row items-center gap-3 mt-2">
              <Text className="text-white text-lg">Don't have an account?</Text>
              <TouchableOpacity onPressOut={() => router.push("/signup")}><Text className="text-orange-400 font-semibold text-lg">Sign up</Text></TouchableOpacity>
            </View>
            {error &&
              <Text className='text-red-400 font-semibold'>{error}</Text>
            }
          </View>
          <View className="flex-1">
            <Image source={frameImg} className="w-full h-full" resizeMode="contain" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}