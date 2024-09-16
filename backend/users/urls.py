from django.urls import path
from .views import SignUpView, LoginView, PasswordResetRequestView, PasswordResetView,GetUsernameView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset'),
    path('reset-password/<str:token>/', PasswordResetView.as_view(), name='reset_password'),
    path('get-username/', GetUsernameView.as_view(), name='get-username'),
]
