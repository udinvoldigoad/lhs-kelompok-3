import Navbar from "./components/navbar/Navbar";
import { useState } from "react";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import MemberSection from "./components/member/MemberSection";
import MemberModal from "./components/member/MemberModal";
import GallerySection from "./components/gallery/GallerySection";
import Comments from "./components/comments/Comments";

function App() {
  const [activeMember, setActiveMember] = useState(null);

  return (
    <>
      <Navbar />
      <Hero />
      <About />

      <MemberSection onSelect={setActiveMember} />

      {activeMember && (
        <MemberModal
          member={activeMember}
          onClose={() => setActiveMember(null)}
        />
      )}

      <GallerySection />
      <Comments />
    </>
  );
}

export default App;
