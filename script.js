// Sample data
const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`); // 100 sample items
let itemsPerPage = 5;
const pageButtonLimit = 5;
let currentPage = 1;

const itemContainer = document.getElementById("item-container");
const paginationContainer = document.getElementById("pagination-container");
const itemsPerPageSelect = document.getElementById("itemsPerPage");

// Display items on the current page
function displayItems(page) {
  itemContainer.innerHTML = "";
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = items.slice(start, end);

  pageItems.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.textContent = item;
    itemContainer.appendChild(itemElement);
  });
}

// Create pagination buttons with a range
function setupPagination(totalPages, currentPage) {
  paginationContainer.innerHTML = "";

  // Previous button
  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.disabled = currentPage === 1;
  prevButton.onclick = () => goToPage(currentPage - 1);
  paginationContainer.appendChild(prevButton);

  // Page buttons with "..." for large page sets
  let startPage = Math.max(1, currentPage - Math.floor(pageButtonLimit / 2));
  let endPage = startPage + pageButtonLimit - 1;

  if (endPage >= totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pageButtonLimit + 1);
  }

  if (startPage > 1) {
    addPageButton(1);
    if (startPage > 2) addEllipsis();
  }

  for (let i = startPage; i <= endPage; i++) {
    addPageButton(i, i === currentPage);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) addEllipsis();
    addPageButton(totalPages);
  }

  // Next button
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = currentPage === totalPages;
  nextButton.onclick = () => goToPage(currentPage + 1);
  paginationContainer.appendChild(nextButton);
}

// Helper to add page buttons
function addPageButton(page, isActive = false) {
  const pageButton = document.createElement("button");
  pageButton.textContent = page;
  if (isActive) pageButton.classList.add("active");
  pageButton.onclick = () => goToPage(page);
  paginationContainer.appendChild(pageButton);
}

// Helper to add ellipsis
function addEllipsis() {
  const ellipsis = document.createElement("span");
  ellipsis.textContent = "...";
  paginationContainer.appendChild(ellipsis);
}

// Go to specific page and update pagination
function goToPage(page) {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  if (page < 1 || page > totalPages) return;

  currentPage = page;
  displayItems(currentPage);
  setupPagination(totalPages, currentPage);
}

// Event listener for items-per-page selection
itemsPerPageSelect.addEventListener("change", (e) => {
  itemsPerPage = parseInt(e.target.value);
  goToPage(1); // Reset to the first page on change
});

// Initialize
goToPage(1);
