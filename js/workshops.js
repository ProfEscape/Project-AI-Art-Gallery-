$(document).ready(function() {
    // Sample workshop data
    const workshops = [
        {
            id: 1,
            title: 'Introduction to AI Art',
            description: 'Learn the basics of creating art with AI',
            category: 'beginner',
            date: '2025-07-10',
            time: '14:00',
            duration: '2 hours',
            instructor: 'Adnan',
            image: '../assets/images/workshops/intro.jpeg',
            capacity: 20,
            registered: 15
        },
        // Add more workshop data
    ];

    // View Toggle
    $('.view-toggle .btn').click(function() {
        $('.view-toggle .btn').removeClass('active');
        $(this).addClass('active');
        
        const view = $(this).data('view');
        if (view === 'calendar') {
            $('#calendarView').show();
            $('#listView').hide();
            renderCalendar();
        } else {
            $('#listView').show();
            $('#calendarView').hide();
            renderList();
        }
    });

    // Render Calendar View
    function renderCalendar() {
        const calendar = $('#calendarView');
        calendar.empty();
        
        // Create calendar grid
        const now = new Date();
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
        
        let html = `
            <div class="calendar">
                <div class="calendar-header">
                    <h4>${now.toLocaleString('default', { month: 'long' })} ${now.getFullYear()}</h4>
                </div>
                <div class="calendar-grid">
                    <div class="weekdays">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    <div class="days">
        `;
        
        // Add empty cells for days before the first of the month
        for (let i = 0; i < firstDay; i++) {
            html += '<div class="day empty"></div>';
        }
        
        // Add days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const dayWorkshops = workshops.filter(w => w.date === date);
            
            html += `
                <div class="day${dayWorkshops.length ? ' has-events' : ''}">
                    <div class="day-number">${day}</div>
                    ${dayWorkshops.map(w => `
                        <div class="event" data-workshop-id="${w.id}">
                            <small>${w.title}</small>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        html += `
                    </div>
                </div>
            </div>
        `;
        
        calendar.html(html);
    }

    // Render List View
    function renderList(filtered = workshops) {
        const list = $('#workshopsList');
        list.empty();
        
        filtered.forEach(workshop => {
            const card = `
                <div class="col-md-6 mb-4">
                    <div class="card h-100">
                        <img src="${workshop.image}" class="card-img-top" alt="${workshop.title}">
                        <div class="card-body">
                            <h5 class="card-title">${workshop.title}</h5>
                            <p class="card-text">${workshop.description}</p>
                            <div class="workshop-meta mb-3">
                                <span class="badge bg-primary me-2">${workshop.category}</span>
                                <span class="text-muted">
                                    <i class="bi bi-calendar"></i> ${workshop.date}
                                </span>
                                <span class="text-muted ms-3">
                                    <i class="bi bi-clock"></i> ${workshop.duration}
                                </span>
                            </div>
                            <div class="progress mb-3">
                                <div class="progress-bar" role="progressbar" 
                                     style="width: ${(workshop.registered / workshop.capacity) * 100}%">
                                    ${workshop.registered}/${workshop.capacity} spots
                                </div>
                            </div>
                            <button class="btn btn-primary register-btn" 
                                    data-workshop-id="${workshop.id}"
                                    ${workshop.registered >= workshop.capacity ? 'disabled' : ''}>
                                ${workshop.registered >= workshop.capacity ? 'Fully Booked' : 'Register Now'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            list.append(card);
        });
    }

    // Filter Functionality
    $('#categoryFilter, #dateFilter').change(function() {
        const category = $('#categoryFilter').val();
        const dateFilter = $('#dateFilter').val();
        
        let filtered = workshops;
        
        if (category !== 'all') {
            filtered = filtered.filter(w => w.category === category);
        }
        
        const now = new Date();
        switch (dateFilter) {
            case 'upcoming':
                filtered = filtered.filter(w => new Date(w.date) >= now);
                break;
            case 'this-week':
                const weekEnd = new Date(now);
                weekEnd.setDate(now.getDate() + 7);
                filtered = filtered.filter(w => {
                    const date = new Date(w.date);
                    return date >= now && date <= weekEnd;
                });
                break;
            case 'this-month':
                filtered = filtered.filter(w => {
                    const date = new Date(w.date);
                    return date.getMonth() === now.getMonth();
                });
                break;
            case 'past':
                filtered = filtered.filter(w => new Date(w.date) < now);
                break;
        }
        
        if ($('#listView').is(':visible')) {
            renderList(filtered);
        }
    });

    // Search Functionality
    $('#searchWorkshops').on('input', function() {
        const search = $(this).val().toLowerCase();
        const filtered = workshops.filter(w => 
            w.title.toLowerCase().includes(search) || 
            w.description.toLowerCase().includes(search)
        );
        renderList(filtered);
    });

    // Registration Handler
    $(document).on('click', '.register-btn', function() {
        const workshopId = $(this).data('workshop-id');
        const workshop = workshops.find(w => w.id === workshopId);
        
        if (workshop && workshop.registered < workshop.capacity) {
            if (confirm(`Register for "${workshop.title}"?`)) {
                workshop.registered++;
                renderList();
                alert('Registration successful!');
            }
        }
    });

    // Event Details Handler
    $(document).on('click', '.event', function() {
        const workshopId = $(this).data('workshop-id');
        const workshop = workshops.find(w => w.id === workshopId);
        
        if (workshop) {
            alert(`
                ${workshop.title}
                Date: ${workshop.date}
                Time: ${workshop.time}
                Duration: ${workshop.duration}
                Instructor: ${workshop.instructor}
                Available Spots: ${workshop.capacity - workshop.registered}
            `);
        }
    });

    // Initialize Calendar View
    renderCalendar();
});