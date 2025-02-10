import multer from "multer";

// Store files in memory
const storage = multer.memoryStorage();

export const upload = multer({ storage, limits: { fileSize: 2000000 } });
