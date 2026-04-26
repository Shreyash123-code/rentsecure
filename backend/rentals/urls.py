from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, LeaseViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet)
router.register(r'leases', LeaseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
