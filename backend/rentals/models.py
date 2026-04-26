from django.db import models

class Property(models.Model):
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    price = models.CharField(max_length=100)
    verified = models.BooleanField(default=False)
    image = models.URLField(max_length=500)
    social_proof = models.CharField(max_length=255, blank=True, null=True)
    property_type = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Lease(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    tenant = models.CharField(max_length=255)
    landlord = models.CharField(max_length=255)
    rent = models.CharField(max_length=100)
    blockchain_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    status = models.CharField(max_length=50, default='ACTIVE')
    last_paid = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.property.title} - {self.tenant}"
