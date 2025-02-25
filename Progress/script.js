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

// Uncomment the line below to simulate data loading after 3 seconds
// setTimeout(loadStockData, 3000);

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

// Demo function - Use to show data after a delay for demonstration
document.addEventListener('DOMContentLoaded', () => {
    // Simulate data loading after 2 seconds for demo purposes
    setTimeout(loadStockData, 2000);
});