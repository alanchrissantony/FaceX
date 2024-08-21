from rest_framework import serializers
from user_resume.models import UserResume, UserExperience, UserEducation, UserSkill

class UserResumeSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserResume
        fields = '__all__'

class UserExperienceSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserExperience
        fields = '__all__'

class UserEducationSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserEducation
        fields = '__all__'

class UserSkillSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserSkill
        fields = '__all__'