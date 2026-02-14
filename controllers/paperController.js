const Paper = require('../models/Paper');
const cloudinary = require('../config/cloudinary');

// Get all papers (with optional filtering)
exports.getAllPapers = async (req, res) => {
  try {
    const filter = {};

    if (req.query.branch) filter.branch = req.query.branch;
    if (req.query.examType) filter.examType = req.query.examType;
    if (req.query.year) filter.year = Number(req.query.year);

    const papers = await Paper.find(filter);
    res.json(papers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new paper (Protected with Cloudinary Upload)
exports.createPaper = async (req, res) => {
  try {
    // 1. Simple Authorization Check
    const authHeader = req.headers.authorization;
    if (authHeader !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // 2. Check if file exists
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a PDF file" });
    }

    // 3. Upload PDF to Cloudinary using upload_stream
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "raw", folder: "pyqhub_papers" },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const cloudinaryResult = await streamUpload(req);

    // 4. Save to MongoDB
    const paper = new Paper({
      subject: req.body.subject,
      branch: req.body.branch,
      examType: req.body.examType,
      year: Number(req.body.year),
      pdfUrl: cloudinaryResult.secure_url
    });

    const newPaper = await paper.save();
    res.status(201).json(newPaper);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
