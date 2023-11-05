from rest_framework import serializers
from .models import Information


class InformationSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Information
        fields = ['user', 'start_date', 'end_date',
                  'created_on', 'updated_on', 'text']
