/* Script for index.html */
document.addEventListener('DOMContentLoaded', function() {
    const articlePreview = document.getElementById('article1');
    const mainContainer = document.querySelector('main');

    articlePreview.addEventListener('click', function() {
        this.classList.toggle('expanded');
        mainContainer.classList.toggle('main-expanded');
    });
});