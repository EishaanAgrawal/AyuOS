/**
 * FICTIONAL DEMO DATA — for UI previews only.
 *
 * Every value below is invented placeholder data in the style of the demo
 * recording. Nothing here is real medical information, and nothing here
 * belongs to a real person. Replace with Supabase-backed data once the
 * backend is connected.
 */

export interface DemoUser {
  name: string;
  bloodType: string;
  avatarInitials: string;
}

export interface DemoMedicine {
  id: string;
  name: string;
  strength: string;
  schedule: string;
  nextDose: string;
  takenToday: boolean;
}

export interface DemoDocument {
  docId: string;
  title: string;
  category: 'Lab Report' | 'Prescription' | 'Discharge Summary';
  date: string;
  source: string;
  verified: boolean;
}

export interface DemoAppointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
}

export const demoUser: DemoUser = {
  name: 'Eishaan Shah',
  bloodType: 'O+',
  avatarInitials: 'ES',
};

export const demoMedicines: DemoMedicine[] = [
  {
    id: 'med-1',
    name: 'Atorvastatin',
    strength: '20 mg',
    schedule: 'Once daily · after dinner',
    nextDose: 'Today, 9:30 PM',
    takenToday: true,
  },
  {
    id: 'med-2',
    name: 'Metformin',
    strength: '500 mg',
    schedule: 'Twice daily · with breakfast & dinner',
    nextDose: 'Today, 9:30 PM',
    takenToday: false,
  },
];

export const demoDocuments: DemoDocument[] = [
  {
    docId: 'doc-1',
    title: 'Lipid Panel — Annual Health Check',
    category: 'Lab Report',
    date: '12 Oct 2026',
    source: 'City Diagnostics',
    verified: true,
  },
  {
    docId: 'doc-2',
    title: 'Cardiology Prescription',
    category: 'Prescription',
    date: '28 Sep 2026',
    source: 'Dr. Rao',
    verified: true,
  },
  {
    docId: 'doc-3',
    title: 'Discharge Summary — Day Care',
    category: 'Discharge Summary',
    date: '03 Aug 2026',
    source: 'Sunrise Hospital',
    verified: false,
  },
];

export const demoAppointments: DemoAppointment[] = [
  {
    id: 'appt-1',
    doctor: 'Dr. Rao',
    specialty: 'Cardiology',
    date: 'Sat, 17 Oct 2026',
    time: '10:30 AM',
    location: 'Sunrise Hospital, OPD 3',
  },
  {
    id: 'appt-2',
    doctor: 'Dr. Iyer',
    specialty: 'General Physician',
    date: 'Wed, 21 Oct 2026',
    time: '6:00 PM',
    location: 'City Clinic, Room 2',
  },
];
