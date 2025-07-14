
'use server';

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import type { Listing, UserProfile } from '@/types';
import { google } from 'googleapis';

// Helper function to upload an image and get its URL
export const uploadImage = async (file: File, accessToken: string): Promise<string> => {
  if (!auth.currentUser) {
    throw new Error('You must be logged in to upload an image.');
  }

  const oAuth2Client = new google.auth.OAuth2();
  oAuth2Client.setCredentials({ access_token: accessToken });

  const drive = google.drive({ version: 'v3', auth: oAuth2Client });

  // 1. Find or create a folder for the app
  let folderId: string | null = null;
  const folderName = 'GharBhada_Uploads';

  try {
    const res = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`,
      fields: 'files(id, name)',
    });
    
    if (res.data.files && res.data.files.length > 0) {
      folderId = res.data.files[0].id!;
    } else {
      const folderMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
      };
      const folder = await drive.files.create({
        requestBody: folderMetadata,
        fields: 'id',
      });
      folderId = folder.data.id!;
    }

    if (!folderId) {
      throw new Error('Could not create or find the app folder in Google Drive.');
    }

    // 2. Upload the file to the folder
    const fileMetadata = {
      name: `${Date.now()}-${file.name}`,
      parents: [folderId],
    };
    
    // Convert File to a readable stream for the API
    const buffer = Buffer.from(await file.arrayBuffer());
    const media = {
      mimeType: file.type,
      body: require('stream').Readable.from(buffer),
    };

    const driveFile = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink, webContentLink',
    });

    if (!driveFile.data.id) {
       throw new Error('File upload to Google Drive failed.');
    }

    // 3. Make the file publicly accessible (for viewing in the app)
    await drive.permissions.create({
        fileId: driveFile.data.id,
        requestBody: {
            role: 'reader',
            type: 'anyone',
        }
    });

    // 4. Return a direct download link
    const webContentLink = driveFile.data.webContentLink;
    if (!webContentLink) {
        // Fallback to webViewLink if content link is not available
        return driveFile.data.webViewLink || `https://drive.google.com/file/d/${driveFile.data.id}/view`;
    }
    // The webContentLink is better for direct embedding if available
    return webContentLink.replace('&export=download', '');
  
  } catch (error) {
    console.error('Google Drive upload error:', error);
    // For this POC, we'll throw. In production, you might want more graceful error handling.
    throw new Error('Failed to upload image to Google Drive.');
  }
};

// Add a new listing to Firestore
export const addListing = async (listingData: Omit<Listing, 'id' | 'owner' | 'createdAt'>) => {
  if (!auth.currentUser) {
    throw new Error('You must be logged in to add a listing.');
  }

  const listingWithUser = {
    ...listingData,
    ownerId: auth.currentUser.uid,
    createdAt: new Date(),
  };

  const docRef = await addDoc(collection(db, 'listings'), listingWithUser);
  return docRef.id;
};

// Update an existing listing
export const updateListing = async (listingId: string, dataToUpdate: Partial<Listing>) => {
    const listingRef = doc(db, "listings", listingId);
    await updateDoc(listingRef, dataToUpdate);
};


// Get all listings from Firestore
export const getListings = async (): Promise<Listing[]> => {
  const querySnapshot = await getDocs(collection(db, 'listings'));
  const listings: Listing[] = [];
  querySnapshot.forEach((doc) => {
    listings.push({ id: doc.id, ...doc.data() } as Listing);
  });
  return listings;
};

// Get a single listing by its ID
export const getListing = async (id: string): Promise<Listing | null> => {
  const docRef = doc(db, 'listings', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Listing;
  } else {
    return null;
  }
};

// Get listings for the current user
export const getUserListings = async (): Promise<Listing[]> => {
    if (!auth.currentUser) {
        return [];
    }
    const q = query(collection(db, "listings"), where("ownerId", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    const listings: Listing[] = [];
    querySnapshot.forEach((doc) => {
        listings.push({ id: doc.id, ...doc.data() } as Listing);
    });
    return listings;
}

// Get all users from Firestore
export const getUsers = async (): Promise<UserProfile[]> => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users: UserProfile[] = [];
    querySnapshot.forEach((doc) => {
        users.push(doc.data() as UserProfile);
    });
    return users;
};


// Create or update a user profile in Firestore
export const createUserProfile = async (user: User, additionalData: Partial<UserProfile>) => {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        // New user, create the profile
        const { displayName, email, photoURL, uid } = user;
        try {
            await setDoc(userDocRef, {
                uid,
                displayName: displayName || 'New User',
                email,
                photoURL,
                createdAt: new Date(),
                ...additionalData,
            });
        } catch (error) {
            console.error("Error creating user profile in Firestore: ", error);
            throw error;
        }
    }
    // If user exists, we don't update their role or other info on subsequent logins
    // unless specifically intended.
}
