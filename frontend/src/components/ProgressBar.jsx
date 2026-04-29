// export default function ProgressBar({ progress }) {
//   return (
//     <div className="progress-container">
//       <div className="progress-bar" style={{ width: progress }}></div>

//       <span>{progress}</span>
//     </div>
//   );
// }

import "../styles/progress.css";
export default function ProgressBar({ progress }) {
  if (!progress) return null;

  const percent = parseFloat(progress);
  return (
    <div className="progress-wrapper">
      <div className="progress-card">
        <h3>Downloading...</h3>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percent}%` }}></div>
        </div>

        <p>{progress}</p>
      </div>
    </div>
  );
}
