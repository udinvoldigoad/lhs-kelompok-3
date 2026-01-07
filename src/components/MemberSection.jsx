import { useState, useRef, useEffect } from "react";
import "../styles/member.css";
import { members } from "../data/members";
import MemberCard from "./MemberCard";
// import MemberModal from "./MemberModal";

export default function MemberSection({ onSelect }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [snapEnabled, setSnapEnabled] = useState(true);


  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - 1
    );
  };

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({
      left: direction === "left" ? -CARD_WIDTH : CARD_WIDTH,
      behavior: "smooth",
    });

    // sync dot after animation
    setTimeout(updateActiveDot, 300);
  };

  const CARD_WIDTH = document.querySelector(".member-card")?.offsetWidth + 20 || 280;


  const updateActiveDot = () => {
    const el = scrollRef.current;
    if (!el) return;

    const index = Math.floor(
      (el.scrollLeft + CARD_WIDTH / 2) / CARD_WIDTH
    );
    setActiveIndex(index);
  };


  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      checkScroll();
      updateActiveDot();
    };

    onScroll(); // initial sync
    el.addEventListener("scroll", onScroll);

    return () => {
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="member-section" id="member">
      <div className="member-header">
        <h2>Member</h2>
        <div className="member-line" />
      </div>

      <div className="member-wrapper">
        {/* LEFT BUTTON */}
        <button
          className={`member-nav left ${!canScrollLeft ? "disabled" : ""}`}
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
        >
          ‹
        </button>

        {/* GRID */}
        <div 
          className="member-grid"  
          ref={scrollRef}
          style={{
            scrollSnapType: snapEnabled ? "x mandatory" : "none"
          }}
          >
          {members.map((member) => (
            <div key={member.id} onClick={() => onSelect(member)}>
              <MemberCard member={member} />
            </div>
          ))}
        </div>

        {/* RIGHT BUTTON */}
        <button
          className={`member-nav right ${!canScrollRight ? "disabled" : ""}`}
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
        >
          ›
        </button>
      </div>

      <div className="member-dots">
        {members.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === activeIndex ? "active" : ""}`}
            onClick={() => {
              const el = scrollRef.current;
                if (!el) return;

                // matikan snap sementara
                setSnapEnabled(false);

                el.scrollTo({
                  left: i * CARD_WIDTH,
                  behavior: "smooth",
              });
              // hidupkan snap lagi setelah animasi
              setTimeout(() => {
                setSnapEnabled(true);
              }, 450);
            }}
          />
        ))}
      </div>

    </section>
  );
}
