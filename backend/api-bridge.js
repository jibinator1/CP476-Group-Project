const BASE_URL = 'http://localhost:3000/api';
//reminder for later: POST add to supabase, GET grab from supabase, PUT update supabase, DELETE delete from supabase
window.INVENTORY_API = {
  loadProducts: async () => {//load products
    const res = await fetch(`${BASE_URL}/inventory`);
    return await res.json();
  },
  loadCategories: async () => {//load categories
    const res = await fetch(`${BASE_URL}/categories`);
    return await res.json();
  },
  addProduct: async (p) => {//add products
    const res = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p)
    });
    return await res.json();
  },
  updateProduct: async (id, payload) => {//update products
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },
  deleteProduct: async (id) => {//delete products
    const res = await fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE' });
    const data = await res.json();
    return data && data.success;
  },
  
  fetchSupplierPrices: async (productId) => {//get supplier prices
    const res = await fetch(`${BASE_URL}/suppliers/${productId}`);
    return await res.json();
  },
  fetchSalesHistory: async (productId) => {//get sales history
    const res = await fetch(`${BASE_URL}/sales/${productId}`);
    return await res.json();
  },
  logSale: async (productId, qty, price) => {//log sales
    await fetch(`${BASE_URL}/sales`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantitySold: qty, salePrice: price })
    });
  },
  
  // --- Auth ---
  signIn: async (email, password) => {//sign in
    const res = await fetch(`${BASE_URL}/auth/signin`, {//send data to backend to check if sign in is correct
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error };
    }
    return { data: data.data };//
  },
  signUp: async (email, password, name) => {//sign up
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error };
    }
    return { data: data.data };
  }
};

// Export signInUser and signUpUser as named exports so modules can still statically import them.
export const signInUser = window.INVENTORY_API.signIn;
export const signUpUser = window.INVENTORY_API.signUp;
