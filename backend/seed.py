import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from rentals.models import Property

def seed():
    if Property.objects.count() == 0:
        Property.objects.create(
            title='The Gilded Manor',
            location='Upper East Side, NY',
            price='4,500',
            verified=True,
            image='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
            social_proof='8 people viewed this today',
            property_type='Penthouse'
        )
        Property.objects.create(
            title='Heritage Estate',
            location='Knightsbridge, London',
            price='3,800',
            verified=True,
            image='https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
            social_proof='3 people viewed this today',
            property_type='Mansion'
        )
        Property.objects.create(
            title='Modern Regency',
            location='Bel Air, CA',
            price='6,200',
            verified=False,
            image='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
            social_proof='12 people viewed this today',
            property_type='Villa'
        )
        print("Database seeded with sample properties!")
    else:
        print("Database already contains properties, skipping seed.")

if __name__ == '__main__':
    seed()
