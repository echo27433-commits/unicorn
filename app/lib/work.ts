export type WorkCase = {
  slug: string;
  name: string;
  accent: string;
  industry: string;
  headline: string;
  summary: string;
  challenge: string;
  solution: string;
  strategy?: string[];
  results: string[];
  highlights: string[];
  logo: string;
  logoAlt: string;
  /** When false, skip invert filter (logo already light for dark backgrounds). */
  logoInvert?: boolean;
  logoClassName?: string;
  image: string;
  imageAlt: string;
  campaignMetrics?: { metric: string; result: string }[];
  outcomeStats?: { value: string; label: string }[];
  metrics: {
    title: string;
    description: string;
    beforeLabel: string;
    beforeValue: string;
    afterLabel: string;
    afterValue: string;
    uplift: string;
  };
  growth: {
    title: string;
    description: string;
    peak: string;
    start: string;
    change: string;
    chartType: "line" | "bars";
    unit: string;
    points: { label: string; value: string; numeric: number }[];
  };
  funnel: {
    title: string;
    description: string;
    stages: {
      label: string;
      value: string;
      rate?: string;
      rateLabel?: string;
    }[];
  };
};

export const workCases: WorkCase[] = [
  {
    slug: "nesto-hypermarkets",
    name: "Nesto Hypermarkets",
    accent: "Hypermarkets",
    industry: "Enterprise Retail Brand",
    headline: "36% increase in repeat shoppers",
    summary:
      "How Echo transformed engagement for Nesto Hypermarkets, from low repeat rates to personalized journeys that compound.",
    challenge:
      "Low repeat customer engagement and limited personalization across marketing campaigns.",
    solution:
      "Echo automated personalized WhatsApp campaigns, customer reminders, and targeted engagement journeys.",
    results: [
      "36% increase in repeat shoppers",
      "Faster and smarter campaign execution",
      "Improved customer engagement and personalization",
    ],
    highlights: [
      "Faster and smarter campaign execution",
      "Improved customer engagement and personalization",
    ],
    logo: "/brands/nesto_logo_dark.png",
    logoAlt: "Nesto",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Modern supermarket aisle with product shelves",
    metrics: {
      title: "Repeat Shoppers Before vs After Echo",
      description: "36% increase in repeat shoppers in just 3 months",
      beforeLabel: "Before Echo",
      beforeValue: "22%",
      afterLabel: "After Echo (3 Months)",
      afterValue: "36%",
      uplift: "+36%",
    },
    growth: {
      title: "Engagement Growth Over 3 Months",
      description: "Stronger customer engagement across the journey",
      peak: "42K",
      start: "18K",
      change: "+133%",
      chartType: "line",
      unit: "K",
      points: [
        { label: "Month 1", value: "18K", numeric: 18 },
        { label: "Month 2", value: "25K", numeric: 25 },
        { label: "Month 3", value: "34K", numeric: 34 },
        { label: "Month 4", value: "42K", numeric: 42 },
      ],
    },
    funnel: {
      title: "Customer Engagement Funnel",
      description: "From reach to repeat purchases",
      stages: [
        { label: "Campaign Reach", value: "1.2M", rate: "26%", rateLabel: "Engagement Rate" },
        { label: "Engaged Users", value: "320K", rate: "37%", rateLabel: "Purchase Conversion" },
        { label: "Purchases", value: "120K", rate: "36%", rateLabel: "Repeat Rate" },
        { label: "Repeat Shoppers", value: "36%" },
      ],
    },
  },
  {
    slug: "masdar",
    name: "Masdar",
    accent: "Masdar",
    industry: "Energy & Sustainability",
    headline: "45% increase in registrations",
    summary:
      "How Echo transformed engagement for Masdar, turning fragmented event communication into live, measurable participation.",
    challenge:
      "Low attendee engagement and fragmented event communication.",
    solution:
      "Echo automated personalized WhatsApp campaigns, reminders, and live event interactions.",
    results: [
      "45% increase in registrations",
      "Faster attendee responses",
      "Improved event participation and engagement",
    ],
    highlights: [
      "Faster attendee responses",
      "Improved event participation and engagement",
    ],
    logo: "/brands/masdar_logo_dark.png",
    logoAlt: "Masdar",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Solar panels under a clear sky",
    metrics: {
      title: "Registrations Before vs After Echo",
      description: "45% increase in event registrations",
      beforeLabel: "Before Echo",
      beforeValue: "6,200",
      afterLabel: "After Echo",
      afterValue: "9,000",
      uplift: "+45%",
    },
    growth: {
      title: "Audience Interaction Growth During Event",
      description: "Real time engagement improved before and during events",
      peak: "4.8K",
      start: "1.2K",
      change: "+300%",
      chartType: "line",
      unit: "K",
      points: [
        { label: "2 Weeks Before", value: "1.2K", numeric: 1.2 },
        { label: "1 Week Before", value: "2.1K", numeric: 2.1 },
        { label: "Event Day AM", value: "3.2K", numeric: 3.2 },
        { label: "Event Day PM", value: "4.3K", numeric: 4.3 },
        { label: "Event Peak", value: "4.8K", numeric: 4.8 },
      ],
    },
    funnel: {
      title: "Engagement Funnel",
      description: "From invite to meaningful engagement",
      stages: [
        { label: "Invites Sent", value: "25,000", rate: "40%", rateLabel: "Conversion" },
        { label: "Registrations", value: "10,000", rate: "60%", rateLabel: "Conversion" },
        { label: "Attendance", value: "6,000", rate: "70%", rateLabel: "Conversion" },
        { label: "Engaged Audience", value: "4,200" },
      ],
    },
  },
  {
    slug: "mark-and-save",
    name: "Mark & Save",
    accent: "Save",
    industry: "Enterprise Retail Brand",
    headline: "AI Vision that turned shelves into real time retail intelligence",
    summary:
      "How Mark & Save deployed computer vision across hypermarket floors, detecting shelf gaps, measuring shopper behavior, and giving ops teams visibility before revenue is lost.",
    challenge:
      "Limited real time shelf and floor visibility across large hypermarket formats, out of stocks, planogram gaps, and shopper flow insights were hard to catch before they hurt sales.",
    solution:
      "An AI Vision stack trained on Mark & Save’s assortment and store layouts, edge and cloud inference, ops alerts, and dashboards that turn cameras into operational intelligence.",
    strategy: [
      "Shelf gap and planogram compliance detection across priority categories",
      "Shopper journey, dwell, and zone analytics for layout and staffing decisions",
      "Edge inference with cloud sync for multi store rollout",
      "Exception alerts routed to store ops with image evidence",
      "Integration hooks into replenishment and store operations workflows",
    ],
    results: [
      "Real time shelf and inventory visibility across live store cameras",
      "Faster exception handling for out of stocks and planogram issues",
      "Shopper journey analytics that inform layout, staffing, and promotions",
    ],
    highlights: [
      "AI Vision for shelf intelligence and planogram compliance",
      "Shopper analytics and ops exception routing at store scale",
    ],
    logo: "/brands/mark_save_logo_dark.png",
    logoAlt: "Mark & Save",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Hypermarket aisle with product shelves monitored for stock visibility",
    campaignMetrics: [
      { metric: "Capability", result: "AI Vision / Computer Vision" },
      { metric: "Primary Use Cases", result: "Shelf · Shopper · Ops alerts" },
      { metric: "Deployment Model", result: "Edge + cloud inference" },
      { metric: "Store Format", result: "Large format hypermarkets" },
      { metric: "Outcome Focus", result: "OOS reduction & floor visibility" },
    ],
    outcomeStats: [
      { value: "AI Vision", label: "Shelf & floor intelligence" },
      { value: "Real time", label: "Gap & planogram detection" },
      { value: "Ops alerts", label: "Exception routing to stores" },
    ],
    metrics: {
      title: "Shelf Exception Response",
      description: "Time from shelf gap detection to store ops awareness",
      beforeLabel: "Before AI Vision",
      beforeValue: "360 min",
      afterLabel: "With AI Vision",
      afterValue: "15 min",
      uplift: "-96%",
    },
    growth: {
      title: "Vision Signal Coverage Rollout",
      description: "Store camera coverage expanded as models were trained and validated",
      peak: "100%",
      start: "25%",
      change: "4X coverage",
      chartType: "bars",
      unit: "%",
      points: [
        { label: "Pilot", value: "25%", numeric: 25 },
        { label: "Phase 2", value: "55%", numeric: 55 },
        { label: "Phase 3", value: "80%", numeric: 80 },
        { label: "Scale", value: "100%", numeric: 100 },
      ],
    },
    funnel: {
      title: "Vision Operations Funnel",
      description: "From camera coverage to actionable store exceptions",
      stages: [
        {
          label: "Camera Coverage",
          value: "Live floors",
          rate: "Edge",
          rateLabel: "Inference",
        },
        {
          label: "Shelf Detections",
          value: "Continuous",
          rate: "Gaps",
          rateLabel: "Planograms",
        },
        {
          label: "Ops Exceptions",
          value: "Prioritized",
          rate: "Alerts",
          rateLabel: "Store teams",
        },
        { label: "Action Taken", value: "Same day" },
      ],
    },
  },
  {
    slug: "rise-expo",
    name: "RISE Expo",
    accent: "Expo",
    industry: "Dubai World Trade Centre",
    headline:
      "Driving Qualified Investor & Enterprise Leads Through Performance Marketing",
    summary:
      "How performance marketing for RISE Expo attracted investors, founders, and enterprise leaders across the GCC and Asia, with lead quality and acquisition efficiency held tight.",
    challenge:
      "RISE Expo needed to attract investors, startup founders, enterprise leaders, and government stakeholders across the GCC and Asia while maintaining lead quality and acquisition efficiency.",
    solution:
      "A multi channel performance program across Google Search, LinkedIn, geo targeting, retargeting, and conversion focused landing pages.",
    strategy: [
      "Google Search Campaigns targeting high intent event and investment keywords",
      "LinkedIn targeting C Level executives, founders, and investors",
      "Geo targeting across GCC, India, Singapore, and Hong Kong",
      "Retargeting audiences based on engagement signals",
      "Conversion focused landing page optimization",
    ],
    results: [
      "75+ qualified leads generated in 60 days",
      "25% increase in website traffic",
      "2.3X higher search CTR vs industry average",
    ],
    highlights: [
      "75+ qualified leads at AED 450 CPL",
      "25% website traffic growth in 60 days",
    ],
    logo: "/brands/dubai_trade_logo_dark.png",
    logoAlt: "Dubai World Trade Centre",
    logoInvert: false,
    logoClassName:
      "h-14 w-auto max-w-[18rem] object-contain md:h-20 md:max-w-[24rem] lg:h-24 lg:max-w-[28rem]",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Conference expo hall with attendees and stage lighting",
    campaignMetrics: [
      { metric: "Campaign Duration", result: "60 Days" },
      { metric: "Marketing Budget", result: "AED 120,000" },
      { metric: "Qualified Leads", result: "75+" },
      { metric: "Cost Per Lead", result: "AED 450" },
      { metric: "Website Traffic Growth", result: "+25%" },
      { metric: "Google Search CTR", result: "7%" },
      { metric: "LinkedIn CTR", result: "1%" },
    ],
    outcomeStats: [
      { value: "75+", label: "Qualified Leads" },
      { value: "25%", label: "Increase in Website Traffic" },
      { value: "2.3X", label: "Higher Search CTR vs Industry Average" },
    ],
    metrics: {
      title: "Lead Acquisition Snapshot",
      description: "60-day performance marketing campaign for RISE Expo",
      beforeLabel: "Budget",
      beforeValue: "AED 120K",
      afterLabel: "Qualified Leads",
      afterValue: "75+",
      uplift: "AED 450 CPL",
    },
    growth: {
      title: "Channel Click Through Rates",
      description: "Search vs LinkedIn engagement during the campaign",
      peak: "7%",
      start: "1%",
      change: "2.3X vs avg",
      chartType: "bars",
      unit: "%",
      points: [
        { label: "LinkedIn CTR", value: "1%", numeric: 1 },
        { label: "Google Search CTR", value: "7%", numeric: 7 },
      ],
    },
    funnel: {
      title: "Campaign Performance Funnel",
      description: "From budget to qualified investor and enterprise leads",
      stages: [
        {
          label: "Marketing Budget",
          value: "AED 120K",
          rate: "60 days",
          rateLabel: "Duration",
        },
        {
          label: "Website Traffic Lift",
          value: "+25%",
          rate: "7%",
          rateLabel: "Search CTR",
        },
        {
          label: "Qualified Leads",
          value: "75+",
          rate: "AED 450",
          rateLabel: "Cost Per Lead",
        },
        { label: "Search CTR Lift", value: "2.3X" },
      ],
    },
  },
  {
    slug: "gulfood",
    name: "Gulfood",
    accent: "Gulfood",
    industry: "Dubai World Trade Centre",
    headline:
      "AI Search & Answer Visibility that unlocked +60% organic growth",
    summary:
      "How Gulfood scaled organic discovery for the world’s largest annual food and beverage trade exhibition, driving sessions and new users ahead of peak season.",
    challenge:
      "Gulfood needed stronger organic visibility ahead of the exhibition calendar, capturing high intent search demand from buyers, exhibitors, and trade audiences without over relying on paid media.",
    solution:
      "An AI Search & Answer Visibility program focused on technical foundations, content systems aligned to search demand, and continuous measurement through Google Analytics.",
    strategy: [
      "Technical search health and indexation improvements across priority pages",
      "Content architecture mapped to high intent exhibition and industry queries",
      "On page and schema systems for clearer search and answer engine visibility",
      "Organic performance tracking in GA4 with year over year benchmarking",
      "Iteration against session growth, new users, and engagement quality",
    ],
    results: [
      "665,310 organic sessions in the measured period (+60.64% YoY)",
      "303,934 new users (+59.83% YoY)",
      "Sustained organic traffic lift through peak season (Nov to Feb)",
    ],
    highlights: [
      "+60.64% organic sessions year over year",
      "+59.83% new users from organic search",
    ],
    logo: "/brands/Gulfood-logo.png",
    logoAlt: "Gulfood",
    logoInvert: false,
    logoClassName:
      "h-12 w-auto max-w-[16rem] object-contain md:h-16 md:max-w-[22rem] lg:h-20 lg:max-w-[26rem]",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Food trade show and culinary exhibition atmosphere",
    campaignMetrics: [
      { metric: "Measurement Window", result: "Nov 2024 to Feb 2025" },
      { metric: "Comparison Period", result: "Nov 2023 to Feb 2024" },
      { metric: "Organic Sessions", result: "665,310" },
      { metric: "Organic Sessions YoY", result: "+60.64%" },
      { metric: "New Users", result: "303,934" },
      { metric: "New Users YoY", result: "+59.83%" },
      { metric: "Engagement Rate", result: "55.58%" },
      { metric: "Avg. Engagement Time / Session", result: "01:58" },
    ],
    outcomeStats: [
      { value: "665K+", label: "Organic Sessions" },
      { value: "+60.6%", label: "Organic Sessions YoY" },
      { value: "+59.8%", label: "New Users YoY" },
    ],
    metrics: {
      title: "Organic Sessions Before vs After Program Lift",
      description:
        "Year over year organic growth for Gulfood website traffic (GA4)",
      beforeLabel: "Prior Year Window",
      beforeValue: "414K",
      afterLabel: "Current Window",
      afterValue: "665K",
      uplift: "+60.6%",
    },
    growth: {
      title: "Organic Traffic Acquisition Over Time",
      description:
        "Sessions from organic search across the Nov to Feb exhibition runway",
      peak: "280K",
      start: "85K",
      change: "+60.6% YoY",
      chartType: "line",
      unit: "K",
      points: [
        { label: "Nov", value: "85K", numeric: 85 },
        { label: "Dec", value: "130K", numeric: 130 },
        { label: "Jan", value: "210K", numeric: 210 },
        { label: "Feb", value: "280K", numeric: 280 },
      ],
    },
    funnel: {
      title: "Organic Engagement Snapshot",
      description: "From sessions to engagement quality in the same window",
      stages: [
        {
          label: "Organic Sessions",
          value: "665K",
          rate: "+60.6%",
          rateLabel: "YoY Growth",
        },
        {
          label: "New Users",
          value: "304K",
          rate: "+59.8%",
          rateLabel: "YoY Growth",
        },
        {
          label: "Engagement Rate",
          value: "55.58%",
          rate: "-5.44%",
          rateLabel: "YoY Change",
        },
        { label: "Avg. Time / Session", value: "01:58" },
      ],
    },
  },
];

export function getWorkCaseBySlug(slug: string): WorkCase | undefined {
  return workCases.find((c) => c.slug === slug);
}

export function getAllWorkSlugs(): string[] {
  return workCases.map((c) => c.slug);
}
