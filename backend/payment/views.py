import stripe
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Order, OrderItem

stripe.api_key = settings.STRIPE_SECRET_KEY


@api_view(["POST"])
def create_checkout_session(request):

    items = request.data.get("items", [])
    customer = request.data.get("customer")

    total = 0
    line_items = []

    for item in items:
        price = float(item["Price"])
        qty = item.get("quantity", 1)

        total += price * qty

        line_items.append({
            "price_data": {
                "currency": "aed",
                "product_data": {
                    "name": item["Title"],
                },
                "unit_amount": int(price * 100),
            },
            "quantity": qty,
        })

    order = Order.objects.create(
        name=customer["name"],
        email=customer["email"],
        phone=customer["phone"],
        phone2=customer.get("phone2"),
        address=customer["address"],
        total_amount=total,
        payment_status="pending"
    )

    for item in items:
        OrderItem.objects.create(
            order=order,
            product_name=item["Title"],
            category=item.get("Category", ""),
            price=item["Price"],
            quantity=item.get("quantity", 1)
        )

    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=line_items,
        mode="payment",
        success_url="http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url="http://localhost:5173/payment-cancel",
    )

    order.stripe_session_id = session.id
    order.save()

    return Response({"url": session.url})


@api_view(["POST"])
def cod_order(request):

    items = request.data.get("items", [])
    customer = request.data.get("customer")

    total = 0

    for item in items:
        total += float(item["Price"]) * item.get("quantity", 1)

    order = Order.objects.create(
        name=customer["name"],
        email=customer["email"],
        phone=customer["phone"],
        phone2=customer.get("phone2"),
        address=customer["address"],
        total_amount=total,
        payment_status="cod"
    )

    for item in items:
        OrderItem.objects.create(
            order=order,
            product_name=item["Title"],
            category=item.get("Category", ""),
            price=item["Price"],
            quantity=item.get("quantity", 1)
        )

    return Response({"success": True})


@api_view(["POST"])
def verify_payment(request):

    session_id = request.data.get("session_id")

    session = stripe.checkout.Session.retrieve(session_id)

    if session.payment_status == "paid":

        order = Order.objects.get(stripe_session_id=session_id)

        order.payment_status = "paid"
        order.save()

        return Response({"success": True})

    return Response({"success": False})