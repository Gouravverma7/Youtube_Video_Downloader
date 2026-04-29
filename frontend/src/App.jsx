import { useState } from "react";
import API from "./api/api";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import VideoInfo from "./components/VideoInfo";
import ProgressBar from "./components/ProgressBar";

export default function App() {
  const [url, setUrl] = useState("");
  const [info, setInfo] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchInfo = async () => {
    if (!url || loading) return;
    setLoading(true);
    setInfo(null);
    try {
      const res = await API.post("info/", { url });
      if (res.data) {
        setInfo(res.data);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const startDownload = async (format_id) => {
    const res = await API.post("download/", {
      url,
      format_id,
    });

    const task_id = res.data.task_id;

    const interval = setInterval(async () => {
      const prog = await API.get(`progress/${task_id}/`);
      if (prog.data && prog.data.progress) {
        setProgress(prog.data.progress.progress);
      }

      if (prog.data.state === "SUCCESS") {
        setProgress("100%"); // for finish bar
        setTimeout(() => {
          setProgress(null); // for hide progress bar
        }, 2000); // disappear after 2 seconds
        clearInterval(interval);
      }
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Download Video and Audio from YouTube
      </h2>

      <SearchBox
        url={url}
        setUrl={setUrl}
        fetchInfo={fetchInfo}
        loading={loading}
      />

      {loading && (
        <p style={{ textAlign: "center" }}>⏳ Fetching video info...</p>
      )}

      <VideoInfo info={info} startDownload={startDownload} />
      {progress && <ProgressBar progress={progress} />}
    </>
  );
}
