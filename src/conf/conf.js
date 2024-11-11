// conf.js

import dotenv from 'dotenv';

 const isNode = typeof process !== 'undefined' && process.release.name === 'node';

if (isNode) {
   dotenv.config();
}

// Configuration object
const conf = {
  appwriteUrl: isNode ? process.env.VITE_APPWRITE_URL : import.meta.env.VITE_APPWRITE_URL,
  appwriteProjectId: isNode ? process.env.VITE_APPWRITE_PROJECT_ID : import.meta.env.VITE_APPWRITE_PROJECT_ID,
  appwriteDatabaseId: isNode ? process.env.VITE_APPWRITE_DATABASE_ID : import.meta.env.VITE_APPWRITE_DATABASE_ID,
  appwriteCollectionId: isNode ? process.env.VITE_APPWRITE_COLLECTION_ID : import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  appwriteCommentCollectionId: isNode ? process.env.VITE_APPWRITE_COMMENT_COLLECTION_ID : import.meta.env.VITE_APPWRITE_COMMENT_COLLECTION_ID,
  appwriteBucketId: isNode ? process.env.VITE_APPWRITE_BUCKET_ID : import.meta.env.VITE_APPWRITE_BUCKET_ID,
};

export default conf;
