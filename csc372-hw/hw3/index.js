/* Javascript for index.html */
document.addEventListener('DOMContentLoaded', function() {
    const articlePreviews = document.querySelectorAll('.article-preview');
    const mainElement = document.querySelector('main');

    articlePreviews.forEach(article => {
        const mainImage = article.querySelector('.main-image');
        const articleText = article.querySelector('.article-text p');

        const initialDescriptionId = mainImage.getAttribute('data-description-id');
        const initialDescription = document.getElementById(initialDescriptionId).textContent;
        articleText.textContent = initialDescription;

        article.addEventListener('click', function() {
            const isExpanded = this.classList.contains('expanded');

            articlePreviews.forEach(a => a.classList.remove('expanded'));
            mainElement.classList.remove('main-expanded');

            if (!isExpanded) {
                this.classList.add('expanded');
                mainElement.classList.add('main-expanded');
            }
        });

        const thumbnails = article.querySelectorAll('.thumbnail');

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function(event) {
                event.stopPropagation(); 

                const tempSrc = mainImage.src;
                mainImage.src = this.src;
                this.src = tempSrc;

                const descriptionId = this.getAttribute('data-description-id');
                const mainImageDescriptionId = mainImage.getAttribute('data-description-id');

                const description = document.getElementById(descriptionId).textContent;
                articleText.textContent = description; 

                mainImage.setAttribute('data-description-id', descriptionId);
                this.setAttribute('data-description-id', mainImageDescriptionId);
            });
        });ss
    });
});
