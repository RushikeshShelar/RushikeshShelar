"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGithubData = void 0;
function fetchGithubData(repositories) {
    return __awaiter(this, void 0, void 0, function* () {
        const owner = 'RushikeshShelar';
        const list = yield Promise.all(repositories.map((repo) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`https://api.github.com/repos/${owner}/${repo}`);
                if (!response.ok) {
                    throw new Error(`"${owner}/${repo}" NOT FOUND.`);
                }
                const data = yield response.json();
                const { html_url: url, full_name: name, stargazers_count: stars, forks_count: forks, description: desc } = data;
                return `<li><a href=${url} target="_blank" rel="noopener noreferrer">${name}</a> (<b>${stars}</b> ✨ and <b>${forks}</b> 🍴): ${desc}</li>`;
            }
            catch (error) {
                console.log("ERROr while Fetching data", error);
            }
        })));
        return `<ul>${list.join("")}\n<li>More coming soon :).</li>\n</ul>`;
    });
}
exports.fetchGithubData = fetchGithubData;
