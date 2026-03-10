import React, { useEffect, useState } from 'react';
import { fetchItems, createItem, deleteItem } from './api';
import './index.css';

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await fetchItems();
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const onAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newItem = await createItem({ name, message });
    setName('');
    setMessage('');
    setItems(prev => [newItem, ...prev]);
  };

  const onDelete = async (id) => {
    await deleteItem(id);
    setItems(prev => prev.filter(i => i._id !== id));
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h2>Items</h2>
          <div className="actions">
            <button className="btn-outline" onClick={load}>Refresh</button>
          </div>
        </div>

        <form onSubmit={onAdd}>
          <div className="form-row">
            <div className="col">
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Name"
                aria-label="Name"
              />
            </div>
            <div className="col">
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Message (optional)"
                aria-label="Message"
              />
            </div>
            <div style={{width:120}}>
              <button className="btn" type="submit">Add</button>
            </div>
          </div>
        </form>

        {loading ? <div className="empty">Loading...</div> : (
          items.length === 0 ? (
            <div className="empty">No items yet — add one above.</div>
          ) : (
            <table>
              <thead>
                <tr><th>Name</th><th>Message</th><th>Created</th><th></th></tr>
              </thead>
              <tbody>
                {items.map(it => (
                  <tr key={it._id}>
                    <td>{it.name}</td>
                    <td>{it.message}</td>
                    <td>{new Date(it.createdAt).toLocaleString()}</td>
                    <td><button className="btn btn-delete" onClick={() => onDelete(it._id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </div>
  );
}
