import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const limit = 10;
let cachedCharacters = [];

async function preloadAllCharacters() {
  let allResults = [];
  let nextUrl = `https://www.swapi.tech/api/people?page=1&limit=10`;

  while (nextUrl) {
    const response = await axios.get(nextUrl);
    const data = response.data;
    if (data.results) allResults.push(...data.results);
    nextUrl = data.next || null;
  }

  cachedCharacters = allResults;
}

preloadAllCharacters();

app.get("/api/characters", async (req, res) => {
  const { page = 1, search = "" } = req.query;
  const currentPage = parseInt(page);

  try {
    let results = [];
    let totalRecords = 0;

    if (search) {
      const lowerSearch = search.toLowerCase();
      const filtered = cachedCharacters.filter((character) =>
        character.name.toLowerCase().includes(lowerSearch)
      );

      totalRecords = filtered.length;

      const start = (currentPage - 1) * limit;
      const end = start + limit;
      results = filtered.slice(start, end);
    } else {
      const start = (currentPage - 1) * limit;
      const end = start + limit;
      results = cachedCharacters.slice(start, end);
      totalRecords = cachedCharacters.length;
    }

    res.json({
      message: "ok",
      results,
      total_records: totalRecords,
    });
  } catch (err) {
    console.error("Error fetching characters:", err);
    res.status(500).json({ error: "Failed to fetch characters" });
  }
});

app.get("/api/characters/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.swapi.tech/api/people/${req.params.id}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch character details" });
  }
});

export default app;
