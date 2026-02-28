from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import HeroSection


@admin.register(HeroSection)
class HeroSectionAdmin(ImportExportModelAdmin):
    list_display = ("id", "image", "category", "is_active", "created_at")
    list_filter = ("is_active", "category")