function printReceipt(barcodes) {
    let productList = formatBarcodes(barcodes);
    console.log(getReceipt(productList)); 
//     console.log(`
// ***<store earning no money>Receipt ***
// Name: Coca-Cola, Quantity: 5, Unit price: 3 (yuan), Subtotal: 15 (yuan)
// Name: Sprite, Quantity: 2, Unit price: 3 (yuan), Subtotal: 6 (yuan)
// Name: Battery, Quantity: 1, Unit price: 2 (yuan), Subtotal: 2 (yuan)
// ----------------------
// Total: 23 (yuan)
// **********************`)
}

function getReceipt(productList) {
    let receipt = 
        "\n***<store earning no money>Receipt ***\n";
    for (let i = 0; i < productList.length; i++) {
        const product = productList[i];
        let subTotalPrice = getSubTotal(product);
        product.subTotalPrice = subTotalPrice;
        receipt = receipt +
            "Name: " + product.productItem.name +
            ", Quantity: " + product.amount +
            ", Unit price: " + product.productItem.price +
            " (yuan), Subtotal: " + product.subTotalPrice + " (yuan)\n";
    }
    receipt += "----------------------\n"
    let total = getTotalPrice(productList);
    receipt = receipt +
        "Total: " + total + " (yuan)\n";
    receipt += "**********************"
    return receipt;
}

function getTotalPrice(productList) {
    let totalPrice = 0;
    for (let i = 0; i < productList.length; i++) {
        const product = productList[i];
        totalPrice += product.subTotalPrice;
    }
    return totalPrice
}

function getSubTotal(product) {
    return product.amount * product.productItem.price;
}

function formatBarcodes(barcodes) {
    const allProducts = loadAllProducts();
    let productList = new Array();
    for (let i = 0; i < barcodes.length; i++) {
        const barcode = barcodes[i];
        let product = getProduct(barcode, allProducts);
        if(product != null) {
            let i = 0;
            for (i = 0; i < productList.length; i++) {
                const item = productList[i];
                if(item.productItem == product) {
                    item.amount++;
                    break;
                }
            }
            if (i == productList.length) {
                productList.push(
                    {productItem:product, amount: 1}
                );
            }
        }
    }
    return productList;
}

function getProduct(barcode, allProducts) {
    for (let i = 0; i < allProducts.length; i++) {
        const product = allProducts[i];
        if (barcode == product.barcode) {
            return product;
        }
    }
    return null;
}

function loadAllProducts() {
    return [
        {
           barcode: 'ITEM000000',
           name: 'Coca-Cola',
           price: 3
         },
         {
           barcode: 'ITEM000001',
           name: 'Sprite',
           price: 3
         },
         {
           barcode: 'ITEM000002',
           name: 'Apple',
           price: 5
         },
         {
           barcode: 'ITEM000003',
           name: 'Litchi',
           price: 15
         },
         {
           barcode: 'ITEM000004',
           name: 'Battery',
           price: 2
         },
         {
           barcode: 'ITEM000005',
           name: 'Instant Noodles',
           price: 4
         }
     ];
}

module.exports = {
    printReceipt
};