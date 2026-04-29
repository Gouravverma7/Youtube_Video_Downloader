from celery import shared_task
import yt_dlp

@shared_task(bind=True)
def download_video(self, url, format_id):
    def progress_hook(d):
        if d["status"] == "downloading":
            percent = d["_percent_str"]
            self.update_state(
                state="PROGRESS",
                meta={"progress": percent}
            )

    ydl_opts = {
        "format": f"{format_id}+bestaudio/best",
        "outtmpl": "downloads/%(title)s_%(id)s_%(height)sp.%(ext)s",
        "merge_output_format": "mp4",
        "progress_hooks": [progress_hook],
        "concurrent_fragment_downloads": 5
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])