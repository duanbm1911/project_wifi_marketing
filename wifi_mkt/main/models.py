from django.db import models

# Create your models here.


class UserSessionModel(models.Model):
    mac_client = models.CharField(max_length=200)
    mac_ap = models.CharField(max_length=200)
    wifi_name = models.CharField(max_length=200)
    time = models.CharField(max_length=200)
    date = models.CharField(max_length=200)

    def __str__(self):
        return self.mac_client


class UserModel(models.Model):
    username = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    
    def __str__(self):
        return self.username