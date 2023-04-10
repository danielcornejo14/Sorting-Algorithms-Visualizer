import { useEffect, useState } from "react";
import { shuffle } from "../../helpers/shuffle";
import "./AlgorithmPanel.scss";

interface AlgorithmPanelProps {
  bars: number[];
  accessedBarIndex: number | null;
  comparedBarIndex: number | null;
}

export function AlgorithmPanel({ bars, accessedBarIndex, comparedBarIndex }: AlgorithmPanelProps) {
  return (
    <div>
      <div className="algorithm-panel">
        {bars.map((height, index) => (
          <div
            key={index}
            className={`bar 
                ${index === accessedBarIndex ? "accessed" : ""} 
                ${index === comparedBarIndex ? "compared" : ""}`}
            style={{
              width: `${(window.innerWidth * 0.8) / bars.length}px`,
              height: `${height}px`,
            }}
          />
        ))}
      </div>

    </div>
  );
}
