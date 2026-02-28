from django.db import models


class Order(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()

    phone = models.CharField(max_length=20)
    phone2 = models.CharField(max_length=20, blank=True, null=True)

    address = models.TextField()

    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    stripe_session_id = models.CharField(max_length=255, blank=True, null=True)

    payment_status = models.CharField(
        max_length=20,
        default="pending"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name