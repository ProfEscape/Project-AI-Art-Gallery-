$(document).ready(function() {
    // Sample gallery data - In a real application, this would come from a backend
    const artworks = [
        {
            id: 1,
            title: 'Abstract Waves',
            image: '../assets/images/gallery/abstract1.jpg',
            category: 'abstract',
            description: 'AI-generated abstract waves pattern',
            date: '2025-07-02',
            likes: 45
        },
        {
            id: 2,
            title: 'Deep Space',
            image: '../assets/images/gallery/deep-space1.png',
            category: 'space',
            description: 'AI interpretation of deep space',
            date: '2025-07-01',
            likes: 32
        },
        {
            id: 3,
            title: 'Lady',
            image: '../assets/images/gallery/lady1.png',
            category: 'portrait',
            description: 'AI generated potrait',
            date: '2025-07-01',
            likes: 37
        },
        {
            id: 4,
            title: 'Superman',
            image: '../assets/images/gallery/superman1.jpg',
            category: 'landscape',
            description: 'AI generated Superman picture',
            date: '2025-07-01',
            likes: 29
        },
        // Add more artwork data
    ];

    // Load Gallery
    function loadGallery(category = 'all') {
        const grid = $('#galleryGrid');
        grid.empty();

        const filteredArtworks = category === 'all' 
            ? artworks 
            : artworks.filter(art => art.category === category);

        filteredArtworks.forEach(art => {
            const card = createArtworkCard(art);
            grid.append(card);
        });
    }

    // Create Artwork Card
    function createArtworkCard(art) {
        return `
            <div class="col-md-4 mb-4">
                <div class="card artwork" data-id="${art.id}">
                    <img src="${art.image}" class="card-img-top" alt="${art.title}">
                    <div class="card-body">
                        <h5 class="card-title">${art.title}</h5>
                        <p class="card-text">
                            <span class="badge bg-primary">${art.category}</span>
                            <span class="float-end">
                                <i class="bi bi-heart"></i> ${art.likes}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    // Filter Functionality
    $('.filter-buttons .btn').click(function() {
        $('.filter-buttons .btn').removeClass('active');
        $(this).addClass('active');
        const category = $(this).data('category');
        loadGallery(category);
    });

    // Search Functionality
    $('#searchArt').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        $('.artwork').each(function() {
            const title = $(this).find('.card-title').text().toLowerCase();
            $(this).parent().toggle(title.includes(searchTerm));
        });
    });

    // Modal Preview
    $(document).on('click', '.artwork', function() {
        const artId = $(this).data('id');
        const artwork = artworks.find(art => art.id === artId);
        
        $('#artworkTitle').text(artwork.title);
        $('#modalImage').attr('src', artwork.image);
        $('#artworkDescription').text(artwork.description);
        $('#artworkCategory').text(artwork.category);
        $('#artworkDate').text(artwork.date);
        
        const modal = new bootstrap.Modal($('#artworkModal'));
        modal.show();
    });

    // Like System
    let likedArtworks = JSON.parse(localStorage.getItem('likedArtworks')) || {};

    $(document).on('click', '.like-btn', function(e) {
        e.stopPropagation();
        const artId = $(this).closest('.artwork').data('id');
        $(this).toggleClass('active');
        
        if (likedArtworks[artId]) {
            delete likedArtworks[artId];
        } else {
            likedArtworks[artId] = true;
        }
        
        localStorage.setItem('likedArtworks', JSON.stringify(likedArtworks));
        updateLikeCount(artId);
    });

    function updateLikeCount(artId) {
        const artwork = artworks.find(art => art.id === artId);
        if (likedArtworks[artId]) {
            artwork.likes++;
        } else {
            artwork.likes--;
        }
        $(`.artwork[data-id="${artId}"] .bi-heart`).parent().text(` ${artwork.likes}`);
    }

    // Share Functionality
    $('.share-btn').click(function(e) {
        e.stopPropagation();
        const url = window.location.href;
        const artId = $(this).closest('.artwork').data('id');
        
        if (navigator.share) {
            navigator.share({
                title: 'AI Art Gallery',
                text: 'Check out this amazing AI artwork!',
                url: `${url}?art=${artId}`
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const dummy = document.createElement('input');
            document.body.appendChild(dummy);
            dummy.value = url;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            
            alert('Link copied to clipboard!');
        }
    });

    // Initialize Gallery
    loadGallery();
});