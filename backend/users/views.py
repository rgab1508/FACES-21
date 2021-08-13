import json
import os
from re import U
import uuid
from django.conf import settings
from django.http.response import JsonResponse
import requests
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.authentication import TokenAuthentication


from .models import User
from .serializers import UserSerializer

import csv


class OTPVerify(APIView):
  permission_classes = [IsAuthenticated]
  def post(self, request):
    secret = request.data["secret"]

    if secret != settings.OTP_VERIFY_SECRET:
      return JsonResponse({"detail": "Something went Wrong", "success": False}, status=400)
    
    phone_no = request.data["phone_no"]
    user = request.user
    user.phone_no = phone_no
    user.is_phone_no_verified = True

    try:
      user.save()
      return JsonResponse({"detail": "Phone Number Added Succesfully","success": True}, status=200)
    except:
      return JsonResponse({"detail": "Something went Wrong", "success": False}, status=400)


class UserDetail(APIView):
  permission_classes = [IsAuthenticated]
  def get(self, request):
    serializer = UserSerializer(request.user)
    res = {
      "user": serializer.data
    }
    return JsonResponse(res, status=200)



class UserUpdate(APIView):
  permission_classes = [IsAuthenticated]

  def post(self, request):
    user = request.user
    DEPARTMENTS = ("COMP", "IT", "EXTC", "MECH", "ELEC", "OTHER")
    
    name = request.data['name']
    department = request.data['department']
    semester = request.data['semester']

    if name == "" or department not in DEPARTMENTS or semester < 0 or semester > 8:
      return JsonResponse({"detail": "Invalid Fields", "success": False}, status=400)

    user.name = name
    user.department = department
    user.semester = semester
    
    if user.is_phone_no_verified:
      user.has_filled_profile = True
    
    try:
      user.save()
      return JsonResponse({"detail": "Profile Updated!", "success": True}, status=200)
    except:
      return JsonResponse({"detail": "Something went Wrong", "success": False}, status=400)


class RegisterView(APIView):
  permission_classes = [IsAdminUser]
  def post(self, request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data, status=201)
    else:
      return JsonResponse(serializer.errors, status=400)

class LoginView(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        
        if serializer.is_valid():
          user = serializer.validated_data['user']
          user_serializer = UserSerializer(user)
          token, created = Token.objects.get_or_create(user=user)
          return JsonResponse({
              'token': token.key,
              'user': user_serializer.data,
              'success': True,
          }, status=200)
        else:
          return JsonResponse({"success": False, "errors": serializer.errors}, status=400)

class LogoutView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def post(self,request):
    request.user.auth_token.delete()
    return JsonResponse({"success": True},status=200)


class UserExistsView(APIView):
  def post(self, request):
    roll_no = request.data['roll_no']

    try:
      c = User.objects.filter(roll_no=roll_no).count()
      
      if c < 1:
        return JsonResponse({"exists": False, "success": True}, status=200)
      else:
        return JsonResponse({"exists": True, "success": True}, status=200)
    except:
      return JsonResponse({"detail": "Something went Wrong", "success": False}, status=400)


# CART REALTED

class UserCartUpdate(APIView):
  permission_classes = [IsAuthenticated]

  def post(self, request):
    cart = request.data['cart']
    user = request.user

    try:
      j = json.loads(cart)
      user.cart = cart
      user.save()
      return JsonResponse({"detail": "Cart Updated Successfully!", "success": True}, status=200)
    except ValueError:
      return JsonResponse({"detail": "Something went Wrong", "success": False}, status=400)


class MakeUsersView(APIView):
  """
    This route populates the DB with users
  """
  permission_classes = [IsAdminUser]

  def post(self, request):
    url = 'https://drive.google.com/u/0/uc?id=1aYMnC2Md6TPDlfx4W3eV4oNMpx2mjOr0&export=download'


    with requests.Session() as s:
      download = s.get(url)

      decoded_content = download.content.decode('utf-8')

      cr = csv.reader(decoded_content.splitlines(), delimiter=',')
      my_list = list(cr)

      for row in my_list:
        [name, roll_no, email] = row
        roll_no = int(roll_no)

        user = User()
        user.roll_no = roll_no
        user.email = email
        text_password = str(uuid.uuid4())[-8:]
        user.set_password(text_password)

        try:
          user.save()
          # send email
        except:
          print(roll_no, email, text_password)
          
    return JsonResponse({"success": True}, status=200)