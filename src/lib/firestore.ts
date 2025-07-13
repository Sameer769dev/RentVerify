
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '@/lib/firebase';
import type { Listing } from '@/types';

// Helper function to upload an image and get its URL
export const uploadImage = async (file: File): Promise<string> => {
  if (!auth.currentUser) {
    throw new Error('You must be logged in to upload an image.');
  }
  const storageRef = ref(storage, `listings/${auth.currentUser.uid}/${Date.now()}-${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

// Add a new listing to Firestore
export const addListing = async (listingData: Omit<Listing, 'id'>) => {
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
