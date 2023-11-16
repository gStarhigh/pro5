from django.contrib import admin
from .models import Post


class PostAdmin(admin.ModelAdmin):
    list_display = ('owner', 'created_at', 'title',
                    'description', 'content', 'image',)


admin.site.register(Post, PostAdmin)
