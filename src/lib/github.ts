export interface Repo {
	name: string;
	html_url: string;
	description: string | null;
	language: string | null;
	stargazers_count: number;
	pushed_at: string;
	fork: boolean;
	private: boolean;
	archived: boolean;
}

// Authenticating (when a token is available) raises the REST API limit from
// 60/hour to 5000/hour, avoiding an empty repo list on a rate-limited build.
function authHeaders(): HeadersInit {
	const token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;
	return token ? { Authorization: `Bearer ${token}` } : {};
}

// Fetches every public, non-fork, non-archived repo owned by the given user.
// Returns an empty array on failure rather than throwing, so a build-time
// rate limit or network blip degrades to an empty section instead of a
// failed build.
export async function fetchOwnedRepos(username: string): Promise<Repo[]> {
	try {
		const all: Repo[] = [];
		for (let page = 1; page <= 10; page++) {
			const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner&page=${page}`, {
				headers: authHeaders(),
			});
			if (!res.ok) break;
			const batch = (await res.json()) as Repo[];
			all.push(...batch);
			if (batch.length < 100) break;
		}
		return all.filter((r) => !r.fork && !r.private && !r.archived);
	} catch {
		return [];
	}
}
