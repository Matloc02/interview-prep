// lib/interviews/sampleSets.ts

export interface SampleInterview {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: string;
  techstack: string[];
  questions: string[];
}
;
  
  export const sampleInterviews: SampleInterview[] = [
    {
      id: "basic-evaluation",
      title: "Basic Evaluation Interview",
      description: "Assess candidate's foundational understanding, communication skills, and basic logical thinking.",
      duration: 10,
      type: "Foundational",
      techstack: ["General"],
      questions: [
        "Tell me a bit about yourself and your background.",
        "What interests you about this role and our company?",
        "Explain a recent project or task you worked on. What was your role in it?",
        "Imagine you're given a task with a very short deadline. How would you handle it?",
        "If you have multiple tasks due at the same time, how do you decide what to do first?",
        "Can you describe a time you worked in a team? What went well and what could've been better?",
        "Scenario: You're reviewing a report and notice some numbers don't match a previous version. What do you do next?",
        "What's something new you've learned recently, and how did you go about learning it?",
        "What skills do you bring that would help you succeed in this position?"
      ],
    },
    {
      id: "skill-assessment",
      title: "Skill-Based Assessment Interview",
      description: "Gauge the candidate's grasp of essential concepts, ability to apply knowledge, and approach to problem-solving.",
      duration: 15,
      type: "Technical",
      techstack: ["General", "Problem-Solving"],
      questions: [
        "Can you briefly walk me through your background and how it relates to this role?",
        "Why are you interested in this position and what do you hope to gain from it?",
        "What would you say are your strongest skills related to this job?",
        "Tell me about a time you had to solve a problem with limited resources. What was your approach?",
        "How do you ensure quality and accuracy in your work?",
        "How do you usually handle feedback or criticism from peers or supervisors?",
        "Imagine a colleague has misunderstood part of a project. How would you correct them without causing friction?",
        "Describe a situation where you had to learn a new skill quickly to complete a task. How did you do it?",
        "Can you walk me through your process for tackling a new task you've never done before?",
        "Let's say you're given a task with unclear instructions. What's your first step?",
        "If you make a mistake in your work, how do you typically handle it?",
        "Give an example of a tool, software, or technique you've used to improve your work efficiency."
      ],
    },
    {
      id: "strategic-scenario",
      title: "Strategic Problem-Solving Interview",
      description: "Assess candidate's depth in critical thinking, leadership, and long-term decision-making skills.",
      duration: 25,
      type: "Strategic",
      techstack: ["Leadership", "Critical Thinking"],
      questions: [
        "Can you briefly introduce yourself and your experience relevant to this role?",
        "What's a project or achievement you're most proud of? Why?",
        "How do you define success in your role?",
        "Tell me about a time you had to quickly adapt to a major change at work. How did you handle it?",
        "What motivates you to perform at your best?",
        "Walk me through how you prioritize tasks when everything feels important.",
        "How do you balance speed and accuracy in your work?",
        "Give an example of a time when you improved a process or system. What impact did it have?",
        "Have you ever disagreed with a team decision? What did you do?",
        "Tell me about a time you worked cross-functionally with another department. How did you ensure alignment?",
        "What tools or techniques do you typically use to track progress and stay organized?",
        "Describe how you've handled a deadline you knew you couldn't meet. What did you do?",
        "Tell me about a time you were given a problem with no clear solution. How did you approach it?",
        "Imagine sales are declining, but your team insists they're following the process. What would you do next?",
        "You're leading a project that's falling behind schedule. How do you diagnose the root cause?",
        "If you had to cut costs by 20% without affecting quality, where would you start?",
        "A client or stakeholder is unhappy, but you believe your team delivered correctly. How do you handle it?",
        "How do you approach long-term planning while still managing day-to-day operations?"
      ],
    },
  ];
  