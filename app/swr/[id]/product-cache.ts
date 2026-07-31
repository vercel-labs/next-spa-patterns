export const productCache = {
  key: (id: number) => `/api/products/${id}`,
  tag: (id: number) => `product:${id}`,
};
