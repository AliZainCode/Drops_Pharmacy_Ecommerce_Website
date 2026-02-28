from django.db import models


class Branch(models.Model):
    CITY_CHOICES = [
        ("abuDhabi", "Abu Dhabi"),
        ("alAin", "Al Ain"),
    ]

    city = models.CharField(max_length=50, choices=CITY_CHOICES)
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return f"{self.name} - {self.city}"

class ContactEmail(models.Model):
    label = models.EmailField()
    link = models.URLField()

    def __str__(self):
        return self.label

class AppDownload(models.Model):
    label = models.CharField(max_length=100)
    img = models.URLField()

    def __str__(self):
        return self.label

class PaymentMethod(models.Model):
    alt = models.CharField(max_length=100)
    img = models.URLField()

    def __str__(self):
        return self.alt