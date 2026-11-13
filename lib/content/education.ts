// Education page content: design/v8/boards/Education.dc.html, content.json › educationProgrammes and
// course-stories.json (the two DataCamp tracks, each course with its certificate in public/certificates/courses/).
// Generated from those files; edit them and regenerate rather than hand editing the arrays.
import type { CourseFront, CourseStoryItem } from "@/components/gambit/course-story"

export const INTRO = {
  title: "What I studied.",
  lead: "A computer forensics degree, then three years with ALX, and now the DataCamp tracks into AI and ML. The degree certificate is public. The full transcript is shared on request, for 60 days at a time.",
}

export const PROGRAMMES = {
  heading: "Degree and programmes",
  lead: "Oldest first. The two DataCamp tracks at the end turn over: select the book to play every course in the order I took it.",
}

export const SCHOOLS: CourseFront[] = [
  {
    title: "BSc Computer Forensics Science",
    org: "Jaramogi Oginga Odinga University of Science and Technology",
    dates: "Sep 2020 to Oct 2024",
    result: "Specialised in cybersecurity",
    links: [
      {
        label: "Degree certificate",
        href: "https://drive.google.com/file/d/1Fyb1g3RU_49yOww52MqRHVMlotD_F_L9/view?usp=sharing",
      },
    ],
    groups: [
      {
        name: "Programming & systems",
        items: [
          "Introduction to Programming",
          "System Programming",
          "Systems Analysis & Design",
          "Distributed Components",
          "System Building",
        ],
      },
      {
        name: "Computer systems",
        items: [
          "Computer Architecture",
          "Digital Electronics",
          "Operating Systems",
          "Advanced Linux/Unix Admin",
          "HPC, Virtualisation & Cloud",
          "OS Security",
        ],
      },
      {
        name: "Networks & security",
        items: [
          "TCP/IP Administration",
          "Network Design",
          "Computer & Network Security",
          "Wireless & Mobile",
          "Information Warfare",
          "Emerging Threats & Defences",
          "Biometric Authentication",
        ],
      },
      {
        name: "Forensics & cybercrime",
        items: [
          "Computer Forensics I & II",
          "Forensic Science Lab",
          "Ethical Hacking & Pen Testing",
          "Cybercrime Investigation",
          "Cybercrime & the Law",
        ],
      },
      {
        name: "Security management",
        items: [
          "IT Security Architecture",
          "Security Policy & Compliance",
          "Risk Management",
          "IS Control & Audit",
          "Incident Response",
          "Cryptography & Steganography",
        ],
      },
      {
        name: "Intelligence & data",
        items: [
          "Machine Learning & AI",
          "Intelligent Information Systems",
          "Distributed Computing",
          "Database Administration & Design",
          "Analytical Methods",
        ],
      },
    ],
  },
  {
    title: "ALX Software Engineering",
    org: "ALX Africa, Mastercard Foundation scholarship",
    dates: "Feb 2022 to Feb 2025",
    result: "87.76%, 112.81%",
    links: [
      {
        label: "Certificate",
        href: "https://drive.google.com/file/d/1e0UUNaqJtpvcOBaAJ1R6KU5MtFpKwHhS/view?usp=sharing",
      },
      {
        label: "Foundations transcript",
        href: "https://drive.google.com/file/d/1UM9njUadGWawrhHEFBBEt4lgGzHQkm9l/view?usp=sharing",
      },
      {
        label: "Back end transcript",
        href: "https://drive.google.com/file/d/1cH4FWYGVxQnGfweof00aWErXaHCV2M9I/view?usp=sharing",
      },
    ],
    groups: [
      {
        name: "Foundations, C & systems",
        items: [
          "Pointers & memory",
          "Linked lists, stacks, queues",
          "Hash tables",
          "Binary trees",
          "Sorting & Big O",
          "printf",
          "Simple Shell",
          "Makefiles",
        ],
      },
      {
        name: "Foundations, Python",
        items: ["OOP", "TDD", "Almost a Circle", "ORM", "Network programming"],
      },
      {
        name: "Foundations, web stack & DevOps",
        items: [
          "SQL",
          "AirBnB clone (console → REST API)",
          "Nginx",
          "Load balancer",
          "HTTPS/SSL",
          "Firewalls",
          "Monitoring",
          "Postmortems",
        ],
      },
      {
        name: "Back end specialisation",
        items: [
          "ES6 & TypeScript",
          "Async Python",
          "MySQL advanced",
          "MongoDB",
          "Redis",
          "Caching",
          "Pagination",
          "i18n",
          "PII & GDPR",
          "Session auth",
          "Queues (Bull, Kafka)",
          "Files manager",
        ],
      },
      {
        name: "Algorithms",
        items: ["Pascal’s Triangle", "Lockboxes", "UTF-8 Validation", "N Queens", "Island Perimeter", "Prime Game"],
      },
    ],
  },
  {
    title: "ALX Professional Foundations",
    org: "ALX Africa",
    dates: "May to Aug 2025",
    result: "12 weeks",
    links: [
      {
        label: "Certificate",
        href: "https://drive.google.com/file/d/16VlBXtuOLrIXIHKagBLaKBms13suKB8F/view?usp=sharing",
      },
    ],
    groups: [
      {
        name: "Working well",
        items: ["Self leadership", "Time management", "Agile teams", "Conflict and negotiation", "Peer coaching"],
      },
      {
        name: "Solving problems",
        items: ["Design thinking", "Human centred design", "User interviews", "Wireframes and prototypes", "Writing a PRD"],
      },
      {
        name: "Communicating",
        items: ["Technical writing", "Data storytelling", "Pitching", "Video basics", "Ethics in tech"],
      },
      {
        name: "Career",
        items: ["Personal brand", "Personal website", "CV", "Elevator pitch", "Figma", "Miro"],
      },
    ],
  },
  {
    title: "ALX ProDev Backend",
    org: "ALX Africa, Professional Diploma",
    dates: "Aug to Dec 2025",
    result: "Taken alongside ProDev Frontend",
    links: [
      {
        label: "Certificate",
        href: "https://drive.google.com/file/d/1Ez-h4ARvLdx4Up-1K3V6K4Cemb_EDivp/view?usp=sharing",
      },
    ],
    groups: [
      {
        name: "Python and data",
        items: ["Async Python", "Generators", "Decorators", "Context managers", "Advanced SQL", "Query optimisation"],
      },
      {
        name: "APIs",
        items: ["Django REST Framework", "Serializers", "Seeders", "Django signals", "Advanced ORM"],
      },
      {
        name: "Security",
        items: ["JWT", "Permissions", "Middleware"],
      },
      {
        name: "Delivery",
        items: ["Pytest", "Unit and integration tests", "Docker", "Shell scripting", "Git flow", "CI/CD"],
      },
      {
        name: "Capstone",
        items: ["Project Nexus back end", "One of the highest scores in the cohort"],
      },
    ],
  },
  {
    title: "ALX ProDev Frontend",
    org: "ALX Africa, Professional Diploma",
    dates: "Aug to Dec 2025",
    result: "Taken alongside ProDev Backend",
    links: [
      {
        label: "Certificate",
        href: "https://drive.google.com/file/d/1is5GuLZcnJN5TUmcVOFE3h7Gln-DvuBl/view?usp=sharing",
      },
    ],
    groups: [
      {
        name: "Interfaces",
        items: ["Semantic HTML", "CSS Grid and Flexbox", "Tailwind", "Responsive design", "Accessibility", "SEO"],
      },
      {
        name: "React and Next.js",
        items: ["Next.js", "React", "TypeScript", "Hooks", "Component architecture"],
      },
      {
        name: "State and data",
        items: ["Redux", "Context API", "REST", "GraphQL"],
      },
      {
        name: "Planning",
        items: ["Figma wireframes", "Prototyping", "Project planning"],
      },
      {
        name: "Capstone",
        items: ["Project Nexus front end"],
      },
    ],
  },
  {
    title: "ALX Founder Academy and Freelancer Academy",
    org: "ALX Africa",
    dates: "Oct to Dec 2025",
    result: "Two certificates",
    links: [
      {
        label: "Founder Academy",
        href: "https://drive.google.com/file/d/1TYBCsJgmoNgJI3-RqZoCziH9U1DcUHST/view?usp=sharing",
      },
      {
        label: "Freelancer Academy",
        href: "https://drive.google.com/file/d/1IXzLmaORNV1FFR8Sj47bIFmZ8q6YTcQ4/view?usp=sharing",
      },
    ],
    groups: [
      {
        name: "Founder Academy",
        items: ["Lean Canvas", "Customer discovery"],
      },
      {
        name: "Freelancer Academy",
        items: ["Proposals", "Pricing", "Client communication"],
      },
    ],
  },
]

export const TRACKS: {
  id: string
  front: CourseFront
  stories: CourseStoryItem[]
}[] = [
  {
    id: "associate-ai-engineer",
    front: {
      title: "Associate AI Engineer for Developers",
      org: "DataCamp, career track",
      dates: "24 to 30 Aug 2026",
      result: "10 courses, 29 hours",
      links: [
        {
          label: "Track certificate",
          href: "https://drive.google.com/file/d/1hwtO1PBwQ1Dx-2wGyDWw6puYhVRIpx-Z/view?usp=sharing",
        },
      ],
      groups: [
        {
          name: "LLMs in code",
          items: ["OpenAI API", "Responses API", "Prompt engineering", "Hugging Face"],
        },
        {
          name: "Retrieval and agents",
          items: ["Embeddings", "Pinecone", "LangChain", "RAG", "MCP"],
        },
        {
          name: "Shipping it",
          items: ["LLMOps", "Python modules", "Testing", "Maintainability"],
        },
      ],
    },
    stories: [
      {
        title: "Working with the OpenAI API",
        date: "24 Aug 2026",
        hours: "3 hours",
        about: "The functionality underneath AI products like ChatGPT, called directly from code.",
        chapters: ["Introduction to the OpenAI API", "Prompting OpenAI models", "Building conversations with the OpenAI API"],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/16f5b8f8975617d905acf5d1516a408729135046",
        image: "/certificates/courses/working-with-the-openai-api.jpg",
      },
      {
        title: "Prompt Engineering with the OpenAI API",
        date: "24 Aug 2026",
        hours: "4 hours",
        about: "Principles and patterns for prompting GPT models well, from business tasks to chatbots.",
        chapters: [
          "Prompt engineering best practices",
          "Advanced prompt engineering strategies",
          "Prompt engineering for business applications",
          "Prompt engineering for chatbot development",
        ],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/473a2c2d66696c6d522e133e882d1a7390476bbd",
        image: "/certificates/courses/prompt-engineering-with-the-openai-api.jpg",
      },
      {
        title: "Working with Hugging Face",
        date: "25 Aug 2026",
        hours: "2 hours",
        about: "Finding and running models and datasets from the Hugging Face Hub.",
        chapters: ["Getting started with Hugging Face", "Building pipelines with Hugging Face"],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/1447b80dc72f1859556567d696ac1f884326974b",
        image: "/certificates/courses/working-with-hugging-face.jpg",
      },
      {
        title: "LLMOps Concepts",
        date: "25 Aug 2026",
        hours: "1 hour",
        about: "The life of an LLM application from idea to deployment, and the problems at each stage.",
        chapters: ["Introduction to LLMOps and the ideation phase", "Development phase", "Operational phase"],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/b6751f123a6b5b8e9a966dfdabf5562d50fa7296",
        image: "/certificates/courses/llmops-concepts.jpg",
      },
      {
        title: "Working with the OpenAI Responses API",
        date: "25 Aug 2026",
        hours: "3 hours",
        about: "Building reliable, interactive AI apps with the Responses API and GPT-5.",
        chapters: ["Getting started with the Responses API", "Building tools for LLMs", "Advanced patterns for production"],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/486839704f5e380110d11bf15070b52fcc658343",
        image: "/certificates/courses/working-with-the-openai-responses-api.jpg",
      },
      {
        title: "Introduction to Embeddings with the OpenAI API",
        date: "26 Aug 2026",
        hours: "3 hours",
        about: "Embeddings for semantic search and recommendations, and the vector databases that hold them.",
        chapters: ["What are embeddings?", "Embeddings for AI applications", "Vector databases"],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/aaa167b21c0f6bc4f50d4f59f978a510890951d0",
        image: "/certificates/courses/introduction-to-embeddings-with-the-openai-api.jpg",
      },
      {
        title: "Building AI Applications with Pinecone",
        date: "26 Aug 2026",
        hours: "3 hours",
        about: "Storing, querying and tuning vectors in Pinecone for real AI features.",
        chapters: ["Introduction to Pinecone", "Pinecone vector manipulation in Python", "Performance tuning and AI applications"],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/3e2a1d186f846179940f169479e72788c6b897de",
        image: "/certificates/courses/building-ai-applications-with-pinecone.jpg",
      },
      {
        title: "Software Engineering Principles in Python",
        date: "26 Aug 2026",
        hours: "4 hours",
        about: "Modular, documented and tested Python, so data work is faster and more reliable.",
        chapters: ["Software engineering and data science", "Writing a Python module", "Utilizing classes", "Maintainability"],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/88f3b32ee8ded467c307c0da5a67b1e26b132988",
        image: "/certificates/courses/software-engineering-principles-in-python.jpg",
      },
      {
        title: "Developing LLM Applications with LangChain",
        date: "27 Aug 2026",
        hours: "3 hours",
        about: "Building AI apps from LLMs, prompts, chains and agents, including retrieval.",
        chapters: ["Introduction to LangChain and chatbot mechanics", "Chains and agents", "Retrieval augmented generation (RAG)"],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/8cc690275e5098a38a103128c93fed99cfa34ff6",
        image: "/certificates/courses/developing-llm-applications-with-langchain.jpg",
      },
      {
        title: "Introduction to Model Context Protocol",
        date: "30 Aug 2026",
        hours: "3 hours",
        about: "Connecting AI apps to APIs, databases and files through MCP.",
        chapters: ["The building blocks of MCP", "MCP-enabled LLM applications", "Preparing MCP servers for production"],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/c88f1db44f471cdd124a144e7f0d7cc7a788e2a1",
        image: "/certificates/courses/introduction-to-model-context-protocol-mcp.jpg",
      },
    ],
  },
  {
    id: "machine-learning-engineer",
    front: {
      title: "Machine Learning Engineer",
      org: "DataCamp, career track",
      dates: "1 Oct to 9 Nov 2026",
      result: "12 courses, 43 hours",
      links: [
        {
          label: "Track certificate",
          href: "https://www.datacamp.com/completed/statement-of-accomplishment/track/13caa7481279bc4aff0dcb5697ad2bac1169b302",
        },
      ],
      groups: [
        {
          name: "Models",
          items: ["scikit-learn", "Classification", "Regression", "Pipelines"],
        },
        {
          name: "MLOps",
          items: ["MLflow", "Deployment", "Monitoring", "Drift detection", "CI/CD for ML"],
        },
        {
          name: "Data and tooling",
          items: ["ETL and ELT", "Great Expectations", "DVC", "Docker", "Shell"],
        },
      ],
    },
    stories: [
      {
        title: "Supervised Learning with scikit-learn",
        date: "1 Oct 2026",
        hours: "4 hours",
        about: "Making predictions on real datasets with scikit-learn.",
        chapters: ["Classification", "Regression", "Fine tuning", "Preprocessing and pipelines"],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/30dac48ee1c7b65219d2efeadc640b3f817807d9",
        image: "/certificates/courses/supervised-learning-with-scikit-learn.jpg",
      },
      {
        title: "MLOps Concepts",
        date: "7 Oct 2026",
        hours: "2 hours",
        about: "Taking models from notebooks to production systems that earn their keep.",
        chapters: [
          "Intro to MLOps",
          "Design and development",
          "Deploying machine learning into production",
          "Maintaining machine learning in production",
        ],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/3fa3e90410df9371c15ffa6ec36b2259658fbb4f",
        image: "/certificates/courses/mlops-concepts.jpg",
      },
      {
        title: "Introduction to Shell",
        date: "7 Oct 2026",
        hours: "4 hours",
        about: "Combining command line programs to automate work and run jobs anywhere.",
        chapters: ["Manipulating files and directories", "Manipulating data", "Combining tools", "Batch processing", "Creating new tools"],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/5d44198f4b354ebe3d205e0883ecd2ccb2eaf1bb",
        image: "/certificates/courses/introduction-to-shell.jpg",
      },
      {
        title: "MLOps Deployment and Life Cycling",
        date: "8 Oct 2026",
        hours: "4 hours",
        about: "The modern MLOps framework: how models are deployed and kept alive.",
        chapters: ["MLOps in a nutshell", "Develop for deployment", "Deploy and run", "Monitor and maintain"],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/0f773059b04bd382c676d7f8292c24fa61ceeeae",
        image: "/certificates/courses/mlops-deployment-and-life-cycling.jpg",
      },
      {
        title: "Introduction to MLflow",
        date: "12 Oct 2026",
        hours: "4 hours",
        about: "Tracking, packaging and registering models with MLflow.",
        chapters: ["Introduction to MLflow", "MLflow models", "MLflow model registry", "MLflow projects"],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/00a2457b467d97b4aacb716cc51428272fbbd069",
        image: "/certificates/courses/introduction-to-mlflow.jpg",
      },
      {
        title: "Introduction to Data Versioning with DVC",
        date: "13 Oct 2026",
        hours: "3 hours",
        about: "Versioning data for machine learning, automating pipelines and evaluating models.",
        chapters: ["Introduction to DVC", "DVC configuration and data management", "Pipelines in DVC"],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/7a53f1eac599cdb6695cfdd9e6e15e1086cf12f1",
        image: "/certificates/courses/introduction-to-data-versioning-with-dvc.jpg",
      },
      {
        title: "Monitoring Machine Learning Concepts",
        date: "13 Oct 2026",
        hours: "2 hours",
        about: "Why models degrade in production, from data drift to concept drift, and what to do.",
        chapters: ["What is ML monitoring", "Theoretical concepts of monitoring", "Covariate shift and concept drift detection"],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/5734e05129c17a60ba3cf7ddeb89f3901c265114",
        image: "/certificates/courses/monitoring-machine-learning-concepts.jpg",
      },
      {
        title: "Monitoring Machine Learning in Python",
        date: "14 Oct 2026",
        hours: "3 hours",
        about: "Building a basic monitoring system for a deployed model.",
        chapters: [
          "Data preparation and performance estimation",
          "Monitoring performance and business value",
          "Root cause analysis and issue resolution",
        ],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/492e69ac50687fbb5faa0c7e372d629f77b8eceb",
        image: "/certificates/courses/monitoring-machine-learning-in-python.jpg",
      },
      {
        title: "CI/CD for Machine Learning",
        date: "15 Oct 2026",
        hours: "5 hours",
        about: "Continuous integration and delivery for models with GitHub Actions and DVC.",
        chapters: [
          "Introduction to CI/CD and YAML",
          "GitHub Actions",
          "Continuous integration in machine learning",
          "Comparing training runs and hyperparameter tuning",
        ],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/011890d02cf19a0f4f5b7b338bcf037f95438f83",
        image: "/certificates/courses/ci-cd-for-machine-learning.jpg",
      },
      {
        title: "Introduction to Docker",
        date: "22 Oct 2026",
        hours: "4 hours",
        about: "Containers and images, and why they belong in a data toolkit.",
        chapters: ["Using Docker containers", "Writing your own Docker images", "Creating secure Docker images"],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/b8ca1af3e277e6783ff991c7e0b46364f7c4c27f",
        image: "/certificates/courses/introduction-to-docker.jpg",
      },
      {
        title: "ETL and ELT in Python",
        date: "8 Nov 2026",
        hours: "4 hours",
        about: "Building effective, reliable data pipelines on extract, transform and load principles.",
        chapters: [
          "Introduction to data pipelines",
          "Building ETL pipelines",
          "Advanced ETL techniques",
          "Deploying and maintaining a data pipeline",
        ],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/461678de015334f04715b3d00f88c4b14cc3f1c3",
        image: "/certificates/courses/etl-and-elt-in-python.jpg",
      },
      {
        title: "Introduction to Data Quality with Great Expectations",
        date: "9 Nov 2026",
        hours: "4 hours",
        about: "Keeping data trustworthy in data science and engineering work.",
        chapters: ["Connecting to data", "Establishing expectations", "GX in practice", "All about expectations"],
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/course/9c9a1466faf7a2d61634e46c105114f0c18715e9",
        image: "/certificates/courses/introduction-to-data-quality-with-great-expectations.jpg",
      },
    ],
  },
]

export const LATEST = {
  heading: "Latest",
  lead: "The DataCamp Machine Learning Engineer track, finished on 9 November 2026, ten weeks after the Associate AI Engineer track.",
  primary: { label: "What it means for AI and ML work", href: "/ai-ml" },
  secondary: { label: "All certificates", href: "/certificates" },
}
