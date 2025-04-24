"use client";

import { Button } from "@/components/ui/button";

type Props = {
  interviewId: string;
};

export default function TakeInterviewButton({ interviewId }: Props) {
  const handleClick = () => {
    window.location.href = `/sample-interviews/start?id=${interviewId}`;
  };

  return (
    <Button className="text-sm" onClick={handleClick}>
      Take This Interview
    </Button>
  );
}
