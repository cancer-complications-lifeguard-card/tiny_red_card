export interface MedicalInfo {
  name: string;
  age: string;
  bloodType: string;
  idNumber: string;
  mainDiagnosis: string;
  surgeryHistory: string;
  allergies: string;
  otherDiseases: string;
}

export interface AnticoagulationInfo {
  isOnAnticoagulation: boolean;
  medicationType: string;
  lastTaken: string;
  stopReason: string;
}

export interface Medication {
  id: string;
  name: string;
  category: string;
  dosage: string;
  frequency: string;
  lastTaken: string;
  notes: string;
}

export interface CurrentMedications {
  medications: Medication[];
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface Hospital {
  name: string;
  emergency: string;
  department: string;
  address: string;
  features: string;
}

export interface Doctor {
  name: string;
  phone: string;
  department: string;
  hospital: string;
}

export interface ComplicationConfig {
  id: string;
  name: string;
  enabled: boolean;
  customWarnings?: string[];
  customTreatments?: string[];
}

export interface CardConfig {
  complications: ComplicationConfig[];
  medicalInfo: MedicalInfo;
  anticoagulation: AnticoagulationInfo;
  currentMedications: CurrentMedications;
  emergencyContacts: EmergencyContact[];
  hospitals: Hospital[];
  doctors: Doctor[];
  nursingServices: {
    name: string;
    phone: string;
    price: string;
    address: string;
    services: string;
  }[];
}

export type StepType = 'complications' | 'medical-info' | 'contacts-hospitals' | 'preview';