from django.db import models
from django.contrib.auth.models import User

TICKET_STATUS = ((0, "Awaiting review"), (1, "Reviewed"), (2, "Closed"))


class Contact(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    updated_on = models.DateField(auto_now=True)
    created_on = models.DateField(auto_now_add=True)
    subject = models.TextField()
    message = models.TextField()
    ticket_status = models.IntegerField(choices=TICKET_STATUS, default=0)

    class Meta:
        ordering = ['-updated_on']

    def __str__(self):
        return f'{self.id}'
