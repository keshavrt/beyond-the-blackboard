import type { LocalizedText } from "@/types/career"

/**
 * UI copy for /careers/[slug] and the 404 page.
 * Career facts live in src/data/careers.ts; only labels and sentences live here.
 */
export const careerDetailCopy = {
  breadcrumbRoot: "Careers",
  back: "Back to careers",

  facts: {
    label: "Key facts",
    studyAfter12th: "Study after 12th",
    studyAfter10th: "Study after 10th",
    startPay: "Starting pay a month",
    howIn: "How you get in",
    noExam: "No entrance exam",
    approx: "approx.",
  },
  lastChecked: (date: string): LocalizedText => `Facts last checked: ${date}`,
  streamsLabel: "Streams",
  interestsLabel: "Interests",
  anyStream: "Any stream",

  sections: {
    whatTheyDo: "What they do",
    path: "The path",
    needs: "What you need",
    salary: "Salary",
    related: "Related careers",
    sources: "Sources",
  },

  whatTheyDo: {
    intro: "A normal working day, in a few points.",
  },

  path: {
    intro: "Step by step, from Class 10 to your first job.",
    stages: {
      after10th: "After 10th",
      after12th: "After 12th",
      course: "Course",
      job: "Job",
    },
    optional: "Optional",
    noteLabel: "Note",
  },

  needs: {
    intro: "The subjects, entrance exams and skills this career asks for.",
    subjects: "Subjects",
    exams: "Entrance exams",
    noExams: "No entrance exam is needed.",
    skills: "Skills",
  },

  salary: {
    intro: "What you can expect to earn in your first job.",
    startLabel: "Typical starting pay",
    approximate: "Approximate",
    perMonth: "per month",
    officialLabel: "Official pay level (7th Pay Commission)",
    officialIntro:
      "Government jobs follow the official pay matrix. This is the starting basic pay. Allowances are added on top.",
    post: "Post",
    level: "Level",
    basicPay: "Basic pay / month",
  },

  words: {
    title: "Words to know",
  },

  related: {
    intro: "Careers that need similar subjects or interests.",
  },

  sources: {
    intro: "Facts on this page come from these official websites.",
    disclaimerLabel: "Please note",
    disclaimer: (lastVerified: string): LocalizedText =>
      `Information is approximate and for guidance only. Last checked: ${lastVerified}. Always confirm on the official websites listed.`,
    opensNewTab: "(opens in a new tab)",
  },

  meta: {
    description: (oneLiner: string, years: string, after: "10th" | "12th", exam?: string): LocalizedText =>
      `${oneLiner} About ${years} of study after Class ${after === "10th" ? "10" : "12"}.${exam ? ` Entrance: ${exam}.` : ""} Path, subjects, exams and starting salary.`,
  },

  /** Open Graph share image (careers/[slug]/opengraph-image.tsx). */
  og: {
    alt: (name: string): LocalizedText => `${name}: career path, exams and starting pay`,
    token: "[ CAREER ]",
    study: (after: "10th" | "12th"): LocalizedText => `Study after Class ${after === "10th" ? "10" : "12"}`,
    exam: "Main exam",
    noExam: "None needed",
    pay: "Starting pay a month",
  },

  notFound: {
    metaTitle: "Page not found",
    title: "Page not",
    highlight: "found",
    body: "We could not find this page. The link may be wrong, or the career may not be on our list yet.",
    primary: "Browse careers",
    secondary: "Go home",
  },
} as const
