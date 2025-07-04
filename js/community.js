$(document).ready(function() {
    // Sample community data
    const posts = [
        {
            id: 1,
            author: {
                id: 1,
                name: 'Adnan',
                avatar: '../assets/images/avatars/user1.jpg'
            },
            content: 'Just created this new abstract piece using the AI studio!',
            image: '../assets/images/gallery/abstract1.jpg',
            type: 'artwork',
            likes: 24,
            comments: [],
            date: '2025-07-02T10:30:00Z'
        },
        {
            id: 2,
            author: {
                id: 2,
                name: 'Armaan',
                avatar: '../assets/images/avatars/default.jpg'
            },
            content: 'What techniques do you use for color harmony in AI art?',
            type: 'discussion',
            likes: 15,
            comments: [],
            date: '2025-07-02T09:15:00Z'
        },
        {
            id: 3,
            author: {
                id: 3,
                name: 'Prajwal',
                avatar: '../assets/images/avatars/default.jpg'
            },
            content: 'How to create an abstract image?',
            type: 'discussion',
            likes: 15,
            comments: [],
            date: '2025-07-02T09:15:00Z'
        }
    ];

    const featuredArtists = [
        {
            id: 1,
            name: 'ProfEscape',
            avatar: '../assets/images/avatars/artist1.jpg',
            specialty: 'Abstract AI Art',
            followers: 1200,
            artworks: 45
        },
        {
            id: 2,
            name: 'Mr. Artist',
            avatar: '../assets/images/avatars/default.jpg',
            specialty: 'Nature',
            followers: 900,
            artworks: 42
        },
        // Add more featured artists
    ];

    const events = [
        {
            id: 1,
            title: 'Summer AI Art Challenge',
            description: 'Create summer-themed AI artwork',
            date: '2025-07-15',
            participants: 156,
            image: '../assets/images/events/summer-challenge.jpg'
        },
        {
            id: 1,
            title: 'Space Art Challenge',
            description: 'Create Space AI artwork',
            date: '2025-07-15',
            participants: 200,
            image: '../assets/images/events/space-art-challenge.png'
        },
        // Add more events
    ];

    // Load Feed
    function loadFeed(filter = 'all') {
        const feed = $('#communityFeed');
        feed.empty();

        const filteredPosts = filter === 'all' 
            ? posts 
            : posts.filter(post => post.type === filter);

        filteredPosts.forEach(post => {
            feed.append(createPostCard(post));
        });
    }

    // Create Post Card
    function createPostCard(post) {
        return `
            <div class="card post-card mb-4" data-post-id="${post.id}">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <img src="${post.author.avatar}" class="rounded-circle me-2" 
                             width="40" height="40" alt="${post.author.name}">
                        <div>
                            <h6 class="mb-0">${post.author.name}</h6>
                            <small class="text-muted">
                                ${formatDate(post.date)}
                            </small>
                        </div>
                    </div>
                    <p class="card-text">${post.content}</p>
                    ${post.image ? `
                        <img src="${post.image}" class="img-fluid rounded mb-3" 
                             alt="Post image">
                    ` : ''}
                    <div class="post-actions d-flex justify-content-between align-items-center">
                        <div>
                            <button class="btn btn-sm btn-outline-primary me-2 like-btn">
                                <i class="bi bi-heart"></i> ${post.likes}
                            </button>
                            <button class="btn btn-sm btn-outline-secondary comment-btn">
                                <i class="bi bi-chat"></i> Comment
                            </button>
                        </div>
                        <button class="btn btn-sm btn-outline-secondary share-btn">
                            <i class="bi bi-share"></i> Share
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Post Creation
    $('#postForm').submit(function(e) {
        e.preventDefault();
        const content = $('#postContent').val().trim();
        
        if (!content) {
            showAlert('Please enter some content', 'warning');
            return;
        }

        const newPost = {
            id: posts.length + 1,
            author: {
                id: 0, // Current user
                name: 'Current User',
                avatar: '../assets/images/avatars/default.jpg'
            },
            content: content,
            type: 'discussion',
            likes: 0,
            comments: [],
            date: new Date().toISOString()
        };

        posts.unshift(newPost);
        $('#postContent').val('');
        loadFeed($('.feed-controls .btn.active').data('filter'));
        showAlert('Post created successfully!', 'success');
    });

    // Load Featured Artists
    function loadFeaturedArtists() {
        const container = $('#featuredArtists');
        featuredArtists.forEach(artist => {
            container.append(`
                <div class="col-md-4">
                    <div class="card h-100">
                        <div class="card-body text-center">
                            <img src="${artist.avatar}" class="rounded-circle mb-3" 
                                 width="80" height="80" alt="${artist.name}">
                            <h5 class="card-title">${artist.name}</h5>
                            <p class="card-text text-muted">${artist.specialty}</p>
                            <div class="artist-stats mb-3">
                                <span class="me-3">
                                    <i class="bi bi-people"></i> ${artist.followers}
                                </span>
                                <span>
                                    <i class="bi bi-image"></i> ${artist.artworks}
                                </span>
                            </div>
                            <button class="btn btn-outline-primary follow-btn">
                                <i class="bi bi-person-plus"></i> Follow
                            </button>
                        </div>
                    </div>
                </div>
            `);
        });
    }

    // Load Events and Challenges
    function loadEvents() {
        const container = $('#eventsChallenges');
        events.forEach(event => {
            container.append(`
                <div class="col-md-6">
                    <div class="card h-100">
                        <img src="${event.image}" class="card-img-top" alt="${event.title}">
                        <div class="card-body">
                            <h5 class="card-title">${event.title}</h5>
                            <p class="card-text">${event.description}</p>
                            <div class="event-meta mb-3">
                                <span class="text-muted">
                                    <i class="bi bi-calendar"></i> ${event.date}
                                </span>
                                <span class="text-muted ms-3">
                                    <i class="bi bi-people"></i> ${event.participants} participants
                                </span>
                            </div>
                            <button class="btn btn-primary join-event" data-event-id="${event.id}">
                                Join Challenge
                            </button>
                        </div>
                    </div>
                </div>
            `);
        });
    }

    // Feed Filter Handler
    $('.feed-controls .btn').click(function() {
        $('.feed-controls .btn').removeClass('active');
        $(this).addClass('active');
        loadFeed($(this).data('filter'));
    });

    // Like Handler
    $(document).on('click', '.like-btn', function() {
        const postId = $(this).closest('.post-card').data('post-id');
        const post = posts.find(p => p.id === postId);
        
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            post.likes++;
        } else {
            post.likes--;
        }
        
        $(this).html(`<i class="bi bi-heart"></i> ${post.likes}`);
    });

    // Comment Handler
    $(document).on('click', '.comment-btn', function() {
        const postId = $(this).closest('.post-card').data('post-id');
        const post = posts.find(p => p.id === postId);
        
        $('#postModal .modal-body').html(`
            <div class="post-content mb-4">
                ${post.content}
                ${post.image ? `<img src="${post.image}" class="img-fluid rounded mt-3">` : ''}
            </div>
            <div class="comments-section">
                ${post.comments.map(comment => `
                    <div class="comment mb-3">
                        <div class="d-flex">
                            <img src="${comment.author.avatar}" class="rounded-circle me-2" 
                                 width="30" height="30">
                            <div>
                                <h6 class="mb-1">${comment.author.name}</h6>
                                <p class="mb-1">${comment.content}</p>
                                <small class="text-muted">
                                    ${formatDate(comment.date)}
                                </small>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `);
        
        const modal = new bootstrap.Modal($('#postModal'));
        modal.show();
    });

    // Utility Functions
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function showAlert(message, type) {
        const alert = $(`
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);
        
        $('.community-header').prepend(alert);
        setTimeout(() => alert.alert('close'), 3000);
    }

    // Initialize
    loadFeed();
    loadFeaturedArtists();
    loadEvents();

    // Counter Animation
    $('.counter').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
                $(this).text(Math.ceil(now).toLocaleString());
            }
        });
    });
});