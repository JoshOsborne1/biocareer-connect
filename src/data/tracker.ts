export type ApplicationStatus = 'saved' | 'draft' | 'applied' | 'interview' | 'offer';

export type ApplicationCard = {
  id: string;
  title: string;
  company: string;
  location: string;
  status: ApplicationStatus;
  deadline?: string;
  submittedOn?: string;
  interviewSlot?: string;
  notes?: string;
  tags?: string[];
};

export const trackerColumns: Array<{
  id: ApplicationStatus;
  title: string;
  color: string;
}> = [
  { id: 'saved', title: 'Saved', color: 'bg-slate-100' },
  { id: 'draft', title: 'Drafting', color: 'bg-indigo-50' },
  { id: 'applied', title: 'Applied', color: 'bg-teal-50' },
  { id: 'interview', title: 'Interview', color: 'bg-emerald-50' },
  { id: 'offer', title: 'Offer', color: 'bg-amber-50' },
];

export const trackerCards: ApplicationCard[] = [
  {
    id: 'app-01',
    title: 'Trainee BMS',
    company: 'Royal London Hospital',
    location: 'Whitechapel, London',
    status: 'saved',
    deadline: 'Due in 2 days',
    tags: ['Band 5', 'NHS'],
  },
  {
    id: 'app-02',
    title: 'Laboratory Technician',
    company: 'Francis Crick Institute',
    location: 'King’s Cross',
    status: 'draft',
    deadline: 'Draft by Friday',
    notes: 'Need to tailor immunology section',
    tags: ['Research', 'MSc sponsorship'],
  },
  {
    id: 'app-03',
    title: 'Band 5 Biomedical Scientist',
    company: 'Guy’s Hospital',
    location: 'London Bridge',
    status: 'applied',
    submittedOn: 'Yesterday',
    notes: 'Awaiting ATS update',
    tags: ['NHS', 'Shift rota'],
  },
  {
    id: 'app-04',
    title: 'Research Technician',
    company: 'UCL Institute of Immunity',
    location: 'Bloomsbury',
    status: 'interview',
    interviewSlot: 'Fri 14th · 14:00',
    notes: 'Panel interview · bring placement portfolio',
    tags: ['Academic', 'Hybrid'],
  },
  {
    id: 'app-05',
    title: 'Graduate Scientist',
    company: 'GSK Vaccines',
    location: 'Stevenage',
    status: 'offer',
    notes: 'Verbal offer received · reviewing relocation options',
    tags: ['Industry', 'Visa'],
  },
];

