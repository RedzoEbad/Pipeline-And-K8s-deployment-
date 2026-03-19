const API = "/";
export async function fetchItems() {
  try {
    const res = await fetch(`${API}api/items`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function createItem(payload) {
  const res = await fetch(`${API}api/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return await res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`${API}api/items/${id}`, { method: 'DELETE' });
  return await res.json();
}
