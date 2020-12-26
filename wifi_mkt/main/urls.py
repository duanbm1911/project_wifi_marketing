from django.urls import path
from . import views


urlpatterns = [
    path('s/default/', views.user_portal),
    path('register/', views.user_register),
    path('login/', views.user_login)
] 