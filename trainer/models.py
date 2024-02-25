from django.db import models

from core.models import CustomUser
from trainer import utils


# Create your models here.
class Food(models.Model):
    recipe_name = models.CharField(max_length=100, blank=False, null=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='foods')
    food_category = models.IntegerField(choices=utils.food_category, default=utils.VEG)
    meal_category = models.IntegerField(choices=utils.meal_category, default=utils.ALL)
    calories = models.IntegerField(blank=False, null=False)
    protein = models.IntegerField(blank=False, null=False)
    fat = models.IntegerField(blank=False, null=False)
    carbs = models.IntegerField(blank=False, null=False)
    cooking_instruction = models.TextField(blank=False, null=False)
    food_url = models.URLField(max_length=500, blank=False, null=False)
    food_suggestions = models.TextField(blank=True)

    # Quantity fields for food categories
    egg_quantity = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    milk_products_quantity = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    fats_oil_quantity = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    spices_herbs_quantity = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    vegetables_fruits_quantity = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    meat_seafood_quantity = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    dry_fruits_quantity = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    cereals_pulses_quantity = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    sugar_products_quantity = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    other_products_quantity = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.recipe_name


class FoodImage(models.Model):
    food = models.ForeignKey(Food, on_delete=models.CASCADE, related_name='food_images')
    image = models.ImageField(upload_to='food_images/')

    def __str__(self):
        return f"Food Image for {self.food.pk}"


class PlatedDishImage(models.Model):
    food = models.ForeignKey(Food, on_delete=models.CASCADE, related_name='plated_dish_images')
    image = models.ImageField(upload_to='plated_dish_images/')

    def __str__(self):
        return f"Plated Dish Image for {self.food.pk}"
