const pathPage = window.location.pathname;
const menuItems = document.querySelectorAll("header .links a");

for (item of menuItems) {
  if (pathPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}
