from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

class UserResume(models.Model):
    resumeId = models.UUIDField()
    title = models.CharField(max_length=50)
    userEmail = models.EmailField()
    userName = models.CharField(max_length=50)
    firstName = models.CharField(max_length=50, null=True, blank=True)
    lastName = models.CharField(max_length=50, null=True, blank=True)
    jobTitle = models.CharField(max_length=50, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    phone = PhoneNumberField(null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    summary = models.TextField(blank=True, null=True)
    themeColor = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self) -> str:
        return self.title


class UserExperience(models.Model):
    resumeId = models.ForeignKey(UserResume, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    companyName = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    startDate = models.DateField()
    endDate = models.DateField()
    workSummary = models.TextField(blank=True, null=True)

    def __str__(self) -> str:
        return self.title


class UserEducation(models.Model):
    resumeId = models.ForeignKey(UserResume, on_delete=models.CASCADE)
    universityName = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    major = models.CharField(max_length=100)
    startDate = models.DateField()
    endDate = models.DateField()
    description = models.TextField(blank=True, null=True)

    def __str__(self) -> str:
        return self.university
    
class UserSkill(models.Model):
    resumeId = models.ForeignKey(UserResume, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    rating = models.IntegerField()

    def __str__(self) -> str:
        return self.name

