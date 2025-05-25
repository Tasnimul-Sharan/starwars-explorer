import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/characters", async (req, res) => {
  const { page = 1, search = "" } = req.query;
  const limit = 10;
  const currentPage = parseInt(page);

  try {
    let results = [];

    if (search) {
      const response = await axios.get(
        `https://www.swapi.tech/api/people/?search=${search}`
      );
      results = response.data.results;
    } else {
      const response = await axios.get(`https://www.swapi.tech/api/people`, {
        params: { page: currentPage, limit },
      });
      results = response.data.results;
    }

    const totalRecords = results.length;

    const paginatedResults = search
      ? results.slice((currentPage - 1) * limit, currentPage * limit)
      : results;

    res.json({
      message: "ok",
      results: paginatedResults,
      total_records: search ? totalRecords : 80, // SWAPI has 60 people
    });
  } catch (err) {
    console.error("Error fetching characters:", err);
    res.status(500).json({ error: "Failed to fetch characters" });
  }
});

app.get("/api/characters/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://swapi.tech/api/people/${req.params.id}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch character details" });
  }
});

app.get("/api/characters/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://swapi.tech/api/people/${req.params.id}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch character details" });
  }
});

export default app;
