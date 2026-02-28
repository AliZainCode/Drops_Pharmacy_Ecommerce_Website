from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Product


@admin.register(Product)
class ProductAdmin(ImportExportModelAdmin):
    list_display = ("Title", "Price", "BrandName", "Categories")
    search_fields = ("Title", "BrandName", "UPC")
    prepopulated_fields = {"slug": ("Title",)}