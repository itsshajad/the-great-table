// variable
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const menu = document.querySelector('.humburger');
const sidebar = document.querySelector('.sidebar');
const rightSection = document.querySelector('.right-section');
const cartBtn = document.querySelector('.view-cart-btn');

// event listener
cartBtn.addEventListener('click', ViewCartHandler);

menu.addEventListener('click', MenuHandler);

rightSection.addEventListener('click', function (e) {
  const getCurrentTarget = e.target.classList;
  console.log(getCurrentTarget[0] == 'right-section');

  if (getCurrentTarget[0] == 'right-section') {
    rightSection.classList.remove('cart-open');
    overlay.classList.remove('active');
  }
});

// functions
function ViewCartHandler() {
  rightSection.classList.add('cart-open');
  overlay.classList.add('active');
  // if (overlay.classList.value.includes('active')) {
  //   body.style.overflow = 'hidden';
  // } else {
  //   body.style.overflow = 'auto';
  // }
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
  console.log(e.target.classList.value);
  if (e.target.classList.value.includes('active')) {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    body.style.overflow = 'auto';
  }
};
