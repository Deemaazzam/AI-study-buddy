const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 200, suffix: "+", label: "Satisfied Clients" },
  { value: 108, suffix: "+", label: "Completed Projects" },
  { value: 90, suffix: "%", label: "Client Retention Rate" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Smart Learning Support",
    desc: "Provides personalized study guidance, summaries, and explanations tailored to each student’s needs.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Instant Doubt Solving",
    desc: "Chat with the AI anytime to get quick, clear answers to your academic questions across various subjects.",
  },
  {
    imgPath: "/images/time.png",
    title: "Efficient Time Management",
    desc: "Helps plan your study sessions, set reminders, and stay on track with deadlines using intelligent scheduling.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "React ",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python ",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend ",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Three.js/Spline",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Git",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review:
      "Building the AI Study Buddy has been a journey of deep problem-solving and innovation. From NLP to UI design, we crafted a tool that truly helps students learn faster.",
    imgPath: "/images/exp1.png",
    logoPath: "/images/logo1.png",
    title: "AI Study Buddy – Lead Developer",
    date: "January 2024 – Present",
    responsibilities: [
      "Designed and developed an AI assistant that summarizes lecture notes, chapters, and videos.",
      "Implemented quiz generation using NLP and Bloom’s taxonomy principles to support smart assessment.",
      "Built a React-based frontend with Tailwind UI and seamless animations to enhance usability.",
      "Integrated Python backend (FastAPI) to handle GPT model calls and serve thousands of users efficiently.",
    ],
  },
  {
    review:
      "Collaborating with the education team helped us focus on students’ real struggles. We tested and improved the AI iteratively for better understanding and retention.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Academic Research Coordinator",
    date: "September 2023 – January 2024",
    responsibilities: [
      "Collected and structured datasets from student materials (notes, syllabi, past exams) for model tuning.",
      "Collaborated with domain experts and students to evaluate summary and quiz quality.",
      "Created internal evaluation tools to measure readability, coverage, and depth of generated content.",
    ],
  },
  {
    review:
      "Prior to launch, we built demo modules and tested the AI's performance across various subjects, from biology to computer science.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "AI Prototyping & Testing",
    date: "June 2023 – August 2023",
    responsibilities: [
      "Built and tested early prototypes of the summarizer and quiz generator using OpenAI APIs.",
      "Experimented with various prompt engineering strategies for improved consistency.",
      "Tracked early user behavior and feedback to guide UX/UI and backend improvements.",
    ],
  },
];


const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const testimonials = [
  {
    name: "Layth Nassar",
    mentions: "@layth.student",
    review:
      "I used to spend hours condensing my notes. With the AI Study Buddy, I can now understand key points in minutes. It’s like having a personal tutor who never gets tired.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Dr. Samer Khoury",
    mentions: "@prof.khoury",
    review:
      "The AI Study Buddy has helped my students come to class more prepared. Their questions are sharper, and their retention is visibly better. It’s a game-changer in flipped classrooms.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Maher Kanaan",
    mentions: "@maherK",
    review:
      "What I love most is how fast it works. I paste my slides or notes, and within seconds, I get an accurate summary and a 5-question quiz. It’s saving me so much time during finals.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Ziad Farah",
    mentions: "@ziad.code",
    review:
      "As a developer working on the backend, it was inspiring to see how well the product scaled during launch week. We handled thousands of requests without downtime.",
    imgPath: "/images/client4.png",
  },
  {
    name: "Noor Akl",
    mentions: "@noor.student",
    review:
      "I’m a visual learner, and the tool generates summaries that are structured and clean. The quiz questions are not just random — they help reinforce the main ideas.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Jad Hammoud",
    mentions: "@jad.cs",
    review:
      "Our team relied on solid prompt engineering to make the quiz generation more accurate. What started as a class project became something students now rely on daily.",
    imgPath: "/images/client6.png",
  },
];

const data = [
    {
      question: "Which device is required for the Internet connection?",
      option1: "Modem",
      option2: "Router",
      option3: "LAN Cable",
      option4: "Pen Drive",
      ans: 1,
    },
    {
      question: "Which continent has the highest number of countries?",
      option1: "Asia",
      option2: "Europe",
      option3: "North America",
      option4: "Africa",
      ans: 4,
    },
    {
      question: "Junk e-mail is also called?",
      option1: "Spam",
      option2: "Fake",
      option3: "Archived",
      option4: "Bin",
      ans: 1,
    },
    {
      question: "A computer cannot BOOT if it does not have the?",
      option1: "Application Software",
      option2: "Internet",
      option3: "Operating System",
      option4: "Mouse",
      ans: 3,
    },
    {
      question: "First page of Website is termed as?",
      option1: "Index Page",
      option2: "Homepage",
      option3: "Sitemap",
      option4: "Pen Drive",
      ans: 2,
    },
  ];
const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
  },
  {
    name: "fb",
    imgPath: "/images/fb.png",
  },
  {
    name: "x",
    imgPath: "/images/x.png",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
  data
};
 