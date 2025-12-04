from django.urls import path
from .views import UserView, GetAuthUserView, MessagesView, AddMessagesView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
  path('register/', UserView.as_view()),
  path('messages/', MessagesView.as_view()),
  path('messages/add/', AddMessagesView.as_view()),
  path('auth/', GetAuthUserView.as_view()),
  path('auth/refresh/', TokenRefreshView.as_view()),
]