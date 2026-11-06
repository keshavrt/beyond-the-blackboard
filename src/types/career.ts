/**
 * Career data types.
 *
 * Every piece of text a student will read is typed as `LocalizedText`.
 * Today it is a plain string. When we add Hindi, change this one alias
 * (e.g. to `{ en: string; hi?: string }`) and the compiler will point
 * to every place that needs updating.
 */
export type LocalizedText = string;

/** Streams a student can take in Class 11–12. "any" = open to all streams. */
export type Stream = "science" | "commerce" | "arts" | "vocational" | "any";

export type Interest =
  | "helping-people"
  | "building-fixing"
  | "creative"
  | "numbers-business"
  | "nature-outdoors"
  | "technology";

/** Add a new slug here when adding a career, so related links stay type-safe. */
export type CareerSlug =
  | "doctor"
  | "software-engineer"
  | "teacher"
  | "nurse"
  | "police-officer"
  | "electrician"
  | "graphic-designer"
  | "chartered-accountant"
  | "agricultural-scientist"
  | "forest-officer";

/** A link to an official source (government body, exam conductor, regulator). */
export interface Source {
  label: LocalizedText;
  url: string;
}

export interface PathStep {
  title: LocalizedText;
  detail: LocalizedText;
  /** The step can be skipped (e.g. Class 12 for an ITI electrician). */
  optional?: boolean;
}

/** The four steps shown on the career timeline. All are required. */
export interface CareerPath {
  after10th: PathStep;
  after12th: PathStep;
  course: PathStep;
  job: PathStep;
}

/** Approximate years of study after Class 12. */
export interface DurationYears {
  min: number;
  max: number;
  note?: LocalizedText;
}

export interface Exam {
  /** Short name, e.g. "NEET-UG". */
  name: string;
  fullName?: LocalizedText;
  note?: LocalizedText;
}

/** A starting post on the official 7th CPC pay matrix (central government). */
export interface OfficialPay {
  post: LocalizedText;
  /** Pay matrix level, e.g. 6. */
  level: number;
  /** Starting basic pay in ₹ per month, before allowances. */
  basicPay: number;
}

/** Starting salary in Indian rupees per month. */
export interface SalaryRange {
  min: number;
  max: number;
  currency: "INR";
  period: "month";
  /** Show an "approximate" label in the UI when true. */
  approximate: boolean;
  note?: LocalizedText;
  /** Only where an official pay level is published. Never estimated. */
  officialPay?: OfficialPay[];
}

/**
 * Optional photo. File lives at public/careers/<slug>.webp, 4:3 crop (DESIGN.md §5.12).
 * Every layout must look complete without it: no placeholder boxes.
 */
export interface CareerImage {
  /** Path from the site root, e.g. "/careers/doctor.webp". */
  src: string
  /** Describe what the photo shows, for screen readers. */
  alt: LocalizedText
}

export interface Career {
  slug: CareerSlug;
  name: LocalizedText;
  oneLiner: LocalizedText;
  /** 3–4 short bullets. */
  whatTheyDo: LocalizedText[];
  streams: Stream[];
  interests: Interest[];
  subjects: LocalizedText[];
  path: CareerPath;
  durationYears: DurationYears;
  /** Empty array if no entrance exam is needed. */
  exams: Exam[];
  salaryRange: SalaryRange;
  skills: LocalizedText[];
  /** 2–3 related careers. */
  relatedSlugs: CareerSlug[];
  image?: CareerImage
  /** Official sources only. */
  sources: Source[];
  /** ISO date (YYYY-MM-DD) when the facts were last checked. */
  lastVerified: string;
}
