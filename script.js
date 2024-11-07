// Sample data and variables
const items = Array.from({ length: 100 }, (_, i) => `Product item ${i + 1}`); // 100 sample items
const itemsPerPage = 5;
const pageButtonLimit = 8; // Show 5 page buttons at a time
let currentPage = 1;

const itemContainer = document.getElementById("item-container");
const paginationContainer = document.getElementById("pagination-container");

// Function to display items on the current page
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

// Function to create pagination buttons
function setupPagination(totalPages, currentPage) {
  paginationContainer.innerHTML = "";

  // Calculate the range of pages to display
  let startPage = Math.max(1, currentPage - Math.floor(pageButtonLimit / 2));
  let endPage = startPage + pageButtonLimit - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pageButtonLimit + 1);
  }

  // "Previous" button
  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.disabled = currentPage === 1;
  prevButton.onclick = () => goToPage(currentPage - 1);
  paginationContainer.appendChild(prevButton);

  // Page number buttons
  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.classList.toggle("active", i === currentPage);
    pageButton.onclick = () => goToPage(i);
    paginationContainer.appendChild(pageButton);
  }

  // "Next" button
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = currentPage === totalPages;
  nextButton.onclick = () => goToPage(currentPage + 1);
  paginationContainer.appendChild(nextButton);
}

// Function to go to a specific page and update pagination
function goToPage(page) {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  if (page < 1 || page > totalPages) return;

  currentPage = page;
  displayItems(currentPage);
  setupPagination(totalPages, currentPage);
}

// Initialize the pagination and display the first set of items
goToPage(1);
