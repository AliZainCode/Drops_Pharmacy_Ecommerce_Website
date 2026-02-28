from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Brand


@admin.register(Brand)
class BrandAdmin(ImportExportModelAdmin):
    list_display = ("id", "name", "category", "is_active", "created_at")
    search_fields = ("name", "category")
    list_filter = ("category", "is_active")