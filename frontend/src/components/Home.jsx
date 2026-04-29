import { useState } from "react";
import API from "../api/api";

import SearchBox from "../components/SearchBox";
import VideoInfo from "../components/VideoInfo";
import ProgressBar from "../components/ProgressBar";

export default function Home() {

  const [url, setUrl] = useState("");
  const [info, setInfo] = useState(null);
  const [progress, setProgress] = useState(null);

  const fetchInfo = async () => {
    const res = await API.post("info/", { url });
    setInfo(res.data);
  };

  const startDownload = async (format_id) => {

    const res = await API.post("download/", {
      url,
      format_id
    });

    const task_id = res.data.task_id;

    const interval = setInterval(async () => {

      const prog = await API.get(`progress/${task_id}/`);

      if (prog.data.progress) {
        setProgress(prog.data.progress.progress);
      }

      if (prog.data.state === "SUCCESS") {
        clearInterval(interval);
      }

    }, 1000);
  };

  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Download Video and Audio from YouTube
      </h2>

      <SearchBox url={url} setUrl={setUrl} fetchInfo={fetchInfo} />

      <VideoInfo info={info} startDownload={startDownload} />

      {progress && <ProgressBar progress={progress} />}
    </>
  );
}