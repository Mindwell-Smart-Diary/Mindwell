const { Pool } = require('pg');

// PostgreSQL connection configuration
const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'mindwell',
    password: 'postgres',
    port: 5432
});

interface userHistory {
    likedActionsInMood: string[];
     dislikedActionsInMood: string[];
      lastDailySharing: string[];
       lastMoods: string[];
}
// : Promise<userHistory>
export const getUserHistory = async (userid: number, mood: string) => {
    try {
        console.log("getUserHistory")
        const query = 'SELECT s.id, s.title AS suggestion_title, s.rank, s.execution_date FROM suggestions s INNER JOIN events e ON s.event_id = e.id WHERE e.user_id = ' + userid + ' AND e.mood = ' + mood + ';';
        const result = await pool.query(query);
        console.log(result.rows)
        return result.rows;
      } catch (err) {
        console.error(err);
      }
      return null
};