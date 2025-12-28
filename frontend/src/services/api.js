const BASE_URL = "http://127.0.0.1:5050";

export const getIncidents = async () => {
  const res = await fetch(`${BASE_URL}/api/incidents`);
  return res.json();
};

export const createIncident = async (incident) => {
  const res = await fetch(`${BASE_URL}/api/incidents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(incident),
  });
  return res.json();
};
export const upvoteIncident = (id) =>
  fetch(`http://127.0.0.1:5050/api/incidents/${id}/upvote`, {
    method: "POST",
  }).then((res) => res.json());
