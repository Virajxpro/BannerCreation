
import express from "express";
import cors from "cors";
import multer from "multer";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const upload = multer();

app.use(cors());
app.use(express.json());

// ✅ Create Banner
app.post("/api/banners", upload.single("banner"), async (req, res) => {
  try {
    const { brandName, title, percentageOff, gradientType, categories } =
      req.body;

    const bannerBuffer = req.file ? req.file.buffer : null;

    const banner = await prisma.banner.create({
      data: {
        brandName,
        title,
        percentageOff: percentageOff ? parseInt(percentageOff) : 0,
        gradientType,
        categories: categories ? JSON.parse(categories) : [], // ✅ store as JSON
        banner: bannerBuffer, // ✅ binary stored
      },
    });

    res.json({ message: "Banner created successfully", banner });
  } catch (err) {
    console.error("Error saving banner:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ Get All Banners
app.get("/api/banners", async (req, res) => {
  try {
    const banners = await prisma.banner.findMany();
    const formatted = banners.map((b) => ({
      ...b,
      categories: b.categories || [], // ✅ JSON stays array
      banner: b.banner ? b.banner.toString("base64") : null, // ✅ binary → base64
    }));
    res.json(formatted);
  } catch (err) {
    console.error("Error fetching banners:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);
