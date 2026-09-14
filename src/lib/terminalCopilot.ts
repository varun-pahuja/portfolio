/**
 * Tactical Client-Side AI Copilot Knowledge Engine for the Dropdown Terminal.
 * Provides instant, zero-latency, high-precision answers to recruiters and engineers.
 */

export interface CopilotResponse {
  query: string;
  topic: string;
  confidence: number;
  content: string[];
  suggestedFollowUps?: string[];
}

interface KnowledgeNode {
  topic: string;
  keywords: string[];
  patterns: RegExp[];
  generate: (query: string) => { content: string[]; followUps: string[] };
}

const KNOWLEDGE_BASE: KnowledgeNode[] = [
  // 1. Bio, Education, University
  {
    topic: "Identity & Education",
    keywords: ["who", "varun", "bio", "education", "college", "mits", "gwalior", "degree", "cgpa", "year", "student"],
    patterns: [/who\s+(is|are)/i, /education/i, /college/i, /cgpa/i, /university/i, /degree/i],
    generate: () => ({
      content: [
        "[IDENTITY DOSSIER: VARUN PAHUJA]",
        "• Background: Full-Stack Developer & IoT Embedded Systems Engineer.",
        "• Current Status: 3rd-Year B.Tech in Internet of Things at Madhav Institute of Technology and Science (MITS), Gwalior (2024–2028).",
        "• Academic Standing: Cumulative CGPA 8.06.",
        "• Core Focus: Building low-latency systems where web software meets physical microcontrollers and edge AI.",
        "• Location: Gwalior, Madhya Pradesh, India (Open to remote and relocation).",
      ],
      followUps: ["ask projects", "ask experience", "ask contact"],
    }),
  },

  // 2. Air Mouse AI
  {
    topic: "Air Mouse AI",
    keywords: ["air", "mouse", "esp32", "gesture", "mpu", "imu", "freertos", "ble", "bluetooth", "hardware", "iot"],
    patterns: [/air\s*mouse/i, /gesture/i, /mpu-?6050/i, /freertos/i, /ble\s*hid/i],
    generate: () => ({
      content: [
        "[SYSTEM REPORT: AIR MOUSE AI]",
        "• Overview: Wireless handheld mouse engineered on an ESP32 converting spatial gestures into desktop cursor displacements without a surface.",
        "• Hardware: ESP32 Xtensa Dual-Core 240MHz, MPU-6050 6-DOF IMU, 3.7V LiPo with FreeRTOS light sleep power gating (14+ active hrs).",
        "• Sensor Math: Handled on FreeRTOS Core 0 using Complementary Filters (low-pass accelerometer + high-pass gyroscope) avoiding yaw drift.",
        "• Transmission: Low-latency BLE 5.0 HID report packets tuned to 11.25ms connection interval (imperceptible drag).",
        "• Edge ML: Scikit-learn Random Forest classifier detecting 4 gesture primitives with 94.2% accuracy.",
      ],
      followUps: ["ask syncdoc", "ask oceanembed", "ask webcmd"],
    }),
  },

  // 3. SyncDoc CRDT Engine
  {
    topic: "SyncDoc CRDT Engine",
    keywords: ["syncdoc", "crdt", "yjs", "sync", "collaboration", "conflict", "lamport", "redis", "socket", "editor"],
    patterns: [/syncdoc/i, /crdt/i, /yjs/i, /vector\s*clock/i, /ot\s+vs\s+crdt/i, /conflict/i],
    generate: () => ({
      content: [
        "[SYSTEM REPORT: SYNCDOC CRDT ENGINE]",
        "• Overview: Distributed real-time collaborative document engine with deterministic zero-conflict multi-peer convergence.",
        "• Concurrency Model: Yjs YATA CRDT tree with Lamport vector clocks. Unlike centralized OT (Google Docs), operations merge peer-to-peer deterministically even across split-brain network partitions.",
        "• Backplane: Sharded Redis Pub/Sub cluster routing WebSocket delta broadcasts across horizontal multi-container instances.",
        "• Benchmarks: <12ms global convergence latency, 68.4% payload compression via lib0 variable-length integer encoding, 250+ concurrent peers/room.",
      ],
      followUps: ["ask webcmd", "ask air mouse", "ask experience"],
    }),
  },

  // 4. OceanEmbed Subsurface Ocean Reconstruction
  {
    topic: "OceanEmbed (MoES / INCOIS Hackathon)",
    keywords: ["ocean", "oceanembed", "incois", "moes", "satellite", "temperature", "subsurface", "depth", "transformer", "vit"],
    patterns: [/oceanembed/i, /ocean/i, /incois/i, /subsurface/i, /vit/i, /climate/i],
    generate: () => ({
      content: [
        "[SYSTEM REPORT: OCEANEMBED AI]",
        "• Competition: Ministry of Earth Sciences (MoES) / INCOIS Oceanographic Hackathon.",
        "• Architecture: Hybrid Vision Transformer (ViT) + 3D CNN predicting 3D subsurface thermal columns down to 1,000m depth from 2D satellite surface observations.",
        "• Inputs: Satellite Sea Surface Temperature (SST), Sea Surface Salinity (SSS), and Altimetry (Sea Surface Height Anomalies).",
        "• Performance: Reconstructs 15 distinct bathymetric depth tiers with low Root Mean Square Error (RMSE), outperforming classical empirical ocean models.",
      ],
      followUps: ["ask hackmatrix", "ask air mouse", "ask skills"],
    }),
  },

  // 5. webcmd Browser Infrastructure
  {
    topic: "webcmd Autonomous Agent Browser Engine",
    keywords: ["webcmd", "browser", "agent", "llm", "tokens", "cost", "dom", "hashing", "playwright", "crawler"],
    patterns: [/webcmd/i, /agent\s*browser/i, /token/i, /dom\s*hash/i],
    generate: () => ({
      content: [
        "[SYSTEM REPORT: WEBCMD ENGINE]",
        "• Core Problem: Autonomous AI agents browsing the web burn millions of context tokens repeatedly ingesting redundant DOM boilerplate.",
        "• Solution: High-performance headless browser execution engine that computes AST hashes of accessibility trees and prunes decorative nodes.",
        "• Results: Cuts LLM token expenditure by up to 90% while retaining 100% of interactive selectors (buttons, inputs, links).",
        "• Tech Stack: TypeScript, Node.js, Playwright, AST Tree Hashing, NPM package.",
      ],
      followUps: ["ask syncdoc", "ask hackmatrix", "ask projects"],
    }),
  },

  // 6. Hackmatrix NASA OSDR RAG
  {
    topic: "Hackmatrix (NASA Space Biology RAG)",
    keywords: ["hackmatrix", "nasa", "space", "biology", "rag", "chromadb", "osdr", "groq", "vector"],
    patterns: [/hackmatrix/i, /nasa/i, /space\s*apps/i, /osdr/i, /space\s*biology/i],
    generate: () => ({
      content: [
        "[SYSTEM REPORT: HACKMATRIX NASA RAG]",
        "• Context: NASA SpaceApps Hackathon finalist platform.",
        "• Architecture: Semantic Retrieval-Augmented Generation (RAG) querying 630+ NASA Open Science Data Repository (OSDR) spaceflight biology datasets.",
        "• Pipeline: ChromaDB vector store, HuggingFace multi-qa embeddings, Groq LLM inference for sub-second citation extraction.",
      ],
      followUps: ["ask omnipost", "ask projects", "ask skills"],
    }),
  },

  // 7. Omnipost
  {
    topic: "Omnipost Generative AI Engine",
    keywords: ["omnipost", "content", "gemini", "social", "twitter", "linkedin", "instagram", "generator"],
    patterns: [/omnipost/i, /social\s*media/i, /tone\s*adaptation/i],
    generate: () => ({
      content: [
        "[SYSTEM REPORT: OMNIPOST]",
        "• Function: Multi-platform generative AI engine dynamically morphing a single seed thought across distinct social algorithms.",
        "• Adapters: Twitter/X (punchy, high-engagement threads), LinkedIn (professional, narrative-driven), and Instagram (caption + hashtag tags).",
        "• Tech: React 19, Gemini 1.5 Flash API, Express, Firebase.",
      ],
      followUps: ["ask projects", "ask skills"],
    }),
  },

  // 8. Work Experience & Leadership
  {
    topic: "Work Experience & Roles",
    keywords: ["experience", "job", "intern", "infotact", "thiranex", "ieee", "ias", "work", "role", "company"],
    patterns: [/experience/i, /internship/i, /infotact/i, /thiranex/i, /ieee/i, /work\s*history/i],
    generate: () => ({
      content: [
        "[CAREER DOSSIER: EXPERIENCE & LEADERSHIP]",
        "1. Full Stack Developer Intern — Infotact Solutions (Jan 2026 – Present)",
        "   • Architected scalable Next.js 16 / React frontends and high-throughput Node.js microservices.",
        "   • Tuned MongoDB / Redis cache queries, accelerating page response times by 40%.",
        "2. Cybersecurity Intern — Thiranex (Oct 2025 – Dec 2025)",
        "   • Conducted infrastructure penetration testing and vulnerability auditing.",
        "   • Deployed machine learning threat classification models for automated intrusion alerts.",
        "3. Webmaster Head & Tech Lead — IEEE IAS MITS Chapter (May 2024 – Present)",
        "   • Maintained web platforms serving 1,000+ student members; mentored 50+ junior developers.",
      ],
      followUps: ["ask skills", "ask resume", "ask contact"],
    }),
  },

  // 9. Technical Skills & Languages
  {
    topic: "Technical Stack & Mastery",
    keywords: ["skills", "stack", "tech", "languages", "c++", "typescript", "react", "nextjs", "python", "freertos", "database"],
    patterns: [/skills/i, /tech\s*stack/i, /languages/i, /what\s+can\s+he\s+do/i],
    generate: () => ({
      content: [
        "[TECHNICAL ARSENAL: STACK BREAKDOWN]",
        "• Embedded & IoT: ESP32 (Xtensa), FreeRTOS, Arduino, C/C++, I2C, SPI, UART, BLE 5.0 HID, MQTT.",
        "• Frontend & Creative: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Three.js / R3F, Framer Motion, Web Audio API.",
        "• Backend & Distributed: Node.js, Express, Yjs CRDTs, Redis Pub/Sub, WebSockets, Python, Flask, FastAPI.",
        "• Data & Storage: PostgreSQL, MongoDB, ChromaDB, NetCDF4, NumPy, PyTorch, scikit-learn.",
      ],
      followUps: ["ask projects", "ask experience", "ask resume"],
    }),
  },

  // 10. Hiring, Availability & Opportunities
  {
    topic: "Hiring Availability",
    keywords: ["hire", "available", "job", "hiring", "open", "remote", "fulltime", "internship", "relocate", "opportunity"],
    patterns: [/hire/i, /available/i, /open\s*to\s*work/i, /internship/i, /full-?time/i, /relocate/i],
    generate: () => ({
      content: [
        "[RECRUITMENT STATUS: OPEN FOR OFFERS]",
        "• Target Roles: Full-Stack Engineer, IoT Embedded Systems Developer, Frontend / Creative Systems Engineer.",
        "• Availability: Summer 2026 internships, long-term contractor/consulting, and full-time discussions for 2028 grad.",
        "• Work Modes: Remote (Worldwide), Hybrid, or On-site relocation.",
        "• Contact: varunpahuja2005@gmail.com | +91 7415710476.",
        "• Action: Type 'resume' to download CV or 'exec' to open the 15-second Executive Dossier.",
      ],
      followUps: ["ask contact", "ask resume", "exec"],
    }),
  },

  // 11. Contact & Socials
  {
    topic: "Contact Channels",
    keywords: ["contact", "email", "phone", "linkedin", "github", "reach", "message", "call"],
    patterns: [/contact/i, /email/i, /phone/i, /linkedin/i, /github/i],
    generate: () => ({
      content: [
        "[TRANSMISSION PROTOCOLS: CONTACT]",
        "• Email: varunpahuja2005@gmail.com (Fastest response within 4 hours)",
        "• Phone / WhatsApp: +91 7415710476",
        "• GitHub: https://github.com/varun-pahuja",
        "• LinkedIn: https://www.linkedin.com/in/varun-pahuja475/",
        "• Portfolio: https://varunpahuja04.vercel.app",
      ],
      followUps: ["ask resume", "ask projects"],
    }),
  },
];

export function queryCopilot(rawQuery: string): CopilotResponse {
  const query = rawQuery.trim().toLowerCase();

  if (!query) {
    return {
      query: "",
      topic: "Assistant Guide",
      confidence: 1.0,
      content: [
        "[VARUN-OS AI COPILOT: USAGE GUIDE]",
        "Ask me anything regarding Varun's engineering background, architecture, or skills.",
        "Examples to try:",
        '  • ask "How does Air Mouse AI handle sensor drift?"',
        '  • ask "Why did he pick CRDT over OT in SyncDoc?"',
        '  • ask "What are his core metrics and hackathon wins?"',
        '  • ask "What is his work experience at Infotact?"',
        '  • ask "Is Varun available for hiring?"',
      ],
      suggestedFollowUps: ["ask air mouse", "ask syncdoc", "ask skills", "ask hire"],
    };
  }

  // Score each node based on keyword matches and pattern hits
  let bestMatch: KnowledgeNode | null = null;
  let highestScore = 0;

  for (const node of KNOWLEDGE_BASE) {
    let score = 0;

    // Pattern regex matching
    for (const pat of node.patterns) {
      if (pat.test(query)) {
        score += 5;
      }
    }

    // Keyword matching
    const words = query.split(/[\s,?.!]+/);
    for (const word of words) {
      if (word.length > 2 && node.keywords.includes(word)) {
        score += 2;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = node;
    }
  }

  if (bestMatch && highestScore >= 2) {
    const { content, followUps } = bestMatch.generate(query);
    return {
      query: rawQuery,
      topic: bestMatch.topic,
      confidence: Math.min(0.99, 0.7 + highestScore * 0.05),
      content,
      suggestedFollowUps: followUps,
    };
  }

  // General Fallback synthesis
  return {
    query: rawQuery,
    topic: "General Synthesis",
    confidence: 0.65,
    content: [
      `[AI COPILOT SYNTHESIS FOR: "${rawQuery}"]`,
      "Varun Pahuja is a Full-Stack & IoT Engineer (MITS Gwalior, CGPA 8.06) specialized in ESP32 embedded systems, distributed CRDTs, and high-performance web interfaces.",
      "Key systems built:",
      "  1. Air Mouse AI — ESP32 BLE HID gesture cursor with scikit-learn ML (~94% acc)",
      "  2. SyncDoc — Distributed CRDT collaboration engine with Yjs & Redis",
      "  3. OceanEmbed — Satellite subsurface ocean temperature AI (MoES/INCOIS)",
      "  4. webcmd — Headless browser engine cutting agent tokens by 90%",
      "Type 'help' to see all terminal commands or 'exec' for the Executive Dossier.",
    ],
    suggestedFollowUps: [
      "ask air mouse",
      "ask syncdoc",
      "ask oceanembed",
      "ask experience",
      "ask contact",
    ],
  };
}
