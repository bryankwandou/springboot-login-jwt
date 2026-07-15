"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  CheckCircle2,
  Database,
  Edit3,
  LogOut,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
} from "lucide-react";
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
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [pendingDelete, setPendingDelete] = useState<ItemDTO | null>(null);
  const [loadingItems, setLoadingItems] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
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
        setError("Daftar catatan belum bisa dimuat. Coba muat ulang.");
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
      setError("Nama entri operasional belum diisi.");
      return;
    }

    if (!token) {
      setError("Sesi tidak terbaca. Silakan masuk ulang.");
      return;
    }

    setSaving(true);
    try {
      await createItem(token, { title: trimmedTitle, description: description.trim() });
      setTitle("");
      setDescription("");
      setFeedback("Data operasional baru sudah tersimpan.");
      await loadItems(token);
    } catch (err) {
      if (err instanceof HttpError) {
        setError(err.message);
      } else {
        setError("Data belum tersimpan. Coba ulangi.");
      }
    } finally {
      setSaving(false);
    }
  }

  function startEdit(item: ItemDTO) {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditDescription(item.description);
    setError("");
    setFeedback("");
  }

  async function handleUpdate(item: ItemDTO) {
    if (!token) {
      setError("Sesi tidak terbaca. Silakan masuk ulang.");
      return;
    }

    if (!editTitle.trim()) {
      setError("Nama entri tidak boleh kosong.");
      return;
    }

    setUpdating(true);
    try {
      await updateItem(token, item.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });
      setEditingId(null);
      setFeedback("Perubahan data sudah disimpan.");
      await loadItems(token);
    } catch (err) {
      if (err instanceof HttpError) {
        setError(err.message);
      } else {
        setError("Perubahan belum tersimpan. Coba lagi.");
      }
    } finally {
      setUpdating(false);
    }
  }

  async function handleDelete(item: ItemDTO) {
    if (!token) {
      setError("Sesi tidak terbaca. Silakan masuk ulang.");
      return;
    }

    setDeleting(true);
    try {
      await deleteItem(token, item.id);
      setPendingDelete(null);
      setFeedback("Data sudah dihapus.");
      await loadItems(token);
    } catch (err) {
      if (err instanceof HttpError) {
        setError(err.message);
      } else {
        setError("Data belum terhapus. Coba ulangi.");
      }
    } finally {
      setDeleting(false);
    }
  }

  if (!ready) {
    return (
      <div className="dashboard-loading">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-card" />
        <div className="skeleton skeleton-card" />
      </div>
    );
  }

  const visibleItems = items.filter((item) => {
    const value = `${item.title} ${item.description}`.toLowerCase();
    return value.includes(query.trim().toLowerCase());
  });

  const lastUpdated = items
    .map((item) => item.updatedAt)
    .sort()
    .at(-1);

  return (
    <div className="dashboard-shell">
      <section className="dashboard-hero">
        <div>
          <p className="section-kicker">Dashboard Internal</p>
          <h1>Pantau pipeline kerja perusahaan dari satu panel operasional.</h1>
          <p>
            Halaman ini diposisikan sebagai pusat kendali internal untuk menyimpan permintaan klien, brief
            proyek, atau tindak lanjut tim. Akses tetap dijaga oleh token login aktif.
          </p>
        </div>
        <div className="dashboard-actions">
          <button className="button button-secondary" type="button" onClick={() => token && loadItems(token)}>
            <RefreshCw aria-hidden="true" size={17} />
            Muat ulang
          </button>
          <button type="button" className="button button-quiet" onClick={handleLogout}>
            <LogOut aria-hidden="true" size={17} />
            Keluar
          </button>
        </div>
      </section>

      <section className="metric-grid" aria-label="Ringkasan dashboard">
        <article className="metric-card">
          <Database aria-hidden="true" size={20} />
          <span>{items.length}</span>
          <p>entri operasional</p>
        </article>
        <article className="metric-card">
          <ShieldCheck aria-hidden="true" size={20} />
          <span>{token ? "Aktif" : "Kosong"}</span>
          <p>status akses</p>
        </article>
        <article className="metric-card">
          <CheckCircle2 aria-hidden="true" size={20} />
          <span>{lastUpdated ? new Date(lastUpdated).toLocaleDateString("id-ID") : "Belum ada"}</span>
          <p>update terakhir</p>
        </article>
      </section>

      <div className="dashboard-grid">
        <section className="workspace-panel">
          <div className="panel-heading">
            <p className="section-kicker">Input Data</p>
            <h2>Masukkan brief atau permintaan baru.</h2>
          </div>

          <form className="form-panel" onSubmit={handleCreate} noValidate aria-busy={saving}>
            <div className="field-group">
              <label htmlFor="item-title">Judul catatan</label>
              <input
                id="item-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Contoh: Permintaan proposal BUMD"
              />
            </div>

            <div className="field-group">
              <label htmlFor="item-description">Ringkasan</label>
              <textarea
                id="item-description"
                rows={5}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Tulis kebutuhan klien, status follow up, atau catatan tim."
              />
            </div>

            <button className="button button-primary full-width" type="submit" disabled={saving}>
              <Plus aria-hidden="true" size={18} />
              {saving ? "Menyimpan..." : "Simpan data"}
            </button>
          </form>
        </section>

        <section className="workspace-panel">
          <div className="panel-heading split-heading">
            <div>
              <p className="section-kicker">Pipeline Tim</p>
              <h2>Daftar entri milik akun ini.</h2>
            </div>
            <label className="search-box" htmlFor="item-search">
              <Search aria-hidden="true" size={17} />
              <input
                id="item-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari entri"
              />
            </label>
          </div>

          {error && (
            <div className="alert error" role="alert">
              <AlertTriangle aria-hidden="true" size={18} />
              <span>{error}</span>
            </div>
          )}

          {feedback && (
            <div className="alert success" role="status">
              <CheckCircle2 aria-hidden="true" size={18} />
              <span>{feedback}</span>
            </div>
          )}

          {loadingItems ? (
            <div className="items-list" aria-label="Memuat data">
              {[0, 1, 2].map((item) => (
                <div className="item-card" key={item}>
                  <div className="skeleton skeleton-line" />
                  <div className="skeleton skeleton-text" />
                </div>
              ))}
            </div>
          ) : visibleItems.length === 0 ? (
            <div className="empty-state">
              <Database aria-hidden="true" size={28} />
              <h3>{items.length === 0 ? "Belum ada data operasional." : "Tidak ada hasil yang cocok."}</h3>
              <p>
                {items.length === 0
                  ? "Tambahkan entri pertama dari formulir di sebelah kiri."
                  : "Ubah kata pencarian atau bersihkan kolom cari."}
              </p>
            </div>
          ) : (
            <ul className="items-list" aria-label="Daftar data">
              {visibleItems.map((item) => (
                <li key={item.id} className="item-card">
                  {editingId === item.id ? (
                    <div className="edit-panel">
                      <label htmlFor={`edit-title-${item.id}`}>Judul</label>
                      <input
                        id={`edit-title-${item.id}`}
                        value={editTitle}
                        onChange={(event) => setEditTitle(event.target.value)}
                      />
                      <label htmlFor={`edit-description-${item.id}`}>Ringkasan</label>
                      <textarea
                        id={`edit-description-${item.id}`}
                        rows={4}
                        value={editDescription}
                        onChange={(event) => setEditDescription(event.target.value)}
                      />
                      <div className="button-row">
                        <button
                          type="button"
                          className="button button-primary"
                          onClick={() => handleUpdate(item)}
                          disabled={updating}
                        >
                          {updating ? "Menyimpan..." : "Simpan perubahan"}
                        </button>
                        <button
                          type="button"
                          className="button button-secondary"
                          onClick={() => setEditingId(null)}
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="item-card-head">
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.description || "Entri ini belum memiliki ringkasan tambahan."}</p>
                        </div>
                        <span>{new Date(item.updatedAt).toLocaleString("id-ID")}</span>
                      </div>
                      <div className="button-row">
                        <button type="button" className="button button-secondary" onClick={() => startEdit(item)}>
                          <Edit3 aria-hidden="true" size={16} />
                          Edit
                        </button>
                        <button type="button" className="button button-danger" onClick={() => setPendingDelete(item)}>
                          <Trash2 aria-hidden="true" size={16} />
                          Hapus
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {pendingDelete && (
        <div className="dialog-backdrop" role="presentation">
          <section className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="delete-title">
            <AlertTriangle aria-hidden="true" size={22} />
            <h2 id="delete-title">Hapus data ini?</h2>
            <p>
              Entri <strong>{pendingDelete.title}</strong> akan dihapus dari daftar akun ini.
            </p>
            <div className="button-row">
              <button
                type="button"
                className="button button-danger"
                onClick={() => handleDelete(pendingDelete)}
                disabled={deleting}
              >
                {deleting ? "Menghapus..." : "Ya, hapus"}
              </button>
              <button type="button" className="button button-secondary" onClick={() => setPendingDelete(null)}>
                Batal
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
