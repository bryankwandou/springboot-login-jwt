"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthToken } from "@/hooks/use-auth";
import { logout } from "@/services/auth-client";
import { createItem, deleteItem, getItems, ItemDTO, updateItem } from "@/services/items-client";
import { HttpError } from "@/services/http";

export function DashboardClient() {
  const router = useRouter();
  const { token, ready } = useAuthToken();

  const [items, setItems] = useState<ItemDTO[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loadingItems, setLoadingItems] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const handleLogout = useCallback(async () => {
    await logout();
    router.push("/login");
    router.refresh();
  }, [router]);

  const loadItems = useCallback(async (authToken: string) => {
    setLoadingItems(true);
    setError("");

    try {
      const response = await getItems(authToken);
      setItems(response.items);
    } catch (err) {
      if (err instanceof HttpError && err.status === 401) {
        await handleLogout();
      } else if (err instanceof HttpError) {
        setError(err.message);
      } else {
        setError("Data tidak dapat dimuat saat ini.");
      }
    } finally {
      setLoadingItems(false);
    }
  }, [handleLogout]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    if (!token) {
      router.push("/login");
      return;
    }

    const timer = window.setTimeout(() => {
      void loadItems(token);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [ready, token, router, loadItems]);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setFeedback("");

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Judul wajib diisi.");
      return;
    }

    if (!token) {
      setError("Sesi login tidak ditemukan.");
      return;
    }

    setSaving(true);
    try {
      await createItem(token, { title: trimmedTitle, description: description.trim() });
      setTitle("");
      setDescription("");
      setFeedback("Data berhasil disimpan.");
      await loadItems(token);
    } catch (err) {
      if (err instanceof HttpError) {
        setError(err.message);
      } else {
        setError("Data gagal disimpan.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(item: ItemDTO) {
    const newTitle = window.prompt("Perbarui judul", item.title);
    if (newTitle === null) {
      return;
    }

    if (!newTitle.trim()) {
      setError("Judul tidak boleh kosong.");
      return;
    }

    const newDescription = window.prompt("Perbarui keterangan", item.description) ?? "";
    if (!token) {
      setError("Sesi login tidak ditemukan.");
      return;
    }

    try {
      await updateItem(token, item.id, {
        title: newTitle.trim(),
        description: newDescription.trim(),
      });
      setFeedback("Data berhasil diperbarui.");
      await loadItems(token);
    } catch (err) {
      if (err instanceof HttpError) {
        setError(err.message);
      } else {
        setError("Data gagal diperbarui.");
      }
    }
  }

  async function handleDelete(item: ItemDTO) {
    const confirmed = window.confirm(`Hapus data \"${item.title}\"?`);
    if (!confirmed) {
      return;
    }

    if (!token) {
      setError("Sesi login tidak ditemukan.");
      return;
    }

    try {
      await deleteItem(token, item.id);
      setFeedback("Data berhasil dihapus.");
      await loadItems(token);
    } catch (err) {
      if (err instanceof HttpError) {
        setError(err.message);
      } else {
        setError("Data gagal dihapus.");
      }
    }
  }

  if (!ready) {
    return <p className="muted">Memeriksa sesi login...</p>;
  }

  return (
    <div className="dashboard-grid">
      <section className="panel">
        <div className="panel-head">
          <h1>Dashboard</h1>
          <button type="button" className="secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <p className="muted">
          Seluruh permintaan data pada halaman ini mengirim Authorization Bearer Token.
        </p>

        <form className="form-panel" onSubmit={handleCreate} noValidate>
          <label htmlFor="item-title">Judul</label>
          <input
            id="item-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Masukkan judul"
          />

          <label htmlFor="item-description">Keterangan</label>
          <textarea
            id="item-description"
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Masukkan keterangan"
          />

          <button type="submit" disabled={saving}>
            {saving ? "Menyimpan..." : "Simpan Entri"}
          </button>
        </form>
      </section>

      <section className="panel">
        <h2>Daftar Entri</h2>

        {error && (
          <div className="alert error" role="alert">
            {error}
          </div>
        )}

        {feedback && (
          <div className="alert success" role="status">
            {feedback}
          </div>
        )}

        {loadingItems ? (
          <p className="muted">Memuat data...</p>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <p>Belum ada entri yang tersedia. Gunakan formulir di samping untuk menambahkan data.</p>
          </div>
        ) : (
          <ul className="items-list" aria-label="Daftar entri CRUD">
            {items.map((item) => (
              <li key={item.id} className="item-card">
                <h3>{item.title}</h3>
                <p>{item.description || "Tanpa keterangan"}</p>
                <p className="muted small-text">Diperbarui: {new Date(item.updatedAt).toLocaleString()}</p>
                <div className="row">
                  <button type="button" className="secondary" onClick={() => handleUpdate(item)}>
                    Ubah
                  </button>
                  <button type="button" className="danger" onClick={() => handleDelete(item)}>
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
