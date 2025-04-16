import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { getFeedbackByInterviewId, getInterviewById } from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";

type FeedbackPageProps = {
  params: { id: string };
};

export default async function FeedbackPage({ params }: FeedbackPageProps) {
  const { id } = params;

  const interview = await getInterviewById(id);
  const feedback = await getFeedbackByInterviewId(id);

  if (!interview || !feedback) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-2xl font-bold">No feedback available.</h1>
      </div>
    );
  }

  return (
    <section className="p-6 text-white space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">
          Feedback for your {interview.role} interview
        </h1>
        <p className="text-sm text-gray-400">
          Taken on{" "}
          {dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A") || "Unknown"}
        </p>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Image src="/star.svg" width={22} height={22} alt="star" />
        <p>
          Overall Score:{" "}
          <span className="text-primary-200 font-bold">
            {feedback.totalScore}
          </span>
          /100
        </p>
      </div>

      <hr className="border-gray-600" />

      <div>
        <h2 className="text-xl font-bold">Final Assessment</h2>
        <p>{feedback.finalAssessment}</p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Interview Breakdown</h2>
        {feedback.categoryScores?.map((category: any, index: number) => (
          <div key={index} className="mb-4">
            <p className="font-semibold">
              {index + 1}. {category.name} ({category.score}/100)
            </p>
            <p className="text-sm text-gray-300">{category.comment}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-bold">Strengths</h3>
        <ul className="list-disc list-inside">
          {feedback.strengths?.map((s: string, i: number) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold">Areas for Improvement</h3>
        <ul className="list-disc list-inside">
          {feedback.areasForImprovement?.map((area: string, i: number) => (
            <li key={i}>{area}</li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4">
        <Button className="btn-secondary flex-1">
          <Link href="/" className="w-full text-center">Back to Dashboard</Link>
        </Button>

        <Button className="btn-primary flex-1">
          <Link href={`/interview/${params.id}`} className="w-full text-center">Retake Interview</Link>
        </Button>
      </div>
    </section>
  );
}
