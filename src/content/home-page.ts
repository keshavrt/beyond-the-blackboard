import type { CareerSlug, Interest, LocalizedText } from "@/types/career"

/**
 * UI copy for the Home page (/). Kept out of components so a Hindi version
 * can swap it later. Numbers come from data (see lib/home-stats.ts), never from here.
 */
export const homePageCopy = {
  meta: {
    title: "Beyond the Blackboard: Career Explorer",
    description:
      "Find out what you can become, and how to get there. Careers, exams, study paths and starting pay for students in Class 8 to 12 in India.",
    siteName: "Beyond the Blackboard",
    locale: "en_IN",
  },

  hero: {
    overline: "From",
    overlineKey: "IIT Roorkee",
    title: "Beyond the",
    titleHighlight: "Blackboard",
    purpose: "Find out what you can become, and how to get there.",
    cta: "Explore careers",
    statsLabel: "What is inside",
    stats: {
      careers: "Careers",
      streams: "Streams",
      interests: "Interests",
    },
  },

  howItWorks: {
    title: "How it",
    titleHighlight: "works",
    steps: [
      {
        title: "Browse careers",
        detail: "See careers you can aim for. Filter by your stream or what you enjoy.",
      },
      {
        title: "Open one",
        detail:
          "Read what the job is really like, what it pays at the start and which exams you need.",
      },
      {
        title: "Follow the path",
        detail: "See each step from Class 10 to your first job, and how many years it takes.",
      },
    ] satisfies { title: LocalizedText; detail: LocalizedText }[],
  },

  interests: {
    title: "Browse by",
    titleHighlight: "interest",
    intro: "Pick what you enjoy. We will show the careers that match it.",
    count: (n: number): LocalizedText => `${n} ${n === 1 ? "career" : "careers"}`,
    /** One short line per interest, shown under its name. */
    blurbs: {
      "helping-people": "Care for, teach or protect others.",
      "building-fixing": "Make things work with your hands and tools.",
      creative: "Draw, design and explain ideas.",
      "numbers-business": "Work with money, accounts and business.",
      "nature-outdoors": "Work with farms, forests and the open air.",
      technology: "Use computers, machines and new tools.",
    } satisfies Record<Interest, LocalizedText>,
  },

  featured: {
    title: "Featured",
    titleHighlight: "careers",
    intro: "Four very different jobs, from a hospital to a forest. Open one to see its full path.",
    seeAll: "See all careers",
    slugs: ["doctor", "software-engineer", "electrician", "forest-officer"] satisfies CareerSlug[],
  },

  about: {
    title: "About the",
    titleHighlight: "project",
    paragraphs: [
      "Beyond the Blackboard is built by students of IIT Roorkee for a Community Outreach course (MIC-399).",
      "Many school students only hear about a few careers. We made this site so you can see more options, and plan the steps to reach them.",
    ] satisfies LocalizedText[],
  },
} as const
