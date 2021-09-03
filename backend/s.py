
from users.models import User, Team

from events.models import Event
import json
events = Event.objects.all()
new_events = []

for e in events:
    e_obj = {
        "name": e.title,
        "code": e.event_code,
        "day": e.day,
        "participants": [],
    }

    for p in e.participants.all():
        
        p_obj = {
            "team_code": p.team_code,
            "is_paid": p.is_paid,
            "is_verified": p.is_verified,
            "transaction_id": p.transaction_id,
            "members": []
        }
        for m in p.members.all():
            m_obj = {
                    "name": m.name,
                    "roll_no": m.roll_no,
                    "phone_no": m.phone_no
            }
            p_obj["members"].append(m_obj)
        e_obj["participants"].append(p_obj)

    new_events.append(e_obj)


new_file = open('event_participants_data.json', 'w')
json.dump(new_events, new_file, indent=4)

new_file.close()
