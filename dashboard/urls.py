from django.urls import path, include
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path("trainer_dashboard/", TemplateView.as_view(template_name="dashboard.html"), name='trainer_dashboard'),
    path("upload_recipe/", TemplateView.as_view(template_name="html/upload_recipe.html"), name='upload_recipe'),
]