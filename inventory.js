/**
 * Inventory Management System — Front-end (mock data)
 * Field names match DB columns for easy API swap in Milestone 03.
 */

(function () {
  'use strict';

  // ----- Categories (matches categories table) -----
  const CATEGORIES = [
    { id: 1, category_name: 'Electronics', description: 'Devices and gadgets' },
    { id: 2, category_name: 'Furniture', description: 'Office and home furniture' },
    { id: 3, category_name: 'Accessories', description: 'Peripherals and accessories' },
    { id: 4, category_name: 'Stationery', description: 'Office supplies' },
    { id: 5, category_name: 'Consumables', description: 'Consumable goods' }
  ];

  // ----- Mock products (matches products table columns) -----
  let products = [
    { id: 1, item_name: 'Monitor 34"', item_description: '34-inch ultrawide display, 144Hz', price: 799.00, item_count: 12, low_stock_limit: 5, category_id: 1 },
    { id: 2, item_name: 'Mechanical Keyboard', item_description: 'RGB, Cherry MX Brown', price: 149.99, item_count: 3, low_stock_limit: 5, category_id: 3 },
    { id: 3, item_name: 'Ergonomic Desk Chair', item_description: 'Adjustable lumbar, mesh back', price: 549.00, item_count: 0, low_stock_limit: 3, category_id: 2 },
    { id: 4, item_name: 'Wireless Headphones ANC', item_description: 'Active noise cancelling, 30h battery', price: 299.00, item_count: 27, low_stock_limit: 10, category_id: 1 },
    { id: 5, item_name: 'Standing Desk', item_description: 'Electric height adjustable', price: 1099.00, item_count: 8, low_stock_limit: 4, category_id: 2 },
    { id: 6, item_name: 'USB-C Hub', item_description: '7-in-1 with HDMI and SD', price: 49.99, item_count: 4, low_stock_limit: 8, category_id: 3 },
    { id: 7, item_name: 'Desk Lamp LED', item_description: 'Dimmable, USB charging', price: 39.00, item_count: 0, low_stock_limit: 5, category_id: 2 },
    { id: 8, item_name: 'Notebook Set (5pk)', item_description: 'A5 ruled, 200 pages', price: 12.99, item_count: 45, low_stock_limit: 20, category_id: 4 },
    { id: 9, item_name: 'Whiteboard Markers (8)', item_description: 'Chisel tip, assorted', price: 14.50, item_count: 6, low_stock_limit: 10, category_id: 4 },
    { id: 10, item_name: 'Stapler Heavy Duty', item_description: 'Metal base, 100 sheet capacity', price: 24.00, item_count: 2, low_stock_limit: 5, category_id: 4 }
  ];

  let nextId = 11;

  // ----- State -----
  const state = {
    activeScreen: 'dashboard',
    selectedProductId: null,
    modal: null,
    search: '',
    categoryFilter: '',
    statusFilter: ''
  };

  function getCategoryName(categoryId) {
    const c = CATEGORIES.find(function (cat) { return cat.id === categoryId; });
    return c ? c.category_name : 'Uncategorized';
  }

  function getStockStatus(itemCount, lowStockLimit) {
    if (itemCount === 0) return 'out';
    if (itemCount < lowStockLimit) return 'low';
    return 'ok';
  }

  function getFilteredProducts() {
    const search = state.search.trim().toLowerCase();
    const cat = state.categoryFilter;
    const status = state.statusFilter;
    return products.filter(function (p) {
      const nameMatch = !search || p.item_name.toLowerCase().includes(search);
      const catMatch = !cat || String(p.category_id) === cat;
      const st = getStockStatus(p.item_count, p.low_stock_limit);
      const statusMatch = !status || st === status;
      return nameMatch && catMatch && statusMatch;
    });
  }

  function getStats() {
    let inStock = 0, lowStock = 0, outOfStock = 0;
    products.forEach(function (p) {
      const st = getStockStatus(p.item_count, p.low_stock_limit);
      if (st === 'ok') inStock++;
      else if (st === 'low') lowStock++;
      else outOfStock++;
    });
    return { inStock, lowStock, outOfStock, total: products.length };
  }

  function formatPrice(n) {
    return '$' + Number(n).toFixed(2);
  }

  let $sidebarDashboard, $mainDashboard, $mainDetail, $detailBack, $detailContent;
  let $statIn, $statLow, $statOut, $statTotal;
  let $search, $categoryFilter, $statusFilter, $btnAdd;
  let $tableBody, $detailTitle, $detailMeta, $detailDesc, $detailQty, $detailValue, $detailProgressWrap, $detailProgressFill, $detailActions;
  let $modalOverlay, $modal, $modalTitle, $modalBody, $modalFooter;
  let $formItemName, $formItemDesc, $formPrice, $formItemCount, $formLowStockLimit, $formCategoryId;
  let $confirmMessage, $confirmCancel, $confirmOk;

  function getEl(id) { return document.getElementById(id); }

  function renderStockBadge(itemCount, lowStockLimit) {
    var st = getStockStatus(itemCount, lowStockLimit);
    var label = st === 'ok' ? 'In Stock' : st === 'low' ? 'Low Stock' : 'Out of Stock';
    return '<span class="stock-badge stock-badge--' + st + '">' + label + '</span>';
  }

  function openDetail(product) {
    state.activeScreen = 'detail';
    state.selectedProductId = product.id;
    $sidebarDashboard.classList.remove('active');
    $mainDashboard.classList.remove('active');
    $mainDetail.classList.add('active');
    renderDetail(product);
  }

  function closeDetail() {
    state.activeScreen = 'dashboard';
    state.selectedProductId = null;
    $sidebarDashboard.classList.add('active');
    $mainDashboard.classList.add('active');
    $mainDetail.classList.remove('active');
  }

  function renderDetail(product) {
    if (!product) return;
    var st = getStockStatus(product.item_count, product.low_stock_limit);
    var value = product.price * product.item_count;
    var maxQty = Math.max(product.item_count, product.low_stock_limit, 1);
    var pct = Math.min(100, (product.item_count / maxQty) * 100);

    $detailTitle.textContent = product.item_name;
    $detailMeta.textContent = 'ID ' + product.id + ' · ' + getCategoryName(product.category_id);
    $detailDesc.textContent = product.item_description || 'No description.';
    $detailQty.textContent = product.item_count;
    $detailQty.className = 'detail__value stock-badge stock-badge--' + st;
    $detailValue.textContent = formatPrice(value);

    $detailProgressWrap.style.display = 'block';
    $detailProgressFill.style.width = pct + '%';
    $detailProgressFill.className = 'detail__progress-fill detail__progress-fill--' + st;

    $detailActions.innerHTML =
      '<button type="button" class="btn btn--primary" data-action="edit">Edit Product</button>' +
      '<button type="button" class="btn btn--danger" data-action="delete">Delete</button>';
    $detailActions.querySelector('[data-action="edit"]').onclick = function () { openEditModal(product); };
    $detailActions.querySelector('[data-action="delete"]').onclick = function () { openDeleteModal(product); };
  }

  function renderTable() {
    var filtered = getFilteredProducts();
    if (filtered.length === 0) {
      $tableBody.innerHTML = '<tr><td colspan="7" class="empty-state"><p>No products match your filters.</p></td></tr>';
      return;
    }
    $tableBody.innerHTML = filtered.map(function (p) {
      var badge = renderStockBadge(p.item_count, p.low_stock_limit);
      return '<tr data-id="' + p.id + '">' +
        '<td class="col-id">' + p.id + '</td>' +
        '<td>' + escapeHtml(p.item_name) + '</td>' +
        '<td>' + escapeHtml(getCategoryName(p.category_id)) + '</td>' +
        '<td class="col-qty">' + p.item_count + '</td>' +
        '<td class="col-price">' + formatPrice(p.price) + '</td>' +
        '<td class="col-status">' + badge + '</td>' +
        '<td class="col-actions actions-cell">' +
        '<button type="button" class="btn btn--ghost" data-action="view" title="View">View</button>' +
        '<button type="button" class="btn btn--ghost" data-action="edit" title="Edit">Edit</button>' +
        '<button type="button" class="btn btn--danger" data-action="delete" title="Delete">Delete</button>' +
        '</td></tr>';
    }).join('');

    $tableBody.querySelectorAll('tr[data-id]').forEach(function (row) {
      var id = parseInt(row.getAttribute('data-id'), 10);
      var product = products.find(function (p) { return p.id === id; });
      if (!product) return;
      row.addEventListener('click', function (e) {
        if (e.target.closest('.actions-cell')) return;
        openDetail(product);
      });
      row.querySelector('[data-action="view"]').onclick = function (e) { e.stopPropagation(); openDetail(product); };
      row.querySelector('[data-action="edit"]').onclick = function (e) { e.stopPropagation(); openEditModal(product); };
      row.querySelector('[data-action="delete"]').onclick = function (e) { e.stopPropagation(); openDeleteModal(product); };
    });
  }

  function escapeHtml(s) {
    if (!s) return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function renderStats() {
    var s = getStats();
    $statIn.textContent = s.inStock;
    $statLow.textContent = s.lowStock;
    $statOut.textContent = s.outOfStock;
    $statTotal.textContent = s.total;
  }

  function openAddModal() {
    state.modal = 'add';
    $modalTitle.textContent = 'Add Product';
    $formItemName.value = '';
    $formItemDesc.value = '';
    $formPrice.value = '';
    $formItemCount.value = '0';
    $formLowStockLimit.value = '5';
    $formCategoryId.value = '';
    $modalBody.querySelector('.form-fields').style.display = 'block';
    $modalBody.querySelector('.confirm-content').style.display = 'none';
    $modalFooter.style.display = 'flex';
    getEl('form-save').style.display = '';
    getEl('form-cancel').style.display = '';
    getEl('confirm-cancel').style.display = 'none';
    getEl('confirm-ok').style.display = 'none';
    $modalOverlay.classList.add('active');
  }

  function openEditModal(product) {
    state.modal = 'edit';
    state.selectedProductId = product.id;
    $modalTitle.textContent = 'Edit Product';
    $formItemName.value = product.item_name;
    $formItemDesc.value = product.item_description || '';
    $formPrice.value = product.price;
    $formItemCount.value = product.item_count;
    $formLowStockLimit.value = product.low_stock_limit;
    $formCategoryId.value = product.category_id || '';
    $modalBody.querySelector('.form-fields').style.display = 'block';
    $modalBody.querySelector('.confirm-content').style.display = 'none';
    $modalFooter.style.display = 'flex';
    getEl('form-save').style.display = '';
    getEl('form-cancel').style.display = '';
    getEl('confirm-cancel').style.display = 'none';
    getEl('confirm-ok').style.display = 'none';
    $modalOverlay.classList.add('active');
  }

  function openDeleteModal(product) {
    state.modal = 'delete';
    state.selectedProductId = product.id;
    $modalTitle.textContent = 'Delete Product';
    $modalBody.querySelector('.form-fields').style.display = 'none';
    $modalBody.querySelector('.confirm-content').style.display = 'block';
    $confirmMessage.innerHTML = 'Are you sure you want to delete <strong>' + escapeHtml(product.item_name) + '</strong>? This cannot be undone.';
    $modalFooter.style.display = 'flex';
    getEl('form-save').style.display = 'none';
    getEl('form-cancel').style.display = 'none';
    getEl('confirm-cancel').style.display = '';
    getEl('confirm-ok').style.display = '';
    $modalOverlay.classList.add('active');
  }

  function closeModal() {
    state.modal = null;
    state.selectedProductId = null;
    $modalOverlay.classList.remove('active');
  }

  function saveProduct() {
    var name = $formItemName.value.trim();
    if (!name) {
      $formItemName.focus();
      return;
    }
    var price = parseFloat($formPrice.value, 10);
    var itemCount = parseInt($formItemCount.value, 10);
    var lowStockLimit = parseInt($formLowStockLimit.value, 10);
    if (isNaN(price)) price = 0;
    if (isNaN(itemCount)) itemCount = 0;
    if (isNaN(lowStockLimit)) lowStockLimit = 5;
    var categoryId = $formCategoryId.value ? parseInt($formCategoryId.value, 10) : null;

    if (state.modal === 'add') {
      var newProduct = {
        id: nextId++,
        item_name: name,
        item_description: $formItemDesc.value.trim() || null,
        price: price,
        item_count: itemCount,
        low_stock_limit: lowStockLimit,
        category_id: categoryId
      };
      products = [newProduct].concat(products);
      renderTable();
      renderStats();
      closeModal();
      openDetail(newProduct);
    } else if (state.modal === 'edit') {
      var idx = products.findIndex(function (p) { return p.id === state.selectedProductId; });
      if (idx === -1) { closeModal(); return; }
      products[idx] = {
        id: products[idx].id,
        item_name: name,
        item_description: $formItemDesc.value.trim() || null,
        price: price,
        item_count: itemCount,
        low_stock_limit: lowStockLimit,
        category_id: categoryId
      };
      renderTable();
      renderStats();
      var current = products.find(function (p) { return p.id === state.selectedProductId; });
      if (state.activeScreen === 'detail' && current) renderDetail(current);
      closeModal();
    }
  }

  function confirmDelete() {
    var id = state.selectedProductId;
    products = products.filter(function (p) { return p.id !== id; });
    renderTable();
    renderStats();
    if (state.activeScreen === 'detail') closeDetail();
    closeModal();
  }

  function refreshFromApi(cb) {
    if (!window.INVENTORY_API) { if (cb) cb(); return; }
    Promise.all([window.INVENTORY_API.loadProducts(), window.INVENTORY_API.loadCategories()]).then(function (res) {
      var prods = res[0], cats = res[1];
      if (prods && Array.isArray(prods)) products = prods;
      if (cats && Array.isArray(cats)) {
        CATEGORIES.length = 0;
        CATEGORIES.push.apply(CATEGORIES, cats);
      }
      nextId = products.length ? Math.max.apply(null, products.map(function (p) { return p.id; })) + 1 : 1;
      renderTable();
      renderStats();
      if (cb) cb();
    }).catch(function (err) { console.error(err); if (cb) cb(); });
  }

  function saveProductAsync() {
    var name = $formItemName.value.trim();
    if (!name) { $formItemName.focus(); return; }
    var price = parseFloat($formPrice.value, 10);
    var itemCount = parseInt($formItemCount.value, 10);
    var lowStockLimit = parseInt($formLowStockLimit.value, 10);
    if (isNaN(price)) price = 0;
    if (isNaN(itemCount)) itemCount = 0;
    if (isNaN(lowStockLimit)) lowStockLimit = 5;
    var categoryId = $formCategoryId.value ? parseInt($formCategoryId.value, 10) : null;
    var payload = {
      item_name: name,
      item_description: $formItemDesc.value.trim() || null,
      price: price,
      item_count: itemCount,
      low_stock_limit: lowStockLimit,
      category_id: categoryId
    };
    if (state.modal === 'add') {
      window.INVENTORY_API.addProduct(payload).then(function (added) {
        if (added) {
          closeModal();
          refreshFromApi(function () { if (added.id) openDetail(products.find(function (p) { return p.id === added.id; }) || added); });
        }
      });
    } else if (state.modal === 'edit') {
      window.INVENTORY_API.updateProduct(state.selectedProductId, payload).then(function (updated) {
        if (updated) {
          closeModal();
          refreshFromApi(function () {
            if (state.activeScreen === 'detail' && state.selectedProductId === updated.id) renderDetail(updated);
          });
        }
      });
    }
  }

  function confirmDeleteAsync() {
    var id = state.selectedProductId;
    window.INVENTORY_API.deleteProduct(id).then(function (ok) {
      if (ok) {
        if (state.activeScreen === 'detail') closeDetail();
        closeModal();
        state.selectedProductId = null;
        refreshFromApi();
      }
    });
  }

  function populateCategorySelect(selectEl) {
    CATEGORIES.forEach(function (c) {
      var opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.category_name;
      selectEl.appendChild(opt);
    });
  }

  function init() {
    $sidebarDashboard = getEl('nav-dashboard');
    $mainDashboard = getEl('view-dashboard');
    $mainDetail = getEl('view-detail');
    $detailBack = getEl('detail-back');
    $detailContent = getEl('detail-content');
    $statIn = getEl('stat-in');
    $statLow = getEl('stat-low');
    $statOut = getEl('stat-out');
    $statTotal = getEl('stat-total');
    $search = getEl('search');
    $categoryFilter = getEl('category-filter');
    $statusFilter = getEl('status-filter');
    $btnAdd = getEl('btn-add');
    $tableBody = getEl('table-body');
    $detailTitle = getEl('detail-title');
    $detailMeta = getEl('detail-meta');
    $detailDesc = getEl('detail-desc');
    $detailQty = getEl('detail-qty');
    $detailValue = getEl('detail-value');
    $detailProgressWrap = getEl('detail-progress-wrap');
    $detailProgressFill = getEl('detail-progress-fill');
    $detailActions = getEl('detail-actions');
    $modalOverlay = getEl('modal-overlay');
    $modal = getEl('modal');
    $modalTitle = getEl('modal-title');
    $modalBody = getEl('modal-body');
    $modalFooter = getEl('modal-footer');
    $formItemName = getEl('form-item-name');
    $formItemDesc = getEl('form-item-desc');
    $formPrice = getEl('form-price');
    $formItemCount = getEl('form-item-count');
    $formLowStockLimit = getEl('form-low-stock-limit');
    $formCategoryId = getEl('form-category-id');
    $confirmMessage = getEl('confirm-message');
    $confirmCancel = getEl('confirm-cancel');
    $confirmOk = getEl('confirm-ok');

    populateCategorySelect($categoryFilter);
    var formCat = getEl('form-category-id');
    var optBlank = document.createElement('option');
    optBlank.value = '';
    optBlank.textContent = '— Select category —';
    formCat.appendChild(optBlank);
    CATEGORIES.forEach(function (c) {
      var opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.category_name;
      formCat.appendChild(opt);
    });

    $detailBack.onclick = closeDetail;
    $btnAdd.onclick = openAddModal;
    $search.oninput = function () { state.search = $search.value; renderTable(); };
    $categoryFilter.onchange = function () { state.categoryFilter = $categoryFilter.value; renderTable(); };
    $statusFilter.onchange = function () { state.statusFilter = $statusFilter.value; renderTable(); };

    getEl('form-save').onclick = function () {
      if (window.INVENTORY_API) saveProductAsync();
      else saveProduct();
    };
    getEl('form-cancel').onclick = closeModal;
    $confirmCancel.onclick = closeModal;
    $confirmOk.onclick = function () {
      if (window.INVENTORY_API) confirmDeleteAsync();
      else confirmDelete();
    };
    getEl('modal-close').onclick = closeModal;
    $modalOverlay.onclick = function (e) { if (e.target === $modalOverlay) closeModal(); };

    renderStats();
    renderTable();
  }

  function runInit() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', onReady);
    } else {
      onReady();
    }
  }

  function onReady() {
    if (window.INVENTORY_API) {
      Promise.all([window.INVENTORY_API.loadProducts(), window.INVENTORY_API.loadCategories()]).then(function (res) {
        var prods = res[0], cats = res[1];
        if (prods && Array.isArray(prods)) products = prods;
        if (cats && Array.isArray(cats)) {
          CATEGORIES.length = 0;
          CATEGORIES.push.apply(CATEGORIES, cats);
        }
        nextId = products.length ? Math.max.apply(null, products.map(function (p) { return p.id; })) + 1 : 1;
        init();
      }).catch(function (err) {
        console.error('Failed to load from API, using mock data:', err);
        init();
      });
    } else {
      init();
    }
  }

  runInit();
})();
