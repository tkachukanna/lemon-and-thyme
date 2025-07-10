// form for book a table
const dateInput = document.getElementById("date");
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const yyyy = tomorrow.getFullYear();
const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
const dd = String(tomorrow.getDate()).padStart(2, '0');
const minDate = `${yyyy}-${mm}-${dd}`;
dateInput.min = minDate;

const bookingForm = document.getElementById("booking-form");
const message = document.getElementById("confirmation-message");

bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    message.style.display = "block";
    form.reset();
});

// render menu
const getMenu = async () => {
    const response = await fetch("data/menu.json");
    return await response.json();
}

const renderMenu = async (category) => {
    const menu = await getMenu();
    const menuList = document.getElementById("menu");
    menuList.innerHTML = "";
    menu[category].forEach(item => {
        const menuItem = document.createElement("li");
        const menuMainInfo = document.createElement("div");
        const itemTitle = document.createElement("h3");
        const itemPrice = document.createElement("p");
        const itemDescription = document.createElement("p");
        menuItem.classList.add("menu__item");
        menuMainInfo.classList.add("menu__main-info");
        itemTitle.classList.add("menu__title");
        itemPrice.classList.add("menu__price");
        itemDescription.classList.add("menu__description");
        itemTitle.innerText = item.name;
        itemPrice.innerText = item.price + " USD";
        itemDescription.innerText = item.ingredients.join(", ");
        menuMainInfo.append(itemTitle, itemPrice);
        menuItem.append(menuMainInfo, itemDescription);
        menuList.append(menuItem);
    });
}

let category = "soup";
renderMenu(category);

const categoryItems = document.querySelectorAll(".menu__nav-item");

categoryItems.forEach((item) => {
    item.addEventListener("click", async () => {
        categoryItems.forEach(item => item.classList.remove('active'));
        item.classList.add('active');
        category = item.id;
        await renderMenu(category);
    })
})

// modal for gallery section
const modal = document.getElementById("modal");

const galleryImages = document.querySelectorAll(".gallery__photo");
galleryImages.forEach((item, index) => {
    const modalImg = document.getElementById("modalImage");
    item.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = item.src;
    })

})

const modalClose = document.getElementById("modalClose");

modalClose.addEventListener("click", () => {
    modal.style.display = "none";
})

// specialties slider
const specialtiesSlider = new Swiper('.specialties__slider', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
});
