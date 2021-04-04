// variable
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const menu = document.querySelector('.humburger');
const sidebar = document.querySelector('.sidebar');
const rightSection = document.querySelector('.right-section');
const cartBtn = document.querySelector('.view-cart-btn');
const dropDownSelect = document.querySelector('.select-option');
const itemsContainer = document.querySelector('.items-container > div');

const catagoryButtons = document.querySelectorAll('.list-categories > p');

// event listener
cartBtn.addEventListener('click', ViewCartHandler);
menu.addEventListener('click', MenuHandler);
dropDownSelect.addEventListener('change', dropdownFilter);

// products events handler

// document.addEventListener('DOMContentLoaded', () => {

const ProductItems = async () => {
  // fetch JSON file
  try {
    const result = await fetch('items.json');
    const response = await result.json();
    globalData(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

ProductItems();

// filter category
catagoryButtons.forEach((button, index) => {
  button.onclick = function (e) {
    setItems(index);
    catagoryButtons.forEach((btn) => {
      btn.classList.remove('selected');
    });
    e.currentTarget.classList.add('selected');
  };
});
var dataArray = [];

var category = [];
var products = [];

const globalData = (response) => {
  dataArray = response;
  category = response.drinks;
  products = category[0].products;
  filteredItems(products);
};

const setItems = (target) => {
  if (target === 0) {
    filterCategory(dataArray.drinks);
    console.log(dataArray?.drinks);
  } else if (target === 1) {
    filterCategory(dataArray.foods);
  } else if (target === 2) {
    filterCategory(dataArray.dessert);
  }
};

// dropdown items category

const filterCategory = (category) => {
  // itemsArray = category;
  let option = '';
  category.forEach((data) => {
    option += `<option value=${data?.title}> ${data?.title} </option>`;
  });
  dropDownSelect.innerHTML = option;
};
// var setCategory = category;

function dropdownFilter(e) {
  console.log(e.currentTarget.value);
  // console.log(itemsArray);
  const tempArray = category.find(
    (c) => c.title == e.currentTarget.value.toLowerCase()
  );

  filteredItems(tempArray.products, e.currentTarget.value);
}

const filteredItems = (data, product) => {
  let items = '';

  data.forEach((val) => {
    const productId = val.id;

    items += `<div class="items">
                <div class="item-image">
                  <img
                    src=${val?.image}
                    alt="Beaux Freres"
                  />
                </div>
                <div>
                  <div>
                    <p>${val?.title}</p>
                    <p> $ ${val?.price}</p>
                  </div>
                  <div class="items-handler">
                    <button>-</button>
                    <button>0</button>
                    <button onclick="handler('increment', ${productId}, 'drinks')"> + </button>
                  </div>
                </div>
              </div>`;
  });
  itemsContainer.innerHTML = items;
};

const cartData = {
  drinks: [
    {
      id: 1,
      price: '15',
      title: 'link',
      quantity: 15,
    },
    {
      id: 2,
      price: '1',
      title: 'lsaink',
      quantity: '5',
    },
  ],
  foods: [
    {
      price: '15',
      title: 'link',
      quantity: '15',
    },
  ],
  dessert: [
    {
      price: '1',
      title: 'lsaink',
      quantity: '5',
    },
  ],
};

//

function handler(type, product, category) {
  let key = null;

  console.log(type, product, category);

  cartData[category].find((val, i) => {
    if (val.id === product) {
      key == i;

      return true;
    }
  });

  if (type == 'increment') {
    if (key >= 0) {
      cartData[category].quantity += 1;
    } else {
      cartData[category].push({
        price: product.price,
        title: product.title,
        quantity: (product.quantity += 1),
      });
    }
  } else if (type == 'decrement') {
    if (val.key === product.key) {
      key == i;

      return true;
    }
  }
}

// handler('');

const cartItems = () => {
  Object.keys(cartData).forEach((categ) => {
    let template = '';
    let total = '';
    cartData[categ].forEach((data) => {
      template += ` <div>
                    <p>${data?.title}</p>
                    <p>$ ${data?.price} x ${data?.quantity}</p>
                    <p>$ ${data?.quantity * data?.price}</p>
                  </div>`;

      total += parseInt(data?.quantity * data?.price);
    });

    document.querySelector(`#${categ}Products`).innerHTML = template;
    document.querySelector(`#${categ}Total`).innerHTML = '$ ' + total;
  });
};

cartItems();

// user interface events handler
rightSection.addEventListener('click', function (e) {
  const getCurrentTarget = e.target.classList;

  if (getCurrentTarget[0] == 'right-section') {
    rightSection.classList.remove('cart-open');
    overlay.classList.remove('active');
    body.style.overflow = 'auto';
  }
});

// functions
function ViewCartHandler() {
  rightSection.classList.add('cart-open');
  overlay.classList.add('active');
  if (overlay.classList.value.includes('active')) {
    body.style.overflow = 'hidden';
  }
}

// menu-sidebar handler
function MenuHandler() {
  sidebar.classList.add('active');
  overlay.classList.add('active');

  if (overlay.classList.value.includes('active')) {
    body.style.overflow = 'hidden';
  }
}

// sidebar menu close handler
document.onclick = function (e) {
  if (e.target.classList.value.includes('active')) {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    body.style.overflow = 'auto';
  }
};
