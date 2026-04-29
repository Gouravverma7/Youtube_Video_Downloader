from django.urls import path
from .views import video_info,start_download,download_progress

urlpatterns=[
    path("info/",video_info),
    path("download/",start_download),
    path("progress/<str:task_id>/",download_progress),
]