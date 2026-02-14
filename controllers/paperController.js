const Paper = require('../models/Paper');

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

// Add a new paper
exports.createPaper = async (req, res) => {
  const paper = new Paper({
    subject: req.body.subject,
    branch: req.body.branch,
    examType: req.body.examType,
    year: req.body.year,
    pdfUrl: req.body.pdfUrl
  });

  try {
    const newPaper = await paper.save();
    res.status(201).json(newPaper);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
