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
}

function productsSuccess() {
    var productData = JSON.parse(this.responseText);
        

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
        }
        
        domOutput(productData);
}




function domOutput(productData) {
    for (var i = 0; i < productData.products.length; i++) {
        var buildString = "<div class='product'";
        buildString += `<h2> Product: ${productData.products[i].name} </h2>`
        buildString += `<h5> Price: ${productData.products[i].price} </h5>`
        console.log(buildString);
        productContainer.innerHTML += buildString
    }

}




