$(document).ready(function() {
    // AI Art Generation State
    let generationInProgress = false;
    let generationHistory = [];

    // Generate Art
    $('#generateBtn').click(async function() {
        if (generationInProgress) return;

        const prompt = $('#artPrompt').val().trim();
        if (!prompt) {
            ErrorHandler.show('Please enter a prompt');
            return;
        }

        const settings = {
            prompt: prompt,
            style: $('#artStyle').val(),
            resolution: $('#artResolution').val(),
            count: $('#imageCount').val(),
            creativity: $('#creativityLevel').val(),
            seed: $('#seed').val() || Math.floor(Math.random() * 1000000),
            steps: $('#steps').val(),
            guidance: $('#guidance').val()
        };

        try {
            generationInProgress = true;
            LoadingState.show('#previewGrid');
            
            const response = await API.post('/generate', settings);
            displayGeneratedImages(response.images);
            
            // Add to history
            generationHistory.unshift({
                ...settings,
                images: response.images,
                timestamp: new Date()
            });
            updateHistory();
        } catch (error) {
            ErrorHandler.show('Generation failed: ' + error.message);
        } finally {
            generationInProgress = false;
            LoadingState.hide('#previewGrid');
        }
    });

    // Display Generated Images
    function displayGeneratedImages(images) {
        const grid = $('#previewGrid');
        grid.empty();

        images.forEach(image => {
            const card = `
                <div class="col-md-6 mb-4">
                    <div class="card">
                        <img src="${image.url}" class="card-img-top" alt="Generated Art">
                        <div class="card-body">
                            <div class="btn-group w-100">
                                <button class="btn btn-outline-primary save-btn">
                                    <i class="bi bi-download"></i> Save
                                </button>
                                <button class="btn btn-outline-secondary share-btn">
                                    <i class="bi bi-share"></i> Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            grid.append(card);
        });
    }

    // Update History Grid
    function updateHistory() {
        const grid = $('#historyGrid');
        grid.empty();

        generationHistory.slice(0, 8).forEach(item => {
            const card = `
                <div class="col-md-3 mb-4">
                    <div class="card">
                        <img src="${item.images[0].url}" class="card-img-top" alt="History">
                        <div class="card-body">
                            <small class="text-muted">
                                ${new Date(item.timestamp).toLocaleString()}
                            </small>
                            <p class="small mb-0">${item.prompt.substring(0, 50)}...</p>
                        </div>
                    </div>
                </div>
            `;
            grid.append(card);
        });
    }

    // Save Image
    $(document).on('click', '.save-btn', function() {
        const url = $(this).closest('.card').find('img').attr('src');
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ai-artwork.png';
        link.click();
    });

    // Share Image
    $(document).on('click', '.share-btn', function() {
        const url = $(this).closest('.card').find('img').attr('src');
        if (navigator.share) {
            navigator.share({
                title: 'My AI Artwork',
                text: 'Check out this AI-generated artwork!',
                url: url
            });
        } else {
            // Fallback
            const dummy = document.createElement('input');
            document.body.appendChild(dummy);
            dummy.value = url;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            alert('Image URL copied to clipboard!');
        }
    });

    // Creativity Level Display
    $('#creativityLevel').on('input', function() {
        $(this).next('.form-label').text(`Creativity Level: ${$(this).val()}%`);
    });
});