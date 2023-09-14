from django.db import models

# Create your models here.
class Notes(models.Model):
    class Meta:
        db_table = 'notes'
    
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title