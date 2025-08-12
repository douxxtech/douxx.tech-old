async function fetchGitHubRepos(usernameOrOrg) {
    try {
        const response = await fetch(`https://api.github.com/users/${usernameOrOrg}/repos`);
        if (!response.ok) {
            log(`Failed to fetch repositories for ${usernameOrOrg}: ` + response.statusText, 'error');
            return [];
        }
        const repos = await response.json();
        return repos;
    } catch (error) {
        log('Network error: ' + error, 'error');
        return [];
    }
}

window.spawnProjects = function () {
    const username = 'douxxtech';
    const orgname = 'dpipstudio';

    const loadingContent = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
            <h1 align="center">Loading Projects...</h1>
            <p>Fetching repositories for ${username} and ${orgname}...</p>
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
    
    generateProjectContent(username, orgname).then(projectContent => {
        ClassicWindow.updateWindowContent(projectwin, projectContent);
    });
    
    return projectwin;
}

async function generateProjectContent(username, orgname) {
    try {
        const [userRepos, orgRepos] = await Promise.all([
            fetchGitHubRepos(username),
            fetchGitHubRepos(orgname)
        ]);

        const allRepos = [...userRepos, ...orgRepos]
            .sort((a, b) => b.stargazers_count - a.stargazers_count);

        if (!allRepos.length) {
            return `
                <h1 align="center">Error Loading Projects</h1>
                <p>No repositories found for ${username} or ${orgname}.</p>
            `;
        }

        const projectContent = allRepos.map(repo => `
            <div>
                <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
                <p>${repo.description || 'No description available'}</p>
                <p>Stars: ${repo.stargazers_count}</p>
                <hr>
            </div>
        `).join('');

        return `
            <h1 align="center">My Projects</h1>
            <hr>
            ${projectContent}
        `;
    } catch (error) {
        log('Error fetching repositories: ' + error, 'error');
        return `
            <h1 align="center">Error Loading Projects</h1>
            <p>Failed to fetch repositories. Please try again later.</p>
        `;
    }
}
