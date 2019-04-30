import json
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from account.models import User
from chat.models import Message
from chat.serializer import MessageSerializer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.space_number = self.scope['url_route']['kwargs']['space_number']
        self.room_group_name = 'chat_{}'.format(self.space_number)

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        text = text_data_json['text']
        author = await self._get_user(text_data_json['author']['user_id'])
        message = await self._create_message(text, self.space_number, author)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
            }
        )

    @database_sync_to_async
    def _get_user(self, user_id):
        return User.objects.get(id=user_id)

    @database_sync_to_async
    def _create_message(self, text, space_number, author):
        message_obj = Message.objects.create(
            text=text, space_id=space_number, author=author)
        return MessageSerializer(message_obj).data


    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps(message))
