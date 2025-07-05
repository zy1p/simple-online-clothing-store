import { z } from 'zod/v4';

export const productSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  name: z.string().min(1, 'Product name is required'),
  price: z.number().positive('Price must be a positive number'),
  quantity: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative integer'),
});

export const saleSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  products: z.array(productSchema),
});
