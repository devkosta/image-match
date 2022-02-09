const express = require("express");
const path = require("path");
const cors = require("cors");
const formidable = require("formidable");
const sharp = require("sharp");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req: any, res: any) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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