import { useEffect, useMemo, useRef, useState } from "react";
import "./comments.css";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

function formatWIB(date) {
  // paksa WIB
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function Comments() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [entered, setEntered] = useState(false);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);

  const listRef = useRef(null);


  const commentsRef = useMemo(() => collection(db, "comments"), []);

useEffect(() => {
  setLoading(true);

  const q = query(commentsRef, orderBy("createdAt", "desc"));
  const unsub = onSnapshot(
    q,
    (snap) => {
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setItems(rows);
      setLoading(false);

      requestAnimationFrame(() => {
        if (listRef.current) listRef.current.scrollTo({ top: 0 });
      });
    },
    () => {
      // kalau error tetap stop loading
      setLoading(false);
    }
  );

  return () => unsub();
}, [commentsRef]);

  useEffect(() => {
    // trigger animasi sekali saat mount
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, []);


const submit = async (e) => {
  e.preventDefault();
  if (!name.trim() || !message.trim()) return;

  try {
    setSubmitting(true);

    await addDoc(commentsRef, {
      name: name.trim(),
      message: message.trim(),
      createdAt: serverTimestamp(),
    });

    setMessage("");

    // toast sukses
    setToast("Terkirim! Pesan kamu sudah masuk.");
    setTimeout(() => setToast(""), 2200);

    // scroll list ke atas (karena newest di atas)
    requestAnimationFrame(() => {
      if (listRef.current) listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    });
  } finally {
    setSubmitting(false);
  }
};


  return (
    <section className="comments-section" id="comments">
      <div className={`comments-header ${entered ? "is-in" : ""}`}>
        <h2>Komentar</h2>
        <div className="comments-line" />
      </div>

      <div className={`comments-shell ${entered ? "is-in" : ""}`}>
        {/* LEFT: FORM */}
        <div className="comments-panel form-panel">
          <h3>Tinggalkan Pesan</h3>

          <form onSubmit={submit} className="comments-form">
            <label>
              Nama
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama kamu..."
                required
              />
            </label>

            <label>
              Pesan
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis komentar..."
                rows={5}
                required
              />
            </label>

            <button type="submit" disabled={submitting}>
              {submitting ? "Mengirim..." : "Submit"}
            </button>
          </form>
        </div>

        {/* RIGHT: LIST */}
        <div className="comments-panel list-panel">
          <h3>Daftar Komentar</h3>

          <div className="comments-list" ref={listRef}>
            {loading ? (
              <>
                <div className="skeleton">
                  <div className="skeleton-line short" />
                  <div className="skeleton-line long" />
                  <div className="skeleton-line medium" />
                </div>
                <div className="skeleton">
                  <div className="skeleton-line short" />
                  <div className="skeleton-line long" />
                  <div className="skeleton-line medium" />
                </div>
                <div className="skeleton">
                  <div className="skeleton-line short" />
                  <div className="skeleton-line long" />
                  <div className="skeleton-line medium" />
                </div>
              </>
            ) : items.length === 0 ? (
              <div className="comments-empty">Belum ada komentar.</div>
            ) : (
              items.map((c) => {
                const date = c.createdAt?.toDate?.() ? c.createdAt.toDate() : null;

                return (
                  <div key={c.id} className="comment-card">
                    <div className="comment-meta">
                      <span className="comment-name">{c.name}</span>
                      <span className="comment-time">
                        {date ? formatWIB(date) : "Loading..."}
                      </span>
                    </div>

                    <p className="comment-text">{c.message}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
        <div className={`toast ${toast ? "show" : ""}`}>
          <b>LHS</b> — {toast}
        </div>
    </section>
  );
}
