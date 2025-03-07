// DOM Elements
const lightModeBtn = document.getElementById('light-mode');
const darkModeBtn = document.getElementById('dark-mode');
const body = document.body;
const itemsPerPageSelect = document.getElementById('items-per-page');
const paginationBtns = document.querySelectorAll('.page-btn.page');
const prevBtn = document.querySelector('.page-btn.prev');
const nextBtn = document.querySelector('.page-btn.next');
const notificationIcon = document.querySelector('.notification i');
const notificationDropdown = document.querySelector('.notification-dropdown');
const tableSearchInput = document.querySelector('.table-search');
const categoryFilterSelect = document.querySelector('.category-filter');

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
    
    // Create empty state element if it doesn't exist
    if (!document.querySelector('.empty-state')) {
        createEmptyState();
    }
});

// Create empty state element dynamically
function createEmptyState() {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
        <div class="empty-illustration">
            <i class="fas fa-search" style="font-size: 48px; color: #ccc;"></i>
        </div>
        <p class="empty-message">No matching items found</p>
    `;
    
    // Insert after the table container
    const tableContainer = document.querySelector('.notification-table-container');
    if (tableContainer) {
        tableContainer.parentNode.insertBefore(emptyState, tableContainer.nextSibling);
    }
}

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
    paginationInfo.textContent = `Showing ${startItem} to ${endItem} out of 12 entries`;
}

// Table search functionality
if (tableSearchInput) {
    tableSearchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        const rows = document.querySelectorAll('.notification-table tbody tr');
        let hasResults = false;
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                row.style.display = '';
                hasResults = true;
            } else {
                row.style.display = 'none';
            }
        });
        
        // Show/hide empty state based on search results
        showEmptyState(!hasResults);
    });
}

// Category filter functionality
if (categoryFilterSelect) {
    categoryFilterSelect.addEventListener('change', function() {
        const category = this.value;
        const rows = document.querySelectorAll('.notification-table tbody tr');
        let hasResults = false;
        
        rows.forEach(row => {
            const actionCell = row.querySelector('td:nth-child(4)');
            if (!actionCell) return;
            
            const actionText = actionCell.textContent.toLowerCase();
            
            if (category === 'all' || 
                (category === 'added' && actionText.includes('added')) ||
                (category === 'removed' && actionText.includes('removed')) ||
                (category === 'updated' && actionText.includes('updated'))) {
                row.style.display = '';
                hasResults = true;
            } else {
                row.style.display = 'none';
            }
        });
        
        // Show/hide empty state based on filter results
        showEmptyState(!hasResults);
    });
}

// Function to show/hide empty state
function showEmptyState(show) {
    let emptyState = document.querySelector('.empty-state');
    const tableContainer = document.querySelector('.notification-table-container');
    
    // Create empty state if it doesn't exist
    if (!emptyState) {
        createEmptyState();
        emptyState = document.querySelector('.empty-state');
    }
    
    if (show) {
        // Show empty state, hide table
        emptyState.style.display = 'flex';
        if (tableContainer) tableContainer.style.display = 'none';
    } else {
        // Hide empty state, show table
        emptyState.style.display = 'none';
        if (tableContainer) tableContainer.style.display = 'block';
    }
}

// Global search functionality
const globalSearchInput = document.querySelector('.search-global input');
if (globalSearchInput) {
    globalSearchInput.addEventListener('input', function() {
        // In a real application, this would search across the entire app
        console.log('Global search:', this.value);
    });
}

// Notification toggle functionality
if (notificationIcon) {
    notificationIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        const notification = document.querySelector('.notification');
        notification.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const notification = document.querySelector('.notification');
        if (!notification.contains(e.target)) {
            notification.classList.remove('active');
        }
    });
}

// Mark all notifications as read
const markAllReadBtn = document.querySelector('.mark-all-read');
if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', function() {
        const unreadItems = document.querySelectorAll('.notification-item.unread');
        unreadItems.forEach(item => {
            item.classList.remove('unread');
        });
        
        // Update badge count
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = '0';
        }
    });
}

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
    });
});

// Refresh button functionality
const refreshBtn = document.querySelector('.refresh-btn');
if (refreshBtn) {
    refreshBtn.addEventListener('click', function() {
        // For demo purposes, just show a loading indicator
        this.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Refreshing...';
        
        // Reset after 1 second
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
        }, 1000);
    });
}

// Export button functionality
const exportBtn = document.querySelector('.export-btn');
if (exportBtn) {
    exportBtn.addEventListener('click', function() {
        alert('Exporting data... This would download a file in a real application.');
    });
}
