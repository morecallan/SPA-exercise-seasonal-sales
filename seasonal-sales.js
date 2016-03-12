var productContainer = document.getElementById("productContainer");
var seasonalDiscount = document.getElementById("seasonalDiscount");



// PRODUCT XHR
//Step 1: Set up http req for products
var myProductsReq = new XMLHttpRequest;

//Step 2: Go get it
myProductsReq.open("GET", "products.json");
myProductsReq.send();

//Step 3: Event Listener
myProductsReq.addEventListener("load", productsSuccess);
myProductsReq.addEventListener("failed", failedExecution);

//Step 4: Translate into JS
function failedExecution() {
    alert("Error loading page. Please refresh.")
};

//Step 5: Create callback for once the product page loads
function productsSuccess() {
    var productData = JSON.parse(this.responseText);
    loadNextJson2(productData)
}

//Once first JSON loads, move to load second JSON       
function loadNextJson2(productData) {
        // DEPARTMENT XHR
        //Step 1: Set up http req for products
        var myDepartmentReq = new XMLHttpRequest;

        //Step 2: Go get it
        myDepartmentReq.open("GET", "departments.json");
        myDepartmentReq.send();

        //Step 3: Event Listener
        myDepartmentReq.addEventListener("load", departmentSuccess);
        myDepartmentReq.addEventListener("failed", failedExecution);


        //Step 4: Translate into JS
        function departmentSuccess() {
            var departmentData = JSON.parse(this.responseText);
            domOutput(productData, departmentData);
        }
}

function domOutput(productData, departmentData) {
    for (var i = 0; i < productData.products.length; i++) {
        var buildString = "<div class='product'";
        buildString += `<h2> Product: ${productData.products[i].name} </h2>`
        buildString += `<h5> Price: <p class="price">${productData.products[i].price}<p> </h5>`
        var categoryId = productData.products[i].category_id - 1;
        buildString += `<h6>${departmentData.categories[categoryId].season_discount}</h6>`
        buildString += `<h5 class="discountedPrice"> </h5>`
        productContainer.innerHTML += buildString
    }

}


seasonalDiscount.addEventListener("change", whichSeasonIsItDamnit);

function whichSeasonIsItDamnit() {
    clearDiscounts();
    var catWinter = [];
    var catAutumn = [];
    var catSpring = [];

// Puts each item in the product container into an array
    var priceHolder = productContainer.getElementsByClassName("product");
    for (var i = 0; i < priceHolder.length; i++) {
        if (priceHolder[i].innerHTML.indexOf("Winter") !== -1) {
            catWinter.push(priceHolder[i]);
        } else if (priceHolder[i].innerHTML.indexOf("Autumn") !== -1) {
            catAutumn.push(priceHolder[i]);
        } else if (priceHolder[i].innerHTML.indexOf("Spring") !== -1) {
            catWinter.push(priceHolder[i]);
        }
    }

    if (seasonalDiscount.value === "winter") {
        var winterDiscountPrice = catWinter.forEach(updatePriceWinter) 
    } else if (seasonalDiscount.value === "autumn") {
        var autumnDiscountPrice = catAutumn.forEach(updatePriceAutumn) 
    } else if (seasonalDiscount.value === "spring") {
        var springDiscountPrice = catSpring.forEach(updatePriceSpring) 
    }

    function updatePriceWinter(winterProduct) {
        var price = parseFloat(winterProduct.getElementsByClassName("price")[0].innerHTML);
        var newPrice = (price * .9).toFixed(2);
        var discountArea = winterProduct.getElementsByClassName("discountedPrice")[0]
        discountArea.innerHTML = newPrice;
    }

    function updatePriceAutumn(autumnProduct) {
        var price = parseFloat(autumnProduct.getElementsByClassName("price")[0].innerHTML);
        var newPrice = (price * .75).toFixed(2);
        var discountArea = autumnProduct.getElementsByClassName("discountedPrice")[0]
        discountArea.innerHTML = newPrice;
    }

    function updatePriceSpring(springProduct) {
        var price = parseFloat(springProduct.getElementsByClassName("price")[0].innerHTML);
        var newPrice = (price * .85).toFixed(2);
        var discountArea = springProduct.getElementsByClassName("discountedPrice")[0]
        discountArea.innerHTML = newPrice;
    }
    

}

function clearDiscounts() {
    var discounts = document.getElementsByClassName("discountedPrice")
    for (var i = 0; i < discounts.length; i++ ) {
        discounts[i].innerHTML = "";
    }
}


          