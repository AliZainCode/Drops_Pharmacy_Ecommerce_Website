from django.contrib import admin
from .models import Branch, ContactEmail, AppDownload, PaymentMethod


admin.site.register(Branch)
admin.site.register(ContactEmail)
admin.site.register(AppDownload)
admin.site.register(PaymentMethod)