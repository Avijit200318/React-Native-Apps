import React, { useState } from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik';
import { signUpValidation } from '@/schemas/signupSchema';

import logo from "../../assets/images/dinetimelogo.png"
import frameImg from "../../assets/images/Frame.png"
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth"
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';


type userType = {
    name: string,
    email: string,
    password: string
}

export default function signup() {
    const router = useRouter();
    const auth = getAuth()
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSignUp = async (values: userType) => {
        setError(null);
        setLoading(true);
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredentials.user;

            await updateProfile(user, {
                displayName: values.name
            })

            // send verification email
            await sendEmailVerification(user);

            // now store userinfo into firestore
            const userData = {
                name: values.name,
                email: values.email,
                verified: false,
                createdAt: new Date().toISOString()
            }

            await setDoc(doc(db, "users", user.uid), userData);

            // store userinfo into asyncStorage
            await AsyncStorage.setItem('user', JSON.stringify(userData));

            console.log("User successfully saved to auth and firestore")
            router.push("/signin")
        } catch (error: any) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError("This email is already registered. Try logging in.");
                    break;
                case 'auth/invalid-email':
                    setError("Please enter a valid email address.");
                    break;
                case 'auth/weak-password':
                    setError("Password should be at least 6 characters.");
                    break;
                default:
                    setError("An unexpected error occurred. Please try again.");
            }
            console.log("error: ", error);
        } finally {
            setLoading(false);
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
                        <Image source={logo} className="w-[18rem] h-[8rem]" />
                        <View className='w-5/6'>
                            <Formik initialValues={{ name: "", email: "", password: "" }} validationSchema={signUpValidation} onSubmit={handleSignUp}>
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                    <View className='w-full'>
                                        <Text className='mb-3 text-orange-400'>Name</Text>
                                        <TextInput placeholder='Name' value={values.name} onChangeText={handleChange("name")} onBlur={handleBlur("name")} className='border border-orange-400 rounded-md text-orange-400 placeholder:text-gray-600 p-3' />
                                        {touched.name && errors.name && <Text className='text-red-500 text-sm font-semibold'>{errors.name}</Text>}
                                        <Text className='text-orange-400 mb-3 mt-4'>Email</Text>
                                        <TextInput placeholder='Email' keyboardType='email-address' value={values.email} onChangeText={handleChange("email")} onBlur={handleBlur("email")} className='border border-orange-400 rounded-md text-orange-400 placeholder:text-gray-600 p-3' />
                                        {touched.email && errors.email && <Text className='text-red-500 text-sm font-semibold'>{errors.email}</Text>}
                                        <Text className='text-orange-400 mb-3 mt-4'>Password</Text>
                                        <TextInput placeholder='Password' secureTextEntry={true} value={values.password} onChangeText={handleChange("password")} onBlur={handleBlur("password")} className='border border-orange-400 rounded-md text-orange-400 placeholder:text-gray-600 p-3' />
                                        {touched.password && errors.password && <Text className='text-red-500 text-sm font-semibold'>{errors.password}</Text>}

                                        <TouchableOpacity onPress={() => handleSubmit()} className='w-full bg-orange-400 py-2.5 rounded-md mt-6'>
                                            <Text className='text-white font-semibold text-lg text-center'>{loading ? <ActivityIndicator size={25} className='text-white' /> : 'Sign up'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </Formik>
                        </View>
                        <View className="flex flex-row items-center gap-3 mt-2">
                            <Text className="text-white text-lg">Already have an account?</Text>
                            <TouchableOpacity onPressOut={() => router.push("/signin")}><Text className="text-orange-400 font-semibold text-lg">Sign in</Text></TouchableOpacity>
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
        </SafeAreaView >
    )
}
