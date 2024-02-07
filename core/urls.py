from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path("", TemplateView.as_view(template_name="homepage.html"), name='index'),
    path("signin/", TemplateView.as_view(template_name="signin.html"), name='signin-page'),
    path("signup/", TemplateView.as_view(template_name="signup.html"), name='signup-page'),
    path('api/get_current_user/', views.get_current_user, name='logout-api'),
    path('login_view/', views.login_view, name='login_view'),
    path('api/otplesslogin/', views.otplesslogin, name='otplesslogin'),

]
