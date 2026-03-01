from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    fields = ("product_name", "category", "price", "quantity")


class OrderAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "email",
        "phone",
        "total_amount",
        "payment_status",
        "created_at",
        "products"
    )

    search_fields = ("name", "email", "phone")

    list_filter = ("payment_status", "created_at")

    fieldsets = (
        ("Customer Details", {
            "fields": ("name", "email", "phone", "phone2", "address")
        }),
        ("Order Details", {
            "fields": ("total_amount", "stripe_session_id", "payment_status")
        }),
        
    )

    inlines = [OrderItemInline]

    def products(self, obj):
        return ", ".join(
            [f"{item.product_name} ({item.quantity})" for item in obj.items.all()]
        )

    products.short_description = "Products"


admin.site.register(Order, OrderAdmin)