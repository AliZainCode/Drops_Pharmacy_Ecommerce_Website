from django.db import models

class HeroSection(models.Model):
    image = models.URLField(max_length=2000)
    category = models.CharField(max_length=200, default="hero")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Hero Image {self.id}"