from django.urls import path
from user_resume import views

urlpatterns = [
    path('', views.Resume.as_view(), name='resume'),
    path('<uuid:id>/', views.Detail.as_view(), name='detail'),
    path('experience/', views.Experience.as_view(), name='experience'),
    path('education/', views.Education.as_view(), name='education'),
    path('skill/', views.Skill.as_view(), name='skill')
]
