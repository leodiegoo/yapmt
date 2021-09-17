import axios from "axios";

export function setupApiClient() {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8888/",
  });

  return api;
}
