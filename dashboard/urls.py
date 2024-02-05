from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path("trainer_dashboard/", TemplateView.as_view(template_name="dashboard.html"), name='trainer_dashboard'),
    path("upload_recipe/", TemplateView.as_view(template_name="html/upload_recipe.html"), name='upload_recipe'),
    path("recipe_list/", TemplateView.as_view(template_name="html/recipe_list.html"), name='recipe_list'),
    path("bank_statement/", TemplateView.as_view(template_name="html/bank_statement.html"), name='bank_statement'),
]
