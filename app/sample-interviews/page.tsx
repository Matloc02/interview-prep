// app/sample-interviews/page.tsx
import Link from "next/link";
import { sampleInterviews } from "@/lib/interviews/sampleSets";
import { Button } from "@/components/ui/button";

export default function SampleInterviewListPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Sample Practice Interviews</h1>
      <p className="mb-6 text-muted-foreground">
        Explore a selection of sample interviews tailored for various experience levels.
        Use these to prepare, practice, or get a feel for how our AI-based interviews work.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sampleInterviews.map((interview) => (
          <div
            key={interview.id}
            className="p-4 border rounded-lg bg-card text-card-foreground shadow-md flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-1">{interview.title}</h2>
              <p className="text-sm text-muted-foreground mb-2">{interview.description}</p>
              <p className="text-xs text-muted-foreground">Duration: {interview.duration}</p>
            </div>

            <Button asChild className="mt-4 self-start">
              <Link href={`/sample-interviews/${interview.id}`}>View Questions</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
