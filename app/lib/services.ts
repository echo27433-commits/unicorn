export type Service = {
  slug: string;
  category: string;
  title: string;
  accent: string;
  description: string;
  overview: string;
  detail: string;
  stat: string;
  statLabel: string;
  image: string;
  gallery: string[];
  industries: string[];
  whoFor: string[];
  capabilities: string[];
  outcomes: string[];
  deliverables: string[];
  useCases: { title: string; detail: string }[];
  process: { step: string; title: string; detail: string }[];
  faqs: { q: string; a: string }[];
};

const imgs = [
  "/blogs/b1.webp",
  "/blogs/b2.webp",
  "/blogs/b3.jpg",
  "/blogs/b4.jpg",
  "/blogs/b5.jpg",
  "/blogs/b6.jpg",
  "/servies/soe.webp",
  "/image_1.webp",
  "/case.png",
  "/review1.jpg",
];

export const services: Service[] = [
  {
    slug: "computer-vision",
    category: "AI & Data Intelligence",
    title: "Computer Vision",
    accent: "Vision",
    description:
      "See what matters in real time — shelf intelligence, shopper analytics, and operational visibility powered by visual AI.",
    overview:
      "We design and deploy computer vision systems that turn cameras into operational intelligence — detecting product gaps, measuring shopper behavior, and surfacing exceptions before they cost revenue.",
    detail:
      "Our vision stack is built for noisy real-world environments: variable lighting, partial occlusions, and multi-camera retail floors. Models are trained on your assortment and layout, then deployed with monitoring so accuracy stays production-grade as products and planograms change.",
    stat: "01",
    statLabel: "/capability",
    image: imgs[0],
    gallery: [imgs[1], imgs[2]],
    industries: ["Retail", "Grocery", "QSR", "Logistics"],
    whoFor: [
      "Retail operators chasing OOS and planogram compliance",
      "Ops leaders who need live floor visibility",
      "Digital teams integrating vision into loyalty and Echo",
    ],
    capabilities: [
      "Shelf gap & planogram detection",
      "People counting & zone analytics",
      "Queue and dwell measurement",
      "Edge inference with cloud sync",
      "Exception alerts to store ops",
      "API hooks into POS and inventory",
    ],
    outcomes: [
      "Real-time shelf and inventory visibility",
      "Shopper journey and dwell analytics",
      "Lower out-of-stock and shrink impact",
      "Faster store-level exception handling",
    ],
    deliverables: [
      "Vision model training & deployment",
      "Edge / cloud inference pipelines",
      "Operations dashboards & alerts",
      "Integration with store systems",
      "Runbooks and ops enablement",
    ],
    useCases: [
      {
        title: "Shelf intelligence",
        detail:
          "Detect voids, facings, and incorrect placement so replenishment happens before shoppers leave empty-handed.",
      },
      {
        title: "Shopper analytics",
        detail:
          "Understand pathing, dwell, and conversion zones to inform layout, staffing, and promotions.",
      },
      {
        title: "Ops exception routing",
        detail:
          "Push prioritized alerts to store managers with image evidence and recommended action.",
      },
    ],
    process: [
      { step: "01", title: "Discover", detail: "Map camera coverage, use cases, and success metrics with stakeholders." },
      { step: "02", title: "Prototype", detail: "Train models on your environment and validate accuracy in live conditions." },
      { step: "03", title: "Scale", detail: "Roll out inference, monitoring, and ops workflows across locations." },
    ],
    faqs: [
      {
        q: "Do we need new cameras?",
        a: "Often existing CCTV works. We assess coverage, resolution, and angles before recommending hardware changes.",
      },
      {
        q: "How is privacy handled?",
        a: "We design for policy compliance — anonymization, retention limits, and role-based access to visual evidence.",
      },
      {
        q: "How long to first value?",
        a: "A focused pilot can surface shelf and traffic signals in weeks; multi-site rollout follows after accuracy thresholds are met.",
      },
    ],
  },
  {
    slug: "ai-analytics",
    category: "AI & Data Intelligence",
    title: "AI Analytics",
    accent: "Analytics",
    description:
      "Turn raw signals into clear decisions with models that surface patterns, anomalies, and opportunities leadership can act on.",
    overview:
      "From fragmented data sources to executive-ready insight — we build analytics layers that explain what happened, why it happened, and what to do next.",
    detail:
      "We connect transactional, digital, and operational data into models that highlight drivers, not just dashboards. Insights are packaged for the forums where decisions happen — weekly reviews, alerts, and product workflows — so analytics become habitual, not optional.",
    stat: "02",
    statLabel: "/capability",
    image: imgs[1],
    gallery: [imgs[3], imgs[4]],
    industries: ["Retail", "Consumer brands", "Hospitality", "Telco"],
    whoFor: [
      "Leadership teams drowning in reports",
      "Data squads needing decision-grade models",
      "Operators who need anomaly alerts that matter",
    ],
    capabilities: [
      "Cross-source metric unification",
      "Driver and contribution analysis",
      "Anomaly & outlier detection",
      "Cohort and funnel modeling",
      "Narrative insight summaries",
      "Alerting into Slack / email / CRM",
    ],
    outcomes: [
      "Faster decision cycles for leadership",
      "Anomaly detection before issues escalate",
      "Shared KPI language across teams",
      "Less time spent reconciling numbers",
    ],
    deliverables: [
      "Data model & metric definitions",
      "ML insight models",
      "Exploration & reporting layers",
      "Governance and access controls",
      "Decision playbooks",
    ],
    useCases: [
      {
        title: "Executive weekly pack",
        detail: "Automated narratives that explain KPI movement with drivers and recommended focus areas.",
      },
      {
        title: "Store / channel anomalies",
        detail: "Flag unusual sales, traffic, or conversion patterns with context for ops to act same day.",
      },
      {
        title: "Campaign post-mortems",
        detail: "Attribute lift and diagnose underperformance across creative, audience, and offer.",
      },
    ],
    process: [
      { step: "01", title: "Align", detail: "Define decisions, KPIs, and data owners before models are built." },
      { step: "02", title: "Model", detail: "Connect sources, clean signals, and ship analytics that explain outcomes." },
      { step: "03", title: "Operationalize", detail: "Embed insights into weekly rituals, alerts, and product workflows." },
    ],
    faqs: [
      {
        q: "What data do you need?",
        a: "Typically sales, traffic, CRM, and marketing signals. We start with what you have and expand the model over time.",
      },
      {
        q: "Will this replace our BI tool?",
        a: "No — we often sit on top of existing BI, adding explanatory models and decision workflows.",
      },
    ],
  },
  {
    slug: "predictive-insights",
    category: "AI & Data Intelligence",
    title: "Predictive Insights",
    accent: "Insights",
    description:
      "Anticipate demand, churn, and performance before they happen — so teams plan with confidence, not hindsight.",
    overview:
      "Predictive systems that forecast demand, identify at-risk customers, and prioritize interventions with measurable ROI.",
    detail:
      "Predictions only matter when they change action. We design scores, thresholds, and playbooks so marketing, loyalty, and ops teams know exactly who to contact, what to offer, and when — then close the loop by measuring lift.",
    stat: "03",
    statLabel: "/capability",
    image: imgs[2],
    gallery: [imgs[0], imgs[5]],
    industries: ["Retail", "Loyalty-led brands", "E-commerce", "Financial services"],
    whoFor: [
      "CRM and loyalty teams fighting churn",
      "Merchandisers planning demand",
      "Growth teams prioritizing interventions",
    ],
    capabilities: [
      "Demand & inventory forecasting",
      "Churn and propensity scoring",
      "Next-best-action recommendations",
      "Seasonality & promotion models",
      "Score freshness monitoring",
      "CRM / CDP activation",
    ],
    outcomes: [
      "Earlier churn and demand signals",
      "Smarter inventory and campaign timing",
      "Intervention playbooks tied to score",
      "Measurable lift from model-driven actions",
    ],
    deliverables: [
      "Forecasting & propensity models",
      "Scoring pipelines",
      "Action recommendations",
      "Performance feedback loops",
      "Model monitoring dashboards",
    ],
    useCases: [
      {
        title: "Churn saves",
        detail: "Identify at-risk members early and trigger retention journeys with the right incentive.",
      },
      {
        title: "Demand planning",
        detail: "Forecast category and SKU demand to reduce overstock and stockouts around promotions.",
      },
      {
        title: "Offer propensity",
        detail: "Rank who is most likely to respond so budgets concentrate on high-probability outcomes.",
      },
    ],
    process: [
      { step: "01", title: "Frame", detail: "Select prediction targets with clear business value and data readiness." },
      { step: "02", title: "Train", detail: "Build, validate, and calibrate models against historical outcomes." },
      { step: "03", title: "Activate", detail: "Push scores into CRM, loyalty, and ops systems with monitoring." },
    ],
    faqs: [
      {
        q: "How accurate do models need to be?",
        a: "We set accuracy thresholds against business ROI — a model that is “good enough” to beat current baselines ships, then improves.",
      },
      {
        q: "Can this connect to Echo?",
        a: "Yes. Scores and recommendations can power Echo journeys, segments, and operational triggers.",
      },
    ],
  },
  {
    slug: "dashboarding",
    category: "AI & Data Intelligence",
    title: "Dashboarding",
    accent: "Dashboarding",
    description:
      "Executive-ready views that put the right metrics in front of the right people — live, clear, and decision-ready.",
    overview:
      "Purpose-built dashboards for operators and executives — not vanity charts. Clear hierarchy, trusted numbers, and refresh cadences that match how you work.",
    detail:
      "Every dashboard starts from a decision map: who needs what, how often, and what action follows. We design for glanceability on the floor and depth for analysts — with ownership so metrics stay trusted after launch.",
    stat: "04",
    statLabel: "/capability",
    image: imgs[3],
    gallery: [imgs[6], imgs[1]],
    industries: ["Retail ops", "Enterprise leadership", "Franchise networks"],
    whoFor: [
      "Executives who want a trusted weekly view",
      "Store ops needing live floor KPIs",
      "Teams tired of spreadsheet assembly",
    ],
    capabilities: [
      "Role-based dashboard design",
      "Live / near-real-time refresh",
      "Drill-downs and filter systems",
      "Mobile-ready ops views",
      "Subscriptions and alerts",
      "Metric definitions documented",
    ],
    outcomes: [
      "One source of truth for KPIs",
      "Less time assembling reports",
      "Faster cross-team alignment",
      "Clear ownership of every metric",
    ],
    deliverables: [
      "Role-based dashboard suite",
      "Live data connections",
      "Alerting & subscriptions",
      "Documentation & enablement",
      "Handover to internal owners",
    ],
    useCases: [
      {
        title: "CEO weekly scorecard",
        detail: "A single view of growth, margin, and operational health with exception callouts.",
      },
      {
        title: "Store manager board",
        detail: "Today’s sales, traffic, labour, and exceptions — designed for the floor, not the boardroom.",
      },
      {
        title: "Campaign war room",
        detail: "Live media, conversion, and inventory views during major promotional moments.",
      },
    ],
    process: [
      { step: "01", title: "Map", detail: "Interview stakeholders and rank the decisions each dashboard must unlock." },
      { step: "02", title: "Design", detail: "Structure layouts, metrics, and drill-downs for clarity at a glance." },
      { step: "03", title: "Launch", detail: "Ship live dashboards with ownership, refresh SLAs, and training." },
    ],
    faqs: [
      {
        q: "Which BI tools do you support?",
        a: "We work across common stacks (Power BI, Looker, Tableau, custom) and choose based on your ecosystem.",
      },
      {
        q: "How do you keep numbers trusted?",
        a: "Metric definitions, data freshness SLAs, and a named owner for each dashboard.",
      },
    ],
  },
  {
    slug: "business-intelligence",
    category: "AI & Data Intelligence",
    title: "Business Intelligence",
    accent: "Intelligence",
    description:
      "Connect data across systems into a single source of truth that drives strategy, reporting, and measurable outcomes.",
    overview:
      "We modernize BI foundations — warehouse modeling, semantic layers, and governance — so reporting scales without becoming a bottleneck.",
    detail:
      "Fragmented spreadsheets and conflicting reports slow decisions. We build the warehouse models, semantic metrics, and access patterns that let teams self-serve without breaking trust — with quality monitors that catch issues before leadership does.",
    stat: "05",
    statLabel: "/capability",
    image: imgs[4],
    gallery: [imgs[2], imgs[7]],
    industries: ["Enterprise retail", "Holding groups", "Multi-brand operators"],
    whoFor: [
      "Teams with conflicting KPI definitions",
      "Leaders scaling reporting across brands",
      "Data platforms ready for a semantic layer",
    ],
    capabilities: [
      "Warehouse / lakehouse modeling",
      "Semantic metric layers",
      "Lineage and documentation",
      "Access & row-level security",
      "Data quality monitors",
      "Self-serve enablement",
    ],
    outcomes: [
      "Trusted enterprise reporting",
      "Reduced manual reconciliation",
      "Scalable self-serve analytics",
      "Faster onboarding of new data sources",
    ],
    deliverables: [
      "Warehouse / lakehouse models",
      "Semantic metric layer",
      "BI tool implementation",
      "Data quality monitoring",
      "Governance playbooks",
    ],
    useCases: [
      {
        title: "Unified retail metrics",
        detail: "One definition of sales, margin, and traffic across regions, banners, and channels.",
      },
      {
        title: "Self-serve for marketers",
        detail: "Governed datasets that let campaign teams explore without waiting on analysts.",
      },
      {
        title: "M&A reporting integration",
        detail: "Bring acquired brands onto shared models without months of spreadsheet chaos.",
      },
    ],
    process: [
      { step: "01", title: "Assess", detail: "Audit sources, lineage gaps, and reporting pain points." },
      { step: "02", title: "Build", detail: "Stand up models, metrics, and controlled access patterns." },
      { step: "03", title: "Embed", detail: "Roll out BI to teams with training and change management." },
    ],
    faqs: [
      {
        q: "Do you migrate legacy warehouses?",
        a: "Yes — we modernize in place or migrate to lakehouse patterns depending on scale and cost.",
      },
      {
        q: "How long is a typical foundation phase?",
        a: "Core models and a pilot semantic layer often land in 8–12 weeks; enterprise rollout continues iteratively.",
      },
    ],
  },
  {
    slug: "seo",
    category: "Digital Growth",
    title: "SEO",
    accent: "SEO",
    description:
      "Technical foundations, content strategy, and authority building that compound organic visibility over time.",
    overview:
      "SEO programs engineered for durable growth — technical health, content systems, and authority that compound instead of chasing short-term rank spikes.",
    detail:
      "We treat SEO as a product system: crawl health, information architecture, content that matches demand, and measurement that ties organic sessions to revenue — not vanity rankings alone.",
    stat: "01",
    statLabel: "/capability",
    image: imgs[5],
    gallery: [imgs[8], imgs[3]],
    industries: ["Retail", "E-commerce", "Publishing", "Local multi-site"],
    whoFor: [
      "Brands over-reliant on paid acquisition",
      "Content teams without a demand map",
      "Sites with technical SEO debt",
    ],
    capabilities: [
      "Technical SEO audits & remediation",
      "IA and internal linking systems",
      "Keyword & content architecture",
      "Schema and on-page systems",
      "Authority building programs",
      "Organic → revenue reporting",
    ],
    outcomes: [
      "Stronger organic acquisition",
      "Healthier technical SEO baselines",
      "Content that maps to demand",
      "Compounding visibility over quarters",
    ],
    deliverables: [
      "Technical SEO audits & fixes",
      "Keyword & content architecture",
      "On-page and schema systems",
      "Authority & performance reporting",
      "Editorial playbooks",
    ],
    useCases: [
      {
        title: "Category demand capture",
        detail: "Build pages and content clusters that win commercial intent for priority categories.",
      },
      {
        title: "Technical remediations",
        detail: "Fix crawl, indexation, and Core Web Vitals issues blocking organic growth.",
      },
      {
        title: "Local / multi-store SEO",
        detail: "Scale location pages and entity signals without thin duplicate content.",
      },
    ],
    process: [
      { step: "01", title: "Audit", detail: "Benchmark technical, content, and competitive gaps." },
      { step: "02", title: "Systemize", detail: "Ship fix roadmaps and scalable content frameworks." },
      { step: "03", title: "Compound", detail: "Iterate on rankings, CTR, and conversion from organic." },
    ],
    faqs: [
      {
        q: "How soon will we see results?",
        a: "Technical wins can appear in weeks; content and authority compounds over months. We set stage-gated KPIs.",
      },
      {
        q: "Do you write content?",
        a: "Yes — either directly or with your team using our briefs, voice systems, and AI-assisted workflows.",
      },
    ],
  },
  {
    slug: "performance-marketing",
    category: "Digital Growth",
    title: "Performance Marketing",
    accent: "Marketing",
    description:
      "Paid channels engineered for efficiency — creative tests, bidding systems, and attribution that prove ROI.",
    overview:
      "Full-funnel paid media with creative testing rigor and measurement that leadership trusts — efficiency first, scale second.",
    detail:
      "We rebuild paid systems around incrementality and creative learning. Structure, tracking, and tests come before budget scale — so every dollar pushed has a clear hypothesis and a readout leadership can trust.",
    stat: "02",
    statLabel: "/capability",
    image: imgs[6],
    gallery: [imgs[9], imgs[4]],
    industries: ["Retail", "D2C", "QSR", "App / loyalty"],
    whoFor: [
      "Teams with rising CAC and unclear attribution",
      "Brands scaling paid without creative systems",
      "Leaders who need weekly ROI clarity",
    ],
    capabilities: [
      "Meta / Google / programmatic ops",
      "Creative testing frameworks",
      "Bidding & budget systems",
      "Landing & offer alignment",
      "Attribution & MMM-ready tracking",
      "Weekly efficiency reviews",
    ],
    outcomes: [
      "Lower cost per acquisition",
      "Clearer channel attribution",
      "Creative insights that transfer",
      "Scalable spend without chaos",
    ],
    deliverables: [
      "Channel strategy & media plans",
      "Creative testing systems",
      "Bidding & budget frameworks",
      "Attribution & weekly reporting",
      "Creative learning libraries",
    ],
    useCases: [
      {
        title: "Efficiency reset",
        detail: "Cut wasted spend, fix tracking, and rebuild campaigns around proven conversion paths.",
      },
      {
        title: "Creative velocity",
        detail: "Stand up a testing cadence so winners emerge weekly instead of quarterly.",
      },
      {
        title: "Promo event scale",
        detail: "War-room paid support for major retail moments with live budget and creative pivots.",
      },
    ],
    process: [
      { step: "01", title: "Diagnose", detail: "Review funnels, creatives, and wasted spend opportunities." },
      { step: "02", title: "Rebuild", detail: "Restructure campaigns, tracking, and testing cadence." },
      { step: "03", title: "Scale", detail: "Grow winners carefully while protecting efficiency." },
    ],
    faqs: [
      {
        q: "Which channels do you run?",
        a: "Primarily Meta and Google, with programmatic and other channels when they fit the funnel.",
      },
      {
        q: "How do you measure success?",
        a: "Primary KPIs agree with finance — CAC, MER, incremental revenue — not vanity platform metrics alone.",
      },
    ],
  },
  {
    slug: "social-media-strategy",
    category: "Digital Growth",
    title: "Social Media Strategy",
    accent: "Strategy",
    description:
      "Platform-native narratives and community systems that turn attention into trust, pipeline, and brand equity.",
    overview:
      "Social is not a posting calendar — we build narratives, formats, and community loops that earn attention and convert it into brand equity and pipeline.",
    detail:
      "Each platform gets a role: awareness, community, or conversion. We design pillars, formats, and response systems so social feels native to the channel — and measurable against brand and commercial goals.",
    stat: "03",
    statLabel: "/capability",
    image: imgs[7],
    gallery: [imgs[0], imgs[8]],
    industries: ["Consumer brands", "Retail", "Hospitality", "Lifestyle"],
    whoFor: [
      "Brands posting without a narrative system",
      "Teams needing social-to-pipeline clarity",
      "Community managers scaling engagement",
    ],
    capabilities: [
      "Channel roles & narrative pillars",
      "Format systems by platform",
      "Community & response playbooks",
      "Creator / UGC programs",
      "Social listening loops",
      "Brand + pipeline reporting",
    ],
    outcomes: [
      "Consistent brand presence",
      "Higher engagement quality",
      "Social that supports pipeline",
      "Clearer creative learning across teams",
    ],
    deliverables: [
      "Channel strategy & pillars",
      "Content systems & calendars",
      "Community playbooks",
      "Creative direction & reporting",
      "Crisis / response guidelines",
    ],
    useCases: [
      {
        title: "Always-on brand system",
        detail: "Pillars and formats that keep feeds distinctive without burnout.",
      },
      {
        title: "Launch storytelling",
        detail: "Narrative arcs and assets that carry a product or campaign across platforms.",
      },
      {
        title: "Community-to-CRM",
        detail: "Routes attention into loyalty, Echo, or owned channels with clear CTAs.",
      },
    ],
    process: [
      { step: "01", title: "Position", detail: "Define audience, voice, and platform roles." },
      { step: "02", title: "Produce", detail: "Stand up formats, cadences, and creative pipelines." },
      { step: "03", title: "Grow", detail: "Optimize for engagement quality and business outcomes." },
    ],
    faqs: [
      {
        q: "Do you manage daily posting?",
        a: "We can operate or enable — strategy and systems first, then managed execution if you want it.",
      },
      {
        q: "Which platforms?",
        a: "We prioritize where your audience already is — typically Instagram, TikTok, LinkedIn, and YouTube Shorts for growth brands.",
      },
    ],
  },
  {
    slug: "ai-content-creation",
    category: "Digital Growth",
    title: "AI Content Creation",
    accent: "Creation",
    description:
      "Human-led, AI-accelerated content engines that scale quality output without losing brand voice.",
    overview:
      "We combine editorial judgment with AI acceleration — producing on-brand content systems that ship more without sounding generic.",
    detail:
      "Speed without standards creates brand risk. We codify voice, claims, and QA into systems so AI accelerates draft and variant work while humans own judgment, taste, and final approval.",
    stat: "04",
    statLabel: "/capability",
    image: imgs[8],
    gallery: [imgs[5], imgs[1]],
    industries: ["Retail media", "Publishers", "Agencies", "Product marketing"],
    whoFor: [
      "Teams bottlenecked on content volume",
      "Brands worried AI sounds generic",
      "Campaign orgs that need faster variants",
    ],
    capabilities: [
      "Brand voice & prompt systems",
      "Editorial QA frameworks",
      "Campaign asset packs",
      "SEO content at scale",
      "Localization workflows",
      "Internal team enablement",
    ],
    outcomes: [
      "Higher content throughput",
      "Consistent brand voice at scale",
      "Faster campaign production cycles",
      "Lower cost per asset without quality drop",
    ],
    deliverables: [
      "Brand voice & prompt systems",
      "Content workflows & QA",
      "Campaign & SEO content packs",
      "Enablement for internal teams",
      "Style and claims libraries",
    ],
    useCases: [
      {
        title: "Campaign variant engines",
        detail: "Generate on-brand ad and landing variants for testing without rewriting from scratch.",
      },
      {
        title: "SEO content systems",
        detail: "Brief-to-publish pipelines that keep articles structured, accurate, and brand-safe.",
      },
      {
        title: "Internal enablement",
        detail: "Train teams to use AI tools inside your voice system — not as a free-for-all.",
      },
    ],
    process: [
      { step: "01", title: "Codify", detail: "Capture voice, claims, and approval rules in reusable systems." },
      { step: "02", title: "Accelerate", detail: "Deploy AI-assisted production with human editorial control." },
      { step: "03", title: "Improve", detail: "Measure quality and performance, then tune the engine." },
    ],
    faqs: [
      {
        q: "Will content sound like AI?",
        a: "Not if voice systems and editorial QA are in place. AI drafts; humans own taste and brand judgment.",
      },
      {
        q: "What tools do you use?",
        a: "We meet you in your stack and add prompt libraries, review gates, and measurement — tool-agnostic by design.",
      },
    ],
  },
  {
    slug: "conversion-optimization",
    category: "Digital Growth",
    title: "Conversion Optimization",
    accent: "Optimization",
    description:
      "Test, learn, and lift — UX, messaging, and funnel experiments that turn more visitors into customers.",
    overview:
      "Experimentation programs that raise conversion with disciplined testing — hypothesis, design, measure, and ship what wins.",
    detail:
      "We diagnose friction with analytics and qualitative evidence, then run a prioritized test roadmap. Winners ship; losers teach. Over time you get a living playbook of what converts for your brand.",
    stat: "05",
    statLabel: "/capability",
    image: imgs[9],
    gallery: [imgs[6], imgs[2]],
    industries: ["E-commerce", "Lead gen", "Loyalty sign-up", "App onboarding"],
    whoFor: [
      "Teams with traffic but soft conversion",
      "Marketing orgs without a test culture",
      "Product teams needing funnel clarity",
    ],
    capabilities: [
      "Funnel & UX audits",
      "Hypothesis prioritization",
      "A/B and multivariate testing",
      "Copy and offer experiments",
      "Checkout / form friction fixes",
      "Experimentation enablement",
    ],
    outcomes: [
      "Higher conversion rates",
      "Clearer funnel diagnostics",
      "A culture of validated learning",
      "Compounding lifts from shipped winners",
    ],
    deliverables: [
      "Funnel & UX audits",
      "Experiment roadmaps",
      "A/B test design & analysis",
      "Winning variant implementation",
      "Learning libraries",
    ],
    useCases: [
      {
        title: "Checkout lift",
        detail: "Reduce drop-off with focused experiments on trust, form friction, and payment UX.",
      },
      {
        title: "Landing page systems",
        detail: "Match message to intent and test hero, proof, and CTA patterns.",
      },
      {
        title: "Sign-up / loyalty funnels",
        detail: "Optimize membership and app enroll flows for completion and activation.",
      },
    ],
    process: [
      { step: "01", title: "Diagnose", detail: "Find friction with analytics, heatmaps, and qualitative input." },
      { step: "02", title: "Test", detail: "Run prioritized experiments with clear success criteria." },
      { step: "03", title: "Ship", detail: "Roll out winners and feed insights into the next cycle." },
    ],
    faqs: [
      {
        q: "How much traffic do we need?",
        a: "Enough to reach significance in a reasonable window. Low-traffic sites use qualitative + sequential testing approaches.",
      },
      {
        q: "Do you implement winners?",
        a: "Yes — we partner with your eng or ship via your CMS / experiment tool so lift doesn’t stay in a deck.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
