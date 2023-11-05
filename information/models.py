from django.db import models
from django.contrib.auth.models import User


class Information(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    updated_on = models.DateField(auto_now=True)
    created_on = models.DateField(auto_now_add=True)
    text = models.TextField()

    class Meta:
        ordering = ['-end_date']

    def __str__(self):
        return f'{self.id} {self.title}'
