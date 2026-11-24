export type ServiceType = 'ride' | 'snack' | 'rent';

export interface MarketplaceService {
  id: string;
  type: ServiceType;
  name: string;
  description: string;
  category: string;
  price: number;
  priceUnit: string;
  rating: number;
  eta: string;
  image: string;
  badge?: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  type: ServiceType;
  amount: number;
  quantity: number;
  pickup: string;
  destination: string;
  fulfillment: 'ride' | 'delivery' | 'pickup' | 'rental';
  status: 'Requested';
  createdAt: string;
}
