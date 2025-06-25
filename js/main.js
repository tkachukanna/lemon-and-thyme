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
        category = item.id;
        await renderMenu(category);
    })
})


const modal = document.getElementById("modal");
// Get the image and insert it inside the modal - use its "alt" text as a caption
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
