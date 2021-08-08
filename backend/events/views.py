from users.models import User
from users.models import Team
from uuid import uuid4
from .serializers import EventSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
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
    
class EventRegiterView(APIView):
  permission_classes = [IsAuthenticated]

  def post(self, request):
    user = request.user
    event_code = request.data['event_code']
    event = None
    print(event_code)
    try:
      event = Event.objects.get(event_code=event_code)
    except Event.DoesNotExist:
      return JsonResponse({"message": "Event Doesn't Exists", "success": False}, status=400)


    if event.seats == event.max_seats:
      return JsonResponse({"message": "Event Doesn't have Seats Left!", "success": False}, status=400)
    
    if event.team_size == 1:
      # Event is Solo Event
      e = user.teams.filter(event=event).first()
      if e:
        return JsonResponse({"message": "You have Already Registered For this Event", "success": False}, status=400)
      
      # create a Team of One
      t = Team()
      t.event = event
      t.team_name = user.name
      t.save()
      t.members.add(user)
      
      # add to moneyOwed
      user.money_owed += event.entry_fee

      # TODO update criteria

      # Update Event seats
      event.seats += 1

      try:
        t.save()
        event.save()
        user.save()
        return JsonResponse({"message": "Event Registered Sucessfully!", "success": True}, status=200)

      except:
        t.delete()
        return JsonResponse({"message": "Something Went Wrong!", "success": False}, status=400)

    else:
      # Event is Team Event
      e = user.teams.filter(event=event).first()
      if e:
        return JsonResponse({"message": "You have Already Registered For this Event", "success": False}, status=400)
      
      team_name = request.data['team_name']
      members = request.data["members"]


      if event.is_team_size_strict and len(members) != event.team_size:        
        return JsonResponse({"message": f"Event Has a Strict Team Size of {event.team_size}", "success": False}, status=400)

      if len(set(members)) != len(members):
        return JsonResponse({"message": "Team have Repeated Members, Please ensure they are Unique!", "success": False}, status=400)
      
      t = Team()
      t.event = event
      t.team_name = team_name
      t.save()

      
      for m in members:
        try:
          u = User.objects.get(roll_no=m)
          t.members.add(u)
          # TODO update criteria for members

        except User.DoesNotExist:
          t.delete()
          return JsonResponse({"message": "Roll Number is Not Valid or Doesn't Exists", "success": False}, status=400)
      
      # add to moneyOwed
      user.money_owed += event.entry_fee

      # Update Event seats
      event.seats += 1
      
      try:
        t.save()
        event.save()
        user.save()
        return JsonResponse({"message": "Event Registered Sucessfully!", "success": True}, status=200)
      except:
        t.delete()
        return JsonResponse({"message": "Something Went Wrong!", "success": False}, status=400)