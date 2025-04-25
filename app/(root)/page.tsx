import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/supabase/session";
import {
  getInterviewsByUserId,
  getSampleInterviews,
} from "@/lib/actions/general.action";


async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="p-6 text-white text-center">
        <h2 className="text-2xl font-semibold">Welcome to OhLura</h2>
        <p className="mt-2">
          Please{" "}
          <Link href="/sign-in" className="text-purple-400 underline">
            sign in
          </Link>{" "}
          to access your dashboard.
        </p>
      </div>
    );
  }

  const [userInterviews, sampleInterviews] = await Promise.all([
    getInterviewsByUserId(user.id),
    getSampleInterviews(),
  ]);

  return (
    <>
      {/* 🎯 Hero CTA */}
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      {/* 👤 Personal Interviews */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>My Practice Interviews</h2>

        <div className="interviews-section">
          {userInterviews?.length ? (
            userInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t created any interviews yet.</p>
          )}
        </div>
      </section>

      {/* 🌍 Sample Interviews */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Sample Interviews</h2>

        <div className="interviews-section">
          {sampleInterviews?.length ? (
            sampleInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>No sample interviews are available right now.</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
  <h2>Sample Practice Interviews</h2>

  <div className="interviews-section">
    {sampleInterviews?.map((sample) => (
      <InterviewCard
        key={sample.id}
        userId={user.id}
        interviewId={sample.id}
        role={sample.title}
        type="Sample"
        techstack={[]} // or ["General"]
        description={sample.description}
        createdAt="Permanent"
      />
    ))}
  </div>
</section>
      
    </>
  );
}

export default Home;
