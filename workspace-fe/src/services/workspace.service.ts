import axios from "axios";
import { API_URL } from "./auth.service";
import authHeader from "./auth-header";

class WorkspaceService {
  getAllWorkspaces() {
    return axios.get(API_URL + 'workspace/', { headers: authHeader() })
  }

  checkSlug(slug: string) {
    return axios.get(API_URL + `workspace/${slug}`, { headers: authHeader() })
  }

  create(name: string, slug: string) {
    return axios
    .post(API_URL + "workspace/", {
        name,
        slug
    },  { headers: authHeader() })
  }

  delete(slug: string) {
    return axios.delete(API_URL + `workspace/${slug}`, { headers: authHeader() })
  }
}

export default new WorkspaceService();
