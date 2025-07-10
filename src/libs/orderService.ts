import { apiService } from "./apiService";

export async function createOrder(params: {
  items: { productId: number; quantity: number }[];
  totalAmount: number;
  appliedPoints: number;
  deliveryFee: number;
}) {
  return apiService.post("/order", params, { withCredentials: true });
}

export async function orderHistory(startDate: number, endDate: number) {
  return apiService.get<{ orders: any[] }>(
    `/order/history?start=${startDate}&end=${endDate}`,
    { withCredentials: true }
  );
}