from django.db import models

# Create your models here.
class orders(models.Model):
    userId=models.BigAutoField(primary_key=True)
    status=models.CharField(max_length=50)
    items = models.CharField(max_length=50)
    price=models.IntegerField(blank=True)
    otp= models.IntegerField()
    button=models.BooleanField()
    paymentmode= models.CharField(max_length=50)
    def __str__(self):
        return self.items
