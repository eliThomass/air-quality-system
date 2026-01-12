from django.urls import path
from .views import get_sensor_data_12h, post_sensor_data


urlpatterns = [
    path("history/", get_sensor_data_12h),
    path("upload/", post_sensor_data),
]
