export interface ShowcaseProject {
  id: string;
  title: string;
  category: "Residential" | "Commercial" | "Hospitality" | "Solar EPC";
  location: string;
  carpetAreaSqFt: number;
  year: string;
  budgetFormatted: string;
  tagline: string;
  description: string;
  portalCode: string;
  highlights: string[];
  materialsUsed: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  monthlyPriceINR: number;
  annualPriceINR: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface StudioMetric {
  label: string;
  value: string;
  description: string;
}

export interface StudioFAQ {
  question: string;
  answer: string;
  category: "Platform" | "Execution" | "Commercials" | "Security";
}

export const studioMetrics: StudioMetric[] = [
  {
    label: "Executed Project Value",
    value: "₹140+ Cr",
    description: "Across luxury residences, commercial headquarters & bespoke villas",
  },
  {
    label: "Floor Space Built",
    value: "280,000+",
    description: "Square feet of turnkey interior fit-outs and architectural space",
  },
  {
    label: "BOQ Precision Variance",
    value: "< 1.4%",
    description: "Industry-leading accuracy between estimate and handover",
  },
  {
    label: "On-Time Handover Rate",
    value: "98.7%",
    description: "Zero milestone delays with real-time site supervisor logs",
  },
];

export const showcaseProjects: ShowcaseProject[] = [
  {
    id: "proj-1",
    title: "The Skydeck Penthouse",
    category: "Residential",
    location: "Worli Sea Face, Mumbai",
    carpetAreaSqFt: 3800,
    year: "2026",
    budgetFormatted: "₹85 Lakhs",
    tagline: "Monolithic Italian Statuario & Concealed Architectural Lighting",
    description: "A dual-aspect luxury penthouse overlooking the Arabian Sea. Features seamless micro-cement wall treatments, motorized acoustic veneers, and custom walnut cabinetry engineered to marine standards.",
    portalCode: "P-619",
    highlights: ["Imported Statuario slab cladding", "Concealed magnetic track lighting", "Daikin VRV acoustic ducting"],
    materialsUsed: ["Action Tesa HDHMR", "Italian Statuario Marble", "Hafele Slido Hardware"],
  },
  {
    id: "proj-2",
    title: "Oberoi Forest Villa",
    category: "Residential",
    location: "DLF Phase 5, Gurugram",
    carpetAreaSqFt: 6200,
    year: "2026",
    budgetFormatted: "₹1.45 Cr",
    tagline: "Biophilic Courtyard Residence & Sustainable Teak Millwork",
    description: "Turnkey luxury residential villa featuring an internal double-height courtyard, thermal double-glazed curtain walls, and custom fluted wall paneling integrated with ambient warm illumination.",
    portalCode: "P-438",
    highlights: ["Central rain-harvesting lightwell", "100% LED 3000K warm lighting", "Custom teak vanity woodwork"],
    materialsUsed: ["Century Gold BWP Plywood", "Dyna Beige Marble", "Bespoke Brass Trims"],
  },
  {
    id: "proj-3",
    title: "Monolith Tech Headquarters",
    category: "Commercial",
    location: "Outer Ring Road, Bengaluru",
    carpetAreaSqFt: 18500,
    year: "2026",
    budgetFormatted: "₹3.20 Cr",
    tagline: "High-Performance Workspaces for 140 Engineers",
    description: "Modern tech enterprise floor combining open collaboration benching, soundproof meeting pods, timber acoustic baffles, and smart HVAC automation linked to real-time occupancy sensors.",
    portalCode: "P-202",
    highlights: ["140 Ergonomic height-adjustable desks", "NRC 0.85 Acoustic felt baffles", "Smart building sensor grid"],
    materialsUsed: ["Merino Postformed Laminates", "Armstrong Acoustic Ceiling", "Tarkett Vinyl"],
  },
  {
    id: "proj-4",
    title: "Dr. Mehta Dental Studio & Medispa",
    category: "Commercial",
    location: "Koregaon Park, Pune",
    carpetAreaSqFt: 2200,
    year: "2026",
    budgetFormatted: "₹52 Lakhs",
    tagline: "Scandinavian Wellness Clinic with Antibacterial Finishes",
    description: "State-of-the-art dental sanctuary featuring medical-grade seamless vinyl flooring, concealed lead-shielded radiographic partitions, and soothing Nordic oak aesthetics.",
    portalCode: "P-910",
    highlights: ["Seamless medical vinyl coving", "Lead-lined partition assemblies", "Touchless automated sliding doors"],
    materialsUsed: ["Gerflor Medical Vinyl", "Action Tesa Boilo HDF", "Corian Solid Surface"],
  },
  {
    id: "proj-5",
    title: "The Glass Pavillion Bistro",
    category: "Hospitality",
    location: "Indiranagar, Bengaluru",
    carpetAreaSqFt: 4500,
    year: "2025",
    budgetFormatted: "₹72 Lakhs",
    tagline: "Bespoke Culinary Space with Exposed Steel & Terrazzo",
    description: "A greenhouse-inspired dining space featuring custom mild-steel window frames, hand-cast terrazzo flooring, and bespoke brass bar joinery.",
    portalCode: "P-310",
    highlights: ["Handmade terrazzo aggregate floor", "Custom glass atrium roof", "Acoustic fabric dining booths"],
    materialsUsed: ["Mild Steel Profiles", "Local Grey Terrazzo", "Custom Fluted Glass"],
  },
];

export const studioFeaturePillars = [
  {
    id: "boq",
    number: "01",
    title: "Dynamic BOQ & Proposal Engine",
    tagline: "Generate zero-error architectural estimates in minutes",
    description: "Eliminate estimation spreadsheets. Calculate room-wise civil, carpentry, electrical, and finish quantities with automated GST calculations, vendor purchase rates, and healthy studio margins.",
    capabilities: [
      "Room-wise spatial breakdown (Living, Kitchen, Master Suite)",
      "Standard material rates master catalog linked to live suppliers",
      "Instant PDF Proposal download formatted on official studio letterhead",
      "1-Click client quote sharing via WhatsApp and direct links",
    ],
  },
  {
    id: "portal",
    number: "02",
    title: "Private Client Live Portal",
    tagline: "Total transparency that delights luxury homeowners & corporate clients",
    description: "Every client receives a secure, password-free private portal. Clients view live project milestones, approve 3D renders, track itemized commercial expenditures, and communicate directly with project leads.",
    capabilities: [
      "Milestone progress tracker with verified site supervisor photo logs",
      "3D visual approvals (Single-click Approve or Request Revision)",
      "Financial ledger showing billed amounts, receipts & upcoming dues",
      "Integrated studio WhatsApp support button",
    ],
  },
  {
    id: "crm",
    number: "03",
    title: "Architectural CRM & Leads Pipeline",
    tagline: "From first site measurement to signed turnkey contract",
    description: "Built exclusively for interior designers, architects, and design-build firms. Manage discovery calls, site survey appointments, concept pitches, and 1-click contract conversions.",
    capabilities: [
      "Interactive 5-stage Kanban pipeline with Drag & Drop simplicity",
      "Client Lifetime Value (LTV) directory & multi-project histories",
      "Scheduled site visit calendar with automatic client WhatsApp reminders",
      "1-Click 'Convert to Project' automatically generating project codes",
    ],
  },
  {
    id: "execution",
    number: "04",
    title: "Procurement & Site Fit-out Operations",
    tagline: "Bridge the gap between studio blueprints and on-site reality",
    description: "Track procurement purchase orders, contractor daily logs, material rate contracts, vendor balances, and defect snagging sign-offs with total accountability.",
    capabilities: [
      "Vendor purchase orders with dispatch and delivery confirmations",
      "Site supervisor checklist tracker for civil, MEP & finish tolerances",
      "Labor manpower master with daily wage & trade tracking",
      "Studio timesheet logger calculating billable project hours",
    ],
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "solo",
    name: "Architect Solo",
    tagline: "For independent architects & boutique interior designers",
    monthlyPriceINR: 2499,
    annualPriceINR: 24990,
    description: "Essential tools to create professional proposals, manage up to 5 active projects, and offer client portal access.",
    features: [
      "Up to 5 Active Turnkey Projects",
      "Interactive BOQ & Quote Generator",
      "Official Letterhead PDF Export (Direct download)",
      "Standard Client Portal Access",
      "Materials Master Catalog (200+ Indian items)",
      "Email & WhatsApp Support",
    ],
    ctaText: "Start 14-Day Free Trial",
  },
  {
    id: "studio",
    name: "Studio OS Pro",
    badge: "Most Popular",
    isPopular: true,
    tagline: "For growing design-build studios & interior contracting firms",
    monthlyPriceINR: 5999,
    annualPriceINR: 59990,
    description: "The complete platform to run modern studio operations with unlimited projects, team collaboration, and client CRM.",
    features: [
      "Unlimited Turnkey Projects",
      "Full CRM & Leads Pipeline (Drag & Drop Kanban)",
      "Custom PDF Letterhead & Pre-Printed Stationery Modes",
      "Branded Client Portal with 3D Approval Engine",
      "Procurement Orders & Vendor Payment Ledger",
      "Site Checklist Tracker & Daily Snag Logs",
      "Multi-user Team Roles (Architect, PM, Supervisor)",
      "Priority WhatsApp & Phone Studio Concierge",
    ],
    ctaText: "Launch Studio OS",
  },
  {
    id: "enterprise",
    name: "Firm & Multi-City",
    badge: "Custom Scale",
    tagline: "For established architectural practices & EPC contracting firms",
    monthlyPriceINR: 14999,
    annualPriceINR: 149990,
    description: "Custom deployment with multi-branch management, dedicated training, ERP integrations, and custom domain white-labeling.",
    features: [
      "Multi-Branch & Multi-City Studio Management",
      "Custom Domain for Client Portals (portal.yourstudio.com)",
      "Solar EPC & Civil Contracting Specialized Workflows",
      "Custom Accounting & Tally / ERP API Webhooks",
      "Dedicated Technical Account Director",
      "Custom On-Site Staff Onboarding & Training",
      "99.9% Uptime SLA & Enterprise Data Encryption",
    ],
    ctaText: "Talk to Enterprise Team",
  },
];

export const studioFAQs: StudioFAQ[] = [
  {
    question: "Can our studio customize the proposals with our existing letterhead?",
    answer: "Yes! Basekraft OS provides three flexible letterhead modes in Settings: (1) Digital Letterhead generated with your typography and logo, (2) Custom Uploaded PDF Stationery overlay, and (3) Pre-Printed Paper mode with custom top/bottom clearance margins for physical office letterhead paper.",
    category: "Platform",
  },
  {
    question: "How do teams collaborate on project deliverables and timeline?",
    answer: "Every project generates a unified workspace for your architects, project managers, and contractors. Teams can track milestone progress, 3D concept deliverables, contractor purchase orders, and payment receipts from one centralized dashboard.",
    category: "Execution",
  },

  {
    question: "Does the platform support Indian currency (INR) and GST taxation?",
    answer: "Absolutely. The entire platform is engineered with standard Indian architectural specifications: Lakhs (L) and Crores (Cr) currency formatting, standard 18% / 12% / 5% GST itemized tax breakdown, and Indian measurement units (Sq.Ft, R.Ft, Nos, LumpSum).",
    category: "Commercials",
  },
  {
    question: "Can we track vendor purchase orders and site supervisor snags?",
    answer: "Yes. Basekraft includes dedicated Procurement Orders (/orders), Materials Master (/materials), and All Tasks (/tasks) modules to track purchase orders, vendor outstandings, and on-site snags with trade categories like Civil, Carpentry, Electrical, and Finishes.",
    category: "Execution",
  },
  {
    question: "Is our client data and commercial pricing confidential?",
    answer: "All studio data is encrypted in transit and at rest. Your purchase rates, contractor markups, and client contacts are strictly protected and never shared.",
    category: "Security",
  },
];
