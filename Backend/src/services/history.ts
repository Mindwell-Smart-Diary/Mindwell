const { Pool } = require('pg');

// PostgreSQL connection configuration
const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'mindwell',
    password: 'postgres',
    port: 5432 // Change this if your PostgreSQL server is running on a different port
});

interface userHistory {
    likedActionsInMood: string[];
     dislikedActionsInMood: string[];
      lastDailySharing: string[];
       lastMoods: string[];
}
// : Promise<userHistory>
export const getUserHistory = async (userid: string, mood: string) => {
    try {
        console.log("getUserHistory")
        const query = 'SELECT * FROM users';
        const result = await pool.query(query);
        console.log(result.rows)
        return result.rows;
      } catch (err) {
        console.error(err);
      }
      return null
};