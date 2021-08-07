from uuid import uuid4
from .serializers import EventSerializer
from rest_framework.views import APIView
from django.http.response import JsonResponse
from .models import Event
from users.serializers import TeamSerializer

class EventListView(APIView):
  def get(self, request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    return JsonResponse({"events": serializer.data, "success": True}, status=200)

class EventDetailVIew(APIView):

  def get(self, request,event_code):
    print(event_code)
    try:
      event =  Event.objects.get(event_code=event_code)
      serializer = EventSerializer(event)
      teams = TeamSerializer(event.participants, many=True)
      # serializer.data['participants'] = teams.data
      data = {
        **serializer.data,
        "participants": teams.data,
      }
      return JsonResponse({"success": True, "event": data}, status=200)
    except Event.DoesNotExist:
      return JsonResponse({"message": "Event Doesn't Exists", "success": False}, status=400)