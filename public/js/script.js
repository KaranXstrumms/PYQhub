// Get DOM elements
const searchBtn = document.querySelector('.btn-search');
const resultsDiv = document.getElementById('results');
const examType = document.getElementById('exam-type');
const academicYear = document.getElementById('academic-year');
const branch = document.getElementById('branch');

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

    // Render each paper as a card
    papers.forEach((paper) => {
      const card = document.createElement('div');
      card.className = 'paper-card';

      card.innerHTML = `
        <div class="paper-info">
          <span class="badge ${paper.examType === 'Mid-Sem' ? 'mid-sem' : 'end-sem'}">
            ${paper.examType}
          </span>
          <h3 class="subject-name">${paper.subject}</h3>
          <div class="meta-info">
            <span>${paper.branch}</span> • <span>${paper.year}</span>
          </div>
        </div>
        <a href="${paper.pdfUrl}" target="_blank" class="btn-download">Download PDF</a>
      `;

      resultsDiv.appendChild(card);
    });
  } catch (error) {
    resultsDiv.innerHTML = '<p class="no-results">Something went wrong. Please try again.</p>';
    console.error('Error fetching papers:', error);
  }
});
