// Toggle dark/light mode
const lightModeBtn = document.getElementById('light-mode');
const darkModeBtn = document.getElementById('dark-mode');
const body = document.body;

lightModeBtn.addEventListener('click', () => {
    body.classList.remove('dark-mode');
    lightModeBtn.classList.add('active');
    darkModeBtn.classList.remove('active');
});

darkModeBtn.addEventListener('click', () => {
    body.classList.add('dark-mode');
    darkModeBtn.classList.add('active');
    lightModeBtn.classList.remove('active');
});

// Make table rows interactive
const tableRows = document.querySelectorAll('.inventory-table tbody tr');
tableRows.forEach(row => {
    row.addEventListener('click', (e) => {
        if (!e.target.closest('.action-btn') && !e.target.closest('input[type="checkbox"]')) {
            const itemName = row.querySelector('td:nth-child(2)').textContent;
            alert(`You selected ${itemName}`);
        }
    });
});

// Action buttons functionality
const viewButtons = document.querySelectorAll('.view-btn');
viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const row = btn.closest('tr');
        const itemName = row.querySelector('td:nth-child(2)').textContent;
        alert(`Viewing details for ${itemName}`);
    });
});

const editButtons = document.querySelectorAll('.edit-btn');
editButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const row = btn.closest('tr');
        const itemName = row.querySelector('td:nth-child(2)').textContent;
        alert(`Editing ${itemName}`);
    });
});

const deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const row = btn.closest('tr');
        const itemName = row.querySelector('td:nth-child(2)').textContent;
        if (confirm(`Are you sure you want to delete ${itemName}?`)) {
            alert(`${itemName} has been deleted`);
        }
    });
});

// Pagination functionality
const pageButtons = document.querySelectorAll('.page-btn');
pageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (!btn.classList.contains('active') && !btn.querySelector('i')) {
            document.querySelector('.page-btn.active').classList.remove('active');
            btn.classList.add('active');
            alert(`Navigating to page ${btn.textContent}`);
        }
    });
});

// Add item button functionality
const addItemButton = document.querySelector('.btn-primary');
addItemButton.addEventListener('click', () => {
    alert('Add new item form would open here');
});

// Make Excel button functionality
const makeExcelButton = document.querySelector('.btn-secondary');
makeExcelButton.addEventListener('click', () => {
    alert('Exporting to Excel...');
});

// Filter button functionality
const filterButton = document.querySelector('.btn-outline');
filterButton.addEventListener('click', () => {
    alert('Filter options would appear here');
});