import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DefectCategory } from './types';

admin.initializeApp();

export const addDefect = functions.https.onRequest(async (request, response) => {
    // Assuming the request body contains 'type', 'category', and 'date'
    const { type, category, date } = request.body;

    try {
        // Validate the request
        if (!type || !category || !date) {
            response.status(400).send('Missing required fields');
            return;
        }

        console.log('Adding defect:', type, category, date)
        console.log('DefectCategory:', DefectCategory.HumanError)

        // Handle different categories and types
        switch (category) {
            case DefectCategory.HumanError:
                await handleHumanError(type, date);
                break;
            case DefectCategory.MachineError:
                await handleMachineError(type, date);
                break;
            case DefectCategory.ManufacturerError:
                await handleManufacturerError(type, date);
                break;
            default:
                response.status(400).send('Invalid category');
                return;
        }

        response.status(200).send(`Defect recorded: ${category} - ${type}`);
    } catch (error) {
        console.error('Error in addDefect:', error);
        response.status(500).send('Internal Server Error');
    }
});

async function handleHumanError(type: string, date: string) {
    // Logic to handle human error types
    await addToDatabase('HumanError', type, date);
}

async function handleMachineError(type: string, date: string) {
    // Logic to handle machine error types
    await addToDatabase('MachineError', type, date);
}

async function handleManufacturerError(type: string, date: string) {
    // Logic to handle manufacturer error types
    await addToDatabase('ManufacturerError', type, date);
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
