from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .models import BmeData

def get_sensor_data_12h(request):
    latest_data_reads = BmeData.objects.order_by("-read_at")[:47]

    data_list = []
    for entry in latest_data_reads:
        data_list.append({
            "id": entry.id,
            "temperature": entry.temperature,
            "humidity": entry.humidity,
            "pressure": entry.pressure,
            "gas_resistance": entry.gas_resistance,
            "read_at": entry.read_at.isoformat()
        })

    return JsonResponse(data_list, safe=False)

@csrf_exempt
def post_sensor_data(request):
    try:
        data = json.loads(request.body)

        reading = BmeData.objects.create(
        temperature=data.get('temperature'),
        humidity=data.get('humidity'),
        pressure=data.get('pressure'),
        gas_resistance=data.get('gas_resistance')
        )
        return JsonResponse({"status": "success", "id": reading.id}, status=201)
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=400)
