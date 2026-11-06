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

/** Starting salary in Indian rupees per month. */
export interface SalaryRange {
  min: number;
  max: number;
  currency: "INR";
  period: "month";
  /** Show an "approximate" label in the UI when true. */
  approximate: boolean;
  note?: LocalizedText;
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
  /** Official sources only. */
  sources: Source[];
  /** ISO date (YYYY-MM-DD) when the facts were last checked. */
  lastVerified: string;
}
