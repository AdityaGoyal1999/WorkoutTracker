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
import { getFirestore } from "firebase-admin/firestore";

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";
import { defineString } from "firebase-functions/params";

initializeApp();

const EXERCISE_DB_URL = 'https://exercisedb.p.rapidapi.com';
const exerciseDbKey = defineString('EXERCISEDB_KEY');

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
