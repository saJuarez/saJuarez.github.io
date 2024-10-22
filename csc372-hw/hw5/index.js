document.getElementById('search-btn').addEventListener('click', function () {
    const username = document.getElementById('search').value;

    if (username === '') {
        alert('Please enter a GitHub username');
        return;
    }

    const url = `https://api.github.com/users/${username}/repos`;

    // Fetch repo's of given username
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(repos => {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = ''; // Clear previous results

            repos.forEach(repo => {
                // Create a div for each repository
                const repoDiv = document.createElement('div');
                repoDiv.id = `repo-${repo.id}`; // ID for each repository
                repoDiv.classList.add('repo-container'); // Add styling

                // Fetch number of commits for each repository
                const commitsUrl = `${repo.commits_url.split("{")[0]}`; 
                fetch(commitsUrl)
                    .then(commitResponse => commitResponse.json())
                    .then(commits => {
                        const commitsElement = document.getElementById(`commits-${repo.id}`);
                        commitsElement.innerHTML = `<strong>Commits:</strong> ${commits.length}`;
                    })
                    .catch(error => {
                        console.error('Error fetching commits:', error);
                        const commitsElement = document.getElementById(`commits-${repo.id}`);
                        commitsElement.innerHTML = `<strong>Commits:</strong> Could not fetch`;
                    });

                // Fetch the languages for each repository
                fetch(repo.languages_url)
                    .then(languageResponse => languageResponse.json())
                    .then(languages => {
                        const languagesElement = document.getElementById(`languages-${repo.id}`);
                        const languageList = Object.keys(languages); // Get all language keys
                        if (languageList.length > 0) {
                            languagesElement.innerHTML = languageList.join(', ');
                        } else {
                            languagesElement.innerHTML = 'Not specified';
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching languages:', error);
                        const languagesElement = document.getElementById(`languages-${repo.id}`);
                        languagesElement.innerHTML = 'Could not fetch';
                    });

                // Repository details
                repoDiv.innerHTML = `
                    <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
                    <p><strong>Description:</strong> ${repo.description || 'No description available'}</p>
                    <p><strong>Created At:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
                    <p><strong>Last Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
                    <p id="commits-${repo.id}"><strong>Commits:</strong> Loading...</p>
                    <p><strong>Languages:</strong> <span id="languages-${repo.id}">Loading...</span></p>
                    <p><strong>Watchers:</strong> ${repo.watchers_count}</p>
                `;

                gallery.appendChild(repoDiv);
            });
        })

        .catch(error => {
            alert('Error: ' + error.message);
        });
});