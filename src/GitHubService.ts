import axios from "axios";
import { Repository } from "./types";

const API_URL = "https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100";

export async function fetchRepositories(page: number, sort: string): Promise<Repository[]> {
    const response = await axios.get(API_URL, { params: { page, sort } });
    return response.data.items.map((item: any) => item as Repository)
};