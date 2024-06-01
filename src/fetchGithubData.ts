import axios from "axios";

export async function fetchGithubData(repositories: Array<string>): Promise<string> {
    const owner = 'RushikeshShelar';

    const list = await Promise.all(
        repositories.map(
            async (repo) => {
                try {
                    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
                    if (!response.ok) {
                        throw new Error(`"${owner}/${repo}" NOT FOUND.`)
                    }

                    const data = await response.json();

                    const {
                        html_url: url,
                        full_name: name,
                        stargazers_count: stars,
                        forks_count: forks,
                        description: desc
                    } = data;

                    return `<li><a href=${url} target="_blank" rel="noopener noreferrer">${name}</a> (<b>${stars}</b> ✨ and <b>${forks}</b> 🍴): ${desc}</li>`
                } catch (error) {
                    console.log("ERROr while Fetching data", error);
                }
            }
        )
    )

    return `<ul>${list.join("")}\n<li>More coming soon :).</li>\n</ul>`;

}