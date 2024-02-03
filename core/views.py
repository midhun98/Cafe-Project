from django.contrib.auth.decorators import login_required
from django.http import JsonResponse


# Create your views here.
@login_required
def get_current_user(request):
    user = request.user
    full_name = user.first_name + ' ' + user.last_name
    return JsonResponse({'username': full_name})
