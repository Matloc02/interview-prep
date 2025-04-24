// app/sample-interviews/[id]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { sampleInterviews } from "@/lib/interviews/sampleSets";
import { Button } from "@/components/ui/button";

interface SampleInterviewPageProps {
  params: {
    id: string;
  };
}

export default function SampleInterviewPage({ params }: SampleInterviewPageProps) {
  const interview = sampleInterviews.find((set) => set.id === params.id);

  if (!interview) return notFound();

  return (
    <div className="max-w-2xl mx-auto p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold">{interview.title}</h1>
      <p className="text-sm text-muted-foreground">Duration: {interview.duration}</p>
      <p>{interview.description}</p>

      <div className="space-y-4">
        {interview.questions.map((q, idx) => (
          <div key={idx} className="border-b pb-2">
            <p className="text-sm">Q{idx + 1}: {q}</p>
          </div>
        ))}
      </div>

      <div className="pt-6">
        <Button asChild>
          <Link href={`/sample-interviews/${interview.id}/start`}>
            Start This Interview
          </Link>
        </Button>
      </div>
    </div>
  );
}
