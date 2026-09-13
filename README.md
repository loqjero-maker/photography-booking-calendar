# 📸 Photography & Photobooth Booking Calendar

A professional, fully-functional booking calendar system for wedding photography and photobooth event rentals.

## Features

### 📅 Calendar Management
- Interactive monthly calendar view
- Color-coded availability (available/booked/disabled dates)
- Easy navigation between months
- Click to select dates for booking

### 📋 Booking System
- Book wedding photography or photobooth services
- Select date, time, and service type
- Capture client details (name, email, phone)
- Add event-specific details (location, guest count, etc.)
- All bookings saved locally in browser storage

### ⏰ Availability Management
- Set which days you work (Monday-Sunday)
- Configure work hours (start/end time)
- Past dates automatically disabled
- Only available dates can be booked

### 📊 Booking Tracking
- View all scheduled bookings
- See booking status (pending/confirmed)
- Contact information for each client
- Event details stored for reference

## Getting Started

### Installation
1. Clone this repository
   ```bash
   git clone https://github.com/loqjero-maker/photography-booking-calendar.git
   cd photography-booking-calendar
   ```

2. Open `index.html` in a modern web browser
   - Works offline (uses browser localStorage)
   - No server or database required

### How to Use

#### For Clients - Making a Booking
1. Go to **Calendar** tab
2. Browse the calendar and click an available date (blue dates)
3. Fill in the booking form:
   - Select service type (Wedding/Photobooth/Both)
   - Choose time
   - Enter your contact details
   - Add event details
4. Click **Book Now**
5. Receive confirmation message

#### For You - Managing Availability
1. Go to **Manage Availability** tab
2. Check which days you work
3. Set your working hours
4. Click **Save Availability**
5. Calendar updates automatically

#### For You - Viewing Bookings
1. Go to **My Bookings** tab
2. See all client requests
3. View contact info and event details
4. Plan your schedule

## Data Storage

- **Browser Storage**: All data is stored in your browser's localStorage
- **Local Only**: No data is sent to external servers
- **Persistent**: Bookings remain even after closing the browser
- **Clear Data**: Clear browser cache/cookies to reset

## Services Offered

- **Wedding Photography**: Professional photo coverage for weddings
- **Photobooth Rental**: Interactive photo booth for events
- **Both**: Complete wedding photo package with photobooth

## Customization

You can easily customize:
- Colors and branding (edit `styles.css`)
- Available time zones or locations
- Service types and pricing
- Form fields and event details

## Technical Stack

- **HTML5**: Structure
- **CSS3**: Modern, responsive design
- **Vanilla JavaScript**: No dependencies
- **Browser Storage**: LocalStorage API

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Email notifications to clients
- Payment integration
- Admin dashboard
- Client portal
- Google Calendar sync
- SMS reminders
- Pricing calculator

## Support

For issues or questions, create an issue in the GitHub repository.

---

**Made with ❤️ for your photography business**
