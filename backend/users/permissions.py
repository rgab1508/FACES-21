from rest_framework.permissions import BasePermission

class IsPhoneNoVerified(BasePermission):
  message = 'Phone Number Not Verified'
  def has_permission(self, request, view):
    return request.user.is_phone_no_verified