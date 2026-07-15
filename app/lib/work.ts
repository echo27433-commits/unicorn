export type WorkCase = {
  slug: string;
  name: string;
  accent: string;
  industry: string;
  headline: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  highlights: string[];
  logo: string;
  logoAlt: string;
  image: string;
  imageAlt: string;
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
    headline: "28% increase in repeat shoppers",
    summary:
      "How Echo transformed engagement for Nesto Hypermarkets — from low repeat rates to personalized journeys that compound.",
    challenge:
      "Low repeat customer engagement and limited personalization across marketing campaigns.",
    solution:
      "Echo automated personalized WhatsApp campaigns, customer reminders, and targeted engagement journeys.",
    results: [
      "28% increase in repeat shoppers",
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
      description: "28% increase in repeat shoppers in just 3 months",
      beforeLabel: "Before Echo",
      beforeValue: "22%",
      afterLabel: "After Echo (3 Months)",
      afterValue: "28%",
      uplift: "+28%",
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
        { label: "Purchases", value: "120K", rate: "28%", rateLabel: "Repeat Rate" },
        { label: "Repeat Shoppers", value: "28%" },
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
      "How Echo transformed engagement for Masdar — turning fragmented event communication into live, measurable participation.",
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
      description: "Real-time engagement improved before and during events",
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
    slug: "retail-promotions",
    name: "Mark & Save",
    accent: "Save",
    industry: "Enterprise Retail Brand",
    headline: "35% increase in campaign conversions",
    summary:
      "How Echo transformed engagement for Mark & Save — faster responses and higher conversion across retail promotions.",
    challenge:
      "Slow customer response times and low campaign conversion across retail promotions.",
    solution:
      "Echo automated WhatsApp promotions, customer responses, and personalized engagement workflows.",
    results: [
      "35% increase in campaign conversions",
      "Over 60% faster customer response time",
      "Improved customer engagement and repeat purchases",
    ],
    highlights: [
      "Over 60% faster customer response time",
      "Improved customer engagement and repeat purchases",
    ],
    logo: "/brands/mark_save_logo_dark.png",
    logoAlt: "Mark & Save",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Retail checkout with contactless payment",
    metrics: {
      title: "Campaign Conversions Before vs After Echo",
      description: "35% increase in campaign conversions",
      beforeLabel: "Before Echo",
      beforeValue: "28%",
      afterLabel: "After Echo",
      afterValue: "37.8%",
      uplift: "+35%",
    },
    growth: {
      title: "Customer Response Time Improvement",
      description: "Over 60% reduction in response time",
      peak: "-62.5%",
      start: "120 min",
      change: "-62%",
      chartType: "bars",
      unit: "min",
      points: [
        { label: "Before Echo", value: "120 min", numeric: 120 },
        { label: "After Echo", value: "45 min", numeric: 45 },
      ],
    },
    funnel: {
      title: "Customer Engagement Funnel",
      description: "From reach to repeat purchases",
      stages: [
        {
          label: "Campaign Reach",
          value: "1.8M",
          rate: "31%",
          rateLabel: "Interaction Rate",
        },
        {
          label: "Customer Interactions",
          value: "560K",
          rate: "37.5%",
          rateLabel: "Conversion Rate",
        },
        {
          label: "Conversions",
          value: "210K",
          rate: "35%",
          rateLabel: "Repeat Rate",
        },
        { label: "Repeat Purchases", value: "35%" },
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
