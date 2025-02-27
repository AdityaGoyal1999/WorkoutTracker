/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Cloud functions for Firebase SDK to create Cloud Functions and triggers
import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { onDocumentCreated } from "firebase-functions/v2/firestore";

// The firebase Admin SDK to access Firestore.
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";
import { defineString } from "firebase-functions/params";

initializeApp();

const EXERCISE_DB_URL = 'https://exercisedb.p.rapidapi.com';
const exerciseDbKey = defineString('EXERCISEDB_KEY');

const db = getFirestore();

export const addMessage = onRequest(async (req, res) => {
    const original = req.query.text;
    const writeResult = await getFirestore()
        .collection('messages')
        .add({original: original});

    res.json({result: `Message with ID: ${writeResult.id} added.`});
})

export const makeUppercase = onDocumentCreated("/messages/{documentId}", (event) => {
    const original = event.data?.data()?.original;

    logger.log("Uppercasing", event.params.documentId, original);
    const uppercase = original.toUpperCase();

    return event.data?.ref.set({uppercase}, {merge: true});
})

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});


export const getExercises = onRequest(async (req, res) => {
    try {
        const apiKey = exerciseDbKey.value();
        const response = await axios.get(`${EXERCISE_DB_URL}/exercises`, {
            headers: {
              'X-RapidAPI-Key': apiKey,
            }
          });
        
          res.json(response.data);
    }
    catch (error) {
        logger.error("Error fetching exercises:", error);
        res.status(500).send("Error fetching exercises");
    }
})

export const searchExercises = onRequest(async (req, res) => {
    try {
        const apiKey = exerciseDbKey.value();
        const query = req.query.name;

        if (!query) {
            res.status(400).send("Query parameter 'name' can't be left empty.");
            return;
        }

        const response = await axios.get(`${EXERCISE_DB_URL}/exercises/name/${query.toLowerCase()}`, {
            headers: {
                'X-RapidAPI-Key': apiKey,
            }
        })

        // const data = await response.json();
        res.json(response.data);
    }
    catch (error) {
        logger.error("Error searching exercises:", error);
        res.status(500).send("Error searching exercises");
    }
})

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const addExerciseHistory = onRequest(async (req, res) => {
  try {
    const { exerciseName, workoutName, sets, userId } = req.body;

    // Input validation
    if (!exerciseName || !workoutName || !sets || !userId) {
      res.status(400).json({
        error: "Missing required fields",
        details: {
          exerciseName: !exerciseName,
          workoutName: !workoutName,
          sets: !sets,
          userId: !userId
        }
      });
      return;
    }

    // TODO: Can be removed. Don't really have to do this
    // Validate sets structure
    // if (!Array.isArray(sets) || sets.length === 0) {
    //   res.status(400).json({
    //     error: "Invalid sets data",
    //     details: "Sets must be a non-empty array"
    //   });
    //   return;
    // }

    // for (const set of sets) {
    //   if (!set.weight || !set.reps || typeof set.completed !== 'boolean') {
    //     res.status(400).json({
    //       error: "Invalid set data",
    //       details: "Each set must have weight, reps, and completed status"
    //     });
    //     return;
    //   }
    // }

    // Check if user exists and create if not
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      // Create user document with metadata
      await userRef.set({
        createdAt: new Date(),
        lastActive: new Date(),
        exerciseCount: 0
      });
    } else {
      // Update last active timestamp
      await userRef.update({
        lastActive: new Date()
      });
    }

    const exerciseSession = {
      date: new Date(),
      workoutName,
      sets,
      createdAt: new Date()
    };

    // Get a reference to the exercise document
    const userExercisesRef = userRef.collection('exercises');
    const exerciseDoc = userExercisesRef.doc(exerciseName);
    
    // Check if this is the first time this exercise is being logged
    const exerciseData = await exerciseDoc.get();
    if (!exerciseData.exists) {
      // Initialize exercise metadata
      await exerciseDoc.set({
        name: exerciseName,
        firstLoggedAt: new Date(),
        totalSessions: 0,
        personalBest: {
          weight: Math.max(...sets.map(s => s.weight)),
          reps: Math.max(...sets.map(s => s.reps)),
          oneRM: Math.max(...sets.map(s => s.oneRM || 0))
        }
      });

      // Increment user's exercise count
      await userRef.update({
        exerciseCount: FieldValue.increment(1)
      });
    }

    // Add the history entry
    const historyCollection = exerciseDoc.collection('history');
    await historyCollection.add(exerciseSession);

    // Get current personal bests
    const currentData = (await exerciseDoc.get()).data() || { personalBest: { weight: 0, reps: 0, oneRM: 0 } };
    const currentBests = currentData.personalBest || { weight: 0, reps: 0, oneRM: 0 };

    // Calculate new personal bests
    const newPersonalBests = {
      weight: Math.max(currentBests.weight, ...sets.map(s => s.weight || 0)),
      reps: Math.max(currentBests.reps, ...sets.map(s => s.reps || 0)),
      oneRM: Math.max(currentBests.oneRM, ...sets.map(s => s.oneRM || 0))
    };

    // Update exercise metadata
    await exerciseDoc.update({
      lastActive: new Date(),
      totalSessions: FieldValue.increment(1),
      personalBest: newPersonalBests
    });
    
    res.status(200).json({ 
      message: "Exercise history added successfully",
      exerciseId: exerciseDoc.id,
      personalBests: newPersonalBests
    });
  } catch (error) {
    logger.error("Error adding exercise history:", error);
    res.status(500).json({
      error: "Error adding exercise history",
      details: error.message
    });
  }
});

export const fetchExerciseHistory = onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({
      error: "Method not allowed",
      details: "This endpoint only accepts POST requests"
    });
    return;
  }

  try {
    const { exerciseName, userId } = req.body;

    // Log received data for debugging
    logger.info("Received request:", {
      method: req.method,
      body: req.body,
      exerciseName,
      userId
    });

    if (!exerciseName || !userId) {
      res.status(400).json({
        error: "Missing required fields",
        details: {
          exerciseName: !exerciseName,
          userId: !userId
        }
      });
      return;
    }

    const historyRef = db
      .collection('users')
      .doc(userId)
      .collection('exercises')
      .doc(exerciseName)
      .collection('history');

    const querySnapshot = await historyRef
      .orderBy('date', 'desc')
      .limit(10) // Limit to last 10 sessions by default
      .get();

    const history = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Get exercise metadata as well
    const exerciseDoc = await db
      .collection('users')
      .doc(userId)
      .collection('exercises')
      .doc(exerciseName)
      .get();

    const exerciseData = exerciseDoc.exists ? exerciseDoc.data() : null;

    res.status(200).json({
      history,
      metadata: exerciseData ? {
        totalSessions: exerciseData.totalSessions,
        firstLoggedAt: exerciseData.firstLoggedAt,
        lastActive: exerciseData.lastActive,
        personalBest: exerciseData.personalBest
      } : null
    });
  } catch (error) {
    logger.error("Error fetching exercise history:", error);
    res.status(500).json({
      error: "Error fetching exercise history",
      details: error.message
    });
  }
});
