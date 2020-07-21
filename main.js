function printReceipt(barcodes) {
    let barList = formatBars(barcodes);
    console.log(getReceipt(barList)); 
//     console.log(`
// ***<store earning no money>Receipt ***
// Name: Coca-Cola, Quantity: 5, Unit price: 3 (yuan), Subtotal: 15 (yuan)
// Name: Sprite, Quantity: 2, Unit price: 3 (yuan), Subtotal: 6 (yuan)
// Name: Battery, Quantity: 1, Unit price: 2 (yuan), Subtotal: 2 (yuan)
// ----------------------
// Total: 23 (yuan)
// **********************`)
}

function getReceipt(barList) {
    let receipt = 
        "\n***<store earning no money>Receipt ***\n";
        let total = 0;
    for (let i = 0; i < barList.length; i++) {
        const element = barList[i];
        let subTotal = getSubTotal(element);
        total += subTotal;
        receipt = receipt +
            "Name: " + element.bar.name +
            ", Quantity: " + element.acount +
            ", Unit price: " + element.bar.price +
            " (yuan), Subtotal: " + subTotal + " (yuan)\n";
    }
    receipt += "----------------------\n"
    receipt = receipt +
        "Total: " + total + " (yuan)\n";
    receipt += "**********************"
    return receipt;
}

function getSubTotal(element) {
    let acount = element.acount;
    let price = element.bar.price;
    return acount * price;
}

function formatBars(barcodes) {
    let allItems = loadAllItems();
    let barList = new Array();
    for (let i = 0; i < barcodes.length; i++) {
        const element = barcodes[i];
        let bar = getBar(element, allItems);
        if(bar != null) {
            let i = 0;
            for (i = 0; i < barList.length; i++) {
                const element = barList[i];
                if(element.bar == bar) {
                    element.acount++;
                    break;
                }
            }
            if (i == barList.length) {
                barList.push(
                    {bar:bar, acount: 1}
                );
            }
        }
    }
    return barList;
}

function getBar(barcode, allItems) {
    for (let i = 0; i < allItems.length; i++) {
        const element = allItems[i];
        if (barcode == element.barcode) {
            return element;
        }
    }
    return null;
}

function loadAllItems() {
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