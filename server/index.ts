const app = require("express")();
const http = require("http").createServer(app);
const cors = require("cors");
const formidable = require("formidable");
const sharp = require("sharp");

const PORT = process.env.PORT || 5000;

app.use(cors());

app.post("/api/upload", (req: any, res: any, next: any) => {
	const size = parseInt(req.query.size);
    const form = formidable({ multiples: true });

    form.parse(req, (err: any, fields: any, files: any) => {
        if (err) {
            next(err);
            return;
        }

		const input = files.image.filepath;
		sharp(input)
			.resize(size, size)
			.raw()
			.grayscale()
			.toBuffer({ resolveWithObject: true }).then((data: any) => {
				res.status(200).send(data);
			});
    });
});

app.listen(PORT, () => console.log(`Server is ON 🚀 http://localhost:${PORT}`));