from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from django.views.generic import TemplateView

router = DefaultRouter()

router.register('foods', views.FoodViewSet)
urlpatterns = [
    path('api/', include(router.urls)),
]
