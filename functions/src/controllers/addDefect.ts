import * as admin from 'firebase-admin';

import { DefectCategory } from "../types";

export async function handleHumanError(type: string, date: string) {
  // Logic to handle human error types
  await addToDatabase(DefectCategory.HumanError, type, date);
}

export async function handleMachineError(type: string, date: string) {
  // Logic to handle machine error types
  await addToDatabase(DefectCategory.MachineError, type, date);
}

export async function handleManufacturerError(type: string, date: string) {
  // Logic to handle manufacturer error types
  await addToDatabase(DefectCategory.ManufacturerError, type, date);
}

async function addToDatabase(category: string, type: string, date: string) {
  // Add defect to Firestore
  const defectRef = admin.firestore()
      .collection('defects')
      .doc(category)
      .collection(type)
      .doc();

  await defectRef.set({
      timestamp: date || new Date().toISOString(),
  });
}
