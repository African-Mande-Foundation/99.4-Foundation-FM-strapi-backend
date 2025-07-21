import admin from 'firebase-admin';
import path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../config/firebaseServiceAccountKey.json');

try {
    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccountPath),
        });
        console.log('Firebase Admin initialized successfully.');
    }
} catch (error) {
    console.error('Firebase Admin initialization error:', error);
}

export default admin;