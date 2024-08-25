import jwt
from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.conf import settings
from .serializers import (
    UserSerializer, LoginSerializer,
    PasswordResetRequestSerializer, PasswordResetSerializer
)
from .models import User
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import check_password

class SignUpView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            email = serializer.validated_data['email']

            # Check if the username or email already exists
            if User.objects.filter(username=username).exists():
                return Response({"username": "This username is already taken."}, status=status.HTTP_400_BAD_REQUEST)
            if User.objects.filter(email=email).exists():
                return Response({"email": "This email is already registered."}, status=status.HTTP_400_BAD_REQUEST)

            # Create the user
            user = User.objects.create_user(
                username=username,
                email=email,
                password=serializer.validated_data['password']
            )
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

            if check_password(password, user.password):
                # Manually create JWT tokens
                access_token_expiry = datetime.utcnow() + timedelta(minutes=5)
                refresh_token_expiry = datetime.utcnow() + timedelta(days=7)

                access_token = jwt.encode({
                    'user_id': str(user.id),
                    'exp': access_token_expiry
                }, settings.SECRET_KEY, algorithm='HS256')

                refresh_token = jwt.encode({
                    'user_id': str(user.id),
                    'exp': refresh_token_expiry
                }, settings.SECRET_KEY, algorithm='HS256')

                return Response({
                    "refresh": refresh_token,
                    "access": access_token,
                }, status=status.HTTP_200_OK)

            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetRequestView(APIView):
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            token = jwt.encode({
                'user_id': str(user.id),
                'exp': datetime.utcnow() + timedelta(hours=1)
            }, settings.SECRET_KEY, algorithm='HS256')

            reset_link = f"http://localhost:8000/api/users/reset-password/{token}"
            send_mail(
                'Reset your password',
                f'Click the link to reset your password: {reset_link}',
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=False,
            )
            return Response({"message": "Password reset link sent"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetView(APIView):
    def post(self, request, token):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                user_id = payload['user_id']
                user = User.objects.get(id=user_id)
            except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, User.DoesNotExist):
                return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
