export type ProfileMetric = {
  label: string;
  value: string;
  caption: string;
};

export type AttributeStatus = 'met' | 'partial' | 'missing';

export type ProfileAttribute = {
  id: string;
  label: string;
  category: 'Qualifications' | 'Techniques' | 'Regulatory' | 'Soft Skills';
  status: AttributeStatus;
  note: string;
};

export type Preference = {
  label: string;
  values: string[];
};

export type ProfileAction = {
  title: string;
  description: string;
};

export const profileMetrics: ProfileMetric[] = [
  {
    label: 'Match Coverage',
    value: '82%',
    caption: '24 / 29 attributes verified',
  },
  {
    label: 'HCPC Progress',
    value: '70%',
    caption: 'Competencies uploaded · 3 outstanding',
  },
  {
    label: 'Interview Readiness',
    value: 'High',
    caption: '2 mock interviews completed this month',
  },
];

export const profileAttributes: ProfileAttribute[] = [
  {
    id: 'attr-ibms',
    label: 'IBMS-accredited BSc Biomedical Science',
    category: 'Qualifications',
    status: 'met',
    note: 'First-class dissertation in immune signalling',
  },
  {
    id: 'attr-hcpc',
    label: 'HCPC Registration',
    category: 'Qualifications',
    status: 'partial',
    note: 'Portfolio submitted · verification meeting scheduled',
  },
  {
    id: 'attr-msc',
    label: 'MSc Immunology',
    category: 'Qualifications',
    status: 'missing',
    note: 'Optional for research assistant roles – explore sponsorship',
  },
  {
    id: 'attr-haem',
    label: 'Haematology bench rotation',
    category: 'Techniques',
    status: 'met',
    note: 'Sysmex XN, Stago STA-R, gel card cross-match',
  },
  {
    id: 'attr-transfusion',
    label: 'Blood transfusion competency',
    category: 'Techniques',
    status: 'partial',
    note: 'Observed cross-match · needs supervised practice log',
  },
  {
    id: 'attr-flow',
    label: 'Flow cytometry',
    category: 'Techniques',
    status: 'missing',
    note: 'Highlighted in multiple research roles · consider short course',
  },
  {
    id: 'attr-glp',
    label: 'GLP / ISO15189 awareness',
    category: 'Regulatory',
    status: 'met',
    note: 'Documented in placement portfolio with QA sign-off',
  },
  {
    id: 'attr-gcp',
    label: 'Good Clinical Practice (GCP)',
    category: 'Regulatory',
    status: 'partial',
    note: 'Free NIHR module booked for next week',
  },
  {
    id: 'attr-comms',
    label: 'Patient-facing communication',
    category: 'Soft Skills',
    status: 'met',
    note: 'Outreach lead for university STEM ambassador programme',
  },
  {
    id: 'attr-leadership',
    label: 'Leadership / mentoring',
    category: 'Soft Skills',
    status: 'missing',
    note: 'Opportunity to mentor first-year lab buddies next term',
  },
];

export const profilePreferences: Preference[] = [
  {
    label: 'Preferred locations',
    values: ['London (Zone 1-3)', 'Oxford', 'Hybrid / remote research'],
  },
  {
    label: 'Visa / sponsorship',
    values: ['Requires Tier 2 capable employer', 'Open to NHS trusts & universities'],
  },
  {
    label: 'Role focus',
    values: ['Band 5 Biomedical Scientist', 'Research Assistant (Immunology)', 'Sponsored MSc pathways'],
  },
  {
    label: 'Working pattern',
    values: ['Full-time', '4 day compressed week', 'Willing to join 1 in 4 weekend rota'],
  },
];

export const profileActions: ProfileAction[] = [
  {
    title: 'Finish HCPC verification',
    description: 'Upload final supervisor references before 12 Dec to secure January registration window.',
  },
  {
    title: 'Book flow cytometry short course',
    description: 'Imperial CPD programme has January intake · strengthens research applications.',
  },
  {
    title: 'Request transfusion mentorship',
    description: 'Email St Thomas’ placement lead to log supervised antibody identification sessions.',
  },
];

