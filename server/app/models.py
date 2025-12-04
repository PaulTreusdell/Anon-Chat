from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.

class UserManager(BaseUserManager):

  def create_user(self, name, password=None, **extra_fields):

    if not name:
      raise ValueError("User's name must exist")
    
    user = self.model(name=name, **extra_fields)
    user.set_password(password)
    user.save(using=self._db)

    return user

class User(AbstractUser):
  username=None
  name = models.CharField(max_length=200, unique=True)
  text_background = models.CharField(max_length=50, blank=True, default="white")
  text_color = models.CharField(max_length=50, blank=True, default="black")
  date_created = models.DateTimeField(auto_now_add=True)

  USERNAME_FIELD='name'
  REQUIRED_FIELDS=[]

  objects = UserManager()

  def __str__(self):
    return self.name
  

class Message(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  body = models.TextField()
  date_created = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.user.name
