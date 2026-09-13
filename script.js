// Calendar State
let currentDate = new Date();
let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
let availability = JSON.parse(localStorage.getItem('availability')) || {
    monday: true, tuesday: true, wednesday: true, thursday: true, 
    friday: true, saturday: true, sunday: true,
    startTime: '09:00', endTime: '22:00'
};

// TAB SWITCHING
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove active from all tabs and buttons
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        
        // Add active to clicked button and corresponding content
        e.target.classList.add('active');
        const tabId = e.target.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
        
        if (tabId === 'bookings') loadBookings();
        if (tabId === 'availability') loadAvailability();
    });
});

// CALENDAR FUNCTIONS
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update header
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('month-year').textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const calendarDays = document.getElementById('calendar-days');
    calendarDays.innerHTML = '';
    
    // Previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const dayDiv = createDayDiv(day, 'other-month', false);
        calendarDays.appendChild(dayDiv);
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isBooked = bookings.some(b => new Date(b.date).toDateString() === date.toDateString());
        const isAvailable = isDateAvailable(date);
        const isPast = date < new Date() && date.toDateString() !== new Date().toDateString();
        
        let className = '';
        if (isPast) className = 'disabled';
        else if (isBooked) className = 'booked';
        else if (isAvailable) className = 'available';
        
        const dayDiv = createDayDiv(day, className, !isPast && isAvailable);
        dayDiv.addEventListener('click', () => {
            if (!isPast && isAvailable && !isBooked) {
                document.getElementById('eventDate').value = date.toISOString().split('T')[0];
                document.querySelector('.tab-btn[data-tab="calendar"]').click();
            }
        });
        calendarDays.appendChild(dayDiv);
    }
    
    // Next month's days
    const totalCells = calendarDays.children.length;
    const remainingCells = 42 - totalCells; // 6 rows × 7 days
    for (let day = 1; day <= remainingCells; day++) {
        const dayDiv = createDayDiv(day, 'other-month', false);
        calendarDays.appendChild(dayDiv);
    }
}

function createDayDiv(day, className, clickable) {
    const div = document.createElement('div');
    div.className = `calendar-day ${className}`;
    div.textContent = day;
    if (clickable) div.style.cursor = 'pointer';
    return div;
}

function isDateAvailable(date) {
    const dayName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][date.getDay()];
    return availability[dayName];
}

// NAVIGATION
document.getElementById('prev-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// BOOKING FORM
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const booking = {
        id: Date.now(),
        date: document.getElementById('eventDate').value,
        time: document.getElementById('eventTime').value,
        service: document.getElementById('serviceType').value,
        name: document.getElementById('clientName').value,
        email: document.getElementById('clientEmail').value,
        phone: document.getElementById('clientPhone').value,
        details: document.getElementById('eventDetails').value,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    alert('✅ Booking request submitted! We\'ll confirm via email soon.');
    document.getElementById('bookingForm').reset();
    renderCalendar();
});

// LOAD BOOKINGS
function loadBookings() {
    const list = document.getElementById('bookings-list');
    
    if (bookings.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #999;">No bookings yet.</p>';
        return;
    }
    
    list.innerHTML = bookings.map(b => `
        <div class="booking-card">
            <div>
                <h4>${b.service.toUpperCase()}</h4>
                <p><strong>Date:</strong> ${new Date(b.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${b.time}</p>
                <p><strong>Client:</strong> ${b.name}</p>
                <p><strong>Email:</strong> ${b.email}</p>
                <p><strong>Phone:</strong> ${b.phone}</p>
            </div>
            <div>
                <p><strong>Details:</strong></p>
                <p>${b.details || 'No additional details'}</p>
                <span class="status ${b.status}">${b.status.toUpperCase()}</span>
            </div>
        </div>
    `).join('');
}

// AVAILABILITY
function loadAvailability() {
    document.getElementById('monday').checked = availability.monday;
    document.getElementById('tuesday').checked = availability.tuesday;
    document.getElementById('wednesday').checked = availability.wednesday;
    document.getElementById('thursday').checked = availability.thursday;
    document.getElementById('friday').checked = availability.friday;
    document.getElementById('saturday').checked = availability.saturday;
    document.getElementById('sunday').checked = availability.sunday;
    document.getElementById('workStart').value = availability.startTime;
    document.getElementById('workEnd').value = availability.endTime;
}

document.getElementById('saveAvailability').addEventListener('click', () => {
    availability = {
        monday: document.getElementById('monday').checked,
        tuesday: document.getElementById('tuesday').checked,
        wednesday: document.getElementById('wednesday').checked,
        thursday: document.getElementById('thursday').checked,
        friday: document.getElementById('friday').checked,
        saturday: document.getElementById('saturday').checked,
        sunday: document.getElementById('sunday').checked,
        startTime: document.getElementById('workStart').value,
        endTime: document.getElementById('workEnd').value
    };
    
    localStorage.setItem('availability', JSON.stringify(availability));
    alert('✅ Availability updated!');
    renderCalendar();
});

// INITIAL RENDER
renderCalendar();
loadAvailability();