// DOM Elements
const lightModeBtn = document.getElementById('light-mode');
const darkModeBtn = document.getElementById('dark-mode');
const body = document.body;
const itemsPerPageSelect = document.getElementById('items-per-page');
const paginationBtns = document.querySelectorAll('.page-btn.page');
const prevBtn = document.querySelector('.page-btn.prev');
const nextBtn = document.querySelector('.page-btn.next');
const searchInput = document.querySelector('.search-bar input');

// Theme Toggle
function setTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        darkModeBtn.classList.add('active');
        lightModeBtn.classList.remove('active');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        lightModeBtn.classList.add('active');
        darkModeBtn.classList.remove('active');
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setTheme('dark');
    }
    
    // For demo purposes, let's show the empty state initially
    // In a real application, you'd show products by default
    showEmptyState(true);
});

// Theme button event listeners
lightModeBtn.addEventListener('click', () => setTheme('light'));
darkModeBtn.addEventListener('click', () => setTheme('dark'));

// Pagination functionality
paginationBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all page buttons
        paginationBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // Here you would normally fetch data for the selected page
        // For demo purposes, we're just updating the UI
        const pageNumber = this.textContent;
        updatePaginationInfo(pageNumber);
    });
});

// Previous and Next buttons
prevBtn.addEventListener('click', () => {
    const activePage = document.querySelector('.page-btn.page.active');
    const prevPage = activePage.previousElementSibling;
    if (prevPage && prevPage.classList.contains('page')) {
        activePage.classList.remove('active');
        prevPage.classList.add('active');
        updatePaginationInfo(prevPage.textContent);
    }
});

nextBtn.addEventListener('click', () => {
    const activePage = document.querySelector('.page-btn.page.active');
    const nextPage = activePage.nextElementSibling;
    if (nextPage && nextPage.classList.contains('page')) {
        activePage.classList.remove('active');
        nextPage.classList.add('active');
        updatePaginationInfo(nextPage.textContent);
    }
});

// Items per page change
itemsPerPageSelect.addEventListener('change', function() {
    // Here you would typically fetch data with the new page size
    // For demo purposes, just update the info text
    const pageSize = this.value;
    updatePaginationInfo(1, pageSize);
});

// Update pagination info text
function updatePaginationInfo(page = 1, pageSize = 6) {
    const paginationInfo = document.querySelector('.pagination-info span');
    const startItem = ((page - 1) * pageSize) + 1;
    const endItem = Math.min(page * pageSize, 12); // Assuming 12 total items
    paginationInfo.textContent = `Showing ${startItem} to ${endItem} out of 12 products`;
}

// Search functionality
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.trim().toLowerCase();
    
    // For demo, always show the empty state when search is not empty
    showEmptyState(searchTerm !== '');
    
    // In a real app, you would filter products based on the search term
    // and only show empty state if no results match
});

// Function to show/hide empty state
function showEmptyState(show) {
    const emptyState = document.querySelector('.empty-state');
    const productsGrid = document.querySelector('.products-grid');
    const paginationContainer = document.querySelector('.pagination-container');
    
    if (show) {
        // Show empty state, hide products and pagination
        emptyState.style.display = 'flex';
        productsGrid.style.display = 'none';
        paginationContainer.style.display = 'none';
    } else {
        // Hide empty state, show products and pagination
        emptyState.style.display = 'none';
        productsGrid.style.display = 'grid';
        paginationContainer.style.display = 'flex';
    }
}

// Global search functionality
const globalSearchInput = document.querySelector('.search-global input');
globalSearchInput.addEventListener('input', function() {
    // In a real application, this would search across the entire app
    console.log('Global search:', this.value);
});

// Notification click handler
const notificationIcon = document.querySelector('.notification i');
notificationIcon.addEventListener('click', function() {
    alert('No new notifications');
});

// Menu item click handler
const menuItems = document.querySelectorAll('.sidebar-menu a');
menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all menu items
        document.querySelectorAll('.sidebar-menu li').forEach(li => {
            li.classList.remove('active');
        });
        
        // Add active class to the parent li of clicked link
        this.parentElement.classList.add('active');
        
        // For demo purposes, toggle between empty state and products
        if (this.textContent.includes('Scan Item')) {
            showEmptyState(true);
        } else {
            showEmptyState(false);
        }
    });
});

// Toggle function for demonstration purposes
function toggleView() {
    const emptyState = document.querySelector('.empty-state');
    const isEmptyStateVisible = emptyState.style.display === 'flex';
    showEmptyState(!isEmptyStateVisible);
}