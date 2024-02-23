from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    # Trainer Dashboard URLs Start
    path("trainer_dashboard/", TemplateView.as_view(template_name="trainer_dashboard/trainer_dashboard.html"), name='trainer_dashboard'),
    path("upload_recipe/", TemplateView.as_view(template_name="trainer_dashboard/upload_recipe.html"), name='upload_recipe'),
    path("recipe_list/", TemplateView.as_view(template_name="trainer_dashboard/recipe_list.html"), name='recipe_list'),
    path("bank_statement/", TemplateView.as_view(template_name="trainer_dashboard/bank_statement.html"), name='bank_statement'),
    # Trainer Dashboard URLs End

    # Chef Dashboard URLs Start
    path("chef_dashboard/", TemplateView.as_view(template_name="chef_dashboard/chef_dashboard.html"), name='chef_dashboard'),
    path("food_info/", TemplateView.as_view(template_name="chef_dashboard/food_info.html"), name='food_info'),
    # Chef Dashboard URLs End

    # Admin Dashboard URLs Start
    path("admin_dashboard/", TemplateView.as_view(template_name="admin_dashboard/admin_dashboard.html"), name='admin_dashboard'),
    path("admin_statements/", TemplateView.as_view(template_name="admin_dashboard/admin_statements.html"), name='admin_statements'),
    path("admin_chef/", TemplateView.as_view(template_name="admin_dashboard/admin_chef.html"), name='admin_chef'),
    path("product_cost/", TemplateView.as_view(template_name="admin_dashboard/product_cost.html"), name='product_cost'),
    path("menu_owner_info/", TemplateView.as_view(template_name="admin_dashboard/admin_menu_owner_info.html"), name='menu_owner_info'),
    path("recipie_info/", TemplateView.as_view(template_name="admin_dashboard/admin_recipie_info.html"), name='recipie_info'),
    # Admin Dashboard URLs End

    # Client Dashboard URLs Start
    path("client_dashboard/", TemplateView.as_view(template_name="client_dashboard/client_dashboard.html"), name='client_dashboard'),
    path("all_foods/", TemplateView.as_view(template_name="client_dashboard/search_foods.html"), name='search_foods'),
    path("orders/", TemplateView.as_view(template_name="client_dashboard/food_orders.html"), name='food_orders'),
    # Client Dashboard URLs End

]
