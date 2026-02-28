from django.db import models


class ContactBanner(models.Model):
    image = models.URLField(max_length=1000)
    category = models.CharField(max_length=200)

    def __str__(self):
        return self.category