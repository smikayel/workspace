import axios from "axios";
import { API_URL } from "./auth.service";

class WorkspaceService {
  logout() {
    localStorage.removeItem("user");
  }
}

export default new WorkspaceService();
