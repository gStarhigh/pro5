from django.db import models
from django.core.mail import send_mail
import os
from django.core.mail.message import BadHeaderError


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

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.send_email()

    def send_email(self):
        receiver_email = os.environ.get('EMAIL_HOST_USER')
        send_mail(
            self.subject,
            self.message,
            self.email,
            [receiver_email],
            fail_silently=False,
        )
