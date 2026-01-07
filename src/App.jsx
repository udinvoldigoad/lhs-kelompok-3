import Navbar from "./components/Navbar";
import { useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import MemberSection from "./components/MemberSection";
import MemberModal from "./components/MemberModal";
import GallerySection from "./components/GallerySection";
import Comments from "./components/Comments";

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
