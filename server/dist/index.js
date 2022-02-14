"use strict";
const express = require("express");
const path = require("path");
const cors = require("cors");
const formidable = require("formidable");
const sharp = require("sharp");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
    credentials: true,
    origin: ["https://kostahassouros.netlify.app", "https://www.kostahassouros.com", "http://localhost:3000"]
}));
app.post("/api/upload", (req, res, next) => {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        const input = files.image.filepath;
        sharp(input)
            .resize(8, 8)
            .raw()
            .grayscale()
            .toBuffer({ resolveWithObject: true }).then((data) => {
            res.status(200).send(data);
        });
    });
});
app.listen(PORT, () => console.log(`Server is ON 🚀 http://localhost:${PORT}`));
