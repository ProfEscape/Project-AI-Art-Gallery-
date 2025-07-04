


$(document).ready(function() {
    // Navigation Active State
    function setActiveNav() {
        const currentPage = window.location.pathname;
        $('.nav-link').each(function() {
            const link = $(this).attr('href');
            if (currentPage.includes(link)) {
                $(this).addClass('active');
            }
        });
    }

    // Hero Section Image Rotation
    // function rotateHeroImages() {
    //     const images = [
    //         '../assets/images/hero/hero1.jpg',
    //         '../assets/images/gallery/abstract1.jpg',
    //     ];
    //     let currentIndex = 0;

    //     setInterval(() => {
    //         currentIndex = (currentIndex + 1) % images.length;
    //         $('.hero-image').fadeOut(500, function() {
    //             $(this).attr('src', images[currentIndex]).fadeIn(500);
    //         });
    //     }, 5000);
    // }

    // function initHeroSection() {
    //     // Set the static hero image
    //     $('.hero-image').attr('src', 'assets/images/hero/hero1.jpg');
    // }
    

    function loadFeaturedArtworks() {
        const featuredArtworks = [
            {
                title: "Digital Dreams",
                artist: "Mr. Artist",
                image: "assets/images/gallery/abstract1.jpg"
            },
            {
                title: "Neural Landscape",
                artist: "ProfEscape",
                image: "assets/images/gallery/landscape1.jpeg"
            },
            {
                title: "Foxy",
                artist: "Miss Artist",
                image: "assets/images/gallery/animal1.jpeg"
            }
        ];

        const container = $('#featuredArtworks');
        featuredArtworks.forEach(artwork => {
            const card = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <img src="${artwork.image}" class="card-img-top" alt="${artwork.title}">
                        <div class="card-body">
                            <h5 class="card-title">${artwork.title}</h5>
                            <p class="card-text">By ${artwork.artist}</p>
                            <a href="pages/gallery.html" class="btn btn-outline-primary">View Details</a>
                        </div>
                    </div>
                </div>
            `;
            container.append(card);
        });
    }
    

    // Quick Access Cards Hover Effect
    $('.quick-access .card').hover(
        function() {
            $(this).find('.bi').addClass('bounce');
        },
        function() {
            $(this).find('.bi').removeClass('bounce');
        }
    );

    // Initialize Components
    setActiveNav();
    //rotateHeroImages();
    loadFeaturedArtworks();
    //initHeroSection();

    // Global Loading State
    $(document).on({
        ajaxStart: function() {
            LoadingState.show('body');
        },
        ajaxStop: function() {
            LoadingState.hide('body');
        }
    });

    // // Global Error Handler
    // window.onerror = function(msg, url, lineNo, columnNo, error) {
    //     ErrorHandler.show(msg);
    //     return false;
    // };

    // // Check Authentication
    // if (Auth.checkAuth()) {
    //     $('.auth-required').show();
    // } else {
    //     $('.auth-required').hide();
    // }
});