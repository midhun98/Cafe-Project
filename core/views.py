import json

from decouple import config
from django.contrib.auth import get_user_model, logout
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render

User = get_user_model()


# Create your views here.
@login_required
def get_current_user(request):
    user = request.user
    full_name = user.first_name + ' ' + user.last_name
    return JsonResponse({'username': full_name})


def login_view(request):
    cid = config('OTPLESS_CID')
    return render(request, 'signin.html', {'cid': cid})


def otplesslogin(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        phone_number = body.get('waNumber')
        phone_number = phone_number[2:]
        try:
            user = User.objects.get(phone_number=phone_number)
            login(request, user)
            return JsonResponse({'status': 'success'})
        except User.DoesNotExist:
            return JsonResponse({'status': 'failed', 'message': 'User not found'})
    return JsonResponse({'status': 'failed', 'message': 'Invalid request method'})


def otplesssignup(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        phone_number = body.get('waNumber')
        phone_number = phone_number[2:]
        user, created = User.objects.get_or_create(phone_number=phone_number)
        if created:
            # If user is created, return success response
            return JsonResponse({'status': 'success', 'message': 'Account created successfully'})
        else:
            # If user already exists, return failure response
            return JsonResponse({'status': 'failed', 'message': 'Phone number already registered'})
    else:
        return JsonResponse({'status': 'failed', 'message': 'Invalid request method'})


@login_required
def logout_api(request):
    logout(request)
    return render(request, 'signin.html')
