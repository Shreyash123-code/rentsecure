from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Property, Lease
from .serializers import PropertySerializer, LeaseSerializer
from datetime import datetime

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all().order_by('-created_at')
    serializer_class = PropertySerializer

class LeaseViewSet(viewsets.ModelViewSet):
    queryset = Lease.objects.all().order_by('-created_at')
    serializer_class = LeaseSerializer

    @action(detail=False, methods=['POST'])
    def web3_events(self, request):
        event_type = request.data.get('eventType')
        lease_id = request.data.get('leaseId')
        
        try:
            lease = Lease.objects.get(blockchain_id=lease_id)
            if event_type == 'RentPaid':
                lease.last_paid = datetime.now()
                lease.save()
            elif event_type == 'DepositRefunded':
                lease.status = 'COMPLETED'
                lease.save()
            return Response({'success': True})
        except Lease.DoesNotExist:
            return Response({'error': 'Lease not found'}, status=404)
