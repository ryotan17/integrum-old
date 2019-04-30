from django.urls import path
from . import consumers


websocket_urlpatterns = [
    path('chat/<int:space_number>/', consumers.ChatConsumer),
]
