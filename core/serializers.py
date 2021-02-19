from rest_framework import serializers
from .models import Record


class RecordSerializer(serializers.ModelSerializer):

    class Meta:
        model = Record
        fields = (
            "id",
            "datetime",
            "pee",
            "poo",
            "sleep",
            'accident',
            "awoke",
        )
