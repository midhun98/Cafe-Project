from django.contrib import admin
from .models import Food, FoodImage, PlatedDishImage
from django.urls import reverse
from django.utils.safestring import mark_safe


class FoodImageInline(admin.TabularInline):
    model = FoodImage
    extra = 1  # Number of extra forms to display


class PlatedDishImageInline(admin.TabularInline):
    model = PlatedDishImage
    extra = 1  # Number of extra forms to display


class FoodAdmin(admin.ModelAdmin):
    list_display = ('recipe_name', 'user_link')
    inlines = [FoodImageInline, PlatedDishImageInline]

    def user_link(self, obj):
        url = reverse("admin:core_customuser_change", args=[obj.user.id])
        return mark_safe('<a href="{}">{}</a>'.format(url, obj.user))

    user_link.short_description = 'User'


admin.site.register(Food, FoodAdmin)
