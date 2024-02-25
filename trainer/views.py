from rest_framework import status, viewsets
from trainer.models import (Food,
                            FoodImage,
                            PlatedDishImage)
from .serializers import FoodSerializer
from rest_framework.response import Response


# Create your views here.

class FoodViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.all().order_by('id')
    serializer_class = FoodSerializer

    def create(self, request, *args, **kwargs):
        print(request.data)

        recipe_name = request.data.get('recipe_name')
        calories = request.data.get('calories')
        protein = request.data.get('protein')
        fat = request.data.get('fat')
        carbs = request.data.get('carbs')
        print(request.user.id)
        food = Food.objects.create(
            user=request.user,
            recipe_name=recipe_name,
            calories=calories,
            protein=protein,
            fat=fat,
            carbs=carbs,
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
