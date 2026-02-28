from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import ContactBanner


@admin.register(ContactBanner)
class ContactBannerAdmin(ImportExportModelAdmin):
    list_display = ("id", "category")