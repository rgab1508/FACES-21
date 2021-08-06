from django.http.response import JsonResponse
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


from .models import User
from .serializers import UserSerializer

class RegisterView(APIView):
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
          token, created = Token.objects.get_or_create(user=user)
          return JsonResponse({
              'token': token.key,
              'roll_no': user.roll_no,
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
   
