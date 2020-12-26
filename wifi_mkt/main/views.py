from django.shortcuts import *
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .unifi_client import UnifiClient
from .models import UserSessionModel, UserModel
import random
from datetime import datetime
import time
# Create your views here.


def user_portal(request):
    if request.method == 'GET':
        sta = request.GET.get('id')
        ap = request.GET.get('ap')
        ssid = request.GET.get('ssid')
        if sta and ap and ssid != '':
            data = {
                'sta': sta,
                'ap': ap,
                'ssid': ssid
            }
            return render(request, template_name='portal.html', context=data)


def user_register(request):
    if request.is_ajax():
        username = request.GET.get('register_username')
        phone_number = request.GET.get('register_phone_number')
        password = request.GET.get('register_password')
        data = {}
        query = UserModel.objects.filter(username=username).count()
        if query == 0:
            model = UserModel()
            model.username = username
            model.phone_number = phone_number
            model.password = password
            model.save()
            data = {
                'status' : 'OK'
            }
        else:
            data = {
                'status' : 'NOK'
            }
        return JsonResponse(data)


def user_login(request):
    if request.is_ajax():
        username = request.GET.get('login_username')
        password = request.GET.get('login_password')
        sta = request.GET.get('sta')
        ap = request.GET.get('ap')
        ssid = request.GET.get('ssid')
        model = UserSessionModel()
        date = datetime.now().strftime('%d/%m/%Y')
        _time = datetime.now().strftime('%H:%M:%S')
        data = {}
        ##check username##
        try:
            query = UserModel.objects.get(username=username)
            if query.password == password:
                ###
                unifi_client = UnifiClient()
                status = unifi_client.send_authorization(sta, ap, 60)
                ###
                model.mac_client = sta
                model.mac_ap = ap
                model.wifi_name = ssid
                model.time = _time
                model.date = date
                model.save()
                ###
                time.sleep(2)
                if status == 200:
                    data = {
                        'status': 'OK',
                        'message': 'Đăng nhập thành công'
                    }
                else:
                    data = {
                        'status': 'OK',
                        'message': 'Server lỗi'
                    }                   
            else:
                data = {
                    'status': 'NOK',
                    'message': 'Tên đăng nhập hoặc mật khẩu không đúng'
                }
            
        except:
            data = {
                'status': 'NOK',
                'message': 'Có lỗi đã xảy ra vui lòng thử lại'
                }

        return JsonResponse(data)
