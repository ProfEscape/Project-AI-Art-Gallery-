$(document).ready(function() {
    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add delay if specified
                const delay = entry.target.dataset.delay;
                if (delay) {
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
                
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animations to elements
    $('.animate-fade-up, .animate-fade-in, .animate-scale').each(function() {
        animateOnScroll.observe(this);
    });

    // Parallax Effect
    let ticking = false;
    $(window).scroll(function() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = $(window).scrollTop();
                $('.parallax').each(function() {
                    const $this = $(this);
                    const speed = $this.data('speed') || 0.5;
                    const yPos = -(scrolled * speed);
                    $this.css('transform', `translateY(${yPos}px)`);
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // Custom Cursor
    const cursor = $('<div class="custom-cursor"></div>');
    $('body').append(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    $(document).mousemove(function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
    });

    // Smooth cursor animation
    function animateCursor() {
        const diffX = mouseX - cursorX;
        const diffY = mouseY - cursorY;
        
        cursorX += diffX * 0.1;
        cursorY += diffY * 0.1;
        
        cursor.css({
            left: cursorX + 'px',
            top: cursorY + 'px'
        });
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Interactive elements cursor effect
    $('.interactive').hover(
        function() { cursor.addClass('cursor-active'); },
        function() { cursor.removeClass('cursor-active'); }
    );

    // Button Hover Animation
    $('.btn').hover(
        function() {
            $(this).addClass('btn-hover');
        },
        function() {
            $(this).removeClass('btn-hover');
        }
    );

    // Card Hover Animation
    $('.card').hover(
        function() {
            $(this).addClass('card-hover');
        },
        function() {
            $(this).removeClass('card-hover');
        }
    );

    // Gallery Image Hover
    $('.gallery-grid .card').each(function() {
        $(this).on('mouseenter', function(e) {
            const $card = $(this);
            const rect = $card[0].getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            $card.css('transform-origin', `${x}px ${y}px`);
            $card.addClass('hover');
        }).on('mouseleave', function() {
            $(this).removeClass('hover');
        });
    });

    // Smooth Scroll
    $('a[href*="#"]').not('[href="#"]').click(function(e) {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
            location.hostname === this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 800, 'easeInOutCubic');
                return false;
            }
        }
    });

    // Button Click Effect
    $('.btn').click(function(e) {
        const $btn = $(this);
        const x = e.pageX - $btn.offset().left;
        const y = e.pageY - $btn.offset().top;
        
        const $ripple = $('<span class="ripple"></span>');
        $ripple.css({
            left: x + 'px',
            top: y + 'px'
        });
        
        $btn.append($ripple);
        
        setTimeout(() => {
            $ripple.remove();
        }, 700);
    });

    // Page Transition
    $(window).on('beforeunload', function() {
        $('body').addClass('page-exit-active');
    });

    // Initialize page enter animation
    $('body').addClass('page-enter-active');

    // Skeleton Loading
    function replaceSkeleton() {
        $('.skeleton').each(function() {
            const $skeleton = $(this);
            const $content = $skeleton.data('content');
            if ($content) {
                $skeleton.replaceWith($content);
            }
        });
    }

    // Replace skeletons after content loads
    $(window).on('load', function() {
        setTimeout(replaceSkeleton, 1000);
    });
});