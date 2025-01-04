const api: string = "http://localhost:5050/api";

export const login = (username: string, password: string) => {
  return fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json());
};
