from rest_framework import serializers

from .models import User, Team

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'roll_no', 'email', 'password', 'name', 'department', 'semester', 'money_owed', 'has_filled_profile', 'phone_no']
    extra_kwargs = {
      'password': {'write_only': True}
    }
  
  def create(self, validated_data):
    password = validated_data.pop('password', None)
    instance = self.Meta.model(**validated_data)
    if password is not None:
      instance.set_password(password)
    instance.save()
    return instance
  

class TeamSerializer(serializers.ModelSerializer):
  members = UserSerializer(read_only=True, many=True)
  class Meta:
    model = Team
    fields = ['id', 'team_code', 'team_name', 'members']