import { useState } from "react";
import "./App.css";

interface VerticalProgressBarProps {
  percent: number;
}

function VerticalProgressBar({ percent }: VerticalProgressBarProps) {
  const fillColor = getProgressColor(percent);

  return (
    <div className="vertical-bar-container">
      <div className="vertical-bar">
        <div
          className="vertical-bar-fill"
          style={{
            height: `${percent}%`,
            background: fillColor,
          }}
        />
      </div>
      <div className="vertical-marker-container">
        <div className="marker-label" style={{ bottom: `${percent}%` }}>
          <div className="vertical-bar-marker" />
          <div className="vertical-bar-label">
            <strong>{percent}%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function getProgressColor(percent: number): string {
  const transparency = 0.5 + percent / 200;
  const hue = (percent * 120) / 100;
  return `hsl(${hue}, 100%, 50%, ${transparency})`;
}

function App() {
  const [checkedArray, setCheckedArray] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const handleCheckboxChange = (index: number) => {
    setCheckedArray((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const checkedCount = checkedArray.filter((item) => item).length;
  const achievementPercent = (checkedCount / 4) * 100;

  return (
    <div className="container">
      <div className="box">
        <div className="box-left">
          {checkedArray.map((checked, idx) => (
            <label className="check-item" key={idx}>
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={checked}
                onChange={() => handleCheckboxChange(idx)}
              />
              체크 아이템 {idx + 1}
            </label>
          ))}
        </div>
        <div className="box-right">
          <VerticalProgressBar percent={achievementPercent} />
        </div>
      </div>
    </div>
  );
}

export default App;
