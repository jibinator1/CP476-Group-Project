require('dotenv').config();//require .env for the supabase stuff

//set all the requiresments
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app = express();
const port = 3000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

//initialize the supabase stuff from .env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

//API Routes

app.get('/api/inventory', async (req, res) => {//request, response like the slides
  const { data, error } = await supabase
    .from('products')//from the products table select the columns in select()
    .select('id, item_name, item_description, price, item_count, low_stock_limit, category_id');
  if (error) {//if error return error msg
    return res.status(500).json({ error: error.message });
  }
  res.json(data);//make it in json format
});

app.get('/api/categories', async (req, res) => {
  //same thing as above but for categories
  const { data, error } = await supabase.from('categories').select('id, category_name, description');
  if (error) {//if error return error msg
    return res.status(500).json({ error: error.message });
  }
  res.json(data || []);
});

app.post('/api/products', async (req, res) => {
  //post is to add data
  const { item_name, item_description, item_count, price, low_stock_limit, category_id } = req.body;//req.body is the data sent from the frontend

  // Strict Server-Side Validation (Criterion 4)
  if (!item_name || typeof item_name !== 'string' || item_name.trim() === '') {
    return res.status(400).json({ error: 'Validation Error: Valid product name is required.' });
  }
  if (price !== undefined && (typeof price !== 'number' || price < 0)) {
    return res.status(400).json({ error: 'Validation Error: Price must be a positive number.' });
  }
  if (item_count !== undefined && (typeof item_count !== 'number' || item_count < 0)) {
    return res.status(400).json({ error: 'Validation Error: Quantity must be a positive number.' });
  }

  const { data, error } = await supabase
    .from('products')
    .insert([{ //add the items to the products tabnle with all the stuff the user added
      item_name, 
      item_description: item_description || null, 
      item_count: item_count ?? 0, 
      price: price ?? 0, 
      low_stock_limit: low_stock_limit ?? 5, 
      category_id: category_id || null 
    }])
    .select();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data[0] || data);
});

app.put('/api/products/:id', async (req, res) => {
  //update the products
  const { item_name, item_description, item_count, price, low_stock_limit, category_id } = req.body;//like the post products except you jsut update
  //string validation
  if (item_name !== undefined && (typeof item_name !== 'string' || item_name.trim() === '')) {
    return res.status(400).json({ error: 'Validation Error: Valid product name is required.' });
  }
  if (price !== undefined && (typeof price !== 'number' || price < 0)) {
    return res.status(400).json({ error: 'Validation Error: Price must be a positive number.' });
  }
  if (item_count !== undefined && (typeof item_count !== 'number' || item_count < 0)) {
    return res.status(400).json({ error: 'Validation Error: Quantity must be a positive number.' });
  }

  const { data, error } = await supabase
    .from('products')
    .update({ 
      item_name, 
      item_description: item_description ?? null, 
      price: price ?? 0, 
      item_count: item_count ?? 0, 
      low_stock_limit: low_stock_limit ?? 5, 
      category_id: category_id ?? null 
    })
    .eq('id', req.params.id)
    .select();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data[0] || data);
});

app.delete('/api/products/:id', async (req, res) => {//same as all the others but delete
  const { error } = await supabase.from('products').delete().eq('id', req.params.id);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json({ success: true });
});

app.get('/api/suppliers/:productId', async (req, res) => {//get suppliers data
  const { data, error } = await supabase
    .from('competitors')
    .select('competitor_name, competitor_price, recorded_at')
    .eq('product_id', req.params.productId)
    .order('competitor_price', { ascending: true });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json((data || []).map(cat => ({ name: cat.competitor_name, unit_price: cat.competitor_price })));
});

app.get('/api/sales/:productId', async (req, res) => {//get sales data
  const { data, error } = await supabase
    .from('sales_log')
    .select('quantity_sold, sold_at')
    .eq('product_id', req.params.productId)
    .order('sold_at', { ascending: true });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data || []);
});

app.post('/api/sales', async (req, res) => {//post sales data
  const { productId, quantitySold, salePrice } = req.body;
  const { error } = await supabase
    .from('sales_log')
    .insert({ product_id: productId, quantity_sold: quantitySold, sale_price: salePrice });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json({ success: true });
});

app.post('/api/auth/signin', async (req, res) => {//sign in
  const { email, password } = req.body;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();
  if (error || !data) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  res.json({ data });
});

app.post('/api/auth/signup', async (req, res) => {//sign up
  const { email, password, name } = req.body;
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password, user_name: name, user_role: 'staff' }])
    .select()
    .single();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json({ data });
});

app.listen(port, () => {//start the server
  console.log(`backend: http://localhost:${port}`);
  console.log(`frontend: http://localhost:${port}/pages/log-in.html`);
});
