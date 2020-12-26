from django.contrib import admin
from .models import UserSessionModel, UserModel


admin.site.register(UserSessionModel)
admin.site.register(UserModel)