from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Collection


@admin.register(Collection)
class CollectionAdmin(ImportExportModelAdmin):
    list_display = ("id", "name", "category", "is_active")
    search_fields = ("name", "category")