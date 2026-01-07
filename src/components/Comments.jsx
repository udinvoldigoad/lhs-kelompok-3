import { useEffect, useState } from "react";
import "../styles/comments.css";

export default function Comments() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  // load dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lhs-comments");
    if (saved) {
      setComments(JSON.parse(saved));
    }
  }, []);

  // simpan ke localStorage
  useEffect(() => {
    localStorage.setItem("lhs-comments", JSON.stringify(comments));
  }, [comments]);

  const submit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    const newComment = {
      name: name.trim() || "Anonim",
      text: text.trim(),
      time: new Date().toLocaleString("id-ID"),
    };

    setComments([newComment, ...comments]);
    setName("");
    setText("");
  };

  return (
    <section className="comments">
      <h2 className="comments-title">Komentar & Pesan</h2>

      <form className="comments-form" onSubmit={submit}>
        <input
          type="text"
          placeholder="Nama (boleh kosong)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Tulis komentar atau kenangan di sini..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <button type="submit">Kirim</button>
      </form>

      <div className="comments-list">
        {comments.length === 0 && (
          <p className="comments-empty">
            Belum ada komentar. Jadi yang pertama 👀
          </p>
        )}

        {comments.map((c, i) => (
          <div key={i} className="comment-card">
            <div className="comment-header">
              <strong>{c.name}</strong>
              <span>{c.time}</span>
            </div>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
