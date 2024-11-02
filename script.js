// Example data (an array of items)
const items = [
  "Item 1", "Item 2", "Item 3", "Item 4", "Item 5",
  "Item 6", "Item 7", "Item 8", "Item 9", "Item 10",
    "Item 11", "Item 12", "Item 13", "Item 14", "Item 15",
  "Item 16", "Item 17", "Item 18", "Item 19", "Item 20"
];

// Pagination settings
const itemsPerPage = 5;
let currentPage = 1;
const totalPages = Math.ceil(items.length / itemsPerPage);

// Function to render the items for the current page
function renderPage() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = items.slice(start, end);

  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = pageItems.map(item => `<p>${item}</p>`).join("");

  // Update page indicator and button states
  document.getElementById("pageIndicator").textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = currentPage === totalPages;
}

// Functions for navigating pages
function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
}

// Initial render
renderPage();
