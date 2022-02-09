const express = require("express");
const path = require("path");
const cors = require("cors");
const formidable = require("formidable");
const sharp = require("sharp");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
	credentials: true,
	origin: ["https://www.kostahassouros.com", "http://localhost:3000"]
}));


app.post("/api/upload", (req: any, res: any, next: any) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err: any, fields: any, files: any) => {
        if (err) {
            next(err);
            return;
        }

		const input = files.image.filepath;
		sharp(input)
			.resize(8, 8)
			.raw()
			.grayscale()
			.toBuffer({ resolveWithObject: true }).then((data: any) => {
				res.status(200).send(data);
			});
    });
});

app.listen(PORT, () => console.log(`Server is ON 🚀 http://localhost:${PORT}`));