from django.urls import path, include
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path("trainer_dashboard/", TemplateView.as_view(template_name="html/trainer_dashboard.html"), name='trainer_dashboard'),

]