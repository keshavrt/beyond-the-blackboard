import type { Career } from "@/types/career"

/**
 * Short forms used in career data, written out for Class 8 to 12 readers.
 * Each career page lists only the ones its own text uses ("Words to know").
 * Order = display order (degrees and exams first, bodies after).
 */
export const glossary: { term: string; meaning: string; match?: RegExp }[] = [
  { term: "PCB", meaning: "Physics, Chemistry and Biology" },
  { term: "PCM", meaning: "Physics, Chemistry and Maths" },
  { term: "NEET-UG", meaning: "National Eligibility cum Entrance Test (Undergraduate), the exam for medical colleges" },
  { term: "MBBS", meaning: "Bachelor of Medicine and Bachelor of Surgery, the degree that makes you a doctor" },
  { term: "MD / MS", meaning: "Doctor of Medicine / Master of Surgery, degrees to become a specialist", match: /\bMD\/MS\b/ },
  { term: "JEE", meaning: "Joint Entrance Examination, for engineering colleges" },
  { term: "B.Tech", meaning: "Bachelor of Technology, an engineering degree" },
  { term: "BCA", meaning: "Bachelor of Computer Applications" },
  { term: "B.Sc", meaning: "Bachelor of Science" },
  { term: "M.Sc", meaning: "Master of Science" },
  { term: "PhD", meaning: "Doctor of Philosophy, a research degree" },
  { term: "B.Ed", meaning: "Bachelor of Education, a teaching degree" },
  { term: "D.El.Ed", meaning: "Diploma in Elementary Education, for primary school teachers" },
  { term: "ITEP", meaning: "Integrated Teacher Education Programme, a 4-year teaching course after Class 12" },
  { term: "NCET", meaning: "National Common Entrance Test, for the ITEP course" },
  { term: "CTET", meaning: "Central Teacher Eligibility Test" },
  { term: "TET", meaning: "Teacher Eligibility Test (each state holds its own)" },
  { term: "GNM", meaning: "General Nursing and Midwifery, a nursing diploma" },
  { term: "ITI", meaning: "Industrial Training Institute, for hands-on trade courses after Class 10" },
  { term: "B.Des", meaning: "Bachelor of Design" },
  { term: "BFA", meaning: "Bachelor of Fine Arts" },
  { term: "UCEED", meaning: "Undergraduate Common Entrance Examination for Design" },
  { term: "DAT", meaning: "Design Aptitude Test, the NID entrance exam" },
  { term: "CA", meaning: "Chartered Accountant" },
  { term: "CUET", meaning: "Common University Entrance Test" },
  { term: "AIEEA-PG", meaning: "All India Entrance Examination for Admission (Postgraduate), for farm science master's seats" },
  { term: "NET", meaning: "National Eligibility Test" },
  { term: "ARS", meaning: "Agricultural Research Service, the scientist posts at ICAR" },
  { term: "IPS", meaning: "Indian Police Service, the senior police officers" },
  { term: "SI", meaning: "Sub-Inspector, a police officer rank" },
  { term: "IFS / IFoS", meaning: "Indian Forest Service, the senior forest officers", match: /\bIF(o)?S\b/ },
  { term: "UPSC", meaning: "Union Public Service Commission, it runs the national civil service exams" },
  { term: "PSC", meaning: "Public Service Commission (each state has one)" },
  { term: "SSC", meaning: "Staff Selection Commission" },
  { term: "CPO", meaning: "Central Police Organisation" },
  { term: "CPC", meaning: "Central Pay Commission, it sets government pay levels" },
  { term: "NTA", meaning: "National Testing Agency, it runs many national entrance exams" },
  { term: "CBSE", meaning: "Central Board of Secondary Education" },
  { term: "AIIMS", meaning: "All India Institute of Medical Sciences" },
  { term: "IITs", meaning: "Indian Institutes of Technology", match: /\bIITs?\b/ },
  { term: "NITs", meaning: "National Institutes of Technology", match: /\bNITs?\b/ },
  { term: "IIITs", meaning: "Indian Institutes of Information Technology", match: /\bIIITs?\b/ },
  { term: "BITS", meaning: "Birla Institute of Technology and Science" },
  { term: "NID", meaning: "National Institute of Design" },
  { term: "NIFT", meaning: "National Institute of Fashion Technology" },
  { term: "ICAI", meaning: "Institute of Chartered Accountants of India" },
  { term: "ICAR", meaning: "Indian Council of Agricultural Research" },
  { term: "ASRB", meaning: "Agricultural Scientists Recruitment Board" },
  { term: "KVS", meaning: "Kendriya Vidyalaya Sangathan, which runs central government schools" },
  { term: "NVS", meaning: "Navodaya Vidyalaya Samiti, which runs Jawahar Navodaya schools" },
]

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

/** Every visible string in a career (skips URLs and ids). */
function careerText(value: unknown, key = ""): string {
  if (typeof value === "string") return key === "url" || key === "slug" || key === "src" ? "" : value
  if (Array.isArray(value)) return value.map((v) => careerText(v)).join("\n")
  if (value && typeof value === "object")
    return Object.entries(value).map(([k, v]) => careerText(v, k)).join("\n")
  return ""
}

/** Glossary entries whose term appears in this career's text, in glossary order. */
export function wordsToKnow(career: Career) {
  const text = careerText(career)
  return glossary.filter(({ term, match }) =>
    (match ?? new RegExp(`(?<![\\w.-])${escape(term)}(?![\\w-]|\\.\\w)`)).test(text)
  )
}
