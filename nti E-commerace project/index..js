let apillink = "https://fakestoreapi.com/products"
arrData = []
arrPrice = []
const myCat = 1;
// getting the products from the api 
const mydata = fetch(apillink).then(res => {
    let mydata = res.json()
    return mydata
}) // saving the products inside mydata []
    .then(mydata => {
        console.log(mydata)
        //iterate on the datat
        mydata.map((e, i) => {

            const div = document.createElement("div") //div that holds evrey product with class Card
            div.className = "Card";
            div.id = i; //giving each card unique id equal to its index in response array (mydata)

            // creating card elements for each prop inside product object{ title, image, descreption} to show it in the html
            const conttitle = document.createElement("p")
            const contImge = document.createElement("img")
            const contpara = document.createElement("p")
            const contpara2 = document.createElement("p")
            const contpara3 = document.createElement("p")
            const contpara4 = document.createElement("p")
            const contBtn = document.createElement("button") //addtocart
            const contBtnVie = document.createElement("button") //view product

            //bootstrap coloring
            contBtnVie.className = "btn btn-dark"
            contBtnVie.textContent = "View Product" //the text insede the button 

            contBtnVie.addEventListener("click", () => { // making sweat alert for evrey product holding this button
                Swal.fire({
                    icon: "info",
                    imageUrl: e.image,
                    imageHeight: 100,
                    imageAlt: "A tall image",
                    title: e.title,
                    text: e.description,
                    footer: e.price + "$"
                });
            })

            //bootstrap coloring for the secound button
            contBtn.className = "btn btn-dark"
            contBtn.textContent = "Add To Cart"

            contBtn.addEventListener("click", () => {
                //  for elements already in the cart 
                if (arrData.includes(i)) // i reffering to the index of each element from map methode
                    {
                    arrData.push(i) // arr that holding indexes of the elements which in the carts
                    arrPrice.push(mydata[arrData.slice(-1)[0]].price)
                    const timespur = arrData.filter((e,) => e == i).length;
                    document.getElementById(`cart${i}`).textContent = "  Q" + timespur
                }

                else {
                    arrData.push(i) // starts here when u click add to cart for the first time
                    console.log(arrData)
                    
                    // creating elements to show what is inside the cart
                    const conttitle = document.createElement("p")
                    const contImge = document.createElement("img")
                    const contTime = document.createElement("span") //making empty element for quantity after we will need
                    const removCartBtn = document.createElement("button")
                    
                    removCartBtn.className = "btn btn-dark"
                    removCartBtn.innerText = "Remove"

                    removCartBtn.addEventListener("click",()=>{
                        if(!arrData.includes(i)){

                        }
                        else{
                        arrData.pop(i)
                        const timespur = arrData.filter((e,) => e == i).length;
                        document.getElementById(`cart${i}`).textContent = "  Q" + timespur
                        arrPrice[i] = 0
                    }
                    })

                    contTime.id = `cart${i}` //making a unique id for each span to select it after 


                    conttitle.textContent = mydata[arrData.length - 1].title /* mydata[] is the master array 
                    arrData is secoundary array which holds only products in the cart
                    each time we press this (add to cart) button we want to show the last index element in the cart 
                    and apeending it in the dom for one time only
                    */ 

                    contImge.src = mydata[arrData.slice(-1)[0]].image //we need to get the last element without regarding to length
                    //makeing array contain only last element 

                    conttitle.appendChild(contTime)
                    document.getElementById("cart").appendChild(conttitle)
                    document.getElementById("cart").appendChild(contImge)
                    document.getElementById("cart").appendChild(removCartBtn)

                    arrPrice.push(mydata[arrData.slice(-1)[0]].price)//another array to holds price values only
                }

                let sum = arrPrice.reduce((acc, c) => acc + c, 0) 
                document.getElementById("total").textContent = sum.toFixed(1)

            } //end of the button function
        )//  end of the button event

        //rest of the card
            conttitle.textContent = e.title
            contImge.src = e.image
            contpara.textContent = e.category
            contpara2.textContent = e.description
            contpara3.textContent = "Rating Count  " + e.rating.count
            contpara4.textContent = "Price  " + e.price

            div.appendChild(conttitle)
            div.appendChild(contImge)
            div.appendChild(contpara3)
            div.appendChild(contpara4)
            div.appendChild(contBtn)
            div.appendChild(contBtnVie)

            document.getElementById("CardHolder").appendChild(div)//in html
        })

    })