import type {
  Bilingual,
  Lesson,
  NotebookPage,
  PageMeta,
} from "@/types/better-life"

/**
 * Content for the "My Better Life" section, inspired by the My Better Life workshop
 * by Professor Navneet Arora. Source: the standalone prototype (reference/index.html),
 * cleaned to site rules: no em dashes, no arrows in text, sentence case.
 * Every string is bilingual; the section has its own EN/HI toggle.
 */

/* ------------------------------------------------------------------ */
/* Lessons                                                             */
/* ------------------------------------------------------------------ */

export const lessons: Lesson[] = [
  {
    slug: "choose-what-you-learn",
    title: { en: "Choose what you learn", hi: "क्या सीख रहे हैं, यह चुनें" },
    subtitle: { en: "Identity & conscious learning", hi: "पहचान और जागरूक सीखना" },
    question: {
      en: "What am I allowing myself to learn?",
      hi: "मैं अपने भीतर क्या आने दे रहा / रही हूँ?",
    },
    intro: {
      en: "We learn in two ways. Sometimes we choose a habit or value with awareness. At other times, we absorb the behaviour around us without even noticing. The first step towards a better life is to become careful about what we let shape us.",
      hi: "हम दो तरह से सीखते हैं। कभी हम सोच-समझकर कोई आदत या मूल्य अपनाते हैं। कभी आसपास के व्यवहार को बिना ध्यान दिए अपना लेते हैं। बेहतर जीवन की पहली सीढ़ी है: इस बात के प्रति सजग होना कि हम अपने भीतर क्या जगह दे रहे हैं।",
    },
    points: [
      {
        en: "Your name, family, school and life goal are part of your identity.",
        hi: "आपका नाम, परिवार, विद्यालय और जीवन-लक्ष्य आपकी पहचान का हिस्सा हैं।",
      },
      {
        en: "Your everyday role as a learner shapes how that identity is represented.",
        hi: "विद्यार्थी के रूप में आपका रोज़ का व्यवहार आपकी पहचान को आकार देता है।",
      },
      {
        en: "Conscious learning means choosing habits and values deliberately. Unconscious learning means picking things up passively from our surroundings.",
        hi: "जागरूक सीखना है सोच-समझकर अच्छी आदतें चुनना। अनजाने में सीखना है आसपास से व्यवहार को बिना परखे अपना लेना।",
      },
    ],
    example: {
      en: "A student may never decide to use hurtful language, yet begin repeating it because it is common in a group. Noticing this is the first step towards choosing differently.",
      hi: "हो सकता है कोई विद्यार्थी कभी अपशब्द बोलने का निर्णय न ले, लेकिन मित्रों के बीच बार-बार सुनकर वही भाषा दोहराने लगे। इसे पहचानना ही बदलाव की शुरुआत है।",
    },
    quote: {
      hi: "गलत सीख कर हमारा नाम, हमारी संस्था, हमारे माता-पिता का नाम और हमारा लक्ष्य प्रभावित होता है; इसलिए सीखने का तरीका सही और जागरूक होना चाहिए।",
      en: "Wrong learning affects our name, our institution, our parents and our goals. So learn with awareness.",
    },
    practice: {
      en: "At the end of today, write down three things you picked up. Which did you choose consciously, and which did you absorb without noticing?",
      hi: "आज के अंत में लिखें कि आपने कौन-सी तीन बातें सीखीं। इनमें से कौन-सी आपने सोचकर चुनीं और कौन-सी अनजाने में सीख लीं?",
    },
    prompt: {
      en: "What is one influence I want to be more careful about?",
      hi: "किस प्रभाव के प्रति मुझे आज से अधिक सजग रहना है?",
    },
    notePage: 2,
  },
  {
    slug: "give-your-attention",
    title: { en: "Give your attention", hi: "अपना ध्यान सही जगह दें" },
    subtitle: { en: "The art of listening", hi: "ध्यान से सुनने की कला" },
    question: {
      en: "Are my ears listening, and is my mind present?",
      hi: "क्या मेरे कान सुन रहे हैं और मन भी उपस्थित है?",
    },
    intro: {
      en: "Hearing is a physical act; listening with attention is a choice. We can sit in a classroom and still have our minds somewhere else. Learning begins when the mind joins the ears.",
      hi: "सुनना कानों का काम है; ध्यान से सुनना हमारा चुनाव है। हम कक्षा में बैठे हो सकते हैं, लेकिन मन कहीं और भटक सकता है। सीखना तभी शुरू होता है जब मन भी सुनने में शामिल हो।",
    },
    points: [
      {
        en: "Attention can wander to screens, food, arguments, gossip or worries.",
        hi: "ध्यान मोबाइल, खाने, बहस, चुगली या चिंताओं की ओर भटक सकता है।",
      },
      {
        en: "Choose to give your attention to what can help you grow.",
        hi: "अपना ध्यान उन बातों को दें जो आपके विकास में मदद करें।",
      },
      {
        en: "Do not give every passing conversation or distraction a place in your mind.",
        hi: "हर गुजरती बातचीत और हर ध्यान भटकाने वाली चीज़ को मन में जगह देना ज़रूरी नहीं।",
      },
    ],
    example: {
      en: "During a lesson, notice when your mind drifts. Bring it back gently to the speaker or the idea. You do not need to be perfect; you need to return.",
      hi: "पढ़ते या सुनते समय ध्यान भटके, तो उसे पहचानें और धीरे से वापस विषय पर लाएँ। हर पल एकाग्र होना ज़रूरी नहीं; बार-बार लौटना सीखना ज़रूरी है।",
    },
    quote: {
      hi: "काम की बात अगर मेरे काम नहीं आई, तो मेरे किस काम की!",
      en: "If useful knowledge does not become useful in my life, what use is it to me?",
    },
    practice: {
      en: "In your next conversation with a teacher, parent or friend, put distractions aside. After listening, explain the main point in your own words.",
      hi: "अगली बार शिक्षक, माता-पिता या मित्र से बात करते समय ध्यान भटकाने वाली चीज़ें दूर रखें। सुनने के बाद मुख्य बात अपने शब्दों में बताइए।",
    },
    prompt: {
      en: "Where does my attention go most often, and where would I like it to go?",
      hi: "मेरा ध्यान अक्सर कहाँ जाता है, और मैं उसे कहाँ लगाना चाहता / चाहती हूँ?",
    },
    notePage: 2,
  },
  {
    slug: "turn-understanding-into-habit",
    title: { en: "Turn understanding into habit", hi: "समझ को आदत में बदलें" },
    subtitle: { en: "From knowledge to everyday action", hi: "ज्ञान से रोज़ के व्यवहार तक" },
    question: {
      en: "Do I only know it, or have I made it part of my life?",
      hi: "क्या मैं केवल जानता / जानती हूँ, या उसे जीवन में उतार भी रहा / रही हूँ?",
    },
    intro: {
      en: "A sentence heard once may fade. Attention can help us remember for longer, but deep understanding gives an idea a chance to become part of our behaviour. Reflection and practice help knowledge travel from the mind into everyday life.",
      hi: "एक बार सुनी हुई बात जल्दी भूल सकती है। ध्यान से सुनने पर बात कुछ समय तक याद रह सकती है, लेकिन गहरी समझ उसे हमारे व्यवहार का हिस्सा बना सकती है। विचार और अभ्यास से ज्ञान रोज़मर्रा के जीवन तक पहुँचता है।",
    },
    points: [
      {
        en: "The steps: hear, focus, understand, reflect, adopt or let go, then form a habit.",
        hi: "क्रम: सुनना, ध्यान देना, समझना, विचार करना, अपनाना या छोड़ना, फिर आदत बनाना।",
      },
      {
        en: "Positive habits may feel difficult at first, but they make many things easier later.",
        hi: "अच्छी आदतें शुरुआत में कठिन लग सकती हैं, लेकिन आगे चलकर जीवन को आसान बनाती हैं।",
      },
      {
        en: "Easy, tempting habits can create difficulty when they become patterns.",
        hi: "जो आदतें तुरंत आसान और आकर्षक लगती हैं, वे बार-बार दोहराने पर कठिनाई बढ़ा सकती हैं।",
      },
    ],
    example: {
      en: "A child may brush because a parent insists. When the child understands why brushing matters, the habit can become self-driven.",
      hi: "बच्चा शुरुआत में माता-पिता के कहने पर ब्रश करता है। जब उसे समझ आता है कि ब्रश करना क्यों ज़रूरी है, तो यह उसकी अपनी आदत बन सकती है।",
    },
    quote: {
      hi: "पहले हम आदतों को बनाते हैं, और फिर आदतें हमारे जीवन को बनाती हैं।",
      en: "First we shape our habits; then our habits shape our life.",
    },
    practice: {
      en: "Choose one small action you understand is good for you. Practise it today, and notice what makes it easy or difficult.",
      hi: "एक छोटा-सा अच्छा काम चुनें, जिसके महत्व को आप समझते हैं। आज उसे करके देखें और ध्यान दें कि उसे करना आसान या कठिन किस वजह से था।",
    },
    prompt: {
      en: "Which one small habit would make my days better if I practised it regularly?",
      hi: "कौन-सी छोटी आदत नियमित हो जाए तो मेरे दिन बेहतर बनेंगे?",
    },
    notePage: 4,
  },
  {
    slug: "let-feedback-shape-you",
    title: { en: "Let feedback shape you", hi: "सुधार को अपनाएँ" },
    subtitle: { en: "The sculptor and the stone", hi: "मूर्तिकार और पत्थर की कहानी" },
    question: {
      en: "Can I see correction as a chance to improve?",
      hi: "क्या मैं सुधार को बेहतर बनने का अवसर मान सकता / सकती हूँ?",
    },
    intro: {
      en: "The workshop tells the story of two stones. One refuses to be shaped and becomes a doorstep. The other accepts the sculptor's chisel and reveals the statue within. The story asks us to stay open to useful correction instead of escaping every uncomfortable moment.",
      hi: "कार्यशाला में दो पत्थरों की कहानी सुनाई गई है। एक पत्थर तराशे जाने से मना कर देता है और सीढ़ी का पत्थर बनता है। दूसरा मूर्तिकार की छैनी स्वीकार करता है और उसके भीतर छिपी मूर्ति सामने आती है। यह कहानी हमें हर असुविधाजनक पल से बचने के बजाय उपयोगी सुधार के लिए खुला रहना सिखाती है।",
    },
    points: [
      {
        en: "Parents, teachers and mentors can help us notice what we cannot see ourselves.",
        hi: "माता-पिता, शिक्षक और मार्गदर्शक हमें वे बातें दिखा सकते हैं जिन्हें हम स्वयं नहीं देख पाते।",
      },
      {
        en: "Feedback, assignments and tests can show us what needs attention.",
        hi: "सुझाव, अभ्यास और परीक्षाएँ बता सकते हैं कि किस जगह पर काम करना है।",
      },
      {
        en: "Accept useful feedback thoughtfully; it does not mean accepting hurtful or unsafe treatment.",
        hi: "उपयोगी सुझाव पर विचार करें; इसका अर्थ अपमानजनक या असुरक्षित व्यवहार सहना नहीं है।",
      },
    ],
    example: {
      en: "When a teacher points out a mistake, pause before defending yourself. Find the specific thing you can learn from the correction.",
      hi: "शिक्षक गलती बताएँ तो तुरंत बहस करने से पहले रुकें। सुधार में कौन-सी खास बात सीखने लायक है, यह पहचानें।",
    },
    quote: {
      hi: "जो शिला अपने ऊपर काम होने देती है, वही मंदिर में पूजी जाती है; जो विद्यार्थी स्वयं पर काम होने देता है, वही जीवन में सम्मान पाता है।",
      en: "The stone that allows itself to be shaped becomes the statue; a student who works on themselves earns respect.",
    },
    practice: {
      en: "Think of one piece of feedback you received recently. What part of it was useful, and what is one change you can try?",
      hi: "हाल में मिली किसी सलाह या सुधार को याद करें। उसमें कौन-सी बात उपयोगी थी और आप कौन-सा एक बदलाव आज़मा सकते हैं?",
    },
    prompt: {
      en: "What feedback have I been avoiding, and what might it help me notice?",
      hi: "किस सुझाव से मैं बचता / बचती रहा हूँ, और वह मुझे क्या दिखा सकता है?",
    },
    notePage: 2,
  },
  {
    slug: "recognise-your-strengths",
    title: { en: "Recognise your strengths", hi: "अपने गुण पहचानें" },
    subtitle: { en: "The first page of your notebook", hi: "आपकी कॉपी का पहला पन्ना" },
    question: {
      en: "What good qualities do I already practise?",
      hi: "मैं अभी कौन-से अच्छे काम सचमुच करता / करती हूँ?",
    },
    intro: {
      en: "Self-improvement should begin with an honest view of what is already good in us. The workshop asks students to write their existing virtues in pen: not qualities they wish they had, but behaviours they genuinely practise.",
      hi: "आत्म-विकास की शुरुआत अपने भीतर पहले से मौजूद अच्छाइयों को ईमानदारी से देखने से होनी चाहिए। कार्यशाला में कहा गया है कि अपने वर्तमान गुणों को पेन से लिखें: वे गुण नहीं जो आप चाहते हैं, बल्कि वे व्यवहार जिन्हें आप सच में अपनाते हैं।",
    },
    points: [
      {
        en: "Look at ordinary actions: being punctual, greeting elders, caring for belongings, helping at home or not wasting food.",
        hi: "रोज़ के छोटे काम देखें: समय पर पहुँचना, बड़ों का अभिवादन, सामान सँभालना, घर में मदद करना या भोजन बर्बाद न करना।",
      },
      {
        en: "Write only what is true today. Avoid sentences that begin with “I should”.",
        hi: "आज जो सच है, वही लिखें। “मुझे ऐसा करना चाहिए” जैसे वाक्यों से बचें।",
      },
      {
        en: "Acknowledging strengths is not boasting; it gives you a truthful place to begin.",
        hi: "अपने गुण पहचानना घमंड नहीं है; यह ईमानदार शुरुआत है।",
      },
    ],
    example: {
      en: "“I help put away the dishes after dinner” is more honest and useful than “I should be helpful.”",
      hi: "“मैं रात के खाने के बाद बर्तन रखने में मदद करता हूँ” लिखना, “मुझे मददगार होना चाहिए” लिखने से अधिक सच्चा और उपयोगी है।",
    },
    quote: {
      hi: "व्यक्ति के गुण ही उसकी असली पहचान होते हैं; हम दूसरों के अलावा स्वयं के मूर्तिकार खुद बन सकते हैं।",
      en: "Our virtues are part of our true identity; we can become sculptors of ourselves.",
    },
    practice: {
      en: "Write five things you already do that show care, discipline, respect, honesty or cooperation. Keep the list truthful and specific.",
      hi: "ऐसे पाँच काम लिखें जो आप अभी करते हैं और जिनमें देखभाल, अनुशासन, सम्मान, ईमानदारी या सहयोग दिखता है। उदाहरण स्पष्ट और सच्चे रखें।",
    },
    prompt: {
      en: "Which strength do I sometimes overlook because it feels ordinary?",
      hi: "कौन-सा अच्छा गुण मुझे साधारण लगने के कारण दिखाई नहीं देता?",
    },
    notePage: 1,
  },
  {
    slug: "work-on-what-holds-you-back",
    title: { en: "Work on what holds you back", hi: "जो रोकता है, उस पर काम करें" },
    subtitle: { en: "The second page of your notebook", hi: "आपकी कॉपी का दूसरा पन्ना" },
    question: {
      en: "What can I gently remove or change?",
      hi: "मैं किस व्यवहार को धीरे-धीरे बदल सकता / सकती हूँ?",
    },
    intro: {
      en: "The sculptor does not destroy the whole stone. The unwanted part is removed so the form within can appear. In the same way, notice a shortcoming without treating it as your whole identity. The notebook uses pencil for this page because habits can change.",
      hi: "मूर्तिकार पूरे पत्थर को नष्ट नहीं करता। वह केवल अनावश्यक हिस्सा हटाता है ताकि भीतर छिपा आकार सामने आ सके। इसी तरह किसी कमी को पहचानें, लेकिन उसे अपनी पूरी पहचान न मानें। इस पन्ने पर कमियों को पेंसिल से लिखने का अर्थ है कि व्यवहार बदला जा सकता है।",
    },
    points: [
      {
        en: "Name a behaviour, not your worth. “I delay homework” is more useful than “I am useless”.",
        hi: "व्यवहार का नाम लिखें, अपनी कीमत का फैसला नहीं। “मैं गृहकार्य टालता हूँ” कहना “मैं बेकार हूँ” कहने से बेहतर है।",
      },
      {
        en: "When someone points out a flaw, listen and decide whether the observation is fair and helpful.",
        hi: "कोई कमी बताए तो सुनें और सोचें कि बात सही और उपयोगी है या नहीं।",
      },
      {
        en: "When a habit changes, move the new virtue to the strengths page.",
        hi: "जब व्यवहार बदल जाए, तो उससे बने नए गुण को गुणों वाले पन्ने पर लिखें।",
      },
    ],
    example: {
      en: "If you often postpone homework, note the situation in which it happens. Is it after using your phone, or when the task feels too large?",
      hi: "यदि आप गृहकार्य टालते हैं, तो देखें ऐसा कब होता है। क्या मोबाइल चलाने के बाद, या तब जब काम बहुत बड़ा लगता है?",
    },
    quote: {
      hi: "अनवांटेड पत्थर हटाने से ही मूर्ति निकलती है; कमियों को पेंसिल से लिखो ताकि उन्हें मिटाया जा सके, और गुणों को पेन से लिखो ताकि उन्हें पक्का किया जा सके।",
      en: "Removing the unwanted stone reveals the statue. Write shortcomings in pencil so they can be erased, and virtues in pen so they can be strengthened.",
    },
    practice: {
      en: "Choose one behaviour you would like to change. Describe when it happens, what triggers it and one small step that could interrupt it.",
      hi: "एक ऐसा व्यवहार चुनें जिसे आप बदलना चाहते हैं। लिखें कि यह कब होता है, इसकी वजह क्या होती है और इसे रोकने के लिए एक छोटा कदम क्या हो सकता है।",
    },
    prompt: {
      en: "What is one pattern I am ready to work on without judging myself?",
      hi: "किस एक आदत पर मैं बिना खुद को बुरा कहे काम शुरू कर सकता / सकती हूँ?",
    },
    notePage: 2,
  },
  {
    slug: "give-today-a-direction",
    title: { en: "Give today a direction", hi: "आज को एक दिशा दें" },
    subtitle: { en: "Goals, reasons and the gift of today", hi: "लक्ष्य, कारण और आज का अवसर" },
    question: {
      en: "What do I want to move towards, and why?",
      hi: "मैं किस दिशा में बढ़ना चाहता / चाहती हूँ, और क्यों?",
    },
    intro: {
      en: "A goal gives direction, but a clear reason helps us stay with it. The final notebook pages connect a life goal to the qualities it needs, the habits that support it and the choices we make today. The workshop's reminder is simple: today is an opportunity to become a little better than yesterday.",
      hi: "लक्ष्य हमें दिशा देता है, लेकिन उसके पीछे का स्पष्ट कारण हमें उस दिशा में टिके रहने में मदद करता है। कॉपी के आख़िरी पन्ने जीवन-लक्ष्य को ज़रूरी गुणों, मददगार आदतों और आज के चुनावों से जोड़ते हैं। कार्यशाला की याद दिलाने वाली बात है: आज, कल से थोड़ा बेहतर बनने का अवसर है।",
    },
    points: [
      {
        en: "Page 3: write your goal. Add “good” to the profession you hope to pursue (be a good doctor, engineer, teacher or whatever you choose).",
        hi: "पन्ना 3: अपना लक्ष्य लिखें। अपने चुने हुए पेशे के साथ “अच्छा” जोड़ें (अच्छे डॉक्टर, इंजीनियर, शिक्षक या जो भी आप बनना चाहते हैं)।",
      },
      {
        en: "Page 4: write why the goal matters and break it into practical steps.",
        hi: "पन्ना 4: लिखें कि यह लक्ष्य आपके लिए क्यों महत्वपूर्ण है और इसे छोटे कदमों में बाँटें।",
      },
      {
        en: "Page 5: identify the qualities your goal needs. Page 6: notice which hobbies support your goal and which get in its way.",
        hi: "पन्ना 5: लक्ष्य के लिए ज़रूरी गुण पहचानें। पन्ना 6: देखें कौन-से शौक लक्ष्य में मदद करते हैं और कौन-से रास्ता रोकते हैं।",
      },
      {
        en: "Page 7: reflect on today (your reading, writing, thinking, speaking and behaviour).",
        hi: "पन्ना 7: आज के पढ़ने, लिखने, सोचने, बोलने और व्यवहार पर विचार करें।",
      },
    ],
    example: {
      en: "If you want to become a good teacher, your helpful qualities might include patience, clear communication, curiosity and preparation. Your daily step could be explaining one idea to someone.",
      hi: "यदि आप अच्छे शिक्षक बनना चाहते हैं, तो धैर्य, साफ़ संवाद, जिज्ञासा और तैयारी उपयोगी गुण हो सकते हैं। आज का छोटा कदम हो सकता है: किसी को एक विचार समझाना।",
    },
    quote: {
      hi: "आज केवल एक तारीख या वार नहीं है; आज कल से बेहतर बनने का कुदरत का दिया हुआ एक सुंदर अवसर है।",
      en: "Today is not merely a date or a day of the week; it is an opportunity to become better than yesterday.",
    },
    practice: {
      en: "Complete this sentence: “Today, I can become a little better than yesterday by…” Make the action small enough to do.",
      hi: "यह वाक्य पूरा करें: “आज मैं कल से थोड़ा बेहतर बन सकता / सकती हूँ, अगर…” काम इतना छोटा रखें कि आज ही हो सके।",
    },
    prompt: {
      en: "What is one meaningful thing I can do today that my future self will thank me for?",
      hi: "आज ऐसा कौन-सा सार्थक काम कर सकता / सकती हूँ जिसके लिए मेरा आने वाला रूप मुझे धन्यवाद देगा?",
    },
    notePage: 7,
  },
]

/* ------------------------------------------------------------------ */
/* UI labels                                                           */
/* ------------------------------------------------------------------ */

/**
 * Every UI string for the section. Arrows and tick marks are NOT baked in:
 * buttons and links add their own Lucide icons. Chrome labels are stored in sentence
 * case; `type-label` uppercases them where the design calls for it.
 */
export const betterLifeLabels = {
  /* Brand, nav, language, credit (every page) */
  sectionName: { en: "My Better Life", hi: "मेरी बेहतर ज़िंदगी" },
  brandSub: {
    en: "मेरी बेहतर ज़िंदगी · सीखने से जीवन तक",
    hi: "मेरी बेहतर ज़िंदगी · सीखने से जीवन तक",
  },
  navLessons: { en: "Lessons", hi: "पाठ" },
  navNotebook: { en: "My notebook", hi: "मेरी कॉपी" },
  /** Text of the toggle button: the language you can switch TO. */
  langSwitchTo: { en: "हिंदी", hi: "English" },
  langSwitchLabel: { en: "Switch language", hi: "भाषा बदलें" },
  credit: {
    en: "Inspired by the My Better Life workshop by Professor Navneet Arora",
    hi: "प्रोफेसर नवनीत अरोड़ा की “My Better Life” कार्यशाला से प्रेरित",
  },
  footerNote: {
    en: "A quiet space to learn, reflect and grow.",
    hi: "सीखने, विचार करने और बढ़ने की एक शांत जगह।",
  },
  journeyLabel: { en: "The journey", hi: "सीखने की यात्रा" },
  yourBookLabel: { en: "Your notebook", hi: "आपकी कॉपी" },
  myNotebook: { en: "My Better Life notebook", hi: "मेरी बेहतर ज़िंदगी की कॉपी" },
  sideThought: {
    en: "A better life is not made in one day. It is shaped by what we choose to learn, practise and become, every day.",
    hi: "बेहतर जीवन एक दिन में नहीं बनता। हर दिन हम क्या सीखते, अपनाते और बनते हैं, उसी से जीवन आकार लेता है।",
  },

  /* Intro page (/my-better-life) */
  homeEyebrow: { en: "A student's journey", hi: "एक विद्यार्थी की यात्रा" },
  heroTitle: { en: "A better life, shaped by you.", hi: "बेहतर जीवन, आपकी अपनी रचना।" },
  /** The hero line in the other language, shown under the title. */
  heroOtherLang: {
    en: "बेहतर जीवन, जिसे आप स्वयं गढ़ते हैं।",
    hi: "A better life, shaped by you.",
  },
  heroLead: {
    en: "Seven thoughtful lessons. Small actions. One notebook that grows with you. Explore an idea, try it in your own life, and make the learning your own.",
    hi: "सात विचारपूर्ण पाठ। छोटे-छोटे कदम। एक कॉपी जो आपके साथ आगे बढ़े। किसी विचार को समझें, जीवन में आज़माएँ और सीख को अपना बनाएँ।",
  },
  begin: { en: "Begin the journey", hi: "यात्रा शुरू करें" },
  openBook: { en: "Open my notebook", hi: "मेरी कॉपी खोलें" },
  heroFoot: {
    en: "No scores. No streak pressure. Just honest progress.",
    hi: "कोई अंक नहीं। लगातार बने रहने का दबाव नहीं। बस ईमानदार प्रगति।",
  },
  todayLabel: { en: "A thought for today", hi: "आज का विचार" },
  /** Same rule as lesson quotes: Hindi always shows; English mode adds the translation. */
  todayQuote: {
    en: "Today is an opportunity to be better than yesterday.",
    hi: "आज, कल से बेहतर बनने का एक अवसर है।",
  },
  dailyPrompt: {
    en: "What is one small thing you want to do better today?",
    hi: "आज आप कौन-सी एक छोटी बात बेहतर करना चाहते हैं?",
  },
  dailyPlaceholder: {
    en: "Write one intention for today…",
    hi: "आज के लिए अपना एक संकल्प लिखें…",
  },
  localSave: { en: "Saved only on this device.", hi: "यह इसी डिवाइस पर सुरक्षित है।" },
  introEyebrow: { en: "The learning journey", hi: "सीखने की यात्रा" },
  introTitle: { en: "Seven lessons for life", hi: "सात सीख, जीवन के लिए" },
  introLead: {
    en: "Each lesson begins with an idea and grows through your own experience. There is no rush. Read at your own pace.",
    hi: "हर पाठ एक विचार से शुरू होता है और आपके अपने अनुभव से आगे बढ़ता है। कोई जल्दी नहीं, अपनी गति से पढ़ें।",
  },
  lessonsTitle: { en: "Seven lessons, one journey", hi: "सात पाठ, एक यात्रा" },
  lessonsSub: {
    en: "Move at your own pace. Revisit a lesson whenever life gives you a reason to.",
    hi: "अपनी गति से आगे बढ़ें। जब जीवन कोई कारण दे, किसी पाठ पर फिर लौटें।",
  },
  progressLabel: { en: "Your journey", hi: "आपकी यात्रा" },
  completed: { en: "Lessons explored", hi: "पाठ देखे" },
  explored: { en: "Explored", hi: "देखा गया" },
  openLesson: { en: "Open this lesson", hi: "इस पाठ को खोलें" },
  startLesson: { en: "Start with lesson one", hi: "पहले पाठ से शुरू करें" },
  closingQuote: {
    en: "First we shape our habits, and then our habits shape our life.",
    hi: "पहले हम आदतों को बनाते हैं, और फिर आदतें हमारे जीवन को बनाती हैं।",
  },
  closingAttribution: { en: "Professor Navneet Arora", hi: "प्रोफेसर नवनीत अरोड़ा" },

  /* Lesson page (/my-better-life/[slug]) */
  lessonLabel: { en: "Lesson", hi: "पाठ" },
  backJourney: { en: "Back to the journey", hi: "यात्रा पर लौटें" },
  lessonOpen: { en: "Explore lesson", hi: "पाठ पढ़ें" },
  lessonReflect: { en: "Pause & reflect", hi: "रुकें और विचार करें" },
  mainLesson: { en: "The thought", hi: "मुख्य विचार" },
  bigIdea: { en: "The big idea", hi: "मुख्य विचार" },
  whatThisMeans: { en: "What this means", hi: "इसका अर्थ समझें" },
  tryItToday: { en: "Try it today", hi: "आज का छोटा अभ्यास" },
  tryToday: { en: "Try it in your life", hi: "जीवन में आज़माएँ" },
  practiceLabel: { en: "What small step will you take?", hi: "आप क्या छोटा कदम उठाएँगे?" },
  practicePlaceholder: { en: "Write a few words…", hi: "यहाँ लिखें…" },
  exploreMore: {
    en: "Explore more: examples and key points",
    hi: "और जानें: उदाहरण और मुख्य बातें",
  },
  thingsToRemember: { en: "A few things to remember", hi: "ध्यान रखने योग्य बातें" },
  lessonExample: { en: "A moment from everyday life", hi: "रोज़मर्रा का एक उदाहरण" },
  quoteLabel: { en: "A line from the workshop", hi: "प्रोफेसर नवनीत अरोड़ा की सीख" },
  reflectQuestion: { en: "A question to carry with you", hi: "अपने साथ ले जाने वाला एक सवाल" },
  reflectPlaceholder: { en: "Write your reflection…", hi: "अपने विचार लिखें…" },
  saveNote: {
    en: "Your reflection is saved in this browser.",
    hi: "आपका विचार इसी ब्राउज़र में सुरक्षित है।",
  },
  markDone: { en: "Mark this lesson as explored", hi: "इस पाठ को देखा हुआ चिह्नित करें" },
  lessonDone: { en: "Marked as explored", hi: "पाठ देखा गया" },
  moveOn: {
    en: "Move on whenever you feel ready.",
    hi: "जब आप तैयार हों, अगले पाठ पर जाएँ।",
  },
  nextLesson: { en: "Next lesson", hi: "अगला पाठ" },
  toNotebook: { en: "Continue in my notebook", hi: "मेरी कॉपी में आगे बढ़ें" },
  keepThought: { en: "Keep a thought", hi: "सोच को लिखें" },
  keepThoughtBody: {
    en: "Save anything you want to remember in your notebook.",
    hi: "जो बात आपके मन में रह गई, उसे कॉपी में लिख सकते हैं।",
  },
  openNotebook: { en: "Open notebook", hi: "कॉपी खोलें" },
  remember: { en: "Remember", hi: "एक बात याद रखें" },
  notATest: {
    en: "This is not a test. Learn at your own pace.",
    hi: "यह परीक्षा नहीं है। अपनी गति से सीखें।",
  },

  /* Notebook page (/my-better-life/notebook) */
  bookEyebrow: { en: "A personal practice", hi: "एक निजी अभ्यास" },
  bookTitle: { en: "My Better Life notebook", hi: "मेरी बेहतर ज़िंदगी की कॉपी" },
  bookLead: {
    en: "This is not a test or a report card. It is a place to notice what is already good, work on what is not helping, and give your days a direction.",
    hi: "यह परीक्षा या रिपोर्ट कार्ड नहीं है। यह वह जगह है जहाँ आप अपनी अच्छाइयों को पहचानते हैं, जो मदद नहीं कर रहा उस पर काम करते हैं और अपने दिनों को दिशा देते हैं।",
  },
  bookStamp: { en: "A work in progress", hi: "अभी बन रही है" },
  notebookPagesLabel: { en: "Notebook pages", hi: "कॉपी के पन्ने" },
  coverTitle: { en: "The cover", hi: "मुखपृष्ठ" },
  coverNote: {
    en: "This notebook belongs to you. Let it change as you do.",
    hi: "यह कॉपी आपकी है। इसे समय के साथ बदलने दें।",
  },
  pageLabel: { en: "Page", hi: "पन्ना" },
  todayPage: { en: "Today's reflection", hi: "आज का विचार" },
  writeHere: { en: "Write here…", hi: "यहाँ लिखें…" },
  optional: { en: "Optional", hi: "वैकल्पिक" },
  emptyPrompt: {
    en: "Your words will appear here as you write.",
    hi: "आपके लिखते ही आपके शब्द यहाँ दिखाई देंगे।",
  },
  pageSaved: {
    en: "Your page is saved as you type.",
    hi: "लिखते समय आपका पन्ना सुरक्षित हो जाता है।",
  },
  slowlyHonestly: { en: "Slowly, honestly", hi: "धीरे-धीरे, ईमानदारी से" },
  prevPage: { en: "Previous page", hi: "पिछला पन्ना" },
  nextPage: { en: "Next page", hi: "अगला पन्ना" },
  returnToJourney: { en: "Return to journey", hi: "यात्रा पर लौटें" },
  privacy: {
    en: "Your notebook is saved in this browser on this device. There is no cloud account or password. Anyone who uses this browser may be able to open it, so do not enter sensitive personal details.",
    hi: "आपकी कॉपी इसी डिवाइस के ब्राउज़र में सुरक्षित रहती है। यह क्लाउड अकाउंट या पासवर्ड नहीं है। इस ब्राउज़र का उपयोग करने वाला व्यक्ति इसे खोल सकता है, इसलिए संवेदनशील निजी जानकारी न लिखें।",
  },
  reset: { en: "Clear my saved work", hi: "मेरा सहेजा काम मिटाएँ" },
  confirmReset: {
    en: "Clear your notebook, lesson reflections and progress?",
    hi: "क्या अपनी कॉपी, पाठों के विचार और प्रगति मिटा दें?",
  },
  /** Shown inline if localStorage is full or blocked. */
  saveFailed: {
    en: "Could not save on this device",
    hi: "इस डिवाइस पर जगह उपलब्ध नहीं है",
  },
} satisfies Record<string, Bilingual>

export type BetterLifeLabelKey = keyof typeof betterLifeLabels

/* ------------------------------------------------------------------ */
/* Notebook                                                            */
/* ------------------------------------------------------------------ */

/**
 * The cover plus the workshop's seven pages. Field keys are kept from the prototype.
 * Step 5 stores them all under ONE namespaced localStorage key, "btb:better-life:v1",
 * so nothing clashes with the careers page's sessionStorage.
 */
export const notebookPages: NotebookPage[] = [
  {
    page: 0,
    title: { en: "My cover", hi: "मेरा मुखपृष्ठ" },
    description: {
      en: "Make this notebook yours. These details are optional; keep them private if this is a shared device.",
      hi: "इस कॉपी को अपना बनाएँ। ये जानकारियाँ वैकल्पिक हैं; साझा डिवाइस हो तो इन्हें निजी रखें।",
    },
    instrument: {
      kind: "pen",
      label: { en: "Pen · reflection & planning", hi: "पेन · विचार और योजना" },
    },
    fields: [
      { key: "coverName", label: { en: "My name", hi: "मेरा नाम" }, multiline: false },
      { key: "coverSchool", label: { en: "My school", hi: "मेरा विद्यालय" }, multiline: false },
      {
        key: "coverFamily",
        label: { en: "My family (optional)", hi: "मेरा परिवार (वैकल्पिक)" },
        multiline: false,
      },
      {
        key: "coverGoal",
        label: {
          en: "A goal I am exploring",
          hi: "एक लक्ष्य जिस पर मैं विचार कर रहा / रही हूँ",
        },
        multiline: false,
      },
    ],
  },
  {
    page: 1,
    title: { en: "Existing virtues", hi: "वर्तमान गुण" },
    description: {
      en: "Write what you already practise, not what you think you should do. Be specific and honest.",
      hi: "जो आप अभी सच में करते हैं, वही लिखें, वह नहीं जो आपको लगता है कि करना चाहिए। स्पष्ट और ईमानदार रहें।",
    },
    instrument: {
      kind: "pen",
      label: { en: "Pen · qualities to strengthen", hi: "पेन · जिन गुणों को मज़बूत करना है" },
    },
    fields: [
      {
        key: "virtues",
        label: { en: "My real strengths", hi: "मेरे वास्तविक गुण" },
        hint: { en: "One per line works well", hi: "हर पंक्ति में एक गुण लिख सकते हैं" },
        multiline: true,
      },
    ],
  },
  {
    page: 2,
    title: { en: "Shortcomings", hi: "कमियाँ" },
    description: {
      en: "Name behaviours, not your worth. These are things to work on, not labels for who you are.",
      hi: "व्यवहार का नाम लिखें, अपनी कीमत का फैसला नहीं। ये काम करने योग्य बातें हैं, आपकी पहचान के लेबल नहीं।",
    },
    instrument: {
      kind: "pencil",
      label: {
        en: "Pencil · behaviours I can change",
        hi: "पेंसिल · जिन व्यवहारों को बदल सकता / सकती हूँ",
      },
    },
    fields: [
      {
        key: "flaws",
        label: { en: "Behaviours I want to work on", hi: "वे व्यवहार जिन पर काम करना है" },
        hint: {
          en: "Describe the action, not yourself",
          hi: "अपने बारे में नहीं, अपने काम के बारे में लिखें",
        },
        multiline: true,
      },
    ],
  },
  {
    page: 3,
    title: { en: "My life goal", hi: "मेरा जीवन-लक्ष्य" },
    description: {
      en: "Write the kind of person or professional you hope to become. It is okay for this goal to change as you learn.",
      hi: "आप किस तरह के व्यक्ति या पेशेवर बनना चाहते हैं, लिखें। सीखने के साथ लक्ष्य बदलना भी ठीक है।",
    },
    instrument: {
      kind: "pencil-then-pen",
      label: {
        en: "Pencil, then pen · as your goal becomes clear",
        hi: "पहले पेंसिल, फिर पेन · लक्ष्य स्पष्ट होने पर",
      },
    },
    fields: [{ key: "goal", label: { en: "My goal", hi: "मेरा लक्ष्य" }, multiline: true }],
  },
  {
    page: 4,
    title: { en: "My reason & action plan", hi: "मेरा कारण और कार्य-योजना" },
    description: {
      en: "A goal becomes steadier when you know why it matters and what your next steps are.",
      hi: "जब आपको पता हो कि लक्ष्य क्यों महत्वपूर्ण है और अगला कदम क्या है, तो उस पर टिकना आसान होता है।",
    },
    instrument: {
      kind: "pen",
      label: { en: "Pen · reflection & planning", hi: "पेन · विचार और योजना" },
    },
    fields: [
      {
        key: "why",
        label: { en: "Why does this matter to me?", hi: "यह मेरे लिए क्यों महत्वपूर्ण है?" },
        multiline: true,
      },
      {
        key: "action",
        label: {
          en: "Small steps I can take",
          hi: "वे छोटे कदम जो मैं उठा सकता / सकती हूँ",
        },
        multiline: true,
      },
    ],
  },
  {
    page: 5,
    title: { en: "Qualities I need", hi: "मेरे ज़रूरी गुण" },
    description: {
      en: "Look at people you admire. What qualities help them do their work well?",
      hi: "उन लोगों को देखें जिनसे आप प्रेरित होते हैं। उनका काम अच्छा करने में कौन-से गुण मदद करते हैं?",
    },
    instrument: {
      kind: "pen",
      label: { en: "Pen · reflection & planning", hi: "पेन · विचार और योजना" },
    },
    fields: [
      {
        key: "qualities",
        label: {
          en: "Qualities I want to develop",
          hi: "वे गुण जिन्हें मैं विकसित करना चाहता / चाहती हूँ",
        },
        multiline: true,
      },
    ],
  },
  {
    page: 6,
    title: { en: "My interests & hobbies", hi: "मेरी रुचियाँ और शौक" },
    description: {
      en: "Notice your interests without judging them. Which ones support your goal, and which ones take you away from it?",
      hi: "अपनी रुचियों को बिना जज किए देखें। कौन-सी रुचियाँ लक्ष्य में मदद करती हैं और कौन-सी ध्यान हटाती हैं?",
    },
    instrument: {
      kind: "pen",
      label: { en: "Pen · reflection & planning", hi: "पेन · विचार और योजना" },
    },
    fields: [
      {
        key: "support",
        label: { en: "Interests that support me", hi: "वे रुचियाँ जो मेरी मदद करती हैं" },
        multiline: true,
      },
      {
        key: "obstacles",
        label: { en: "Interests that may distract me", hi: "वे रुचियाँ जो ध्यान भटका सकती हैं" },
        multiline: true,
      },
    ],
  },
  {
    page: 7,
    title: { en: "What is today?", hi: "आज क्या है?" },
    description: {
      en: "Today is more than a date. It is an opportunity to improve one thought, word or action.",
      hi: "आज केवल तारीख नहीं है। एक विचार, शब्द या व्यवहार बेहतर करने का अवसर है।",
    },
    instrument: {
      kind: "pen",
      label: { en: "Pen · reflection & planning", hi: "पेन · विचार और योजना" },
    },
    fields: [
      {
        key: "todayIntent",
        label: {
          en: "Today, I want to do a little better by…",
          hi: "आज मैं थोड़ा बेहतर बन सकता / सकती हूँ, अगर…",
        },
        multiline: true,
      },
      {
        key: "todayReflection",
        label: {
          en: "At the end of today, what did I notice?",
          hi: "आज के अंत में मैंने क्या महसूस या सीखा?",
        },
        multiline: true,
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Page metadata (static, so English only)                             */
/* ------------------------------------------------------------------ */

export const betterLifeMeta = {
  intro: {
    title: "My Better Life · मेरी बेहतर ज़िंदगी",
    description:
      "Seven short lessons on learning, attention, habits and goals, with a notebook to write in. In English and Hindi.",
  },
  lesson: (lesson: Lesson): PageMeta => ({
    title: `${lesson.title.en} · My Better Life`,
    description: lesson.question.en,
  }),
  notebook: {
    title: "My notebook · My Better Life",
    description:
      "Write about your strengths, habits and goals. Saved only in this browser, on this device.",
  },
} satisfies {
  intro: PageMeta
  lesson: (lesson: Lesson) => PageMeta
  notebook: PageMeta
}
