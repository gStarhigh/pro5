from django.contrib import admin
from .models import Comment


class CommentAdmin(admin.ModelAdmin):
    list_display = ('owner', 'created_at', 'post', 'content',)


admin.site.register(Comment, CommentAdmin)
