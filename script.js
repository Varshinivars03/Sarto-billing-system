// Item data with prices
const items = {
    'normal-blouse': { name: 'Normal Blouse', price: 100, quantity: 0 },
    'lining-blouse': { name: 'Lining Blouse', price: 200, quantity: 0 },
    'chudithar': { name: 'Chudithar', price: 250, quantity: 0 },
    'inskirt': { name: 'Inskirt', price: 50, quantity: 0 },
    'piping-blouse': { name: 'Piping Blouse', price: 250, quantity: 0 }
};

// Update quantity function
function updateQuantity(itemId, change) {
    const currentQty = items[itemId].quantity;
    const newQty = Math.max(0, currentQty + change);
    
    items[itemId].quantity = newQty;
    document.getElementById(itemId + '-qty').textContent = newQty;
    
    updateBill();
}

// Get lining blouse price based on selection
function getLiningBlousePrice() {
    const liningType = document.querySelector('input[name="lining-type"]:checked').value;
    return liningType === 'yes' ? 200 : 250;
}

// Update bill display
function updateBill() {
    const billItemsContainer = document.getElementById('bill-items');
    const totalAmountElement = document.getElementById('total-amount');
    
    billItemsContainer.innerHTML = '';
    let total = 0;
    
    // Process each item
    Object.keys(items).forEach(itemId => {
        const item = items[itemId];
        if (item.quantity > 0) {
            let itemPrice = item.price;
            
            // Special handling for lining blouse
            if (itemId === 'lining-blouse') {
                itemPrice = getLiningBlousePrice();
            }
            
            const itemTotal = itemPrice * item.quantity;
            total += itemTotal;
            
            // Create bill item element
            const billItem = document.createElement('div');
            billItem.className = 'bill-item';
            billItem.innerHTML = `
                <div>
                    <div class="item-name">${item.name}</div>
                    <div class="item-quantity">Qty: ${item.quantity} × ₹${itemPrice}</div>
                </div>
                <div class="item-price">₹${itemTotal}</div>
            `;
            
            billItemsContainer.appendChild(billItem);
        }
    });
    
    // Show message if no items selected
    if (total === 0) {
        billItemsContainer.innerHTML = '<div style="text-align: center; color: #7f8c8d; padding: 20px;">No items selected</div>';
    }
    
    totalAmountElement.textContent = `₹${total}`;
    
    // Enable/disable pay button
    const payButton = document.querySelector('.pay-now-btn');
    payButton.disabled = total === 0;
}

// Process payment function
function processPayment() {
    const total = document.getElementById('total-amount').textContent;
    
    if (total === '₹0') {
        alert('Please select items before proceeding to payment.');
        return;
    }
    
    // Generate bill summary
    let billSummary = 'SARTO BILLING SYSTEM\\n';
    billSummary += '========================\\n\\n';
    
    Object.keys(items).forEach(itemId => {
        const item = items[itemId];
        if (item.quantity > 0) {
            let itemPrice = item.price;
            if (itemId === 'lining-blouse') {
                itemPrice = getLiningBlousePrice();
                const liningType = document.querySelector('input[name="lining-type"]:checked').value;
                billSummary += `${item.name} (${liningType === 'yes' ? 'With Lining' : 'Without Lining'})\\n`;
            } else {
                billSummary += `${item.name}\\n`;
            }
            billSummary += `  Qty: ${item.quantity} × ₹${itemPrice} = ₹${itemPrice * item.quantity}\\n\\n`;
        }
    });
    
    billSummary += `Total Amount: ${total}\\n`;
    billSummary += '========================\\n';
    billSummary += 'Thank you for your business!';
    
    // Show payment confirmation
    const proceed = confirm(`Payment Summary:\\n\\n${billSummary}\\n\\nProceed to payment?`);
    
    if (proceed) {
        // Simulate payment processing
        alert('Payment processed successfully!\\n\\nOrder confirmed. Your items will be ready as per the agreed timeline.');
        
        // Reset the form
        resetForm();
    }
}

// Reset form function
function resetForm() {
    Object.keys(items).forEach(itemId => {
        items[itemId].quantity = 0;
        document.getElementById(itemId + '-qty').textContent = '0';
    });
    
    // Reset lining blouse option
    document.querySelector('input[name="lining-type"][value="yes"]').checked = true;
    
    updateBill();
}

// Add event listeners for lining blouse radio buttons
document.addEventListener('DOMContentLoaded', function() {
    const liningRadios = document.querySelectorAll('input[name="lining-type"]');
    liningRadios.forEach(radio => {
        radio.addEventListener('change', updateBill);
    });
    
    // Initial bill update
    updateBill();
});

// Print bill function (bonus feature)
function printBill() {
    const total = document.getElementById('total-amount').textContent;
    
    if (total === '₹0') {
        alert('No items to print.');
        return;
    }
    
    let printContent = `
        <html>
        <head>
            <title>Sarto Bill</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .bill-item { display: flex; justify-content: space-between; padding: 5px 0; }
                .total { border-top: 2px solid #000; margin-top: 20px; padding-top: 10px; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="header">
                <h2>SARTO BILLING SYSTEM</h2>
                <p>Professional Tailoring Services</p>
                <p>Date: ${new Date().toLocaleDateString()}</p>
            </div>
    `;
    
    Object.keys(items).forEach(itemId => {
        const item = items[itemId];
        if (item.quantity > 0) {
            let itemPrice = item.price;
            if (itemId === 'lining-blouse') {
                itemPrice = getLiningBlousePrice();
            }
            printContent += `
                <div class="bill-item">
                    <span>${item.name} (${item.quantity})</span>
                    <span>₹${itemPrice * item.quantity}</span>
                </div>
            `;
        }
    });
    
    printContent += `
            <div class="total">
                <div class="bill-item">
                    <span>Total Amount:</span>
                    <span>${total}</span>
                </div>
            </div>
            <p style="text-align: center; margin-top: 30px;">Thank you for your business!</p>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}