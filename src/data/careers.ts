import type { Career, Interest, LocalizedText, Stream } from "@/types/career";

/** Date the facts below were last checked against official sources. */
const VERIFIED = "2026-11-06";

/** Official 7th Pay Commission pay matrix (central government). */
const PAY_MATRIX = {
  label: "Department of Expenditure – 7th CPC pay matrix",
  url: "https://doe.gov.in/",
};

/** Labels for the stream filter. */
export const streamLabels: Record<Stream, LocalizedText> = {
  science: "Science",
  commerce: "Commerce",
  arts: "Arts",
  vocational: "Vocational",
  any: "Any",
};

/** Labels for the interest filter. */
export const interestLabels: Record<Interest, LocalizedText> = {
  "helping-people": "Helping people",
  "building-fixing": "Building & fixing",
  creative: "Creative",
  "numbers-business": "Numbers & business",
  "nature-outdoors": "Nature & outdoors",
  technology: "Technology",
};

export const careers: Career[] = [
  {
    slug: "doctor",
    name: "Doctor",
    oneLiner: "Find out why people are sick and help them get better.",
    whatTheyDo: [
      "Check patients and find out what illness they have.",
      "Give medicines and advise on treatment.",
      "Work in hospitals, clinics or villages through health centres.",
      "Some doctors study more to become specialists, like heart or child doctors.",
    ],
    streams: ["science"],
    interests: ["helping-people"],
    subjects: ["Physics", "Chemistry", "Biology", "English"],
    path: {
      after10th: {
        title: "Choose Science with Biology",
        detail: "Take Physics, Chemistry and Biology (PCB) in Class 11 and 12.",
      },
      after12th: {
        title: "Clear NEET-UG",
        detail:
          "Write the NEET-UG exam. Your rank decides which medical college you get.",
      },
      course: {
        title: "MBBS degree (5.5 years)",
        detail:
          "4.5 years of study in a medical college, then 1 year of paid internship in a hospital.",
      },
      job: {
        title: "Doctor (Medical Officer)",
        detail:
          "Work in a government or private hospital. You can also study further (MD/MS) to become a specialist.",
      },
    },
    durationYears: {
      min: 5.5,
      max: 5.5,
      note: "Becoming a specialist (MD/MS) takes about 3 more years.",
    },
    exams: [
      {
        name: "NEET-UG",
        fullName: "National Eligibility cum Entrance Test (Undergraduate)",
        note: "One exam for all MBBS seats in India. Held once a year by NTA.",
      },
    ],
    salaryRange: {
      min: 50000,
      max: 100000,
      currency: "INR",
      period: "month",
      approximate: true,
      note: "Government hospitals often pay more at the start than small private clinics.",
    },
    skills: [
      "Patience",
      "Care for people",
      "Hard work and long study hours",
      "Staying calm under pressure",
      "Clear communication",
    ],
    relatedSlugs: ["nurse", "agricultural-scientist"],
    sources: [
      { label: "National Medical Commission (NMC)", url: "https://www.nmc.org.in/" },
      { label: "NEET-UG (NTA)", url: "https://neet.nta.nic.in/" },
    ],
    lastVerified: VERIFIED,
  },

  {
    slug: "software-engineer",
    name: "Software Engineer",
    oneLiner: "Build the apps, websites and computer programs people use every day.",
    whatTheyDo: [
      "Write code to make apps, websites and software.",
      "Find and fix problems (bugs) in programs.",
      "Work in a team to plan and test new features.",
      "Keep learning new tools, because technology changes fast.",
    ],
    streams: ["science"],
    interests: ["technology", "building-fixing"],
    subjects: ["Physics", "Chemistry", "Mathematics", "Computer Science (helpful)"],
    path: {
      after10th: {
        title: "Choose Science with Maths",
        detail: "Take Physics, Chemistry and Mathematics (PCM) in Class 11 and 12.",
      },
      after12th: {
        title: "Write engineering entrance exams",
        detail:
          "Write JEE Main and your state's engineering exam. You can also join BCA, which usually needs Maths in Class 12.",
      },
      course: {
        title: "B.Tech in Computer Science (4 years) or BCA (3 years)",
        detail:
          "Learn programming, data and how computers work. Build projects and do internships.",
      },
      job: {
        title: "Software Engineer / Developer",
        detail:
          "Work at an IT company, a startup or a government tech team. Many jobs come through college placements.",
      },
    },
    durationYears: {
      min: 3,
      max: 4,
      note: "BCA takes 3 years. B.Tech takes 4 years.",
    },
    exams: [
      {
        name: "JEE Main",
        fullName: "Joint Entrance Examination (Main)",
        note: "For NITs, IIITs and many other colleges. Held by NTA.",
      },
      {
        name: "JEE Advanced",
        fullName: "Joint Entrance Examination (Advanced)",
        note: "For IITs. Only top JEE Main students can write it.",
      },
      {
        name: "State CETs",
        fullName: "State Common Entrance Tests",
        note: "For example MHT-CET (Maharashtra), KCET (Karnataka), TS/AP EAPCET.",
      },
      {
        name: "BITSAT",
        fullName: "BITS Admission Test",
        note: "For BITS Pilani and its campuses.",
      },
    ],
    salaryRange: {
      min: 25000,
      max: 80000,
      currency: "INR",
      period: "month",
      approximate: true,
      note: "Pay depends a lot on the college, company and your skills.",
    },
    skills: [
      "Logical thinking",
      "Problem solving",
      "Maths",
      "Teamwork",
      "Learning on your own",
    ],
    relatedSlugs: ["graphic-designer", "electrician", "chartered-accountant"],
    sources: [
      { label: "JEE Main (NTA)", url: "https://jeemain.nta.nic.in/" },
      { label: "JEE Advanced (IITs)", url: "https://jeeadv.ac.in/" },
      { label: "BITSAT (BITS Pilani)", url: "https://www.bitsadmission.com/" },
      { label: "National Career Service portal", url: "https://www.ncs.gov.in/" },
    ],
    lastVerified: VERIFIED,
  },

  {
    slug: "teacher",
    name: "Teacher",
    oneLiner: "Help children learn, grow and find their own path.",
    whatTheyDo: [
      "Teach a subject or a class in a simple way.",
      "Plan lessons, give homework and check answer sheets.",
      "Notice when a student needs extra help.",
      "Talk with parents about how their child is doing.",
    ],
    streams: ["any"],
    interests: ["helping-people", "creative"],
    subjects: ["Any stream", "Good marks in the subject you want to teach"],
    path: {
      after10th: {
        title: "Choose any stream",
        detail: "Pick the stream that has the subject you like most and want to teach.",
      },
      after12th: {
        title: "Join a teacher training course",
        detail:
          "For primary classes, do D.El.Ed (2 years). For higher classes, do a degree and then B.Ed, or join the 4-year ITEP course.",
      },
      course: {
        title: "D.El.Ed, B.Ed or ITEP",
        detail:
          "B.Ed is 2 years after graduation. ITEP (Integrated Teacher Education Programme) is 4 years and combines a degree with B.Ed.",
      },
      job: {
        title: "School Teacher",
        detail:
          "Clear CTET or your state TET, then apply to government or private schools.",
      },
    },
    durationYears: {
      min: 2,
      max: 5,
      note: "D.El.Ed: 2 years. ITEP: 4 years. Degree + B.Ed: about 5 years.",
    },
    exams: [
      {
        name: "CTET",
        fullName: "Central Teacher Eligibility Test",
        note: "Needed for central government schools like KVS and NVS. Held by CBSE.",
      },
      {
        name: "State TET",
        fullName: "State Teacher Eligibility Test",
        note: "Needed for government schools in your state.",
      },
      {
        name: "NCET",
        fullName: "National Common Entrance Test",
        note: "For admission to the 4-year ITEP course. Held by NTA.",
      },
    ],
    salaryRange: {
      min: 12000,
      max: 60000,
      currency: "INR",
      period: "month",
      approximate: true,
      note: "Private schools often pay less than government schools.",
      officialPay: [{ post: "Primary teacher (KVS)", level: 6, basicPay: 35400 }],
    },
    skills: [
      "Explaining things simply",
      "Patience",
      "Speaking in front of people",
      "Planning",
      "Kindness",
    ],
    relatedSlugs: ["nurse", "police-officer", "graphic-designer"],
    sources: [
      { label: "NCTE – ITEP and NCET information", url: "https://web.ncte.gov.in/misc/ncte_itep/page/ncet---information-2026" },
      { label: "CTET (CBSE)", url: "https://ctet.nic.in/" },
      { label: "Kendriya Vidyalaya Sangathan", url: "https://kvsangathan.nic.in/" },
      PAY_MATRIX,
    ],
    lastVerified: VERIFIED,
  },

  {
    slug: "nurse",
    name: "Nurse",
    oneLiner: "Care for patients every day and help doctors treat them.",
    whatTheyDo: [
      "Give medicines and injections to patients.",
      "Check blood pressure, temperature and other health signs.",
      "Help doctors during treatment and operations.",
      "Teach patients and families how to stay healthy.",
    ],
    streams: ["science"],
    interests: ["helping-people"],
    subjects: ["Physics", "Chemistry", "Biology", "English"],
    path: {
      after10th: {
        title: "Choose Science with Biology",
        detail: "Take Physics, Chemistry and Biology (PCB) in Class 11 and 12.",
      },
      after12th: {
        title: "Write a nursing entrance exam",
        detail:
          "Most states have their own exam or merit list. AIIMS has its own exam. Some colleges accept NEET-UG marks.",
      },
      course: {
        title: "B.Sc Nursing (4 years)",
        detail:
          "Learn patient care in class and in hospitals. GNM, a 3-year diploma, is also offered in some places.",
      },
      job: {
        title: "Staff Nurse / Nursing Officer",
        detail:
          "Register with your State Nursing Council. Then work in government or private hospitals.",
      },
    },
    durationYears: {
      min: 3,
      max: 4,
      note: "GNM diploma: 3 years. B.Sc Nursing: 4 years.",
    },
    exams: [
      {
        name: "State nursing entrance",
        note: "Each state has its own exam or merit list for B.Sc Nursing.",
      },
      {
        name: "NEET-UG",
        fullName: "National Eligibility cum Entrance Test (Undergraduate)",
        note: "Some colleges and states accept NEET-UG marks for B.Sc Nursing.",
      },
      {
        name: "AIIMS B.Sc (Hons) Nursing",
        note: "AIIMS holds its own entrance exam, separate from NEET. This course at AIIMS is for women only.",
      },
    ],
    salaryRange: {
      min: 15000,
      max: 60000,
      currency: "INR",
      period: "month",
      approximate: true,
      note: "Government hospitals (like AIIMS) pay much more than most private hospitals.",
    },
    skills: [
      "Care and kindness",
      "Staying calm",
      "Paying attention to small details",
      "Physical stamina",
      "Teamwork",
    ],
    relatedSlugs: ["doctor", "teacher"],
    sources: [
      { label: "Indian Nursing Council (INC)", url: "https://www.indiannursingcouncil.org/" },
      { label: "AIIMS entrance exams", url: "https://www.aiimsexams.ac.in/" },
      { label: "NEET-UG (NTA)", url: "https://neet.nta.nic.in/" },
    ],
    lastVerified: VERIFIED,
  },

  {
    slug: "police-officer",
    name: "Police Officer",
    oneLiner: "Keep people safe and make sure the law is followed.",
    whatTheyDo: [
      "Patrol areas and help people in trouble.",
      "Register complaints (FIRs) and investigate crimes.",
      "Control traffic and crowds at big events.",
      "Work with the community to prevent crime.",
    ],
    streams: ["any"],
    interests: ["helping-people", "nature-outdoors"],
    subjects: ["Any stream", "Good fitness is also needed"],
    path: {
      after10th: {
        title: "Choose any stream and stay fit",
        detail: "Any stream works. Start running and exercising, because there are physical tests.",
      },
      after12th: {
        title: "Apply as Constable, or start a degree",
        detail:
          "With Class 12 you can apply for Constable jobs. For higher posts, finish a bachelor's degree first.",
      },
      course: {
        title: "Bachelor's degree (3 years) + recruitment exam",
        detail:
          "Graduates can write exams for Sub-Inspector (SI). For IPS officer, clear the UPSC Civil Services exam.",
      },
      job: {
        title: "Constable, Sub-Inspector or IPS Officer",
        detail:
          "After selection, you get training at a police academy, then join duty.",
      },
    },
    durationYears: {
      min: 0,
      max: 3,
      note: "Constable: right after Class 12. SI and IPS: after a 3-year degree, plus time to prepare for exams.",
    },
    exams: [
      {
        name: "State Police Recruitment",
        note: "For Constable and SI posts. Rules and age limits differ by state.",
      },
      {
        name: "SSC CPO",
        fullName: "Staff Selection Commission – Central Police Organisation",
        note: "For Sub-Inspector in Delhi Police and central armed police forces.",
      },
      {
        name: "UPSC CSE",
        fullName: "Union Public Service Commission – Civil Services Examination",
        note: "For IPS officers. Very competitive.",
      },
      {
        name: "Physical tests",
        note: "Running, height and fitness tests are part of every police selection.",
      },
    ],
    salaryRange: {
      min: 25000,
      max: 100000,
      currency: "INR",
      period: "month",
      approximate: true,
      note: "Allowances are added on top of basic pay and differ by state.",
      officialPay: [
        { post: "Constable", level: 3, basicPay: 21700 },
        { post: "Sub-Inspector", level: 6, basicPay: 35400 },
        { post: "IPS officer", level: 10, basicPay: 56100 },
      ],
    },
    skills: [
      "Courage",
      "Physical fitness",
      "Honesty",
      "Quick decisions",
      "Talking calmly with people",
    ],
    relatedSlugs: ["forest-officer", "teacher"],
    sources: [
      { label: "UPSC – Civil Services Exam", url: "https://upsc.gov.in/" },
      { label: "Staff Selection Commission (SSC CPO)", url: "https://ssc.gov.in/" },
      { label: "Delhi Police – pay scales (RTI manual)", url: "https://delhipolice.gov.in/RTImanualFiles/Manual-10.pdf" },
      PAY_MATRIX,
    ],
    lastVerified: VERIFIED,
  },

  {
    slug: "electrician",
    name: "Electrician",
    oneLiner: "Fit and repair wiring and electrical machines in homes, shops and factories.",
    whatTheyDo: [
      "Fit wiring, switches, fans and lights in buildings.",
      "Find and fix electrical faults safely.",
      "Repair motors, pumps and other machines.",
      "Follow safety rules to protect people from shocks and fires.",
    ],
    streams: ["vocational", "any"],
    interests: ["building-fixing", "technology"],
    subjects: ["Class 10 pass with Science and Maths"],
    path: {
      after10th: {
        title: "Join ITI or Polytechnic",
        detail:
          "Join an ITI (Industrial Training Institute) for the Electrician trade, or a Polytechnic for a Diploma in Electrical Engineering.",
      },
      after12th: {
        title: "You can also join after Class 12",
        detail:
          "Class 12 is not required. Some Polytechnics let Class 12 students join the diploma directly in the 2nd year.",
        optional: true,
      },
      course: {
        title: "ITI Electrician (2 years) or Diploma (3 years)",
        detail:
          "Learn wiring, safety and machines with lots of hands-on practice. Then do an apprenticeship to gain experience.",
      },
      job: {
        title: "Electrician / Wireman",
        detail:
          "Work at a company, factory or electricity board, or start your own work after getting a licence from your state.",
      },
    },
    durationYears: {
      min: 2,
      max: 3,
      note: "Counted after Class 10, not Class 12. ITI: 2 years. Diploma: 3 years.",
    },
    exams: [
      {
        name: "ITI admission",
        note: "Most states admit on Class 10 marks. Some hold a short test.",
      },
      {
        name: "Polytechnic entrance",
        note: "State exams, for example JEECUP (Uttar Pradesh) or Delhi CET.",
      },
    ],
    salaryRange: {
      min: 10000,
      max: 25000,
      currency: "INR",
      period: "month",
      approximate: true,
      note: "Experienced electricians with their own work can earn much more.",
    },
    skills: [
      "Working with your hands",
      "Safety awareness",
      "Problem solving",
      "Basic maths",
      "Being careful and patient",
    ],
    relatedSlugs: ["software-engineer", "police-officer"],
    sources: [
      { label: "Directorate General of Training (DGT)", url: "https://dgt.gov.in/" },
      { label: "Bharat Skills – Electrician trade curriculum", url: "https://bharatskills.gov.in/pdf/QP_Curriculum/CTSElectrician2017.pdf" },
      { label: "Apprenticeship India portal", url: "https://www.apprenticeshipindia.gov.in/" },
    ],
    lastVerified: VERIFIED,
  },

  {
    slug: "graphic-designer",
    name: "Graphic Designer",
    oneLiner: "Use pictures, colours and words to make designs that people notice.",
    whatTheyDo: [
      "Design posters, logos, social media posts and books.",
      "Use computer tools like Photoshop, Illustrator or Figma.",
      "Talk to clients to understand what they need.",
      "Change designs based on feedback.",
    ],
    streams: ["any"],
    interests: ["creative", "technology"],
    subjects: ["Any stream", "Drawing or art is helpful"],
    path: {
      after10th: {
        title: "Choose any stream and keep drawing",
        detail: "Any stream works. Practise drawing and try free design apps.",
      },
      after12th: {
        title: "Write design entrance exams",
        detail:
          "Write exams like UCEED, NID DAT or NIFT. You can also join a BFA or a short design diploma.",
      },
      course: {
        title: "B.Des or BFA (4 years), or a diploma (1–2 years)",
        detail:
          "Learn drawing, colour, typography and design software. Build a portfolio of your best work.",
      },
      job: {
        title: "Graphic Designer",
        detail:
          "Work at an advertising agency, media company or startup, or work freelance.",
      },
    },
    durationYears: {
      min: 1,
      max: 4,
      note: "Diploma: 1–2 years. B.Des or BFA: 4 years.",
    },
    exams: [
      {
        name: "UCEED",
        fullName: "Undergraduate Common Entrance Examination for Design",
        note: "For B.Des at IITs. Held by IIT Bombay.",
      },
      {
        name: "NID DAT",
        fullName: "National Institute of Design – Design Aptitude Test",
        note: "For B.Des at NID campuses.",
      },
      {
        name: "NIFT Entrance",
        fullName: "National Institute of Fashion Technology Entrance Exam",
        note: "For B.Des at NIFT campuses.",
      },
    ],
    salaryRange: {
      min: 15000,
      max: 35000,
      currency: "INR",
      period: "month",
      approximate: true,
      note: "A strong portfolio matters more than marks for getting good pay.",
    },
    skills: [
      "Creativity",
      "Drawing and sense of colour",
      "Design software",
      "Taking feedback well",
      "Meeting deadlines",
    ],
    relatedSlugs: ["software-engineer", "teacher"],
    sources: [
      { label: "UCEED (IIT Bombay)", url: "https://www.uceed.iitb.ac.in/" },
      { label: "NID admissions", url: "https://admissions.nid.edu/" },
      { label: "NIFT admissions", url: "https://www.nift.ac.in/" },
      { label: "National Career Service portal", url: "https://www.ncs.gov.in/" },
    ],
    lastVerified: VERIFIED,
  },

  {
    slug: "chartered-accountant",
    name: "Chartered Accountant",
    oneLiner: "Manage money, taxes and accounts for people and companies.",
    whatTheyDo: [
      "Check a company's accounts to make sure they are correct (audit).",
      "Help people and businesses file their taxes.",
      "Give advice on how to manage and grow money.",
      "Work in firms, companies, banks, or run your own practice.",
    ],
    streams: ["commerce", "any"],
    interests: ["numbers-business"],
    subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics (helpful)"],
    path: {
      after10th: {
        title: "Choose Commerce (best fit)",
        detail:
          "Commerce helps the most, but students from any stream can become a CA.",
      },
      after12th: {
        title: "Clear CA Foundation",
        detail:
          "Register with ICAI (Institute of Chartered Accountants of India) and write the CA Foundation exam.",
      },
      course: {
        title: "CA Intermediate → 2-year Articleship → CA Final",
        detail:
          "Pass both groups of CA Intermediate and the ICITSS training. Then train for 2 years under a practising CA (articleship), then pass CA Final.",
      },
      job: {
        title: "Chartered Accountant",
        detail:
          "Join an accounting firm, a company or a bank, or start your own practice.",
      },
    },
    durationYears: {
      min: 4.5,
      max: 5,
      note: "Many students take longer, because the exams are tough. Graduates can skip Foundation.",
    },
    exams: [
      {
        name: "CA Foundation",
        note: "First level. Written after Class 12.",
      },
      {
        name: "CA Intermediate",
        note: "Second level. Has two groups.",
      },
      {
        name: "CA Final",
        note: "Last level, written after articleship.",
      },
    ],
    salaryRange: {
      min: 60000,
      max: 110000,
      currency: "INR",
      period: "month",
      approximate: true,
      note: "For newly qualified CAs. In ICAI campus placements (2026), the average offer was about ₹13 lakh a year.",
    },
    skills: [
      "Good with numbers",
      "Paying attention to details",
      "Honesty",
      "Discipline for long study",
      "Clear communication",
    ],
    relatedSlugs: ["software-engineer", "teacher"],
    sources: [
      { label: "ICAI – Board of Studies (CA course)", url: "https://www.icai.org/" },
      { label: "ICAI Campus Placement", url: "https://www.icai.org/post/campus-placement" },
    ],
    lastVerified: VERIFIED,
  },

  {
    slug: "agricultural-scientist",
    name: "Agricultural Scientist",
    oneLiner: "Study crops, soil and animals to help farmers grow more food.",
    whatTheyDo: [
      "Develop better seeds that give more harvest and resist disease.",
      "Test soil and water, and suggest the right fertiliser.",
      "Visit farms and teach farmers new methods.",
      "Work in research labs, farm universities or Krishi Vigyan Kendras.",
    ],
    streams: ["science"],
    interests: ["nature-outdoors", "helping-people", "technology"],
    subjects: ["Physics", "Chemistry", "Biology or Maths", "Agriculture (if offered)"],
    path: {
      after10th: {
        title: "Choose Science",
        detail: "Take Physics and Chemistry with Biology or Maths in Class 11 and 12.",
      },
      after12th: {
        title: "Write CUET (ICAR-UG) or your state agriculture exam",
        detail:
          "CUET (ICAR-UG) gives seats in top farm universities. Many states also hold their own exam.",
      },
      course: {
        title: "B.Sc Agriculture (4 years) → M.Sc (2 years)",
        detail:
          "After B.Sc, write ICAR AIEEA-PG for M.Sc. Many scientists also do a PhD (about 3 years).",
      },
      job: {
        title: "Agricultural Scientist",
        detail:
          "Clear the ASRB exam to become a scientist in ICAR (Agricultural Research Service). You can also work at a farm university, a seed company or a state agriculture department.",
      },
    },
    durationYears: {
      min: 6,
      max: 9,
      note: "B.Sc + M.Sc: 6 years. With a PhD: about 9 years.",
    },
    exams: [
      {
        name: "CUET (ICAR-UG)",
        fullName: "Common University Entrance Test – for ICAR undergraduate seats",
        note: "For B.Sc Agriculture at ICAR-linked universities. Held by NTA.",
      },
      {
        name: "ICAR AIEEA-PG",
        fullName: "All India Entrance Examination for Admission (Postgraduate)",
        note: "For M.Sc at farm universities. Held by NTA.",
      },
      {
        name: "ASRB NET / ARS",
        fullName: "Agricultural Scientists Recruitment Board exams",
        note: "To become a scientist in ICAR, or to teach at a farm university.",
      },
    ],
    salaryRange: {
      min: 30000,
      max: 100000,
      currency: "INR",
      period: "month",
      approximate: true,
      note: "Private and junior research jobs pay less.",
      officialPay: [{ post: "Scientist (ICAR)", level: 10, basicPay: 56100 }],
    },
    skills: [
      "Curiosity about nature",
      "Science and lab work",
      "Patience with long experiments",
      "Talking with farmers",
      "Working outdoors",
    ],
    relatedSlugs: ["forest-officer", "doctor"],
    sources: [
      { label: "Indian Council of Agricultural Research (ICAR)", url: "https://icar.org.in/" },
      { label: "CUET-UG (NTA)", url: "https://cuet.nta.nic.in/" },
      { label: "Agricultural Scientists Recruitment Board (ASRB)", url: "https://www.asrb.org.in/" },
      PAY_MATRIX,
    ],
    lastVerified: VERIFIED,
  },

  {
    slug: "forest-officer",
    name: "Forest Officer (IFS)",
    oneLiner: "Protect forests, wildlife and the people who live near them.",
    whatTheyDo: [
      "Look after a forest area and stop illegal tree cutting and hunting.",
      "Plan tree planting and protect wild animals.",
      "Work with villages that depend on the forest.",
      "Handle forest fires and conflicts between people and animals.",
    ],
    streams: ["science"],
    interests: ["nature-outdoors", "helping-people"],
    subjects: ["Science stream", "Biology or Maths"],
    path: {
      after10th: {
        title: "Choose Science",
        detail: "Take Science in Class 11 and 12. Biology or Maths both work.",
      },
      after12th: {
        title: "Do a degree in an allowed subject",
        detail:
          "IFS needs a degree in a subject such as Botany, Zoology, Chemistry, Physics, Maths, Statistics, Geology, Agriculture, Forestry, Veterinary Science or Engineering.",
      },
      course: {
        title: "Degree (3–4 years) + UPSC IFoS exam",
        detail:
          "After your degree, write the UPSC Indian Forest Service exam. You must be 21–32 years old (more for some categories).",
      },
      job: {
        title: "Indian Forest Service Officer",
        detail:
          "After training, you start as an Assistant Conservator of Forests. Your state PSC also hires Range Forest Officers.",
      },
    },
    durationYears: {
      min: 3,
      max: 4,
      note: "Plus time to prepare for UPSC, often 1–2 years or more.",
    },
    exams: [
      {
        name: "UPSC IFoS",
        fullName: "Indian Forest Service Examination",
        note: "Prelims are shared with the Civil Services exam, then a separate Mains and interview. Very competitive.",
      },
      {
        name: "State PSC forest exams",
        note: "For state posts like Range Forest Officer.",
      },
      {
        name: "Physical tests",
        note: "IFS has a walking test: 25 km for men and 14 km for women, in 4 hours.",
      },
    ],
    salaryRange: {
      min: 56100,
      max: 100000,
      currency: "INR",
      period: "month",
      approximate: true,
      note: "State forest posts start lower.",
      officialPay: [{ post: "IFS officer", level: 10, basicPay: 56100 }],
    },
    skills: [
      "Love for nature",
      "Physical fitness",
      "Leadership",
      "Working in remote places",
      "Talking with local people",
    ],
    relatedSlugs: ["agricultural-scientist", "police-officer"],
    sources: [
      { label: "UPSC – Indian Forest Service Exam", url: "https://upsc.gov.in/" },
      { label: "Ministry of Environment, Forest and Climate Change", url: "https://moef.gov.in/" },
      PAY_MATRIX,
    ],
    lastVerified: VERIFIED,
  },
];
