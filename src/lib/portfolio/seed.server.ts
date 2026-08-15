/**
 * Demo / placeholder seed data (server-only).
 *
 * Everything here is CLEARLY marked as demo content so it is obvious that the
 * projects, certificates and achievements are samples, not real records.
 * Run it once from the admin dashboard, then edit or delete the records.
 */
import { db } from "../mongo/mongo.server";
import { slugify } from "./schema";

const DEMO = "[DEMO]";

export const DEMO_PROFILE = {
  name: "[YOUR NAME]",
  title: "BIT Student · Aspiring Full-Stack Developer",
  badge: "BIT Student • Full-Stack Developer • Problem Solver",
  shortBio:
    "Second-year Bachelor of Information Technology student (4th semester) learning to build practical, well-structured software.",
  longBio:
    "I am a BIT student in my 4th semester at [YOUR COLLEGE], affiliated with [YOUR UNIVERSITY]. " +
    "I spend most of my time learning web development, databases and clean application architecture. " +
    "I care about writing code that other people can read, and I try to finish every project I start so that " +
    "I actually understand how the pieces fit together — interface, API, backend and database.\n\n" +
    "My goal for the next two years is to become a dependable junior full-stack developer: comfortable with React on " +
    "the front end, REST APIs and Node-style backends in the middle, and MongoDB or SQL databases underneath.",
  photo: "",
  email: "[YOUR EMAIL]",
  phone: "",
  location: "[YOUR CITY], Nepal",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/in/",
  website: "",
  availability: "Open to internships and student collaborations",
  learning: [
    "React",
    "Node.js",
    "MongoDB",
    "REST APIs",
    "Git & GitHub",
    "UI/UX Design",
    "Cloud & Deployment",
  ],
  statsYears: "2+",
  statsTech: "10+",
  statsProjects: "4",
  experienceNote:
    "Currently building experience through academic projects, personal projects, and continuous learning.",
};

export const DEMO_SETTINGS = {
  siteTitle: "[YOUR NAME] — BIT Student & Full-Stack Developer",
  tagline: "Designed & built with curiosity, code, and continuous learning.",
  heroHeading: "Hi, I'm [YOUR NAME]",
  heroDescription:
    "I build thoughtful digital experiences and practical software solutions while completing my Bachelor of Information Technology.",
  contactEmail: "[YOUR EMAIL]",
  footerText: "Designed & built with curiosity, code, and continuous learning.",
  resumeUrl: "",
  seoTitle: "[YOUR NAME] — BIT Student & Full-Stack Developer Portfolio",
  seoDescription:
    "Portfolio of a Bachelor of Information Technology student building full-stack projects with React, Node-style APIs and MongoDB.",
};

const SKILLS = [
  ["HTML", "Frontend", "Confident", 90],
  ["CSS", "Frontend", "Confident", 85],
  ["JavaScript", "Frontend", "Comfortable", 75],
  ["React", "Frontend", "Comfortable", 70],
  ["Tailwind CSS", "Frontend", "Comfortable", 75],
  ["Node.js", "Backend", "Learning", 55],
  ["Express.js", "Backend", "Learning", 50],
  ["REST APIs", "Backend", "Comfortable", 65],
  ["MongoDB", "Database", "Comfortable", 65],
  ["MySQL", "Database", "Comfortable", 60],
  ["Java", "Programming", "Comfortable", 65],
  ["Python", "Programming", "Comfortable", 60],
  ["C/C++", "Programming", "Familiar", 50],
  ["Git", "Tools", "Comfortable", 70],
  ["GitHub", "Tools", "Comfortable", 75],
  ["VS Code", "Tools", "Confident", 85],
  ["Postman", "Tools", "Comfortable", 65],
  ["UI/UX", "Other", "Learning", 55],
  ["Responsive Design", "Other", "Comfortable", 75],
  ["Problem Solving", "Other", "Comfortable", 70],
] as const;

const PROJECTS = [
  {
    title: `${DEMO} Personal Portfolio Platform`,
    shortDescription:
      "Sample project: a full-stack portfolio with a React front end, REST API and MongoDB-backed admin dashboard.",
    description:
      "A complete portfolio platform where all public content is stored in MongoDB and managed through a protected admin dashboard.",
    problem:
      "Static portfolios need a code change and a redeploy for every small content update, which is slow and error-prone.",
    solution:
      "Move every piece of content into MongoDB and expose it through a REST-style API, with an authenticated dashboard for CRUD.",
    features: [
      "Authenticated admin dashboard",
      "CRUD for projects, skills, education and more",
      "Contact form that stores messages in MongoDB",
      "Dark and light themes",
    ],
    role: "Designed the data model, built the API layer and the React interface.",
    challenges:
      "Keeping validation consistent between the client forms and the server API.",
    learned:
      "How authentication, authorization and data validation fit together in a real application.",
    technologies: [
      "React",
      "TypeScript",
      "MongoDB",
      "REST API",
      "Tailwind CSS",
    ],
    category: "Full Stack",
    featured: true,
    status: "published",
    completionDate: "2026-04",
    order: 1,
  },
  {
    title: `${DEMO} Student Result Management System`,
    shortDescription:
      "Sample project: a Java desktop application that records students, subjects and marks in a relational database.",
    description:
      "A semester project that models students, subjects and marks, calculates grades and prints result summaries.",
    problem: "Manual mark sheets are hard to correct and easy to miscalculate.",
    solution:
      "A small CRUD application with validation and automatic grade calculation.",
    features: [
      "Student CRUD",
      "Subject and marks entry",
      "Automatic grade calculation",
      "Printable result summary",
    ],
    role: "Sole developer for a semester assignment.",
    challenges:
      "Designing normalised tables and handling edge cases in grade boundaries.",
    learned:
      "Relational schema design and separating UI code from data access code.",
    technologies: ["Java", "MySQL", "JDBC"],
    category: "Java",
    featured: true,
    status: "published",
    completionDate: "2025-11",
    order: 2,
  },
  {
    title: `${DEMO} Expense Tracker API`,
    shortDescription:
      "Sample project: a REST API for tracking personal expenses with categories and monthly reports.",
    description:
      "A backend-only exercise focused on clean routing, validation and aggregation queries over expense data.",
    problem:
      "I wanted to understand how a real API is structured beyond simple CRUD.",
    solution:
      "Layered the code into routes, controllers, services and models, with aggregation for monthly reports.",
    features: [
      "Category CRUD",
      "Expense CRUD",
      "Monthly aggregation report",
      "Input validation",
    ],
    role: "Backend developer.",
    challenges:
      "Writing aggregation pipelines that group by month and category.",
    learned: "Aggregation pipelines and why layered backend structure matters.",
    technologies: ["Node.js", "Express.js", "MongoDB", "REST API"],
    category: "Database",
    featured: true,
    status: "published",
    completionDate: "2026-01",
    order: 3,
  },
  {
    title: `${DEMO} Campus Notice Board`,
    shortDescription:
      "Sample project: a responsive notice board where college notices can be published, filtered and searched.",
    description:
      "A small React application practising component composition, filtering and accessible UI patterns.",
    problem: "Printed notice boards are easy to miss and impossible to search.",
    solution:
      "A responsive web notice board with categories, search and clear empty states.",
    features: [
      "Search and filter",
      "Category tabs",
      "Accessible keyboard navigation",
      "Mobile-first layout",
    ],
    role: "Front-end developer.",
    challenges:
      "Keeping the filter state readable while covering many combinations.",
    learned: "Component composition and accessibility basics.",
    technologies: ["React", "Tailwind CSS", "JavaScript"],
    category: "Web Development",
    featured: false,
    status: "published",
    completionDate: "2025-08",
    order: 4,
  },
];

export async function seedDemoData(): Promise<Record<string, number>> {
  const result: Record<string, number> = {};

  await db.upsertOne(
    "profile",
    { key: "main" },
    { key: "main", ...DEMO_PROFILE },
  );
  await db.upsertOne(
    "siteSettings",
    { key: "main" },
    { key: "main", ...DEMO_SETTINGS },
  );
  result["profile"] = 1;
  result["siteSettings"] = 1;

  if ((await db.count("skills")) === 0) {
    result["skills"] = await db.insertMany(
      "skills",
      SKILLS.map(([name, category, level, percentage], i) => ({
        name,
        category,
        level,
        percentage,
        icon: "",
        order: i + 1,
      })),
    );
  }

  if ((await db.count("projects")) === 0) {
    result["projects"] = await db.insertMany(
      "projects",
      PROJECTS.map((p) => ({
        ...p,
        slug: slugify(p.title.replace(DEMO, "demo")),
        image: "",
        gallery: [],
        githubUrl: "https://github.com/",
        liveUrl: "",
        demo: true,
      })),
    );
  }

  if ((await db.count("education")) === 0) {
    result["education"] = await db.insertMany("education", [
      {
        degree: "Bachelor of Information Technology (BIT)",
        institution: "[YOUR COLLEGE]",
        university: "[YOUR UNIVERSITY]",
        field: "Information Technology",
        startYear: "2024",
        endYear: "",
        current: true,
        grade: "",
        location: "[YOUR CITY]",
        description:
          "Currently in the 4th semester. Coursework includes programming, data structures, database management systems, web technologies and software engineering.",
        order: 1,
      },
      {
        degree: "Higher Secondary Education (+2), Science",
        institution: "[YOUR SCHOOL]",
        university: "",
        field: "Science / Computer Science",
        startYear: "2022",
        endYear: "2024",
        current: false,
        grade: "",
        location: "[YOUR CITY]",
        description: "Introduced to programming fundamentals and mathematics.",
        order: 2,
      },
    ]);
  }

  if ((await db.count("experience")) === 0) {
    result["experience"] = await db.insertMany("experience", [
      {
        position: `${DEMO} Full-Stack Academic Project`,
        organization: "[YOUR COLLEGE]",
        type: "Academic Project",
        startDate: "2026-01",
        endDate: "",
        current: true,
        location: "[YOUR CITY]",
        description:
          "Sample record. Building a full-stack portfolio platform as a semester project, covering React, REST APIs, authentication and MongoDB.",
        technologies: ["React", "MongoDB", "REST API"],
        order: 1,
      },
    ]);
  }

  if ((await db.count("certifications")) === 0) {
    result["certifications"] = await db.insertMany("certifications", [
      {
        name: `${DEMO} Responsive Web Design`,
        organization: "[ISSUING ORGANIZATION]",
        issueDate: "2025-06",
        expiryDate: "",
        credentialId: "DEMO-0001",
        credentialUrl: "https://example.com/",
        image: "",
        description:
          "Sample certificate record — replace it with your own certificate from the admin dashboard.",
        order: 1,
      },
    ]);
  }

  if ((await db.count("achievements")) === 0) {
    result["achievements"] = await db.insertMany("achievements", [
      {
        title: `${DEMO} Inter-College Coding Contest — Participant`,
        organization: "[ORGANIZER]",
        category: "Competition",
        date: "2025-09",
        description:
          "Sample achievement record. Replace or delete it from the admin dashboard.",
        image: "",
        url: "",
        order: 1,
      },
    ]);
  }

  if ((await db.count("services")) === 0) {
    result["services"] = await db.insertMany("services", [
      {
        title: "Web Development",
        description:
          "Building responsive, accessible websites with HTML, CSS, JavaScript and React.",
        icon: "Globe",
        order: 1,
      },
      {
        title: "Full-Stack Development",
        description:
          "Learning to connect React interfaces to REST APIs and databases so an application works end to end.",
        icon: "Layers",
        order: 2,
      },
      {
        title: "Database Development",
        description:
          "Designing and querying MongoDB and MySQL databases for academic and personal projects.",
        icon: "Database",
        order: 3,
      },
      {
        title: "UI Implementation",
        description:
          "Turning designs into responsive, component-based React interfaces.",
        icon: "PenTool",
        order: 4,
      },
    ]);
  }

  if ((await db.count("socialLinks")) === 0) {
    result["socialLinks"] = await db.insertMany("socialLinks", [
      { label: "GitHub", url: "https://github.com/", icon: "Github", order: 1 },
      {
        label: "LinkedIn",
        url: "https://linkedin.com/in/",
        icon: "Linkedin",
        order: 2,
      },
    ]);
  }

  return result;
}
