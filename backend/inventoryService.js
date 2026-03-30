import { supabase } from './supabaseClient.js';

if (!supabase) {
  console.warn('inventoryService: Supabase client not configured. Use mock data or set __SUPABASE_URL__ and __SUPABASE_ANON_KEY__.');
}

/**
 * Fetch all products (id, item_name, item_description, price, item_count, low_stock_limit, category_id).
 */
export async function fetchInventory() {
  if (!supabase) {
    return null;
  }
  const { data, error } = await supabase
    .from('products')
    .select('id, item_name, item_description, price, item_count, low_stock_limit, category_id');
    
  if (error) {
    console.error('fetchInventory:', error.message);
    return null;
  }
  return data;
}

/**
 * Add a product. Params match DB columns.
 */
export async function addProduct(name, desc, count, price, low_stock_limit, category_id) {
  if (!supabase) {
    return null;
  }
  const productData = { 
    item_name: name, 
    item_description: desc || null, 
    item_count: count ?? 0, 
    price: price ?? 0, 
    low_stock_limit: low_stock_limit ?? 5, 
    category_id: category_id || null 
  };
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select();

  if (error) {
    console.error('addProduct:', error.message);
    return null;
  }
  return data && data[0] ? data[0] : data;
}

/**
 * Update full product (all editable fields).
 */
export async function updateProduct(productId, payload) {
  if (!supabase) {
    return null;
  }
  const updateData = { 
    item_name: payload.item_name, 
    item_description: payload.item_description ?? null, 
    price: payload.price ?? 0, 
    item_count: payload.item_count ?? 0, 
    low_stock_limit: payload.low_stock_limit ?? 5, 
    category_id: payload.category_id ?? null 
  };
  const { data, error } = await supabase
    .from('products')
    .update(updateData)
    .eq('id', productId)
    .select();

  if (error) {
    console.error('updateProduct:', error.message);
    return null;
  }
  return data && data[0] ? data[0] : data;
}

/**
 * Delete a product by id.
 */
export async function deleteProduct(productId) {
  if (!supabase) {
    return null;
  }
  const { error } = await supabase.from('products').delete().eq('id', productId);
  if (error) {
    console.error('deleteProduct:', error.message);
    return false;
  }
  return true;
}

/**
 * Update only item_count for a product.
 */
export async function updateProductCount(productId, newCount) {
  if (!supabase) {
    return null;
  }
  const { data, error } = await supabase
    .from('products')
    .update({ item_count: newCount })
    .eq('id', productId)
    .select();

  if (error) {
    console.error('updateProductCount:', error.message);
    return null;
  }
  return data && data[0] ? data[0] : data;
}

/**
 * Search products by item_name (ilike).
 */
export async function searchProducts(searchTerm) {
  if (!supabase) {
    return null;
  }
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('item_name', '%' + searchTerm + '%');

  if (error) {
    console.error('searchProducts:', error.message);
    return null;
  }
  return data;
}

/**
 * Fetch all categories (id, category_name, description).
 */
export async function fetchCategories() {
  if (!supabase) {
    return null;
  }
  const { data, error } = await supabase.from('categories').select('id, category_name, description');
  if (error) {
    console.error('fetchCategories:', error.message);
    return null;
  }
  return data || [];
}

export async function addCategory(name, desc) {
  if (!supabase) {
    return null;
  }
  const { data, error } = await supabase
    .from('categories')
    .insert([{ category_name: name, description: desc ?? null }])
    .select();

  if (error) {
    console.error('addCategory:', error.message);
    return null;
  }
  return data;
}

export async function addUser(userName, userRole) {
  if (!supabase) {
    return null;
  }
  const { data, error } = await supabase
    .from('users')
    .insert([{ user_name: userName, user_role: userRole }])
    .select();

  if (error) {
    console.error('addUser:', error.message);
    return null;
  }
  return data;
}

// --- Competitor price comparison ---

export async function fetchSupplierPrices(productId) {
  if (!supabase) { return []; }
  const { data, error } = await supabase
    .from('competitors')
    .select('competitor_name, competitor_price, recorded_at')
    .eq('product_id', productId)
    .order('competitor_price', { ascending: true });

  if (error) {
    console.error(error.message);
    return [];
  }

  // Map to the format the PDF generator expects
  return (data || []).map(function (cat) {
    return { name: cat.competitor_name, unit_price: cat.competitor_price };
  });
}

export async function upsertSupplierPrice(productId, supplierId, unitPrice) {
  const { error } = await supabase
    .from('supplier_prices')
    .upsert({ 
      product_id: productId, 
      supplier_id: supplierId, 
      unit_price: unitPrice, 
      updated_at: new Date() 
    });

  if (error) {
    console.error(error.message);
  }
}

// --- Sales chart ---

export async function fetchSalesHistory(productId) {
  const { data, error } = await supabase
    .from('sales_log')
    .select('quantity_sold, sold_at')
    .eq('product_id', productId)
    .order('sold_at', { ascending: true });

  if (error) {
    console.error(error.message);
    return [];
  }
  return data;
}

// Call this whenever a sale/stock reduction happens
export async function logSale(productId, quantitySold, salePrice) {
  const { error } = await supabase
    .from('sales_log')
    .insert({ 
      product_id: productId, 
      quantity_sold: quantitySold, 
      sale_price: salePrice 
    });

  if (error) {
    console.error(error.message);
  }
}

export async function signInUser(email, password) {
  if (!supabase) {
    return { error: 'Supabase not configured' };
  }
  
  //from users table get the emails and password from supa base
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (error || !data) {
    return { error: 'Invalid email or password' };
  }
  return { data };
}

export async function signUpUser(email, password, name) {
  if (!supabase) {
    return { error: 'Supabase not configured' };
  }
  //insert into users table if signup is selectde
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password, user_name: name, user_role: 'staff' }])
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }
  return { data };
}
