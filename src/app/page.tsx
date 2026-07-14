"use client";

import { useMemo, useState } from "react";

type ApiItem = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export default function HomePage() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("Belum ada aksi");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ApiItem[]>([]);

  const shortToken = useMemo(() => {
    if (!token) {
      return "-";
    }

    return `${token.slice(0, 20)}...`;
  }, [token]);

  async function register() {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      setMessage(data.message ?? "Register gagal");
      return;
    }

    setToken(data.token);
    setMessage(`Register sukses: ${data.user.email}`);
  }

  async function login() {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      setMessage(data.message ?? "Login gagal");
      return;
    }

    setToken(data.token);
    setMessage(`Login sukses: ${data.user.email}`);
  }

  async function loadItems() {
    const response = await fetch("/api/items", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      setMessage(data.message ?? "Gagal ambil data");
      return;
    }

    setItems(data.items ?? []);
    setMessage("Data berhasil diambil");
  }

  async function createItem() {
    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    const data = await response.json();
    if (!response.ok) {
      setMessage(data.message ?? "Gagal tambah item");
      return;
    }

    setTitle("");
    setDescription("");
    setMessage("Item berhasil ditambahkan");
    await loadItems();
  }

  async function updateItem(item: ApiItem) {
    const newTitle = window.prompt("Judul baru", item.title);
    if (!newTitle) {
      return;
    }

    const newDescription = window.prompt("Deskripsi baru", item.description) ?? "";

    const response = await fetch(`/api/items/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTitle, description: newDescription }),
    });

    const data = await response.json();
    if (!response.ok) {
      setMessage(data.message ?? "Gagal update item");
      return;
    }

    setMessage("Item berhasil diupdate");
    await loadItems();
  }

  async function deleteItem(itemId: string) {
    const response = await fetch(`/api/items/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      setMessage(data.message ?? "Gagal hapus item");
      return;
    }

    setMessage("Item berhasil dihapus");
    await loadItems();
  }

  return (
    <main>
      <h1>Login JWT + CRUD Header Authorization</h1>
      <p className="small">
        Default user: <strong>admin@example.com</strong> / <strong>admin123</strong>
      </p>

      <div className="grid">
        <section className="card">
          <h2>Auth</h2>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="email"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="password"
          />

          <div className="row">
            <button onClick={register}>Register</button>
            <button className="secondary" onClick={login}>
              Login
            </button>
          </div>

          <p className="small">Token singkat: {shortToken}</p>
          <p className="small">
            Header yang dipakai: <code>Authorization: Bearer {'{'}token{'}'}</code>
          </p>
        </section>

        <section className="card">
          <h2>Tambah Item</h2>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Masukkan judul"
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Masukkan deskripsi"
          />

          <div className="row">
            <button onClick={createItem}>Create</button>
            <button className="secondary" onClick={loadItems}>
              Refresh Data
            </button>
          </div>
        </section>
      </div>

      <section className="card" style={{ marginTop: "1rem" }}>
        <h2>Daftar Item Saya</h2>
        <p className="small">Status: {message}</p>

        <div className="item-list">
          {items.length === 0 && <p className="small">Belum ada data.</p>}
          {items.map((item) => (
            <article key={item.id} className="item">
              <h3>{item.title}</h3>
              <p>{item.description || "(tanpa deskripsi)"}</p>
              <p className="small">ID: {item.id}</p>
              <div className="row">
                <button className="secondary" onClick={() => updateItem(item)}>
                  Update
                </button>
                <button className="danger" onClick={() => deleteItem(item.id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
