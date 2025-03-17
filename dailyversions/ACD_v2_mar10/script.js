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

// Chart will be initialized when there's data
// For now it's hidden and a message is shown instead

// Function to load stock data (would be replaced with actual API call)
function loadStockData() {
    // This function would be called when data becomes available
    document.querySelector('.empty-chart-message').style.display = 'none';
    document.getElementById('stockChart').style.display = 'block';
    
    const stockChartCtx = document.getElementById('stockChart').getContext('2d');
    
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const stockInData = [12000, 19000, 15000, 22000, 18000, 24000];
    const stockOutData = [8000, 12000, 10000, 14000, 11000, 16000];
    
    const stockChart = new Chart(stockChartCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Stock In',
                    data: stockInData,
                    borderColor: '#36a2eb',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Stock Out',
                    data: stockOutData,
                    borderColor: '#8557e8',
                    backgroundColor: 'rgba(133, 87, 232, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(200, 200, 200, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    // Update summary numbers
    document.querySelectorAll('.summary-value')[0].textContent = '868';
    document.querySelectorAll('.summary-value')[1].textContent = '200';
    document.querySelectorAll('.summary-value')[2].textContent = '21';
}

// Make asset items interactive
const assetItems = document.querySelectorAll('.asset-item');
assetItems.forEach(item => {
    item.addEventListener('click', () => {
        // You could add a modal or redirect to asset details page
        alert(`You clicked on ${item.querySelector('.asset-name')?.textContent || 'an asset'}`);
    });
    
    // Add 3D effect on mouse move
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xRotation = ((y - rect.height / 2) / rect.height) * 10;
        const yRotation = ((x - rect.width / 2) / rect.width) * -10;
        
        item.style.transform = `perspective(1000px) scale(1.05) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    });
    
    // Reset transform on mouse out
    item.addEventListener('mouseout', () => {
        item.style.transform = 'scale(1)';
        setTimeout(() => {
            item.style.transform = '';
        }, 200);
    });
});

// Add summary item animation
const summaryItems = document.querySelectorAll('.summary-item');
summaryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const valueElement = item.querySelector('.summary-value');
        valueElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            valueElement.style.transform = '';
        }, 300);
    });
});

// Create content sections for different pages
document.addEventListener('DOMContentLoaded', () => {
    // Create containers for each section
    const mainContentElement = document.querySelector('.main-content');
    
    // Create the dashboard section (already exists in HTML)
    const dashboardContent = document.createElement('div');
    dashboardContent.className = 'content-section dashboard-section active';
    
    // Move existing cards into the dashboard section
    const existingCards = document.querySelectorAll('.main-content > .card');
    const footerElement = document.querySelector('.footer');
    
    existingCards.forEach(card => {
        dashboardContent.appendChild(card.cloneNode(true));
        card.remove();
    });
    
    if (footerElement) {
        const footerClone = footerElement.cloneNode(true);
        dashboardContent.appendChild(footerClone);
        footerElement.remove();
    }
    
    // Create inventory section
    const inventoryContent = document.createElement('div');
    inventoryContent.className = 'content-section inventory-section';
    inventoryContent.innerHTML = `
        <div class="header">
            <div class="greeting">
                <h2>Inventory Management<i class="fas fa-certificate verification-badge"></i></h2>
                <span>Track and manage your inventory</span>
            </div>
        </div>
        <div class="card">
            <div class="report-title">Current Inventory</div>
            <div class="inventory-container">
                <table class="inventory-table">
                    <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>Item Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>INV-001</td>
                            <td>Hydraulic Oil</td>
                            <td>Lubricants</td>
                            <td>25</td>
                            <td><span class="status-badge in-stock">In Stock</span></td>
                            <td>
                                <button class="action-btn edit"><i class="fas fa-edit"></i></button>
                                <button class="action-btn delete"><i class="fas fa-trash-alt"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>INV-002</td>
                            <td>Air Filter</td>
                            <td>Filters</td>
                            <td>12</td>
                            <td><span class="status-badge in-stock">In Stock</span></td>
                            <td>
                                <button class="action-btn edit"><i class="fas fa-edit"></i></button>
                                <button class="action-btn delete"><i class="fas fa-trash-alt"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>INV-003</td>
                            <td>Bucket Teeth</td>
                            <td>Parts</td>
                            <td>0</td>
                            <td><span class="status-badge out-of-stock">Out of Stock</span></td>
                            <td>
                                <button class="action-btn edit"><i class="fas fa-edit"></i></button>
                                <button class="action-btn delete"><i class="fas fa-trash-alt"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="inventory-actions">
                <button class="add-item-btn"><i class="fas fa-plus"></i> Add New Item</button>
            </div>
        </div>
    `;
    
    // Create daily reports section
    const reportsContent = document.createElement('div');
    reportsContent.className = 'content-section reports-section';
    reportsContent.innerHTML = `
        <div class="header">
            <div class="greeting">
                <h2>Daily Reports<i class="fas fa-certificate verification-badge"></i></h2>
                <span>Track daily inventory changes</span>
            </div>
        </div>
        <div class="card">
            <div class="report-title">Daily Transaction Log</div>
            <div class="date-selector">
                <button class="date-nav prev"><i class="fas fa-chevron-left"></i></button>
                <div class="current-date">March 10, 2025</div>
                <button class="date-nav next"><i class="fas fa-chevron-right"></i></button>
            </div>
            <div class="report-container">
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Item</th>
                            <th>Transaction Type</th>
                            <th>Quantity</th>
                            <th>User</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>08:30 AM</td>
                            <td>Hydraulic Oil</td>
                            <td><span class="transaction-badge stock-in">Stock In</span></td>
                            <td>+10</td>
                            <td>Manticao-ACD</td>
                            <td>Regular delivery</td>
                        </tr>
                        <tr>
                            <td>10:15 AM</td>
                            <td>Air Filter</td>
                            <td><span class="transaction-badge stock-out">Stock Out</span></td>
                            <td>-2</td>
                            <td>Manticao-ACD</td>
                            <td>Routine maintenance</td>
                        </tr>
                        <tr>
                            <td>02:45 PM</td>
                            <td>Fuel Filter</td>
                            <td><span class="transaction-badge stock-out">Stock Out</span></td>
                            <td>-1</td>
                            <td>Tina J.</td>
                            <td>Emergency repair</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="report-summary card">
                <div class="summary-title">Daily Summary</div>
                <div class="summary-stats">
                    <div class="stat-item">
                        <div class="stat-label">Items In</div>
                        <div class="stat-value">10</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Items Out</div>
                        <div class="stat-value">3</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Total Transactions</div>
                        <div class="stat-value">3</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Create scan item section
    const scanContent = document.createElement('div');
    scanContent.className = 'content-section scan-section';
    scanContent.innerHTML = `
        <div class="header">
            <div class="greeting">
                <h2>Scan Item<i class="fas fa-certificate verification-badge"></i></h2>
                <span>Scan QR code or barcode to track items</span>
            </div>
        </div>
        <div class="card scanner-card">
            <div class="scanner-container">
                <div class="scanner-placeholder">
                    <i class="fas fa-qrcode scanner-icon"></i>
                    <div class="scanner-text">Camera access required</div>
                    <button class="scanner-btn">Enable Camera</button>
                </div>
                <div class="scanning-frame">
                    <div class="corner top-left"></div>
                    <div class="corner top-right"></div>
                    <div class="corner bottom-left"></div>
                    <div class="corner bottom-right"></div>
                    <div class="scanning-line"></div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="report-title">Manual Entry</div>
            <div class="manual-entry-form">
                <div class="form-group">
                    <label for="item-id">Item ID/Code</label>
                    <input type="text" id="item-id" placeholder="Enter item ID or scan code">
                </div>
                <div class="form-group">
                    <label for="transaction-type">Transaction Type</label>
                    <select id="transaction-type">
                        <option value="in">Stock In</option>
                        <option value="out">Stock Out</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="quantity">Quantity</label>
                    <input type="number" id="quantity" min="1" value="1">
                </div>
                <div class="form-group">
                    <label for="notes">Notes</label>
                    <textarea id="notes" placeholder="Add any additional information"></textarea>
                </div>
                <button class="submit-btn">Submit</button>
            </div>
        </div>
    `;
    
    // Add all sections to main content
    mainContentElement.appendChild(dashboardContent);
    mainContentElement.appendChild(inventoryContent);
    mainContentElement.appendChild(reportsContent);
    mainContentElement.appendChild(scanContent);
    
    // Simulate data loading after 2 seconds for demo purposes
    setTimeout(loadStockData, 2000);
    
    // Get all navigation items
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');

    // Add click event listener to each nav item
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the text content of the clicked item (trimmed to remove extra spaces)
            const navText = this.querySelector('span').textContent.trim();
            
            // Hide all content sections
            contentSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show appropriate content based on which nav item was clicked
            switch(navText) {
                case 'Dashboard':
                    document.querySelector('.dashboard-section').style.display = 'block';
                    break;
                case 'Inventory':
                    document.querySelector('.inventory-section').style.display = 'block';
                    // This code should be inserted in the script.js file inside the case for Inventory
// Replace the comment "INSERT YOUR INVENTORY PAGE JS CODE HERE" with this code

// Format number with commas for thousands/millions
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Format currency value with peso sign and commas
function formatPeso(amount) {
    return `₱${formatNumberWithCommas(parseFloat(amount).toFixed(2))}`;
}

// Table row interactivity
function setupInventoryTableInteractivity() {
    const tableRows = document.querySelectorAll('.inventory-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', (e) => {
            if (!e.target.closest('.icon-btn') && !e.target.closest('input[type="checkbox"]')) {
                const partsName = row.querySelector('td:nth-child(4)').textContent;
                if (partsName) {
                    console.log(`Selected item: ${partsName}`);
                }
            }
        });
    });
}

// Setup action buttons functionality
function setupActionButtons() {
    // View buttons
    const viewButtons = document.querySelectorAll('.inventory-section .view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            viewItemDetails(row);
        });
    });

    // Edit buttons
    const editButtons = document.querySelectorAll('.inventory-section .edit-btn');
    editButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            editItem(row);
        });
    });

    // Delete buttons
    const deleteButtons = document.querySelectorAll('.inventory-section .delete-btn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            const partsName = row.querySelector('td:nth-child(4)').textContent;
            if (partsName && confirm(`Are you sure you want to delete ${partsName}?`)) {
                row.remove();
                alert(`${partsName} has been deleted`);
            }
        });
    });

    // Add Item button
    const addItemButton = document.querySelector('#add-inventory-btn');
    if (addItemButton) {
        addItemButton.addEventListener('click', () => {
            const addItemModal = document.getElementById('addItemModal');
            if (addItemModal) {
                addItemModal.classList.add('active');
                setupAddItemModal();
            }
        });
    }

    // Export to Excel button
    const exportButton = document.querySelector('#export-excel-btn');
    if (exportButton) {
        exportButton.addEventListener('click', exportToExcel);
    }
}

// View item details
function viewItemDetails(row) {
    // Extract all available data from the row
    const date = row.querySelector('td:nth-child(2)').textContent;
    const partsNumber = row.querySelector('td:nth-child(3)').textContent;
    const partsName = row.querySelector('td:nth-child(4)').textContent;
    const component = row.querySelector('td:nth-child(5)').textContent;
    const quantity = row.querySelector('td:nth-child(6)').textContent;
    const itemPrice = row.querySelector('td:nth-child(7)').textContent;

    // Get image if available
    const imgElement = row.querySelector('.image-cell img');
    const imgSrc = imgElement && imgElement.src ? imgElement.src : '/api/placeholder/400/300';

    // Get additional data from data attributes
    const rack = row.dataset.rack || 'N/A';
    const tax = row.dataset.tax || '₱0.00';
    const totalAmount = row.dataset.totalAmount || itemPrice;
    const pic = row.dataset.pic || 'N/A';
    const po = row.dataset.po || 'N/A';
    const ctpl = row.dataset.ctpl || 'N/A';

    // Create a view modal
    const viewModal = document.createElement('div');
    viewModal.style.position = 'fixed';
    viewModal.style.top = '0';
    viewModal.style.left = '0';
    viewModal.style.width = '100%';
    viewModal.style.height = '100%';
    viewModal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    viewModal.style.display = 'flex';
    viewModal.style.alignItems = 'center';
    viewModal.style.justifyContent = 'center';
    viewModal.style.zIndex = '2000';
    
    viewModal.innerHTML = `
        <div style="position:relative; width:80%; max-width:800px; background:white; border-radius:10px; overflow:hidden; display:flex; flex-direction:column;">
            <!-- Header with close button -->
            <div style="display:flex; justify-content:space-between; align-items:center; padding:15px 20px; background:#f8f9fa; border-bottom:1px solid #dee2e6;">
                <h2 style="margin:0; font-size:18px; color:#212529;">Item Details - ${partsName}</h2>
                <div style="width:30px; height:30px; display:flex; align-items:center; justify-content:center; cursor:pointer; border-radius:50%; background:#e9ecef;">
                    <i class="fas fa-times"></i>
                </div>
            </div>
            
            <!-- Content area -->
            <div style="display:flex; padding:20px; gap:20px; flex-wrap:wrap;">
                <!-- Image column -->
                <div style="flex:0 0 300px;">
                    <img src="${imgSrc}" style="width:100%; max-height:300px; object-fit:contain; border:1px solid #dee2e6; border-radius:5px;">
                </div>
                
                <!-- Details column -->
                <div style="flex:1; min-width:300px;">
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px 30px;">
                        <div>
                            <p style="margin:0 0 5px 0; font-weight:bold; color:#6c757d; font-size:12px;">DATE</p>
                            <p style="margin:0 0 15px 0; font-size:14px;">${date}</p>
                        </div>
                        <div>
                            <p style="margin:0 0 5px 0; font-weight:bold; color:#6c757d; font-size:12px;">PARTS NUMBER</p>
                            <p style="margin:0 0 15px 0; font-size:14px;">${partsNumber}</p>
                        </div>
                        <div>
                            <p style="margin:0 0 5px 0; font-weight:bold; color:#6c757d; font-size:12px;">PARTS NAME</p>
                            <p style="margin:0 0 15px 0; font-size:14px;">${partsName}</p>
                        </div>
                        <div>
                            <p style="margin:0 0 5px 0; font-weight:bold; color:#6c757d; font-size:12px;">COMPONENT</p>
                            <p style="margin:0 0 15px 0; font-size:14px;">${component}</p>
                        </div>
                        <div>
                            <p style="margin:0 0 5px 0; font-weight:bold; color:#6c757d; font-size:12px;">QUANTITY</p>
                            <p style="margin:0 0 15px 0; font-size:14px;">${quantity}</p>
                        </div>
                        <div>
                            <p style="margin:0 0 5px 0; font-weight:bold; color:#6c757d; font-size:12px;">RACK</p>
                            <p style="margin:0 0 15px 0; font-size:14px;">${rack}</p>
                        </div>
                        <div>
                            <p style="margin:0 0 5px 0; font-weight:bold; color:#6c757d; font-size:12px;">ITEM PRICE</p>
                            <p style="margin:0 0 15px 0; font-size:14px;">${itemPrice}</p>
                        </div>
                        <div>
                            <p style="margin:0 0 5px 0; font-weight:bold; color:#6c757d; font-size:12px;">TAX</p>
                            <p style="margin:0 0 15px 0; font-size:14px;">${tax}</p>
                        </div>
                        <div>
                            <p style="margin:0 0 5px 0; font-weight:bold; color:#6c757d; font-size:12px;">TOTAL AMOUNT</p>
                            <p style="margin:0 0 15px 0; font-size:14px;">${totalAmount}</p>
                        </div>
                        <div>
                            <p style="margin:0 0 5px 0; font-weight:bold; color:#6c757d; font-size:12px;">PIC</p>
                            <p style="margin:0 0 15px 0; font-size:14px;">${pic}</p>
                        </div>
                        <div>
                            <p style="margin:0 0 5px 0; font-weight:bold; color:#6c757d; font-size:12px;">PO</p>
                            <p style="margin:0 0 15px 0; font-size:14px;">${po}</p>
                        </div>
                        <div>
                            <p style="margin:0 0 5px 0; font-weight:bold; color:#6c757d; font-size:12px;">CTPL</p>
                            <p style="margin:0 0 15px 0; font-size:14px;">${ctpl}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(viewModal);
    
    // Close modal when clicking the close button or outside the modal
    const closeBtn = viewModal.querySelector('.fa-times').parentElement;
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(viewModal);
    });
    
    viewModal.addEventListener('click', function(e) {
        if (e.target === viewModal) {
            document.body.removeChild(viewModal);
        }
    });
}

function setupAddItemModal() {
    const modal = document.getElementById('addItemModal');
    const closeButton = modal.querySelector('.close-button');
    const cancelButton = document.getElementById('cancelButton');
    const applyButton = document.getElementById('applyButton');
    const addItemForm = document.getElementById('addItemForm');
    
    // Store the uploaded image data
    let uploadedImageData = null;
    
    // File input handling
    const imageInput = document.getElementById('image');
    const imageDisplay = document.getElementById('imageDisplay');
    
    imageInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            imageDisplay.value = file.name;
            
            // Read the image file and store its data URL
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImageData = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // File upload toggle button handling - FIXED
    const fileInputLabel = modal.querySelector('.file-input-label');
    if (fileInputLabel) {
        fileInputLabel.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default label behavior
            // Trigger the hidden file input
            imageInput.click();
        });
    }
    
    // Date input handling
    const dateInput = document.getElementById('date');
    const dateDisplay = document.getElementById('dateDisplay');
    
    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const year = selectedDate.getFullYear();
        
        dateDisplay.value = `${day}/${month}/${year}`;
    });
    
    // Calendar toggle button handling - FIXED
    const dateInputLabel = modal.querySelector('.date-input-label');
    if (dateInputLabel) {
        dateInputLabel.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default label behavior
            // Trigger the hidden date input
            dateInput.focus();
            if (typeof dateInput.showPicker === 'function') {
                dateInput.showPicker();
            }
        });
    }
    
    // Also make the dateDisplay open the date picker when clicked
    dateDisplay.addEventListener('click', function() {
        dateInput.focus();
        if (typeof dateInput.showPicker === 'function') {
            dateInput.showPicker();
        }
    });
     
    // Price calculations
    const itemPriceInput = document.getElementById('itemPrice');
    const taxInput = document.getElementById('tax');
    const totalAmountInput = document.getElementById('totalAmount');
    const quantityInput = document.getElementById('quantity');
    
    function calculateTotal() {
        const price = parseFloat(itemPriceInput.value) || 0;
        const tax = parseFloat(taxInput.value) || 0;
        const quantity = parseInt(quantityInput.value) || 1;
        
        const total = (price * quantity) + tax;
        totalAmountInput.value = total.toFixed(2);
    }
    
    itemPriceInput.addEventListener('input', calculateTotal);
    taxInput.addEventListener('input', calculateTotal);
    quantityInput.addEventListener('input', calculateTotal);
    
    // Set current date as default
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    
    const formattedDate = `${year}-${month}-${day}`;
    dateInput.value = formattedDate;
    dateDisplay.value = `${day}/${month}/${year}`;
    
    // Close modal functions
    function closeModal() {
        modal.classList.remove('active');
        addItemForm.reset();
        imageDisplay.value = '';
        dateDisplay.value = '';
        uploadedImageData = null;
    }
    
    closeButton.addEventListener('click', closeModal);
    cancelButton.addEventListener('click', closeModal);
    
    // Click outside to close
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Form submission
    applyButton.addEventListener('click', function() {
        // Trigger HTML5 validation
        const isValid = addItemForm.checkValidity();
        if (!isValid) {
            addItemForm.reportValidity();
            return;
        }
        
        // Get form values
        const component = document.getElementById('component').value;
        const partsName = document.getElementById('partsName').value;
        const partsNumber = document.getElementById('partsNumber').value;
        const quantity = document.getElementById('quantity').value;
        const itemPrice = document.getElementById('itemPrice').value;
        const date = dateDisplay.value;
        const rack = document.getElementById('rack').value;
        const tax = document.getElementById('tax').value || '0.00';
        const totalAmount = document.getElementById('totalAmount').value || '0.00';
        const pic = document.getElementById('pic').value;
        const po = document.getElementById('poNumber').value;
        const ctpl = document.getElementById('ctplNumber').value;
        
        // Add row to inventory table
        addItemToTable(component, partsName, partsNumber, quantity, itemPrice, date, uploadedImageData, rack, tax, totalAmount, pic, po, ctpl);
        
        // Close modal and reset form
        closeModal();
        
        // Show success message
        alert('Item added successfully!');
    });
}

// Add item to inventory table
function addItemToTable(component, partsName, partsNumber, quantity, itemPrice, date, imageData, rack = 'N/A', tax = '0.00', totalAmount = '0.00', pic = 'N/A', po = 'N/A', ctpl = 'N/A') {
    const table = document.querySelector('.inventory-table tbody');
    const newRow = document.createElement('tr');
    
    // Store additional data as data attributes
    newRow.dataset.rack = rack;
    newRow.dataset.tax = formatPeso(tax);
    newRow.dataset.totalAmount = formatPeso(totalAmount);
    newRow.dataset.pic = pic;
    newRow.dataset.po = po || 'N/A';
    newRow.dataset.ctpl = ctpl || 'N/A';
    
    // Determine what to use for the image
    const imageHtml = imageData ? 
        `<img src="${imageData}" alt="${partsName}" style="width:50px; height:40px; object-fit:contain;">` : 
        '-';
    
    // Format the price with peso sign and commas
    const formattedPrice = formatPeso(itemPrice);
    
    newRow.innerHTML = `
        <td><input type="checkbox" class="row-select"></td>
        <td>${date}</td>
        <td>${partsNumber}</td>
        <td>${partsName}</td>
        <td>${component}</td>
        <td>${quantity}</td>
        <td>${formattedPrice}</td>
        <td class="image-cell">${imageHtml}</td>
        <td class="action-cell">
            <button class="icon-btn view-btn"><i class="fas fa-eye"></i></button>
            <button class="icon-btn edit-btn"><i class="fas fa-edit"></i></button>
            <button class="icon-btn delete-btn"><i class="fas fa-trash"></i></button>
        </td>
    `;
    
    // Insert at the top of the table
    if (table.firstChild) {
        table.insertBefore(newRow, table.firstChild);
    } else {
        table.appendChild(newRow);
    }
    
    // Add event listeners to the new action buttons
    const viewBtn = newRow.querySelector('.view-btn');
    viewBtn.addEventListener('click', () => viewItemDetails(newRow));
    
    const editBtn = newRow.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => editItem(newRow));
    
    const deleteBtn = newRow.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete ${partsName}?`)) {
            newRow.remove();
            alert(`${partsName} has been deleted`);
        }
    });
}

// Edit item
function editItem(row) {
    // Create the edit modal if it doesn't exist
    if (!document.getElementById('editItemModal')) {
        createEditItemModal();
    }
    
    const editModal = document.getElementById('editItemModal');
    
    // Extract data from the row
    const date = row.querySelector('td:nth-child(2)').textContent;
    const partsNumber = row.querySelector('td:nth-child(3)').textContent;
    const partsName = row.querySelector('td:nth-child(4)').textContent;
    const component = row.querySelector('td:nth-child(5)').textContent;
    const quantity = row.querySelector('td:nth-child(6)').textContent;
    const itemPrice = row.querySelector('td:nth-child(7)').textContent.replace(/[^\d.]/g, ''); // Remove currency symbol
    
    // Get additional data from data attributes
    const rack = row.dataset.rack || 'N/A';
    const tax = row.dataset.tax ? row.dataset.tax.replace(/[^\d.]/g, '') : '0.00';
    const totalAmount = row.dataset.totalAmount ? row.dataset.totalAmount.replace(/[^\d.]/g, '') : itemPrice;
    const pic = row.dataset.pic || 'N/A';
    const po = row.dataset.po || 'N/A';
    const ctpl = row.dataset.ctpl || 'N/A';
    
    // Get the image if available
    const imgElement = row.querySelector('.image-cell img');
    const imgSrc = imgElement && imgElement.src ? imgElement.src : null;
    
    // Set values in the form
    const componentInput = editModal.querySelector('#edit-component');
    const partsNameInput = editModal.querySelector('#edit-partsName');
    const partsNumberInput = editModal.querySelector('#edit-partsNumber');
    const quantityInput = editModal.querySelector('#edit-quantity');
    const itemPriceInput = editModal.querySelector('#edit-itemPrice');
    const rackInput = editModal.querySelector('#edit-rack');
    const taxInput = editModal.querySelector('#edit-tax');
    const totalAmountInput = editModal.querySelector('#edit-totalAmount');
    const picInput = editModal.querySelector('#edit-pic');
    const poInput = editModal.querySelector('#edit-poNumber');
    const ctplInput = editModal.querySelector('#edit-ctplNumber');
    const dateInput = editModal.querySelector('#edit-date');
    const dateDisplay = editModal.querySelector('#edit-dateDisplay');
    const imageDisplay = editModal.querySelector('#edit-imageDisplay');
    
    componentInput.value = component;
    partsNameInput.value = partsName;
    partsNumberInput.value = partsNumber;
    quantityInput.value = quantity;
    itemPriceInput.value = itemPrice;
    rackInput.value = rack !== 'N/A' ? rack : '';
    taxInput.value = tax;
    totalAmountInput.value = totalAmount;
    picInput.value = pic !== 'N/A' ? pic : '';
    poInput.value = po !== 'N/A' ? po : '';
    ctplInput.value = ctpl !== 'N/A' ? ctpl : '';
    
    // Set the date
    dateDisplay.value = date;
    
    // Convert date from DD/MM/YYYY to YYYY-MM-DD for the input
    if (date.includes('/')) {
        const dateParts = date.split('/');
        if (dateParts.length === 3) {
            const day = dateParts[0];
            const month = dateParts[1];
            const year = dateParts[2];
            dateInput.value = `${year}-${month}-${day}`;
        }
    } else {
        dateInput.value = date; // Fallback if date is in a different format
    }
    
    // Store the row reference and image data
    editModal.dataset.row = row.rowIndex;
    editModal.uploadedImageData = imgSrc && imgSrc.startsWith('data:image') ? imgSrc : null;
    
    if (imgSrc && imgSrc.startsWith('data:image')) {
        imageDisplay.value = 'Current Image';
    } else {
        imageDisplay.value = '';
    }
    
    // Show the modal
    editModal.classList.add('active');
}

// Create Edit Item Modal
function createEditItemModal() {
    // Clone the add item modal structure
    const addItemModal = document.getElementById('addItemModal');
    const editItemModal = addItemModal.cloneNode(true);
    editItemModal.id = 'editItemModal';
    
    // Update the header title
    const modalHeader = editItemModal.querySelector('.modal-header h3');
    modalHeader.textContent = 'Edit Item';
    
    // Update all the input IDs to avoid conflicts
    const inputs = editItemModal.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.id = 'edit-' + input.id;
    });
    
    // Update form ID
    const form = editItemModal.querySelector('form');
    form.id = 'editItemForm';
    
    // Update button IDs
    const cancelButton = editItemModal.querySelector('#cancelButton');
    cancelButton.id = 'edit-cancelButton';
    
    const applyButton = editItemModal.querySelector('#applyButton');
    applyButton.id = 'edit-applyButton';
    applyButton.textContent = 'Update';
    
    // Append to document body
    document.body.appendChild(editItemModal);
    
    // Setup event listeners
    setupEditItemModal();
}

function setupEditItemModal() {
    const modal = document.getElementById('editItemModal');
    const closeButton = modal.querySelector('.close-button');
    const cancelButton = document.getElementById('edit-cancelButton');
    const updateButton = document.getElementById('edit-applyButton');
    
    // Store the uploaded image data
    modal.uploadedImageData = null;
    
    // File input handling
    const imageInput = document.getElementById('edit-image');
    const imageDisplay = document.getElementById('edit-imageDisplay');
    
    imageInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            imageDisplay.value = file.name;
            
            // Read the image file and store its data URL
            const reader = new FileReader();
            reader.onload = function(e) {
                modal.uploadedImageData = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // File upload toggle button handling - FIXED
    const fileInputLabel = modal.querySelector('.file-input-label');
    if (fileInputLabel) {
        fileInputLabel.addEventListener('click', function(e) {
            e.preventDefault();
            imageInput.click();
        });
    }
    
    // Date input handling
    const dateInput = document.getElementById('edit-date');
    const dateDisplay = document.getElementById('edit-dateDisplay');
    
    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const year = selectedDate.getFullYear();
        
        dateDisplay.value = `${day}/${month}/${year}`;
    });
    
    // Calendar toggle button handling - FIXED
    const dateInputLabel = modal.querySelector('.date-input-label');
    if (dateInputLabel) {
        dateInputLabel.addEventListener('click', function(e) {
            e.preventDefault();
            dateInput.focus();
            if (typeof dateInput.showPicker === 'function') {
                dateInput.showPicker();
            }
        });
    }
    
    // Also make the dateDisplay open the date picker when clicked
    dateDisplay.addEventListener('click', function() {
        dateInput.focus();
        if (typeof dateInput.showPicker === 'function') {
            dateInput.showPicker();
        }
});
    // Price calculations
    const itemPriceInput = document.getElementById('edit-itemPrice');
    const taxInput = document.getElementById('edit-tax');
    const totalAmountInput = document.getElementById('edit-totalAmount');
    const quantityInput = document.getElementById('edit-quantity');
    
    function calculateTotal() {
        const price = parseFloat(itemPriceInput.value) || 0;
        const tax = parseFloat(taxInput.value) || 0;
        const quantity = parseInt(quantityInput.value) || 1;
        
        const total = (price * quantity) + tax;
        totalAmountInput.value = total.toFixed(2);
    }
    
    itemPriceInput.addEventListener('input', calculateTotal);
    taxInput.addEventListener('input', calculateTotal);
    quantityInput.addEventListener('input', calculateTotal);
    
    // Close modal functions
    function closeModal() {
        modal.classList.remove('active');
        document.getElementById('editItemForm').reset();
        imageDisplay.value = '';
        dateDisplay.value = '';
        modal.uploadedImageData = null;
    }
    
    closeButton.addEventListener('click', closeModal);
    cancelButton.addEventListener('click', closeModal);
    
    // Click outside to close
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Form submission
    updateButton.addEventListener('click', function() {
        // Trigger HTML5 validation
        const form = document.getElementById('editItemForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Get the row to update
        const rowIndex = modal.dataset.row;
        const table = document.querySelector('.inventory-table');
        const row = table.rows[rowIndex];
        
        if (!row) {
            alert('Error: Could not find row to update.');
            return;
        }
        
        // Get form values
        const component = document.getElementById('edit-component').value;
        const partsName = document.getElementById('edit-partsName').value;
        const partsNumber = document.getElementById('edit-partsNumber').value;
        const quantity = document.getElementById('edit-quantity').value;
        const itemPrice = document.getElementById('edit-itemPrice').value;
        const date = dateDisplay.value;
        const rack = document.getElementById('edit-rack').value;
        const tax = document.getElementById('edit-tax').value || '0.00';
        const totalAmount = document.getElementById('edit-totalAmount').value || '0.00';
        const pic = document.getElementById('edit-pic').value;
        const po = document.getElementById('edit-poNumber').value;
        const ctpl = document.getElementById('edit-ctplNumber').value;
        
        // Update data attributes
        row.dataset.rack = rack;
        row.dataset.tax = formatPeso(tax);
        row.dataset.totalAmount = formatPeso(totalAmount);
        row.dataset.pic = pic;
        row.dataset.po = po;
        row.dataset.ctpl = ctpl;
        
        // Update visible cells
        const cells = row.cells;
        cells[1].textContent = date;
        cells[2].textContent = partsNumber;
        cells[3].textContent = partsName;
        cells[4].textContent = component;
        cells[5].textContent = quantity;
        cells[6].textContent = formatPeso(itemPrice);
        
        // Update image if changed
        if (modal.uploadedImageData) {
            const imageCell = cells[7];
            imageCell.innerHTML = `<img src="${modal.uploadedImageData}" alt="${partsName}" style="width:50px; height:40px; object-fit:contain;">`;
        }
        
        // Close modal
        closeModal();
        
        // Show success message
        alert('Item updated successfully!');
    });
}

// Export table to Excel
function exportToExcel() {
    // Check if SheetJS is available
    if (typeof XLSX === 'undefined') {
        // If not available, dynamically load it
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.5/xlsx.full.min.js';
        script.onload = performExport;
        script.onerror = () => alert('Failed to load SheetJS library. Please ensure you have internet connectivity.');
        document.head.appendChild(script);
    } else {
        performExport();
    }
    
    function performExport() {
        // Select the table body
        const tableBody = document.querySelector('.inventory-table tbody');
        
        // Prepare data for export
        const exportData = [];
        
        // Add headers
        const headers = [
            'Date', 
            'Parts Number', 
            'Parts Name', 
            'Component', 
            'Quantity', 
            'PIC', 
            'Item Price', 
            'Tax', 
            'Total Amount', 
            'PO Number',
            'CTPL Number'
        ];
        exportData.push(headers);
        
        // Iterate through table rows
        tableBody.querySelectorAll('tr').forEach(row => {
            // Skip rows without data
            if (!row.querySelector('td:nth-child(2)').textContent.trim()) return;
            
            // Extract data from row, removing currency symbols and formatting
            const rowData = [
                row.querySelector('td:nth-child(2)').textContent, // Date
                row.querySelector('td:nth-child(3)').textContent, // Parts Number
                row.querySelector('td:nth-child(4)').textContent, // Parts Name
                row.querySelector('td:nth-child(5)').textContent, // Component
                row.querySelector('td:nth-child(6)').textContent, // Quantity
                row.dataset.pic || 'N/A', // PIC from data attribute
                row.querySelector('td:nth-child(7)').textContent.replace(/[^\d.]/g, ''), // Item Price
                row.dataset.tax ? row.dataset.tax.replace(/[^\d.]/g, '') : '0.00', // Tax
                row.dataset.totalAmount ? row.dataset.totalAmount.replace(/[^\d.]/g, '') : '0.00', // Total Amount
                row.dataset.po || 'N/A',     // PO Number
                row.dataset.ctpl || 'N/A'    // CTPL Number
            ];
            
            exportData.push(rowData);
        });
        
        // Create worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(exportData);
        
        // Create workbook and add worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory');
        
        // Export to Excel file
        XLSX.writeFile(workbook, 'inventory_export_' + new Date().toISOString().split('T')[0] + '.xlsx');
        
        alert('Inventory exported to Excel successfully!');
    }
}

// Initialize inventory functionality
function initInventory() {
    // Setup table interactivity
    setupInventoryTableInteractivity();
    
    // Setup action buttons
    setupActionButtons();
    
    // Add script tag for SheetJS if not already present
    if (!document.querySelector('script[src*="xlsx.full.min.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.5/xlsx.full.min.js';
        document.head.appendChild(script);
    }
}

// Call the initialization function when switching to the inventory section
initInventory();
                    break;
                case 'Daily Reports':
                    document.querySelector('.reports-section').style.display = 'block';
                    break;
                case 'Scan Item':
                    document.querySelector('.scan-section').style.display = 'block';
                    break;
            }
        });
    });
    
    // Initially hide all sections except dashboard
    contentSections.forEach(section => {
        if (!section.classList.contains('dashboard-section')) {
            section.style.display = 'none';
        }
    });
});
// Add this to your script.js file

// Profile Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const userProfile = document.querySelector('.user-profile');
    const profileDropdown = document.getElementById('profileDropdown');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeButton = editProfileModal.querySelector('.close-button');
    const cancelProfileButton = document.getElementById('cancelProfileButton');
    const saveProfileButton = document.getElementById('saveProfileButton');
    const profileImage = document.getElementById('profileImage');
    const profilePreview = document.getElementById('profilePreview');
    const profileImageContainer = document.querySelector('.profile-image');
    const profileImageText = document.querySelector('.profile-image-text');
    const editProfileForm = document.getElementById('editProfileForm');
    
    // Password fields and toggle buttons
    const passwordFields = document.querySelectorAll('input[type="password"]');
    const passwordToggles = document.querySelectorAll('.password-toggle');
    const newPasswordField = document.getElementById('newPassword');
    const confirmPasswordField = document.getElementById('confirmPassword');
    const passwordMismatch = document.getElementById('passwordMismatch');
    
    // Store the uploaded image data
    let uploadedProfileImage = null;
    
    // Toggle dropdown on profile click
    userProfile.addEventListener('click', function(e) {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (profileDropdown.classList.contains('active') && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove('active');
        }
    });
    
    // Edit Profile button
    editProfileBtn.addEventListener('click', function() {
        profileDropdown.classList.remove('active');
        openEditProfileModal();
    });
    
    // Logout button
    logoutBtn.addEventListener('click', function() {
        profileDropdown.classList.remove('active');
        // Simulate logout - this would connect to your authentication system
        const confirmLogout = confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            alert('You have been logged out.');
            // Redirect to login page or perform actual logout
            // window.location.href = 'login.html';
        }
    });
    
    // Open Edit Profile Modal
    function openEditProfileModal() {
        editProfileModal.classList.add('active');
        // Reset password fields
        passwordFields.forEach(field => field.value = '');
        passwordMismatch.style.display = 'none';
    }
    
    // Close modal functions
    function closeModal() {
        editProfileModal.classList.remove('active');
        uploadedProfileImage = null;
    }
    
    closeButton.addEventListener('click', closeModal);
    cancelProfileButton.addEventListener('click', closeModal);
    
    // Click outside to close
    editProfileModal.addEventListener('click', function(event) {
        if (event.target === editProfileModal) {
            closeModal();
        }
    });
    
    // Profile image upload
    profileImageContainer.addEventListener('click', function() {
        profileImage.click();
    });
    
    profileImageText.addEventListener('click', function() {
        profileImage.click();
    });
    
    profileImage.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            
            // Validate file type
            const fileType = file.type;
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            
            if (!validImageTypes.includes(fileType)) {
                alert('Please select a valid image file (JPEG, PNG, GIF, WEBP)');
                return;
            }
            
            // Read the image file and display preview
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePreview.src = e.target.result;
                uploadedProfileImage = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Password visibility toggle
    passwordToggles.forEach((toggle, index) => {
        toggle.addEventListener('click', function() {
            const passwordField = passwordFields[index];
            const type = passwordField.getAttribute('type');
            
            if (type === 'password') {
                passwordField.setAttribute('type', 'text');
                this.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                passwordField.setAttribute('type', 'password');
                this.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    });
    
    // Password match validation
    function validatePasswords() {
        if (newPasswordField.value || confirmPasswordField.value) {
            if (newPasswordField.value !== confirmPasswordField.value) {
                passwordMismatch.style.display = 'block';
                return false;
            } else {
                passwordMismatch.style.display = 'none';
                return true;
            }
        }
        return true;
    }
    
    newPasswordField.addEventListener('input', validatePasswords);
    confirmPasswordField.addEventListener('input', validatePasswords);
    
    // Form submission
    saveProfileButton.addEventListener('click', function() {
        // Validate form
        if (!editProfileForm.checkValidity()) {
            editProfileForm.reportValidity();
            return;
        }
        
        // Validate password match
        if (!validatePasswords()) {
            return;
        }
        
        // Get form values
        const name = document.getElementById('profileName').value;
        const email = document.getElementById('profileEmail').value;
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        
        // In a real application, you would send this data to your server
        // For this demo, we'll simulate a successful update
        
        // Update profile information in the header
        document.querySelector('.user-name').textContent = name;
        
        // Update the greeting message in the dashboard
        const greetingElement = document.querySelector('.greeting h2');
        if (greetingElement) {
            // Keep the verification badge if it exists
            const verificationBadge = greetingElement.querySelector('.verification-badge');
            greetingElement.textContent = `Hello ${name}`;
            
            // Add back the verification badge if it existed
            if (verificationBadge) {
                greetingElement.appendChild(verificationBadge.cloneNode(true));
            }
        }
        
        // Update profile image if a new one was uploaded
        if (uploadedProfileImage) {
            document.querySelector('.user-avatar').src = uploadedProfileImage;
        }
        
        // Close modal
        closeModal();
        
        // Show success message
        alert('Profile updated successfully!');
    });
});
// Notification System Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const notificationIcon = document.querySelector('.notification-icon');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const markAllReadBtn = document.querySelector('.mark-all-read');
    const viewAllBtn = document.querySelector('.view-all');
    const notificationList = document.querySelector('.notification-list');
    const viewReportsLink = document.querySelector('.view-reports');
    
    // Add notification badge to icon if it doesn't exist
    if (!notificationIcon.querySelector('.notification-badge')) {
        const badge = document.createElement('div');
        badge.className = 'notification-badge';
        badge.textContent = '4'; // Initial count based on existing notifications
        notificationIcon.appendChild(badge);
    }

    // Toggle dropdown on notification icon click
    notificationIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationDropdown.classList.toggle('active');
        
        // If opening the dropdown, fetch the latest notifications
        if (notificationDropdown.classList.contains('active')) {
            fetchNotifications();
        }
    });
    
    // Close dropdown when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (notificationDropdown.classList.contains('active') && 
            !notificationDropdown.contains(e.target)) {
            notificationDropdown.classList.remove('active');
        }
    });
    
    // Mark all as read functionality
    markAllReadBtn.addEventListener('click', function() {
        const unreadItems = notificationList.querySelectorAll('.notification-item.unread');
        unreadItems.forEach(item => {
            item.classList.remove('unread');
        });
        
        // Update notification badge
        updateNotificationBadge();
    });
    
    // View all notifications
    viewAllBtn.addEventListener('click', function() {
        // Navigate to daily reports page
        const reportNavItem = document.querySelector('.nav-item:nth-child(3)');
        if (reportNavItem) {
            reportNavItem.click();
            notificationDropdown.classList.remove('active');
        }
    });
    
    // View reports link
    viewReportsLink.addEventListener('click', function(e) {
        e.preventDefault();
        // Navigate to daily reports page
        const reportNavItem = document.querySelector('.nav-item:nth-child(3)');
        if (reportNavItem) {
            reportNavItem.click();
            notificationDropdown.classList.remove('active');
        }
    });
    
    // Individual mark as read buttons
    notificationList.addEventListener('click', function(e) {
        const markReadBtn = e.target.closest('.mark-read');
        if (markReadBtn) {
            const notificationItem = markReadBtn.closest('.notification-item');
            notificationItem.classList.remove('unread');
            updateNotificationBadge();
        }
    });
    
    // Update notification badge count based on unread items
    function updateNotificationBadge() {
        const badge = notificationIcon.querySelector('.notification-badge');
        const unreadCount = notificationList.querySelectorAll('.notification-item.unread').length;
        
        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
    
    // Function to fetch notifications from daily reports
    function fetchNotifications() {
        // In a real app, this would be an AJAX call to your backend
        // For demo purposes, we'll simulate fetching data
        
        // Check if we're on the reports page
        const reportsSection = document.querySelector('.reports-section');
        if (!reportsSection) return;
        
        // Get data from the reports table
        const reportTable = reportsSection.querySelector('.report-table');
        if (!reportTable) return;
        
        const rows = reportTable.querySelectorAll('tbody tr');
        
        // Clear existing notifications (except we'll keep first 2 as examples)
        const existingItems = notificationList.querySelectorAll('.notification-item');
        for (let i = 2; i < existingItems.length; i++) {
            existingItems[i].remove();
        }
        
        // Process each row to create notifications
        rows.forEach((row, index) => {
            // Skip if we already have enough notifications
            if (index > 5) return;
            
            const time = row.querySelector('td:nth-child(1)').textContent;
            const item = row.querySelector('td:nth-child(2)').textContent;
            const transactionType = row.querySelector('td:nth-child(3) span').textContent;
            const quantity = row.querySelector('td:nth-child(4)').textContent;
            const user = row.querySelector('td:nth-child(5)').textContent;
            
            // Create a notification item based on the transaction
            const notificationItem = document.createElement('div');
            notificationItem.className = 'notification-item';
            
            // Make the first one unread for demonstration
            if (index === 0) {
                notificationItem.classList.add('unread');
            }
            
            // Get the notification type based on transaction
            let iconClass = 'stock-in';
            if (transactionType.includes('Out')) {
                iconClass = 'stock-out';
            }
            
            // Create notification HTML
            notificationItem.innerHTML = `
                <div class="notification-icon ${iconClass}">
                    <i class="fas fa-arrow-${iconClass === 'stock-in' ? 'down' : 'up'}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${transactionType}: ${item}</div>
                    <div class="notification-details">
                        <span class="product-number">User: ${user}</span>
                        <span class="quantity">${quantity}</span>
                    </div>
                    <div class="notification-time">${getRelativeTime(time)}</div>
                </div>
                <div class="notification-actions">
                    <span class="mark-read"><i class="fas fa-check"></i></span>
                </div>
            `;
            
            // Add to the notification list
            notificationList.appendChild(notificationItem);
        });
        
        // Update notification badge
        updateNotificationBadge();
    }
    
    // Helper function to convert time to relative format
    function getRelativeTime(timeStr) {
        // In a real app, this would calculate actual relative time
        // For demo, we'll just return some sample relative times
        const times = ['Just now', '5 minutes ago', '10 minutes ago', '1 hour ago', '2 hours ago'];
        return times[Math.floor(Math.random() * times.length)];
    }
    
    // Allow clicking on notification to go to related item in reports
    notificationList.addEventListener('click', function(e) {
        // Ignore clicks on the mark-read button
        if (e.target.closest('.mark-read')) return;
        
        const notificationItem = e.target.closest('.notification-item');
        if (notificationItem) {
            // Get the item name from the notification
            const itemName = notificationItem.querySelector('.notification-title').textContent.split(':')[1].trim();
            
            // Navigate to reports page
            const reportNavItem = document.querySelector('.nav-item:nth-child(3)');
            if (reportNavItem) {
                reportNavItem.click();
                notificationDropdown.classList.remove('active');
                
                // Highlight the related item in the report table (in a real app)
                setTimeout(() => {
                    const reportTable = document.querySelector('.reports-section .report-table');
                    if (reportTable) {
                        const rows = reportTable.querySelectorAll('tbody tr');
                        rows.forEach(row => {
                            const cell = row.querySelector('td:nth-child(2)');
                            if (cell && cell.textContent.includes(itemName)) {
                                // Highlight the row
                                row.style.transition = 'background-color 0.5s';
                                row.style.backgroundColor = '#fff3cd';
                                setTimeout(() => {
                                    row.style.backgroundColor = '';
                                }, 2000);
                            }
                        });
                    }
                }, 300);
            }
        }
    });
    
    // Initialize notification badge on page load
    updateNotificationBadge();
    
    // Add auto-refresh functionality for real-time updates
    function setupNotificationAutoRefresh() {
        // In a real app, this might use WebSockets for real-time updates
        // For demo, we'll just refresh every 30 seconds
        setInterval(() => {
            if (notificationDropdown.classList.contains('active')) {
                fetchNotifications();
            }
        }, 30000);
    }
    
    setupNotificationAutoRefresh();
    
    // Add event listener for when reports data changes
    function setupReportsChangeListener() {
        // Listen for stock movements in the reports page
        const reportsSection = document.querySelector('.reports-section');
        if (reportsSection) {
            // Example: when a new stock entry is submitted
            const submitBtn = reportsSection.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.addEventListener('click', () => {
                    // This would typically happen after form submission succeeds
                    setTimeout(() => {
                        // Create a new notification
                        addNewNotification({
                            type: 'stock-in',
                            item: 'New Item Added',
                            quantity: '+1',
                            user: 'Manticao-ACD',
                            time: 'Just now'
                        });
                    }, 1000);
                });
            }
        }
    }
    
    // Add a new notification to the list
    function addNewNotification(data) {
        const notificationItem = document.createElement('div');
        notificationItem.className = 'notification-item unread';
        
        notificationItem.innerHTML = `
            <div class="notification-icon ${data.type}">
                <i class="fas fa-arrow-${data.type === 'stock-in' ? 'down' : 'up'}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${data.type === 'stock-in' ? 'Stock In' : 'Stock Out'}: ${data.item}</div>
                <div class="notification-details">
                    <span class="product-number">User: ${data.user}</span>
                    <span class="quantity">${data.quantity}</span>
                </div>
                <div class="notification-time">${data.time}</div>
            </div>
            <div class="notification-actions">
                <span class="mark-read"><i class="fas fa-check"></i></span>
            </div>
        `;
        
        // Add to the top of the notification list
        if (notificationList.firstChild) {
            notificationList.insertBefore(notificationItem, notificationList.firstChild);
        } else {
            notificationList.appendChild(notificationItem);
        }
        
        // Update notification badge
        updateNotificationBadge();
        
        // Show a visual indicator for the notification icon
        notificationIcon.style.animation = 'pulse 0.8s 2';
        setTimeout(() => {
            notificationIcon.style.animation = '';
        }, 1600);
    }
    
    // Add pulse animation for the notification icon
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Setup the reports change listener
    setupReportsChangeListener();
    
    // Create a function to simulate new notifications for demo purposes
    window.simulateNewNotification = function() {
        const types = ['stock-in', 'stock-out'];
        const items = ['Engine Filter', 'Hydraulic Oil', 'Fuel Pump', 'Air Filter', 'Brake Pads'];
        const quantities = ['+10', '+5', '+20', '-2', '-5', '-1'];
        const users = ['Manticao-ACD', 'John T.', 'Sarah L.'];
        
        addNewNotification({
            type: types[Math.floor(Math.random() * types.length)],
            item: items[Math.floor(Math.random() * items.length)],
            quantity: quantities[Math.floor(Math.random() * quantities.length)],
            user: users[Math.floor(Math.random() * users.length)],
            time: 'Just now'
        });
    };
    
    // Add a dev button for testing (remove in production)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const testBtn = document.createElement('button');
        testBtn.textContent = 'Test Notification';
        testBtn.style.position = 'fixed';
        testBtn.style.bottom = '10px';
        testBtn.style.right = '10px';
        testBtn.style.zIndex = '9999';
        testBtn.style.padding = '5px 10px';
        testBtn.style.background = '#333';
        testBtn.style.color = 'white';
        testBtn.style.border = 'none';
        testBtn.style.borderRadius = '4px';
        testBtn.onclick = window.simulateNewNotification;
        document.body.appendChild(testBtn);
    }
});
