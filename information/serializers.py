from rest_framework import serializers
from .models import Information


class InformationSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Information
        fields = ['owner', 'start_date', 'end_date',
                  'created_on', 'updated_on', 'text', 'is_owner', 'id', ]
