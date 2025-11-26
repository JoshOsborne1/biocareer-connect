export type MatchBreakdown = {
  skills: number;
  experience: number;
  education: number;
};

export type JobOpportunity = {
  id: string;
  title: string;
  company: string;
  category: string;
  industries: string[];
  workMode: 'onsite' | 'hybrid' | 'remote';
  location: string;
  postedAt: string;
  matchScore: number;
  matchBreakdown: MatchBreakdown;
  pros: string[];
  cons: string[];
  missingSkills: string[];
  visaSupport: boolean;
  mastersSponsorship: boolean;
  studentFriendly: boolean;
  experienceLevel: 'student' | 'graduate' | 'mid' | 'senior';
  educationLevel?: string;
  tags?: string[];
};

export type DetailedOpportunity = JobOpportunity & {
  department: string;
  salary: string;
  contractType: string;
  deadline: string;
  commute: string;
  companyBadge?: string;
  strategicInsight: string;
  matchReasons: string[];
  gapAlerts: string[];
  gapCoaching: Array<{
    title: string;
    body: string;
  }>;
  analysisStats: Array<{
    label: string;
    value: string;
    caption: string;
  }>;
  roleSummary: string;
  keyDuties: string[];
};

export const opportunities: DetailedOpportunity[] = [
  {
    id: 'biomed-band5-st-thomas',
    title: 'Biomedical Scientist (Band 5)',
    company: "St Thomas' Hospital",
    category: 'Healthcare',
    industries: ['NHS', 'Pathology'],
    workMode: 'onsite',
    department: 'Haematology & Transfusion',
    location: 'London, SE1',
    salary: '£28,407 – £34,581 + HCAS',
    contractType: 'Full-time · Permanent',
    deadline: 'Closing in 5 days',
    commute: '15 min commute',
    postedAt: '2 days ago',
    matchScore: 92,
    matchBreakdown: { skills: 90, experience: 85, education: 100 },
    pros: ['IBMS accredited degree match', 'NHS Band 5 entry point', '15 min commute from SE1'],
    cons: [],
    missingSkills: [],
    visaSupport: true,
    mastersSponsorship: false,
    studentFriendly: false,
    experienceLevel: 'graduate',
    educationLevel: 'IBMS-accredited BSc',
    tags: ['Band 5', 'HCPC', 'On-site'],
    companyBadge: 'NHS',
    strategicInsight:
      'This is a high-visibility Band 5 post inside one of London’s busiest teaching hospitals. Your haematology placement and HCPC progress give you a strong edge over most graduates.',
    matchReasons: ['IBMS accredited degree', 'HCPC registration in progress', 'Haematology placement experience', 'Shift flexibility'],
    gapAlerts: ['Blood transfusion specific experience (desirable)', 'WinPath Enterprise LIMS knowledge'],
    gapCoaching: [
      {
        title: 'WinPath LIMS',
        body: 'Reference your Telepath LIMS exposure and emphasise rapid adaptability to new platforms when drafting the cover letter.',
      },
      {
        title: 'Blood transfusion exposure',
        body: 'Mention the cross-match observations during your placement and your plan to complete the competency framework within 3 months.',
      },
    ],
    analysisStats: [
      { label: 'Career growth', value: 'High potential', caption: 'Specialist portfolio support likely' },
      { label: 'Competition', value: 'High', caption: '≈ 40 applicants expected' },
    ],
    roleSummary:
      'Deliver high-quality haematology and transfusion diagnostics within a state-of-the-art lab, supporting acute care pathways across the trust.',
    keyDuties: [
      'Process patient samples using Sysmex analysers and gel cards',
      'Validate and authorise results in line with UKAS standards',
      'Perform daily QC, maintenance, and troubleshooting',
      'Participate in the 24/7 shift rota following competency sign-off',
    ],
  },
  {
    id: 'lab-technician-synnovis',
    title: 'Laboratory Technician',
    company: 'Synnovis',
    category: 'Healthcare',
    industries: ['Diagnostics', 'Private Lab'],
    workMode: 'onsite',
    department: 'Core Laboratory',
    location: 'London, SE1',
    salary: '£25,000 – £28,000',
    contractType: 'Full-time · Fixed Term (12 months)',
    deadline: 'Closing in 8 days',
    commute: '12 min commute',
    postedAt: '4 hours ago',
    matchScore: 78,
    matchBreakdown: { skills: 80, experience: 60, education: 90 },
    pros: ['Rotation across departments', 'HCPC sponsorship available'],
    cons: ['Prefers 1 year NHS experience'],
    missingSkills: ['HCPC registration'],
    visaSupport: false,
    mastersSponsorship: false,
    studentFriendly: true,
    experienceLevel: 'student',
    educationLevel: 'BSc Biomedical Science',
    tags: ['Learning plan', 'Private-public partnership'],
    strategicInsight:
      'Ideal stepping stone into private–public partnership labs. Emphasise your adaptability and readiness to pursue HCPC registration.',
    matchReasons: ['BSc Biomedical Science', 'Multipurpose analyser exposure', 'Appreciation for quality systems'],
    gapAlerts: ['Prefers 1 year NHS experience', 'HCPC registration not yet complete'],
    gapCoaching: [
      {
        title: 'NHS experience',
        body: 'Detail your university placement workload and include metrics (samples/day, platforms used) to bridge perceived gaps.',
      },
      {
        title: 'HCPC status',
        body: 'Highlight your timeline for registration and note any competencies already signed off.',
      },
    ],
    analysisStats: [
      { label: 'Career growth', value: 'Moderate', caption: 'Private-public rotation exposure' },
      { label: 'Competition', value: 'Medium', caption: '~25 applicants expected' },
    ],
    roleSummary:
      'Support the delivery of routine diagnostics across haematology, biochemistry, and microbiology benches within the Synnovis network.',
    keyDuties: [
      'Prepare and run samples on automated platforms',
      'Log results within LIMS ensuring traceability',
      'Support stock control and consumable ordering',
      'Collaborate with BMS staff to investigate QC flags',
    ],
  },
  {
    id: 'research-assistant-imperial',
    title: 'Research Assistant – Immunology',
    company: 'Imperial College London',
    category: 'Research',
    industries: ['Academic', 'Immunology'],
    workMode: 'hybrid',
    department: 'Department of Immunology & Inflammation',
    location: 'London, W12',
    salary: '£32,000 – £35,000',
    contractType: 'Full-time · Fixed Term (18 months)',
    deadline: 'Closing in 12 days',
    commute: '30 min commute',
    postedAt: '1 day ago',
    matchScore: 65,
    matchBreakdown: { skills: 55, experience: 45, education: 100 },
    pros: ['Academic supervision', 'Masters sponsorship potential'],
    cons: ['Requires MSc in Immunology'],
    missingSkills: ['MSc Immunology', 'Flow cytometry experience'],
    visaSupport: true,
    mastersSponsorship: true,
    studentFriendly: false,
    experienceLevel: 'graduate',
    educationLevel: 'MSc desired',
    tags: ['Hybrid', 'Funded MSc', 'Research'],
    companyBadge: 'ICL',
    strategicInsight:
      'Competitive academic role, but excellent for those targeting translational research careers. Your dissertation on immune signalling can offset the MSc requirement if articulated well.',
    matchReasons: ['Strong immunology modules', 'Research dissertation in immune signalling', 'Experience with ELISA and western blot'],
    gapAlerts: ['Flow cytometry experience limited', 'MSc in Immunology listed as essential'],
    gapCoaching: [
      {
        title: 'Flow cytometry',
        body: 'Include any exposure (even shadowing) and emphasise eagerness to complete formal training within the first month.',
      },
      {
        title: 'Masters requirement',
        body: 'Position your dissertation and publications as evidence of research capability; request consideration for MSc sponsorship.',
      },
    ],
    analysisStats: [
      { label: 'Career growth', value: 'High', caption: 'Route into funded MSc/PhD' },
      { label: 'Competition', value: 'Very high', caption: '≈ 60 applicants expected' },
    ],
    roleSummary:
      'Contribute to translational immunology research projects focused on innate immune signalling, supporting clinical collaborations.',
    keyDuties: [
      'Conduct bench experiments (ELISA, western blot, qPCR)',
      'Assist with patient sample processing and biobanking',
      'Analyse data and maintain accurate lab records',
      'Support manuscript preparation and conference outputs',
    ],
  },
  {
    id: 'data-analyst-intern-horizons',
    title: 'Data Analyst Intern',
    company: 'Horizons Bank',
    category: 'Data & Analytics',
    industries: ['Finance', 'Technology'],
    workMode: 'hybrid',
    department: 'Digital Transformation Office',
    location: 'London, EC2',
    salary: '£28,000 pro rata',
    contractType: 'Full-time · 12 month placement',
    deadline: 'Closing in 10 days',
    commute: '20 min commute',
    postedAt: '3 days ago',
    matchScore: 74,
    matchBreakdown: { skills: 70, experience: 60, education: 90 },
    pros: ['Python & SQL heavy role', 'Mentor assigned from day 1'],
    cons: ['Requires strong data storytelling examples'],
    missingSkills: ['Power BI certification'],
    visaSupport: true,
    mastersSponsorship: false,
    studentFriendly: true,
    experienceLevel: 'student',
    educationLevel: 'Any STEM degree (2nd/3rd year)',
    tags: ['Finance', 'Python', 'Hybrid'],
    strategicInsight:
      'Great option for data-minded students; bank sponsors Tier 4 to Tier 2 transitions. Highlight lab analytics to prove quantitative rigor.',
    matchReasons: ['Python scripting for lab automation', 'Statistics minor', 'Data visualization coursework'],
    gapAlerts: ['Power BI certification missing', 'Limited commercial storytelling'],
    gapCoaching: [
      {
        title: 'Power BI credential',
        body: 'Microsoft Learn offers a free Fundamentals badge you can complete within a week; reference it in applications.',
      },
      {
        title: 'Storytelling evidence',
        body: 'Translate your dissertation data visualizations into a portfolio PDF highlighting before/after insights.',
      },
    ],
    analysisStats: [
      { label: 'Career growth', value: 'High', caption: 'Pipeline into analyst graduate program' },
      { label: 'Competition', value: 'Medium', caption: '~25 candidates per cohort' },
    ],
    roleSummary:
      'Support the digital bank squad by building dashboards, cleaning customer datasets, and presenting insights to product managers.',
    keyDuties: ['Clean and join multi-source datasets', 'Automate weekly KPIs in Python', 'Design executive-ready visuals', 'Assist with ad-hoc analysis'],
  },
  {
    id: 'ux-intern-northstar',
    title: 'Product Design Intern (UX)',
    company: 'Northstar Mobility',
    category: 'Design',
    industries: ['Mobility', 'Consumer Tech'],
    workMode: 'remote',
    department: 'Experience Lab',
    location: 'Remote (UK)',
    salary: '£22,000 pro rata',
    contractType: 'Part-time · 9 months',
    deadline: 'Closing in 6 days',
    commute: 'Remote',
    postedAt: 'Today',
    matchScore: 69,
    matchBreakdown: { skills: 65, experience: 55, education: 95 },
    pros: ['Remote-friendly', 'MacBook + design stipend'],
    cons: ['Needs Figma prototyping case study'],
    missingSkills: ['Accessibility heuristics certification'],
    visaSupport: false,
    mastersSponsorship: false,
    studentFriendly: true,
    experienceLevel: 'student',
    educationLevel: 'Any design/human factors degree',
    tags: ['Remote', 'UX', 'Part-time'],
    strategicInsight:
      'Ideal for creative students wanting mobility-sector exposure. Show how lab research translates into user empathy and prototyping speed.',
    matchReasons: ['Human factors module distinction', 'Portfolio piece on patient journey mapping', 'Strong storytelling'],
    gapAlerts: ['Accessibility accreditation missing', 'Limited high-fidelity prototyping samples'],
    gapCoaching: [
      {
        title: 'Accessible design badge',
        body: 'Take the TetraLogical micro-credential to strengthen your “Still at uni” profile.',
      },
      {
        title: 'Prototype depth',
        body: 'Rework existing Figma files to include interactions and annotate them for recruiter skim-readers.',
      },
    ],
    analysisStats: [
      { label: 'Career growth', value: 'Medium', caption: 'Potential to convert to junior UX' },
      { label: 'Competition', value: 'Medium-high', caption: 'Expect design challenge' },
    ],
    roleSummary: 'Collaborate with product managers to design flows for electric scooter subscriptions, focusing on rider onboarding and safety alerts.',
    keyDuties: ['Turn research insights into journey maps', 'Prototype flows in Figma', 'Run unmoderated tests with testers', 'Document accessibility feedback'],
  },
  {
    id: 'software-engineer-fellowship-aurora',
    title: 'Software Engineer Fellowship',
    company: 'Aurora Climate Tech',
    category: 'Engineering',
    industries: ['Climate', 'Software'],
    workMode: 'onsite',
    department: 'Platform Engineering',
    location: 'Cambridge, CB2',
    salary: '£40,000 – £45,000',
    contractType: 'Full-time · Permanent',
    deadline: 'Closing in 4 days',
    commute: 'On-site lab',
    postedAt: '5 hours ago',
    matchScore: 81,
    matchBreakdown: { skills: 78, experience: 70, education: 95 },
    pros: ['Visa sponsorship guaranteed', 'Masters degree sponsorship after 1 year'],
    cons: ['Requires strong algorithms knowledge'],
    missingSkills: ['Rust familiarity'],
    visaSupport: true,
    mastersSponsorship: true,
    studentFriendly: false,
    experienceLevel: 'graduate',
    educationLevel: 'STEM MSc/BSc with coding focus',
    tags: ['Climate tech', 'Visa', 'Masters sponsorship'],
    strategicInsight:
      'High-growth climate startup actively supports postgraduate study. Lean into lab automation scripts as proof of engineering rigor.',
    matchReasons: ['Python automation inside labs', 'Contribution to open-source science tools', 'Leadership in STEM society'],
    gapAlerts: ['Rust experience missing', 'Expect live coding interview'],
    gapCoaching: [
      {
        title: 'Rust readiness',
        body: 'Complete “Rustlings” and mention willingness to pair-program with senior engineers to ramp quickly.',
      },
      {
        title: 'Algorithm refresh',
        body: 'Rehearse BFS/DFS, greedy, and DP patterns—you can tie them back to optimisation problems from lab scheduling.',
      },
    ],
    analysisStats: [
      { label: 'Career growth', value: 'Very high', caption: 'Masters + equity on offer' },
      { label: 'Competition', value: 'High', caption: 'Whiteboard + system design' },
    ],
    roleSummary: 'Build backend services that ingest sensor data from green hydrogen pilots and turn them into real-time dashboards.',
    keyDuties: ['Implement ingestion pipelines', 'Optimize storage for time-series data', 'Collaborate with climate scientists', 'Contribute to internal CLI tools'],
  },
];

export function findOpportunity(id: string): DetailedOpportunity | undefined {
  return opportunities.find((opportunity) => opportunity.id === id);
}

