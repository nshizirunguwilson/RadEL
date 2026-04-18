import type { OrderAddress } from "./order";

export interface MockUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  addresses: OrderAddress[];
  defaultAddressId?: string;
  createdAt: string;
}
