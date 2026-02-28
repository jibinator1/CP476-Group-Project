import { supabase } from './supabaseClient.js';

//get the inventory to view
export const fetchInventory = async () => {
  const response = await supabase.from('products').select('id, item_name, item_description, item_count, low_stock_limit');//go to the products table and get these columns

  if (response.error) {//check if there was an error
    console.log("Error: "+response.error.message);
    return null;
  }

  //otherwise sreturn the data
  return response.data;
};

//add a product to the table
export const addProduct = async (name, desc, count,price, low_stock_limit, category_id) => {

    //create a product data to add to the product table
    const productData = { item_name: name,item_description: desc , item_count: count, price: price,low_stock_limit: low_stock_limit,category_id: category_id};

    const response = await supabase.from('products').insert([productData]);

    if (response.error) {//check if errpor
        console.log("Error: "+response.error.message);
        return null;
    }
    //otherwise sreturn the data
    return response.data;
}

//delete an item from product
export const deleteProduct = async (productId) => {
    const response = await supabase.from('products').delete().eq('id', productId);//delete whatever id was added as the param

    if (response.error) {//check if error
        console.log("Error: "+response.error.message);
    }
};

//update the stock count for a product
export const updateProductCount = async (productId, newCount) => {
    const response = await supabase.from('products').update({ item_count: newCount }).eq('id', productId);//for the product table update the itemcount for the given id

    if (response.error) {
        console.log("Error: "+response.error.message);//check if error
        return null;
    }
    //otherwise sreturn the data
    return response.data;
};

//for the search bar at the top
export const searchProducts = async (searchTerm) => {
    //if whatever the search term is included in an item name, get the product
    const response = await supabase.from('products').select('*').ilike('item_name', '%' + searchTerm + '%');

    if (response.error) {
        console.log("Error: "+response.error.message);//check if error
        return null;
    }
    //otherwise sreturn the data
    return response.data;
};

//add a category
export const addCategory = async (name, desc) => {
    const response = await supabase.from('categories').insert([{ category_name: name, description: desc}]);//add a category name to 

    if (response.error) {
        console.log("Error: "+response.error.message);//check if error
        return null;
    }
    //otherwise sreturn the data
    return response.data;
};

//add a user to system
export const addUser = async (userName, userRole) => {//role is manager or stocker
    const response = await supabase.from('users') .insert([{user_name: userName, user_role: userRole}]);//add a user with their name and role to users table

    if (response.error) {
        console.log("Error: "+response.error.message);//check if error
        return null;
    }
    //otherwise sreturn the data
    return response.data;
};