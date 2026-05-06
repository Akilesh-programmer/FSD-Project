const _RAW_API_URL = import.meta.env.VITE_API_URL || "";
let API_BASE;
if (_RAW_API_URL) {
  const trimmed = _RAW_API_URL.replace(/\/$/, "");
  API_BASE = trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
} else {
  API_BASE = "http://localhost:8080/api";
}

function getUser() {
  const saved = localStorage.getItem("cubetimer_user");
  return saved ? JSON.parse(saved) : null;
}

function authHeaders() {
  const user = getUser();
  return {
    "Content-Type": "application/json",
    ...(user ? { "X-User-Id": String(user.id) } : {}),
  };
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
}

export async function signupUser(name, email, password) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Signup failed");
  return data;
}

export async function fetchSolves() {
  const res = await fetch(`${API_BASE}/solves`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch solves");
  return res.json();
}

export async function addSolve(time, scramble, penalty) {
  const res = await fetch(`${API_BASE}/solves`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ time, scramble, penalty }),
  });
  if (!res.ok) throw new Error("Failed to save solve");
  return res.json();
}

export async function deleteSolve(id) {
  const res = await fetch(`${API_BASE}/solves/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete solve");
}

export async function deleteAllSolves() {
  const res = await fetch(`${API_BASE}/solves`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete solves");
}

export async function updatePenalty(id, penalty) {
  const res = await fetch(`${API_BASE}/solves/${id}/penalty`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ penalty }),
  });
  if (!res.ok) throw new Error("Failed to update penalty");
  return res.json();
}
