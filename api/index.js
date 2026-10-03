// Vercel Serverless Function entry point
// Imports the Express app from server.js and exports it as the default handler.
// Vercel's @vercel/node builder supports ES modules when package.json has "type": "module".
import app from '../server/server.js';

export default app;
