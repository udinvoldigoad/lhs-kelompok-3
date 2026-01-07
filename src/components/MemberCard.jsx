import "../styles/member.css";

export default function MemberCard({ member }) {
  return (
    <div className="member-card">
      <div className="member-image">
        <img src={member.image} alt={member.name} />
        <div className="member-overlay">
          <h4>{member.name}</h4>
          <span>{member.role}</span>
        </div>
      </div>
    </div>
  );
}
