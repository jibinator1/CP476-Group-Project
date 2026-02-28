/**
 * Load Supabase backend and expose INVENTORY_API for the inventory app.
 * Run this as type="module" before the main app script. Optional: load supabaseConfig.js before this.
 */
import * as svc from './backend/inventoryService.js';

window.INVENTORY_API = {
  loadProducts: () => svc.fetchInventory(),
  loadCategories: () => svc.fetchCategories(),
  addProduct: (p) =>
    svc.addProduct(
      p.item_name,
      p.item_description,
      p.item_count,
      p.price,
      p.low_stock_limit,
      p.category_id
    ),
  updateProduct: (id, payload) => svc.updateProduct(id, payload),
  deleteProduct: (id) => svc.deleteProduct(id),
};
