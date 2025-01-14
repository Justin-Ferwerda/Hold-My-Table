"""holdmytable URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import include
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from rest_framework import routers
from holdmytableapi.views import check_user, register_user, UserView, RestaurantView, StyleView, TableView, ReservationView, ReviewView, EmailView

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'users', UserView, 'user')
router.register(r'restaurants', RestaurantView, 'restaurant')
router.register(r'styles', StyleView, 'style')
router.register(r'tables', TableView, 'table')
router.register(r'reservations', ReservationView, 'reservation')
router.register(r'reviews', ReviewView, 'review')
router.register(r'emails', EmailView, 'email')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register', register_user),
    path('checkuser', check_user),
    path('', include(router.urls))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
