import { apiService } from "./apiService";
import type { User } from "@/types/user";

export async function register(email: string, password: string, name: string) {
  return apiService.post("/auth/register", { email, password, name });
}
export async function login(email: string, password: string) {
  return apiService.post("/auth/login", { email, password }, { withCredentials: true });
}
export async function fetchMe(): Promise<User> {
  return apiService.get<User>("/auth/me", { withCredentials: true });
}
export async function logout() {
  return apiService.post("/auth/logout", {}, { withCredentials: true });
}