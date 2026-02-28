from django.urls import path
from .views import cod_order, create_checkout_session, verify_payment

urlpatterns = [
    path("create-checkout-session/", create_checkout_session),
    path("cod-order/", cod_order),
    path("verify-payment/", verify_payment),
]