import { db } from "./db.js";

export function upsertUser({ email, name }) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (email, name) VALUES (?, ?)
       ON CONFLICT(email) DO UPDATE SET name=excluded.name`,
      [email, name],
      function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID || null, email, name });
      }
    );
  });
}
