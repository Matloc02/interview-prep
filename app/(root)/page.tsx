import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { getCurrentUser } from '@/lib/actions/auth.actions'
import { getInterviewsByUserId } from '@/lib/actions/general.action'
import InterviewCard from '@/components/InterviewCard'


const page = async() => {
  const user = await getCurrentUser();
type Interview = {
  id: string;
  // Add other properties of the interview object here
};

const userInterviews: Interview[] = (await getInterviewsByUserId(user?.id!)) || [];
const hasPastInterviews = userInterviews.length > 0;
const latestInterviews: Interview[] = []; // Placeholder until getLatestInterviews is implemented
const hasUpcomingInterviews = false;
  
  return (
    <>
    <section className="card-cta">
      <div className="flex flex-col gap-6 max-sm w-lg">
        <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
        <p>Practice on real interview questions & get instant feedback</p>
        <Button asChild className="btn-primary max-sm:w-full">
         <Link href="/interview">Start an Interview</Link> 
        </Button>
      </div>
      <Image src="/robot.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden" />
    </section>
    
    <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interview section flex flex-col-3 gap-6">
            {hasPastInterviews ? (
                userInterviews?.map((interview) => (                  
                  <InterviewCard {...interview} key={interview.id}/>

            ))) : (            
           
                <p>You haven't taken any interviews yet</p>
           )}
      </div>
      
    </section>

    <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interview section flex flex-col-3 gap-6">
        {hasUpcomingInterviews ? (
                latestInterviews?.map((interview) => (                  
                  <InterviewCard {...interview} key={interview.id}/>

            ))) : (            
           
                <p>There are no new interviews yet</p>
           )}
      </div>
    </section>
    </>
  )
}

export default page;