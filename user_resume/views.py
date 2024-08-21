from rest_framework.views import APIView
from rest_framework.response import Response
from user_resume.models import UserResume, UserExperience, UserEducation, UserSkill
from user_resume.serializers import UserResumeSerializer, UserExperienceSerializer, UserEducationSerializer, UserSkillSerializer
from rest_framework import status


# Create your views here.

class Resume(APIView):

    def get(self, request):

        email = request.GET.get('email')
        resumes = UserResume.objects.filter(userEmail=email)
        serializer = UserResumeSerializer(resumes, many=True)
      
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        data = request.data
        serializer = UserResumeSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request):
        data=request.data
        try:
            resume = UserResume.objects.get(resumeId=data['_id'])
        except UserResume.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserResumeSerializer(resume, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def delete(self, request):
        resumeId = request.GET.get('id')
        if resumeId:
            try:
                resume = UserResume.objects.get(resumeId=resumeId)
                resume.delete()
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_200_OK) 


class Experience(APIView):

    def post(self, request):
        data=request.data
        try:
            resumeInstance = UserResume.objects.get(resumeId=data['resumeId'])
            del data['resumeId']
        except UserResume.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        UserExperience.objects.all().delete()
        for key, experience in data.items():
            experience['resumeId']=resumeInstance.id
            serializer=UserExperienceSerializer(data=experience)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_200_OK)
    

class Education(APIView):

    def post(self, request):
        data=request.data
        try:
            resumeInstance = UserResume.objects.get(resumeId=data['resumeId'])
            del data['resumeId']
        except UserResume.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        UserEducation.objects.all().delete()
        for key, education in data.items():
            education['resumeId'] = resumeInstance.id
            serializer=UserEducationSerializer(data=education)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_200_OK)
    

class Skill(APIView):
    def post(self, request):
        data=request.data
        try:
            resumeInstance = UserResume.objects.get(resumeId=data['resumeId'])
            del data['resumeId']
        except UserResume.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        UserSkill.objects.all().delete()
        for key, skill in data.items():
            skill['resumeId'] = resumeInstance.id
            serializer=UserSkillSerializer(data=skill)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_200_OK)
    

class Detail(APIView):

    def get(self, request, id):
        resume = UserResume.objects.filter(resumeId=id).first()

        if resume:
            serializer=UserResumeSerializer(resume)

            experience = UserExperience.objects.filter(resumeId=resume.id)
            education = UserEducation.objects.filter(resumeId=resume.id)
            skill = UserSkill.objects.filter(resumeId=resume.id)

            user_experience = UserExperienceSerializer(experience, many=True)
            user_education = UserEducationSerializer(education, many=True)
            user_skill = UserSkillSerializer(skill, many=True)

            response_data = serializer.data
            response_data['experience'] = user_experience.data
            response_data['education'] = user_education.data
            response_data['skills'] = user_skill.data

            return Response(response_data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

        
