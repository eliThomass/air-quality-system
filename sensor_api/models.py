from django.db import models
class BmeData(models.Model):
    def __str__(self):
        return f"Reading {self.id}: {self.temperature}°C at {self.read_at}"
    temperature = models.FloatField()
    humidity = models.FloatField()
    pressure = models.FloatField()
    gas_resistance = models.FloatField()
    read_at = models.DateTimeField(auto_now_add=True)
