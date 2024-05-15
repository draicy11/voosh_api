import app from './src/config/express.js';
import dotenv from 'dotenv';

dotenv.config();
// Set the port
const PORT = process.env.PORT || 3000;


// listen to requests
app.listen(PORT, () => console.log(`server started on port ${PORT}`));