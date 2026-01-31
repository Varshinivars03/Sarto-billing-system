# Sarto Billing System for Tailors

A responsive web-based billing system designed specifically for tailoring businesses.

## Features

- **Item Management**: Pre-configured items with prices
  - Normal Blouse: ₹100
  - Lining Blouse: ₹200 (with lining) / ₹250 (without lining)
  - Chudithar: ₹250
  - Inskirt: ₹50
  - Piping Blouse: ₹250

- **Interactive Billing**: Real-time bill calculation
- **Mobile Responsive**: Works perfectly on all devices
- **Payment Processing**: Integrated pay now functionality
- **Professional Design**: Clean and modern interface

## How to Run

1. **Local Development**:
   - Open `index.html` in any modern web browser
   - No server setup required - runs directly in browser

2. **Live Server** (Recommended):
   - Use VS Code Live Server extension
   - Right-click on `index.html` and select "Open with Live Server"

3. **Simple HTTP Server**:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (if you have http-server installed)
   npx http-server
   ```

## Usage

1. Select items by clicking the + button to increase quantity
2. For Lining Blouse, choose "Yes" (₹200) or "No" (₹250) option
3. View real-time bill summary on the right
4. Click "Pay Now" to process payment
5. Confirm payment details in the popup

## Mobile Responsive

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- All screen sizes

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- All modern browsers

## File Structure

```
sarto-billing/
├── index.html      # Main HTML file
├── styles.css      # CSS styling
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Customization

To modify prices or add new items:
1. Edit the `items` object in `script.js`
2. Add corresponding HTML in `index.html`
3. Update CSS classes in `styles.css` if needed

## Support

For any issues or customizations, please refer to the code comments or modify the files as needed.