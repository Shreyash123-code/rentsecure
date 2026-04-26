import { Property } from '../types';

export const firebaseService = {
  // Properties - Fetching from Django Backend via Vite Proxy
  async getProperties() {
    try {
      const response = await fetch('/api/properties/');
      if (!response.ok) throw new Error('Failed to fetch properties');
      return await response.json();
    } catch (error) {
      console.error("Error fetching properties from Django:", error);
      return [];
    }
  },

  subscribeToProperties(callback: (properties: Property[]) => void) {
    // Instead of real-time web sockets (like Firestore onSnapshot), 
    // we fetch once, but you could implement polling or WebSockets here later.
    this.getProperties().then((properties) => {
      // Small formatting to handle differences in naming conventions if needed
      callback(properties);
    });
    
    // Return a dummy unsubscribe function
    return () => {};
  },

  // Leases
  async createLease(leaseData: any) {
    try {
      const response = await fetch('/api/leases/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leaseData),
      });
      if (!response.ok) throw new Error('Failed to create lease');
      const data = await response.json();
      return data.id;
    } catch (error) {
      console.error("Error creating lease via Django:", error);
    }
  },

  async getUserLeases(userId: string) {
    try {
      const response = await fetch(`/api/leases/?tenant=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch leases');
      return await response.json();
    } catch (error) {
      console.error("Error fetching leases:", error);
      return [];
    }
  }
};
