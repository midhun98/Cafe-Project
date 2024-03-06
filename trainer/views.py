from rest_framework import status, viewsets
from trainer.models import (Food,
                            FoodImage,
                            PlatedDishImage)
from .serializers import FoodSerializer
from rest_framework.response import Response
from core.views import CustomPageNumberPagination
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated


# Create your views here.

class FoodViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.all().order_by('id')
    serializer_class = FoodSerializer
    pagination_class = CustomPageNumberPagination
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        print(request.data)

        recipe_name = request.data.get('recipe_name')
        calories = request.data.get('calories')
        protein = request.data.get('protein')
        fat = request.data.get('fat')
        carbs = request.data.get('carbs')
        food_url = request.data.get('food_url')
        food = Food.objects.create(
            user=request.user,
            recipe_name=recipe_name,
            calories=calories,
            protein=protein,
            fat=fat,
            carbs=carbs,
            food_url=food_url,
            # Add other fields here
        )

        # Create FoodImage objects
        food_images_data = request.data.getlist('food_images')
        for image_data in food_images_data:
            FoodImage.objects.create(food=food, image=image_data)

        # Create PlatedDishImage objects
        plated_dish_images_data = request.data.getlist('plate_dish_images')
        for image_data in plated_dish_images_data:
            PlatedDishImage.objects.create(food=food, image=image_data)

        return Response({'success': True}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def my_foods(self, request):
        # need to add the access policy in future prevent unauthorized access
        user_id = request.user.id
        foods = Food.objects.filter(user=user_id)
        page = self.paginate_queryset(foods)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)
