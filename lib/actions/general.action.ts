import {db} from "@/firebase/admin";
import { Interview, GetLatestInterviewsParams } from "@/types";

export async function getInterviewsByUserId(userId: string): Promise<Interview[] | null> {
    const interviewsSnapshot = await db
        .collection('interviews')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();

    if (interviewsSnapshot.empty) return null;

    return interviewsSnapshot.docs.map(doc => ({
        ...(doc.data() as Interview),
        id: doc.id,
    }));
}

export async function getLatestInterviewsByUserId(params: GetLatestInterviewsParams): Promise<Interview[] | null> {
    const { userId, limit = 10 } = params;

    const interviewsSnapshot = await db
        .collection('interviews')
        .orderBy('createdAt', 'desc')
        .where('finalized', '==', true)
        .where('userId', '!=', userId)
        .limit(limit)
        .get();

    
    return interviewsSnapshot.docs.map(doc => ({
        ...(doc.data() as Interview),
        id: doc.id,
    }));
}