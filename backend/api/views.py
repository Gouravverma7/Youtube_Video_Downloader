from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import get_video_info
from .tasks import download_video
from celery.result import AsyncResult

@api_view(["POST"])
def video_info(request):
    url = request.data.get("url")
    if not url:
        return Response({"error": "URL required"})

    info = get_video_info(url)
    return Response(info)


@api_view(["POST"])
def start_download(request):
    url = request.data.get("url")
    format_id = request.data.get("format_id")

    if not url or not format_id:
        return Response({"error":"url and format_id required"})

    task=download_video.delay(url,format_id)
    return Response({"task_id":task.id})


@api_view(["GET"])
def download_progress(request,task_id):
    task=AsyncResult(task_id)
    return Response({
        "state":task.state,
        "progress":task.info
    })