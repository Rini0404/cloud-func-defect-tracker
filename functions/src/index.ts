import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DefectCategory, DefectsByCategory } from './types';
import { handleHumanError, handleMachineError, handleManufacturerError } from './controllers/addDefect';

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


export const getAllDefects = functions.https.onRequest(async (request, response) => {
  try {
    let allDefects: DefectsByCategory = {}; // Using the defined type

    // List of all categories
    const categories = [DefectCategory.HumanError, DefectCategory.MachineError, DefectCategory.ManufacturerError];

    // Iterate over each category
    for (const category of categories) {
      const categoryRef = admin.firestore().collection('defects').doc(category);
      const defectTypesSnapshot = await categoryRef.listCollections();

      allDefects[category] = {}; // TypeScript now understands the structure


      // Iterate over each defect type within the category
      for (const typeCollection of defectTypesSnapshot) {
        const typeSnapshot = await typeCollection.get();
        allDefects[category][typeCollection.id] = typeSnapshot.docs.map(doc => doc.data());
      }
    }

    response.status(200).json(allDefects);
  } catch (error) {
    console.error('Error in getAllDefects:', error);
    response.status(500).send('Internal Server Error');
  }
});