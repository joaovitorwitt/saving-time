from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Notes(models.Model):
    class Meta:
        db_table = 'notes'
    
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.title