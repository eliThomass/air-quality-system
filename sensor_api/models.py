from django.db import models
class BmeData(models.Model):
    temperature = models.FloatField()
    humidity = models.FloatField()
    pressure = models.FloatField()
    gas_resistance = models.FloatField()
    read_at = models.DateTimeField(auto_now_add=True)
