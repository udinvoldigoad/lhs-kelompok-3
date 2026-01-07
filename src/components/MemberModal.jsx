import "../styles/member.css";
import { FaInstagram } from "react-icons/fa";

export default function MemberModal({ member, onClose }) {
  if (!member) return null;

  return (
    <div className="member-modal-backdrop" onClick={onClose}>
      <div
        className="member-modal poster"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>✕</button>

        <div
          className="poster-bg"
          style={{ backgroundImage: `url(${member.image})` }}
        />

        <div className="poster-overlay" />

        <div className="poster-content">
          <span className="poster-role">
            Member LHS <span className="poster-line" />
          </span>

          <h3 className="poster-name">{member.name}</h3>

          <p className="poster-quote">
            {member.quote || "Quote belum dibuat"}
          </p>

          <a
            href={member.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="poster-instagram">
              <FaInstagram />
              Follow on Instagram
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
