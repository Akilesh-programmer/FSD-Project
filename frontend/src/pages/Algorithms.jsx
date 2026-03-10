import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Algorithms.css";

const ALGORITHMS = {
  Beginner: [
    {
      name: "White Cross",
      alg: "—",
      description:
        "Build a white cross on the bottom. Match edge colors to center pieces.",
    },
    {
      name: "First Layer Corners",
      alg: "R' D' R D (repeat)",
      description: "Insert white corners into the first layer",
    },
    {
      name: "Second Layer (Right)",
      alg: "U R U' R' U' F' U F",
      description: "Insert edge piece to the right slot",
    },
    {
      name: "Second Layer (Left)",
      alg: "U' L' U L U F U' F'",
      description: "Insert edge piece to the left slot",
    },
    {
      name: "Yellow Cross",
      alg: "F R U R' U' F'",
      description: "Create a yellow cross on the top layer",
    },
    {
      name: "Orient Yellow Corners",
      alg: "R U R' U R U2 R'",
      description: "Sune — orient the yellow corners",
    },
    {
      name: "Permute Corners",
      alg: "U R U' L' U R' U' L",
      description: "Cycle three corners into correct positions",
    },
    {
      name: "Permute Edges",
      alg: "R U' R U R U R U' R' U' R2",
      description: "Cycle three edges to solve the cube",
    },
  ],
  OLL: [
    {
      name: "OLL 21 — H",
      alg: "R U2 R' U' R U R' U' R U' R'",
      description: "Cross with H pattern",
    },
    {
      name: "OLL 22 — Pi",
      alg: "R U2 R2' U' R2 U' R2' U2 R",
      description: "Cross with Pi shape",
    },
    {
      name: "OLL 23 — Headlights",
      alg: "R2 D' R U2 R' D R U2 R",
      description: "Cross with headlights",
    },
    {
      name: "OLL 24 — Chameleon",
      alg: "r U R' U' r' F R F'",
      description: "Cross with chameleon pattern",
    },
    {
      name: "OLL 25 — Bowtie",
      alg: "F' r U R' U' r' F R",
      description: "Cross with bowtie shape",
    },
    {
      name: "OLL 26 — Anti-Sune",
      alg: "R U2 R' U' R U' R'",
      description: "The anti-sune algorithm",
    },
    {
      name: "OLL 27 — Sune",
      alg: "R U R' U R U2 R'",
      description: "The classic sune algorithm",
    },
    {
      name: "OLL 1 — Dot",
      alg: "R U2 R2' F R F' U2 R' F R F'",
      description: "All edges flipped (dot case)",
    },
    {
      name: "OLL 2 — Dot",
      alg: "F R U R' U' F' f R U R' U' f'",
      description: "All edges flipped variant",
    },
  ],
  PLL: [
    {
      name: "Aa Perm",
      alg: "x R' U R' D2 R U' R' D2 R2 x'",
      description: "Adjacent corner swap (A)",
    },
    {
      name: "Ab Perm",
      alg: "x R2 D2 R U R' D2 R U' R x'",
      description: "Adjacent corner swap (B)",
    },
    {
      name: "T Perm",
      alg: "R U R' U' R' F R2 U' R' U' R U R' F'",
      description: "T-shape adjacent swap",
    },
    {
      name: "Jb Perm",
      alg: "R U R' F' R U R' U' R' F R2 U' R'",
      description: "J-shape adjacent swap",
    },
    {
      name: "F Perm",
      alg: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
      description: "F-shape swap",
    },
    {
      name: "H Perm",
      alg: "M2 U M2 U2 M2 U M2",
      description: "Opposite edge swap (H)",
    },
    {
      name: "Z Perm",
      alg: "M' U M2 U M2 U M' U2 M2",
      description: "Diagonal edge swap (Z)",
    },
    {
      name: "U Perm (a)",
      alg: "R U' R U R U R U' R' U' R2",
      description: "Clockwise 3-edge cycle",
    },
    {
      name: "U Perm (b)",
      alg: "R2 U R U R' U' R' U' R' U R'",
      description: "Counter-clockwise 3-edge cycle",
    },
    {
      name: "E Perm",
      alg: "x' R U' R' D R U R' D' R U R' D R U' R' D' x",
      description: "Diagonal corner swap",
    },
    {
      name: "Na Perm",
      alg: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
      description: "Diagonal swap (N)",
    },
    {
      name: "Ja Perm",
      alg: "x R2 F R F' R U2 r' U r U2 x'",
      description: "J-shape adjacent variant",
    },
  ],
  F2L: [
    {
      name: "Basic Insert (Right)",
      alg: "U R U' R'",
      description: "Pair corner+edge and insert right slot",
    },
    {
      name: "Basic Insert (Left)",
      alg: "U' L' U L",
      description: "Pair corner+edge and insert left slot",
    },
    {
      name: "Case 1",
      alg: "R U R'",
      description: "Corner above slot, edge matches",
    },
    {
      name: "Case 2",
      alg: "R U' R' U R U R'",
      description: "Corner on top, edge in slot facing out",
    },
    {
      name: "Case 3",
      alg: "R U2 R' U' R U R'",
      description: "Both pieces on top, easy connect",
    },
    {
      name: "Case 4",
      alg: "U' R U2 R' U2 R U' R'",
      description: "Both on top, colors opposing",
    },
    {
      name: "Case 5",
      alg: "U' R U R' U R U R'",
      description: "Both on top, colors facing away",
    },
    {
      name: "Case 6",
      alg: "R U' R' U R U' R' U2 R U' R'",
      description: "Corner in slot, edge on top",
    },
  ],
};

function Algorithms({ setIsAuthenticated }) {
  const [activeTab, setActiveTab] = useState("Beginner");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const categories = Object.keys(ALGORITHMS);

  const copyAlgorithm = (alg, index) => {
    navigator.clipboard.writeText(alg);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="algo-page">
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <main className="algo-main">
        <div className="page-header">
          <h1 className="page-title">Algorithms</h1>
          <p className="page-subtitle">
            Reference guide for Rubik's Cube algorithms
          </p>
        </div>

        <div className="algo-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`algo-tab ${activeTab === cat ? "active" : ""}`}
              onClick={() => {
                setActiveTab(cat);
                setCopiedIndex(null);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="algo-count">
          {ALGORITHMS[activeTab].length} algorithms
        </div>

        <div className="algo-grid">
          {ALGORITHMS[activeTab].map((algo, index) => (
            <div key={index} className="algo-card">
              <div className="algo-card-header">
                <h3>{algo.name}</h3>
                <span className="algo-badge">{activeTab}</span>
              </div>
              <p className="algo-description">{algo.description}</p>
              <div className="algo-notation">
                <code>{algo.alg}</code>
                {algo.alg !== "—" && (
                  <button
                    className={`copy-btn ${copiedIndex === index ? "copied" : ""}`}
                    onClick={() => copyAlgorithm(algo.alg, index)}
                  >
                    {copiedIndex === index ? "✓ Copied" : "Copy"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Algorithms;
