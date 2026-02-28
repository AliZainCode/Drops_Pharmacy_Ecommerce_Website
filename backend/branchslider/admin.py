from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import BranchSlider


@admin.register(BranchSlider)
class BranchSliderAdmin(ImportExportModelAdmin):
    list_display = ["name", "phone", "is_active"]