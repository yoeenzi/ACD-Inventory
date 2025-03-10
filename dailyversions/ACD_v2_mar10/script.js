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