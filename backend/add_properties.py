import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from rentals.models import Property

nashik_props = [
    {
        'title': 'Gangapur Road Bungalow',
        'location': 'Gangapur Road, Nashik',
        'price': '35,000',
        'verified': True,
        'image': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
        'social_proof': '6 people viewed this today',
        'property_type': 'Mansion',
    },
    {
        'title': 'Trimbak Road Villa',
        'location': 'Trimbak Road, Nashik',
        'price': '28,000',
        'verified': True,
        'image': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
        'social_proof': '4 people viewed this today',
        'property_type': 'Villa',
    },
    {
        'title': 'Dwarka Modern Penthouse',
        'location': 'Dwarka, Nashik',
        'price': '22,000',
        'verified': True,
        'image': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
        'social_proof': '11 people viewed this today',
        'property_type': 'Penthouse',
    },
    {
        'title': 'College Road Loft',
        'location': 'College Road, Nashik',
        'price': '18,000',
        'verified': False,
        'image': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800',
        'social_proof': '3 people viewed this today',
        'property_type': 'Loft',
    },
    {
        'title': 'Sharanpur Heritage Home',
        'location': 'Sharanpur Road, Nashik',
        'price': '42,000',
        'verified': True,
        'image': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
        'social_proof': '8 people viewed this today',
        'property_type': 'Estate',
    },
    {
        'title': 'Panchvati River View',
        'location': 'Panchvati, Nashik',
        'price': '15,000',
        'verified': True,
        'image': 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800',
        'social_proof': '5 people viewed this today',
        'property_type': 'Villa',
    },
]

created = 0
for p in nashik_props:
    title = p['title']
    if not Property.objects.filter(title=title).exists():
        Property.objects.create(**p)
        created += 1
        print('  Added:', title)
    else:
        print('  Skipped (exists):', title)

total = Property.objects.count()
print('Done.', created, 'Nashik properties added. Total:', total)
