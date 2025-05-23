async function fetchGitHubRepos(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
            log(`Failed to fetch repositories for ${username}: ` +  response.statusText, 'error');
            return null;
        }
        const repos = await response.json();
        return repos;
    } catch (error) {
        log('Network error:' + error, 'error');
        return null;
    }
}

window.spawnProjects =function () {
    const username = 'douxxtech'
    const loadingContent = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
            <h1 align="center">Loading Projects...</h1>
            <p>Fetching repositories for ${username}...</p>
        </div>
    `;
    
    const projectwin = ClassicWindow.createWindow({
        title: 'My Projects',
        statusText: 'git.douxx.tech btw',
        resizable: true,
        height: 400,
        width: 600,
        theme: 'dark',
        x: (window.innerWidth - 600) / 2,
        y: (window.innerHeight - 400) / 2,
        content: loadingContent,
    });
    
    generateProjectContent(username).then(projectContent => {
        ClassicWindow.updateWindowContent(projectwin, projectContent);
    });
    
    return projectwin;
}

async function generateProjectContent(username) {
    try {
        const repos = await fetchGitHubRepos(username);
        if (!repos) {
            return `
                <h1 align="center">Error Loading Projects</h1>
                <p>Failed to fetch repositories. Please try again later.</p>
            `;
        }

        const filteredRepos = repos
            .sort((a, b) => b.stargazers_count - a.stargazers_count);

        const projectContent = filteredRepos.map(repo =>
            `<div>
                <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
                <p>${repo.description || 'No description available'}</p>
                <p>Stars: ${repo.stargazers_count}</p>
                <hr>
            </div>`
        ).join('');

        return `
            <h1 align="center">My Projects</h1>
            <hr>
            ${projectContent}
        `;
    } catch (error) {
        log('Error fetching repositories:' + error, 'error');
        return `
            <h1 align="center">Error Loading Projects</h1>
            <p>Failed to fetch repositories. Please try again later.</p>
        `;
    }
}