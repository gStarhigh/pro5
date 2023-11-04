from django.db import models
from django.core.mail import send_mail


class Contact(models.Model):
    """
    Contact model that lets the user contact the page owner on
    the frontend through their email.
    """
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=100)
    message = models.TextField()

    def __str__(self):
        return self.name + " - " + self.subject
