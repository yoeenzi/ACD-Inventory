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

// Function to format number with commas for thousands/millions
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Format peso value with peso sign and commas
function formatPeso(amount) {
    return `₱${formatNumberWithCommas(parseFloat(amount).toFixed(2))}`;
}

// Add Item Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const addItemBtn = document.querySelector('.btn-primary');
    const modal = document.getElementById('addItemModal');
    const closeButton = document.querySelector('.close-button');
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
    
    // Date input handling - Enhanced with custom styling to match existing design
    const dateInput = document.getElementById('date');
    const dateDisplay = document.getElementById('dateDisplay');
    const datePickerWrapper = document.querySelector('.date-input-wrapper');

    // Create a custom button that matches the existing design
    const datePickerBtn = document.createElement('div');
    datePickerBtn.className = 'date-input-label';
    datePickerBtn.innerHTML = '<i class="fas fa-calendar-alt"></i>';

    // If there's already a date-input-label, replace it, otherwise add a new one
    const existingLabel = datePickerWrapper.querySelector('.date-input-label');
    if (existingLabel) {
        existingLabel.replaceWith(datePickerBtn);
    } else {
        datePickerWrapper.appendChild(datePickerBtn);
    }

    // When the button is clicked, focus the hidden date input to open the date picker
    datePickerBtn.addEventListener('click', function() {
        dateInput.focus();
        if (typeof dateInput.showPicker === 'function') {
            dateInput.showPicker();
        }
    });

    // Also make the dateDisplay open the date picker when clicked
    dateDisplay.addEventListener('click', function() {
        dateInput.focus();
        if (typeof dateInput.showPicker === 'function') {
            dateInput.showPicker();
        }
    });

    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const year = selectedDate.getFullYear();
        
        dateDisplay.value = `${day}/${month}/${year}`;
    });

    // Make the dateDisplay readonly to ensure consistent date format
    dateDisplay.readOnly = true;
    
    // Price calculations - Direct peso values with formatting
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
    
    // Open modal
    addItemBtn.addEventListener('click', function() {
        modal.classList.add('active');
        
        // Set current date as default
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        
        const formattedDate = `${year}-${month}-${day}`;
        dateInput.value = formattedDate;
        dateDisplay.value = `${day}/${month}/${year}`;
        
        // Reset the uploaded image data
        uploadedImageData = null;
    });
    
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
        const rack = document.getElementById('rack') ? document.getElementById('rack').value : 'N/A';
        const tax = document.getElementById('tax').value || '0.00';
        const totalAmount = document.getElementById('totalAmount').value || '0.00';
        const pic = document.getElementById('pic') ? document.getElementById('pic').value : 'N/A';
        const po = document.getElementById('po') ? document.getElementById('po').value : 'N/A';
        const ctpl = document.getElementById('ctpl') ? document.getElementById('ctpl').value : 'N/A';
        
        // Add row to inventory table with all details
        addItemToTable(component, partsName, partsNumber, quantity, itemPrice, date, uploadedImageData, rack, tax, totalAmount, pic, po, ctpl);
        
        // Close modal and reset form
        closeModal();
        
        // Show success message
        alert('Item added successfully!');
    });
    
    // Function to add item to inventory table - Using direct peso formatting and storing all details
    function addItemToTable(component, partsName, partsNumber, quantity, itemPrice, date, imageData, rack = 'N/A', tax = '0.00', totalAmount = '0.00', pic = 'N/A', po = 'N/A', ctpl = 'N/A') {
        const table = document.querySelector('.inventory-table tbody');
        const newRow = document.createElement('tr');
        
        // Store additional data as data attributes
        newRow.dataset.rack = rack;
        newRow.dataset.tax = formatPeso(tax);
        newRow.dataset.totalAmount = formatPeso(totalAmount);
        newRow.dataset.pic = pic;
        newRow.dataset.po = po;
        newRow.dataset.ctpl = ctpl;
        
        // Determine what to use for the image
        const imageHtml = imageData ? 
            `<img src="${imageData}" alt="${partsName}" style="width:50px; height:40px; object-fit:contain;">` : 
            `<img src="/api/placeholder/60/40" alt="Part Image">`;
        
        // Format the price with peso sign and commas
        const formattedPrice = formatPeso(itemPrice);
        
        newRow.innerHTML = `
            <td class="checkbox-cell">
                <input type="checkbox">
            </td>
            <td>${date}</td>
            <td>${partsNumber}</td>
            <td>${partsName}</td>
            <td>${component}</td>
            <td>${quantity}</td>
            <td>${formattedPrice}</td>
            <td class="image-cell">
                ${imageHtml}
            </td>
            <td class="action-cell">
                <div class="action-buttons-cell">
                    <div class="action-btn view-btn">
                        <i class="fas fa-eye"></i>
                    </div>
                    <div class="action-btn edit-btn">
                        <i class="fas fa-edit"></i>
                    </div>
                    <div class="action-btn delete-btn">
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            </td>
        `;
        
        // Insert at the top of the table
        if (table.firstChild) {
            table.insertBefore(newRow, table.firstChild);
        } else {
            table.appendChild(newRow);
        }
        
        // Add event listeners to the new action buttons
        attachActionButtonEvents(newRow);
    }
    
    // Update existing price cells in the table to use peso format
    function updateExistingPricesToPesos() {
        const priceCells = document.querySelectorAll('.inventory-table tbody tr td:nth-child(7)');
        priceCells.forEach(cell => {
            // Extract the numeric amount (removing any currency symbol)
            const amount = parseFloat(cell.textContent.replace(/[^0-9.-]+/g, ''));
            if (!isNaN(amount)) {
                // Format with peso sign and commas
                cell.textContent = formatPeso(amount);
            }
        });
    }
    
    // Call this function to update existing prices
    updateExistingPricesToPesos();

    // Attach events to action buttons in a table row - ENHANCED VERSION
    function attachActionButtonEvents(row) {
        const viewBtn = row.querySelector('.view-btn');
        const editBtn = row.querySelector('.edit-btn');
        const deleteBtn = row.querySelector('.delete-btn');
        
        viewBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent row click
            
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
            
            // For additional fields that might not be visible in the table,
            // we can try to extract them from data attributes or use placeholder values
            const rack = row.dataset.rack || 'N/A';
            const tax = row.dataset.tax || '₱0.00';
            const totalAmount = row.dataset.totalAmount || itemPrice; // Default to item price if not available
            const pic = row.dataset.pic || 'N/A';
            const po = row.dataset.po || 'N/A';
            const ctpl = row.dataset.ctpl || 'N/A';
            
            // Create a comprehensive view modal
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
        });
        
        editBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent row click
            const partsName = row.querySelector('td:nth-child(4)').textContent;
            alert(`Editing ${partsName}`);
        });
        
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent row click
            const partsName = row.querySelector('td:nth-child(4)').textContent;
            if (confirm(`Are you sure you want to delete ${partsName}?`)) {
                row.remove();
                alert(`${partsName} has been deleted`);
            }
        });
    }

    // Setup existing images and also add data attributes to existing rows
    function setupExistingRows() {
        const tableRows = document.querySelectorAll('.inventory-table tbody tr');
        tableRows.forEach(row => {
            // Set default values for data attributes if they don't already exist
            if (!row.dataset.rack) row.dataset.rack = 'N/A';
            if (!row.dataset.tax) row.dataset.tax = '₱0.00';
            if (!row.dataset.totalAmount) {
                const price = row.querySelector('td:nth-child(7)').textContent;
                row.dataset.totalAmount = price;
            }
            if (!row.dataset.pic) row.dataset.pic = 'N/A';
            if (!row.dataset.po) row.dataset.po = 'N/A';
            if (!row.dataset.ctpl) row.dataset.ctpl = 'N/A';
            
            // Make sure action buttons have proper event listeners
            attachActionButtonEvents(row);
        });
    }

    // Call setup function for existing rows
    setupExistingRows();
});

// Add this code to your existing JavaScript file, preferably after your addItemModal implementation

// Edit Item Modal Functionality
function setupEditItemModal() {
    // Check if modal already exists to avoid duplicates
    if (document.getElementById('editItemModal')) return;
    
    // Clone the add item modal structure for the edit modal
    const addItemModal = document.getElementById('addItemModal');
    const editItemModal = addItemModal.cloneNode(true);
    editItemModal.id = 'editItemModal';
    
    // Update the title and button text
    const modalTitle = editItemModal.querySelector('h2');
    if (modalTitle) modalTitle.textContent = 'Edit Item';
    
    const applyButton = editItemModal.querySelector('#applyButton');
    if (applyButton) {
        applyButton.id = 'updateButton';
        applyButton.textContent = 'Update Item';
    }
    
    const form = editItemModal.querySelector('form');
    if (form) form.id = 'editItemForm';
    
    // Add hidden field to store the row reference
    const hiddenRowIndex = document.createElement('input');
    hiddenRowIndex.type = 'hidden';
    hiddenRowIndex.id = 'editRowIndex';
    form.appendChild(hiddenRowIndex);
    
    // Append the modal to the document body
    document.body.appendChild(editItemModal);
    
    // Setup event listeners for the edit modal
    setupEditModalEventListeners();
}

function setupEditModalEventListeners() {
    const editItemModal = document.getElementById('editItemModal');
    const closeButton = editItemModal.querySelector('.close-button');
    const cancelButton = editItemModal.querySelector('#cancelButton');
    const updateButton = document.getElementById('updateButton');
    const editItemForm = document.getElementById('editItemForm');
    
    // Store the reference to the row being edited
    let editingRow = null;
    
    // File input handling for edit modal
    const imageInput = editItemModal.querySelector('input[type="file"]');
    const imageDisplay = editItemModal.querySelector('#imageDisplay');
    let uploadedImageData = null;
    
    if (imageInput) {
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
    }
    
    // Date input handling
    const dateInput = editItemModal.querySelector('input[type="date"]');
    const dateDisplay = editItemModal.querySelector('#dateDisplay');
    
    if (dateInput && dateDisplay) {
        dateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const year = selectedDate.getFullYear();
            
            dateDisplay.value = `${day}/${month}/${year}`;
        });
        
        // Also make the dateDisplay open the date picker when clicked
        dateDisplay.addEventListener('click', function() {
            dateInput.focus();
            if (typeof dateInput.showPicker === 'function') {
                dateInput.showPicker();
            }
        });
    }
    
    // Price calculations
    const itemPriceInput = editItemModal.querySelector('#itemPrice');
    const taxInput = editItemModal.querySelector('#tax');
    const totalAmountInput = editItemModal.querySelector('#totalAmount');
    const quantityInput = editItemModal.querySelector('#quantity');
    
    function calculateTotal() {
        const price = parseFloat(itemPriceInput.value) || 0;
        const tax = parseFloat(taxInput.value) || 0;
        const quantity = parseInt(quantityInput.value) || 1;
        
        const total = (price * quantity) + tax;
        totalAmountInput.value = total.toFixed(2);
    }
    
    if (itemPriceInput && taxInput && quantityInput) {
        itemPriceInput.addEventListener('input', calculateTotal);
        taxInput.addEventListener('input', calculateTotal);
        quantityInput.addEventListener('input', calculateTotal);
    }
    
    // Close modal functions
    function closeEditModal() {
        editItemModal.classList.remove('active');
        if (editItemForm) editItemForm.reset();
        if (imageDisplay) imageDisplay.value = '';
        if (dateDisplay) dateDisplay.value = '';
        uploadedImageData = null;
        editingRow = null;
    }
    
    if (closeButton) closeButton.addEventListener('click', closeEditModal);
    if (cancelButton) cancelButton.addEventListener('click', closeEditModal);
    
    // Click outside to close
    editItemModal.addEventListener('click', function(event) {
        if (event.target === editItemModal) {
            closeEditModal();
        }
    });
    
    // Handle form submission to update the item
    if (updateButton) {
        updateButton.addEventListener('click', function() {
            // Trigger HTML5 validation
            if (editItemForm && !editItemForm.checkValidity()) {
                editItemForm.reportValidity();
                return;
            }
            
            if (!editingRow) {
                alert('No item selected for editing');
                return;
            }
            
            // Get form values
            const component = editItemModal.querySelector('#component').value;
            const partsName = editItemModal.querySelector('#partsName').value;
            const partsNumber = editItemModal.querySelector('#partsNumber').value;
            const quantity = editItemModal.querySelector('#quantity').value;
            const itemPrice = editItemModal.querySelector('#itemPrice').value;
            const date = dateDisplay.value;
            const rack = editItemModal.querySelector('#rack') ? editItemModal.querySelector('#rack').value : 'N/A';
            const tax = editItemModal.querySelector('#tax').value || '0.00';
            const totalAmount = editItemModal.querySelector('#totalAmount').value || '0.00';
            const pic = editItemModal.querySelector('#pic') ? editItemModal.querySelector('#pic').value : 'N/A';
            const po = editItemModal.querySelector('#po') ? editItemModal.querySelector('#po').value : 'N/A';
            const ctpl = editItemModal.querySelector('#ctpl') ? editItemModal.querySelector('#ctpl').value : 'N/A';
            
            // Update row in inventory table
            updateTableRow(editingRow, component, partsName, partsNumber, quantity, itemPrice, date, uploadedImageData, rack, tax, totalAmount, pic, po, ctpl);
            
            // Close modal and reset form
            closeEditModal();
            
            // Show success message
            alert('Item updated successfully!');
        });
    }
    
    // Function to populate edit form with data from the row
    window.populateEditForm = function(row) {
        editingRow = row;
        
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
        const componentInput = editItemModal.querySelector('#component');
        const partsNameInput = editItemModal.querySelector('#partsName');
        const partsNumberInput = editItemModal.querySelector('#partsNumber');
        const quantityInput = editItemModal.querySelector('#quantity');
        const itemPriceInput = editItemModal.querySelector('#itemPrice');
        const rackInput = editItemModal.querySelector('#rack');
        const taxInput = editItemModal.querySelector('#tax');
        const totalAmountInput = editItemModal.querySelector('#totalAmount');
        const picInput = editItemModal.querySelector('#pic');
        const poInput = editItemModal.querySelector('#po');
        const ctplInput = editItemModal.querySelector('#ctpl');
        
        if (componentInput) componentInput.value = component;
        if (partsNameInput) partsNameInput.value = partsName;
        if (partsNumberInput) partsNumberInput.value = partsNumber;
        if (quantityInput) quantityInput.value = quantity;
        if (itemPriceInput) itemPriceInput.value = itemPrice;
        if (rackInput) rackInput.value = rack !== 'N/A' ? rack : '';
        if (taxInput) taxInput.value = tax;
        if (totalAmountInput) totalAmountInput.value = totalAmount;
        if (picInput) picInput.value = pic !== 'N/A' ? pic : '';
        if (poInput) poInput.value = po !== 'N/A' ? po : '';
        if (ctplInput) ctplInput.value = ctpl !== 'N/A' ? ctpl : '';
        
        // Set the date
        if (dateDisplay) dateDisplay.value = date;
        if (dateInput) {
            // Convert date from DD/MM/YYYY to YYYY-MM-DD
            const dateParts = date.split('/');
            if (dateParts.length === 3) {
                const day = dateParts[0];
                const month = dateParts[1];
                const year = dateParts[2];
                dateInput.value = `${year}-${month}-${day}`;
            }
        }
        
        // Set the image preview if available
        if (imgSrc && imgSrc.startsWith('data:image')) {
            uploadedImageData = imgSrc;
            if (imageDisplay) imageDisplay.value = 'Current Image';
        } else {
            uploadedImageData = null;
            if (imageDisplay) imageDisplay.value = '';
        }
        
        // Show the modal
        editItemModal.classList.add('active');
    };
    
    // Function to update a row in the table
    function updateTableRow(row, component, partsName, partsNumber, quantity, itemPrice, date, imageData, rack = 'N/A', tax = '0.00', totalAmount = '0.00', pic = 'N/A', po = 'N/A', ctpl = 'N/A') {
        // Update data attributes
        row.dataset.rack = rack;
        row.dataset.tax = formatPeso(tax);
        row.dataset.totalAmount = formatPeso(totalAmount);
        row.dataset.pic = pic;
        row.dataset.po = po;
        row.dataset.ctpl = ctpl;
        
        // Determine what to use for the image
        const existingImg = row.querySelector('.image-cell img');
        if (imageData && existingImg) {
            existingImg.src = imageData;
            existingImg.alt = partsName;
        } else if (!existingImg) {
            const imgHtml = imageData ? 
                `<img src="${imageData}" alt="${partsName}" style="width:50px; height:40px; object-fit:contain;">` : 
                `<img src="/api/placeholder/60/40" alt="Part Image">`;
            
            const imageCell = row.querySelector('.image-cell');
            if (imageCell) imageCell.innerHTML = imgHtml;
        }
        
        // Format the price with peso sign and commas
        const formattedPrice = formatPeso(itemPrice);
        
        // Update visible cells
        const cells = row.querySelectorAll('td');
        if (cells.length >= 8) {
            cells[1].textContent = date;
            cells[2].textContent = partsNumber;
            cells[3].textContent = partsName;
            cells[4].textContent = component;
            cells[5].textContent = quantity;
            cells[6].textContent = formattedPrice;
        }
    }
}

// Update the edit button event listeners to use the edit modal
function updateEditButtonEvents() {
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(btn => {
        // Remove any existing event listeners (optional, may cause issues)
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent row click
            const row = newBtn.closest('tr');
            window.populateEditForm(row);
        });
    });
}

// Initialize the edit modal functionality when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Setup the edit modal
    setupEditItemModal();
    
    // Update edit button events
    updateEditButtonEvents();
    
    // Also add a MutationObserver to handle newly added rows
    const tableBody = document.querySelector('.inventory-table tbody');
    if (tableBody) {
        const observer = new MutationObserver(function(mutations) {
            updateEditButtonEvents();
        });
        
        observer.observe(tableBody, { childList: true });
    }
});
