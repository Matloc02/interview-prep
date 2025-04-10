import React from 'react'
import Agent from '@/components/Agent'
import { getCurrentUser} from '@/lib/actions/auth.actions';
import { getInterviewsByUserId } from '@/lib/actions/general.action';

const page = async () => {
    const user = await getCurrentUser();
    const userInterviews = (await getInterviewsByUserId(user?.id || '')) || [];

    const hasPastInterviews = userInterviews.length > 0;

  return (
    <>
        <h3>Interview Generation</h3>

        <Agent userName={user?.name || ''} userId={user?.id} type="generate"/>
    </>
  )
}

export default page