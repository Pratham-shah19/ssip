from rest_framework import serializers
from first_app.models import orders
class orderserializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = orders
        fields = ['userId','status','items','price','otp','button','paymentmode']
