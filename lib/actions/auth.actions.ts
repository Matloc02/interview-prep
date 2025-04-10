'use server';

import {db, auth} from "@/firebase/admin";
import { SignInParams, User, Interview, GetLatestInterviewsParams } from "@/types";
import { Query } from "firebase-admin/firestore";
import { CollectionReference, DocumentData } from "firebase/firestore";
import { cookies } from "next/headers";

interface SignUpParams {
    uid: string;
    name: string;
    email: string;
    password: string;
}

const ONE_WEEK = 60 * 60 * 24 * 7;
export async function signUp(params: SignUpParams) {
    const { uid, name, email, password } = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();

        if(userRecord.exists) {
            return {
                success: false,
                message: 'User already exists. Please sign in instead'
            }
        }

        await db.collection('users').doc(uid).set({
            name, email
        })

        return {
            success: true,
            message: 'Account created successfully. Please sign in.'
        }

}catch (e: any) {
    console.error('Error creating a user', e);

    if(e.code === 'auth/email-already-in-use') {
        return {
            success: false,
            message: 'Email already in use.'
        }
    }
    return {
        success: false,
        message: 'Failed to create an account.'
    }

    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;

    try {
        const userRecord = await auth.getUserByEmail(email);

        if(!userRecord) {
            return {
                success: false,
                message: 'User does not exist. Create an account instead'
            }
        }

        await setSessionCookie(idToken);        
    } catch (e: any) {
        console.error('Error signing in', e);
        return {
            success: false,
            message: 'Failed to log into an account.'
        }
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies()

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK * 1000,
    })

    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'        
    })


}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get('session')?.value;

    if(!sessionCookie) return null;

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        const userRecord = await db
            .collection("users")
            .doc(decodedClaims.uid)
            .get();

        if (!userRecord.exists) return null;          

        return {
           ...(userRecord.data() as User),
           id: userRecord.id,
        }
        
    } catch (e) {
        console.error('Error verifying session cookie', e);
        return null;
    }

    
}

export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
}


export async function signOut() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}

