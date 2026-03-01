from django.db import models


class Brand(models.Model):
    
    name = models.CharField(max_length=200)
    image = models.URLField(max_length=1000)
    category = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name