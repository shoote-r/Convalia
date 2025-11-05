type Note = {
  rehab?: string;
  diet?: string;
  prescription?: string;
};

const storage = new Map<string, Note>();

export function savePatientNote(patientId: string, note: Note) {
  storage.set(patientId, note);
}

export function getPatientNote(patientId: string): Note | undefined {
  return storage.get(patientId);
}

export function clearAll() {
  storage.clear();
}
