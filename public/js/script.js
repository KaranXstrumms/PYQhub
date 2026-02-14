// Get DOM elements
const searchBtn = document.querySelector('.btn-search');
const resultsDiv = document.getElementById('results');
const examType = document.getElementById('exam-type');
const academicYear = document.getElementById('academic-year');
const branch = document.getElementById('branch');
const paperTemplate = document.getElementById('paper-template');

// Handle search button click
searchBtn.addEventListener('click', async () => {
  // Build query parameters
  const params = new URLSearchParams();

  if (examType.value) params.append('examType', examType.value);
  if (academicYear.value) params.append('year', academicYear.value);
  if (branch.value) params.append('branch', branch.value);

  try {
    // Fetch papers from API
    const response = await fetch(`/api/papers?${params.toString()}`);
    const papers = await response.json();

    // Clear previous results
    resultsDiv.innerHTML = '';

    // Check if papers were found
    if (papers.length === 0) {
      resultsDiv.innerHTML = '<p class="no-results">No papers found.</p>';
      return;
    }

    // Render each paper using the template
    papers.forEach((paper) => {
      // Clone the template content
      const clone = paperTemplate.content.cloneNode(true);

      // Fill in the data
      const badge = clone.querySelector('.badge');
      badge.textContent = paper.examType;
      badge.classList.add(paper.examType === 'Mid-Sem' ? 'mid-sem' : 'end-sem');

      clone.querySelector('.subject-name').textContent = paper.subject;
      clone.querySelector('.branch').textContent = paper.branch;
      clone.querySelector('.year').textContent = paper.year;
      clone.querySelector('.btn-download').href = paper.pdfUrl;

      // Append to results
      resultsDiv.appendChild(clone);
    });
  } catch (error) {
    resultsDiv.innerHTML = '<p class="no-results">Something went wrong. Please try again.</p>';
    console.error('Error fetching papers:', error);
  }
});
