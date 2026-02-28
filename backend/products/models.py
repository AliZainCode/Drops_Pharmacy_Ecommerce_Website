from django.db import models
from django.utils.text import slugify


class Product(models.Model):

    Title = models.CharField(max_length=2000, blank=True, null=True)
    TitleArabic = models.CharField(max_length=2000, blank=True, null=True)

    Price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    VatPrice = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    BrandName = models.CharField(max_length=500, blank=True, null=True)

    UPC = models.CharField(max_length=200, blank=True, null=True)

    Categories = models.CharField(max_length=500, blank=True, null=True)

    slug = models.SlugField(max_length=500, unique=True, blank=True)

    Link = models.URLField(max_length=1000, blank=True, null=True)

    GalleryImages = models.TextField(blank=True, null=True)

    Descriptions = models.TextField(blank=True, null=True)
    DescriptionsArabic = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug and self.Title:
            base_slug = slugify(self.Title)[:450]
            slug = base_slug
            counter = 1

            while Product.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1

            self.slug = slug

        super().save(*args, **kwargs)

    def __str__(self):
        return self.Title