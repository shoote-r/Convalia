type Vitals = {
  pulse?: number;
  bp?: string;
  spo2?: number;
};

type Note = {
  id: string;
  timestamp: number;
  rehab?: string;
  diet?: string;
  prescription?: string;
};

type Patient = {
  id: string;
  name: string;
  status: 'normal' | 'monitor' | 'reconsult';
  vitals: Vitals;
  notes: Note[];
};

const patients: Record<string, Patient> = {
  '1': {
    id: '1',
    name: 'David Laroche',
    status: 'normal',
    vitals: { pulse: 72, bp: '120/80', spo2: 98 },
    notes: [],
  },
  '2': {
    id: '2',
    name: 'Marine Dupont',
    status: 'monitor',
    vitals: { pulse: 88, bp: '130/85', spo2: 95 },
    notes: [],
  },
  '3': {
    id: '3',
    name: 'Paul Martin',
    status: 'reconsult',
    vitals: { pulse: 102, bp: '150/95', spo2: 92 },
    notes: [],
  },
};

function getAllPatients(): Patient[] {
  return Object.values(patients);
}

function getPatient(id: string): Patient | undefined {
  return patients[id];
}

function updateStatus(id: string, status: Patient['status']) {
  if (!patients[id]) return;
  patients[id].status = status;
}

function addNote(id: string, note: Omit<Note, 'id' | 'timestamp'>) {
  if (!patients[id]) return;
  const newNote: Note = {
    id: String(Date.now()),
    timestamp: Date.now(),
    ...note,
  };
  patients[id].notes.unshift(newNote);
  return newNote;
}

export { getAllPatients, getPatient, updateStatus, addNote };
