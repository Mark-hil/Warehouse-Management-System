import { Item, Category, Warehouse, Distribution } from '../types/inventory.types';

interface InventoryStats {
  totalValue: number;
  lowStockCount: number;
  pendingTasks: number;
  completedTasks: number;
  urgentTasks: number;
}

const BASE_URL = '/api/inventory';

export const getItems = async (): Promise<Item[]> => {
  const response = await fetch(`${BASE_URL}/items`);
  if (!response.ok) throw new Error('Failed to fetch items');
  return response.json();
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

export const getWarehouses = async (): Promise<Warehouse[]> => {
  const response = await fetch(`${BASE_URL}/warehouses`);
  if (!response.ok) throw new Error('Failed to fetch warehouses');
  return response.json();
};

export const getInventoryStats = async (): Promise<InventoryStats> => {
  // TODO: Replace with actual API call
  return {
    totalValue: 1000000,
    lowStockCount: 5,
    pendingTasks: 12,
    completedTasks: 45,
    urgentTasks: 3
  };
};

export const createDistribution = async (distribution: Omit<Distribution, 'id'>): Promise<Distribution> => {
  const response = await fetch(`${BASE_URL}/distributions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(distribution),
  });
  if (!response.ok) throw new Error('Failed to create distribution');
  return response.json();
};