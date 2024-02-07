from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path("trainer_dashboard/", TemplateView.as_view(template_name="trainer_dashboard/trainer_dashboard.html"), name='trainer_dashboard'),
    path("upload_recipe/", TemplateView.as_view(template_name="trainer_dashboard/upload_recipe.html"), name='upload_recipe'),
    path("recipe_list/", TemplateView.as_view(template_name="trainer_dashboard/recipe_list.html"), name='recipe_list'),
    path("bank_statement/", TemplateView.as_view(template_name="trainer_dashboard/bank_statement.html"), name='bank_statement'),
]
