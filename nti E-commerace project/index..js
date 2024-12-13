let apillink = "https://fakestoreapi.com/products"
arrData = []
arrPrice = []
const optArr = []
const class1 = document.getElementsByClassName(`Card`) 

// getting the products from the api 
 const req =fetch(apillink).then(res => {
    const mydata = res.json()
    return mydata
}) // saving the products inside mydata []
    .then(mydata => {
        // console.log(mydata)
        //iterate on the datat
        mydata.map((e, i) => {

            const div = document.createElement("div") //div that holds evrey product with class Card
            div.className = "Card" +  ` ${e.category}`;
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
            contBtnVie.className = "btn btn-dark two"
            contBtnVie.textContent = "View Product" //the text insede the button 

            contpara4.className = `proPrice ${i}`
            conttitle.className = `proTitle ${i}`

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
            contBtn.className = "btn btn-dark one"
            contBtn.textContent = "Add To Cart"

            contBtn.addEventListener("click", () => {
                //  for elements already in the cart 
                if (arrData.includes(i)) // i reffering to the index of each element from map methode
                    {
                    arrData.push(i) // arr that holding indexes of the elements which in the carts
                    arrPrice.push(mydata[arrData.slice(-1)[0]].price)
                    const timespur = arrData.filter((e) => e == i).length;//returnning a new array which length equal to time of pruches (times of i in the array)
                    document.getElementById(`cart${i}`).textContent = "  x" + timespur
                }

                else {
                    arrData.push(i) // starts here when u click add to cart for the first time
                    // console.log(arrData)
                    
                    // creating elements to show what is inside the cart
                    const conttitle = document.createElement("p")
                    const contImge = document.createElement("img")
                    const contTime = document.createElement("span") //making empty element for quantity after we will need
                    const removCartBtn = document.createElement("button")
                    const div = document.createElement("div")
                    
                    div.className = "pro"+i;
                    removCartBtn.className = "btn btn-dark"
                    removCartBtn.innerText = "Remove"

                    removCartBtn.addEventListener("click",()=>{
                            const index = arrData.lastIndexOf(i)//to check the first index of the product an carts array

                            arrData.includes(i)?arrData.splice(index, 1):null
                            arrPrice.splice(index, 1)
                            let sum = arrPrice.reduce((acc, c) => acc + c, 0) 
                            arrPrice.length >0?document.getElementById("total").textContent = "ToTal: "+sum.toFixed(1)+"$":document.getElementById("total").textContent=""

                        // console.log(arrPrice)
                        // console.log(i)
                        const timespur = arrData.filter((e) => e == i).length;
                        document.getElementById(`cart${i}`).textContent = "  x" + timespur
                        if(!arrData.includes(i)){
                            document.querySelector(`.pro${i}`).remove()
                            // console.log("deleted" + i)
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
                    div.appendChild(conttitle)
                    div.appendChild(contImge)
                    div.appendChild(removCartBtn)
                    document.getElementById("cart").appendChild(div)
console.log(  document.getElementById("cart"))

                    arrPrice.push(mydata[arrData.slice(-1)[0]].price)//another array to holds price values only
                }

                let sum = arrPrice.reduce((acc, c) => acc + c, 0) 
                document.getElementById("total").textContent = "ToTal: " + sum.toFixed(1) +"$"

            } //end of the button function
        )//  end of the button event

        //rest of the card
            conttitle.textContent = e.title
            contImge.src = e.image
            contpara.textContent = e.category
            contpara2.textContent = e.description
            contpara3.textContent =   e.rating.count + " Purchase"
            contpara4.textContent = "Price  " + e.price

            div.appendChild(conttitle)
            div.appendChild(contImge)
            div.appendChild(contpara3)
            div.appendChild(contpara4)
            div.appendChild(contBtn)
            div.appendChild(contBtnVie)

            document.getElementById("CardHolder").appendChild(div)//in html

            
            !optArr.includes(e.category)&&optArr.push(e.category)
        })
        document.getElementById("Cat").addEventListener("change",(e)=>{
            const class1 = document.getElementsByClassName(`Card`) 
            if(e.target.value == "all"){
                for(let i = 0 ;i<class1.length;i++){
                    class1[i].style.display = "flex";
                 }
            }
            else{
            const class2 = document.getElementsByClassName(`${e.target.value}`) 
            // console.log(e.target.value)
            for(let i = 0 ;i<class1.length;i++){
               class1[i].style.display = "none";
            }
            for(let i = 0 ;i<class2.length;i++){
                class2[i].style.display = "flex"
            }}
            
        })

        optArr.forEach((ele,i)=>{
            const opt = document.createElement("option") 
            opt.className = `opt${i}`
            opt.textContent = ele
            document.getElementById("Cat").appendChild(opt)
        })
        return mydata
    }).then((mydata)=>{
    
        for(let i = 0 ; i < Math.ceil(mydata.length/6);i++){
    const pageBtn = document.createElement("button")
    pageBtn.textContent = i+1
    pageBtn.id = `page ${i}`
    pageBtn.className = `page ${i}`
    pageBtn.addEventListener("click",(e)=>{
         const i2 =  e.target.id[5] 
         const len = (+i2+1)*6<mydata.length?(+i2+1)*6:mydata.length
        //  console.log(length)
        for(let l = 0 ; l<class1.length;l++){
            class1[l].style.display = "none";
        }
        for(let l = i2*6 ;l<len;l++){
            class1[l].style.display = "flex";
            // console.log(l)
        }
    })
    document.getElementById("HeroSection").appendChild(pageBtn)}
    
    document.getElementById("page 0").click()   
})
    
document.querySelector("option").addEventListener("click",()=>{
    const class1 = document.getElementsByClassName(`Card`) 
    for(let i = 0 ;i<class1.length;i++){
        class1[i].style.display = "flex";
    }
})

document.querySelector(".searchByPrice").addEventListener("input",function(e){
    const class1 = document.getElementsByClassName(`Card`) 
    if(e.target.value.trim() == "" ||e.target.value.trim() == 0){
        for(let i = 0 ;i<class1.length;i++){
            class1[i].style.display = "flex";
        }


}
else{
    for(let i = 0 ;i<class1.length;i++){
        class1[i].style.display = "none";
    }

    for(let i = 0;i<class1.length;i++){
        parseInt(document.getElementsByClassName("proPrice")[i].textContent.split(" ")[2])<= e.target.value?class1[i].style.display = "flex":null
    // console.log("d")
    }

}
} ) 

document.querySelector(".search").addEventListener("input",(e)=>{
    const class1 = document.getElementsByClassName(`Card`) 
    const word = e.target.value.split(" ").map(e=>e[0]?e[0].toUpperCase()+e.slice(1):e)
    
    if(e.target.value.trim() == "" ){
        for(let i = 0 ;i<class1.length;i++){
            class1[i].style.display = "flex";
        }}
        else{
            for(let i = 0 ;i<class1.length;i++){
                class1[i].style.display = "none";
            }
            for(let i = 0;i<class1.length;i++){
                word.forEach(e=>{
             document.getElementsByClassName("proTitle")[i].textContent.split(" ").includes(e)?class1[i].style.display = "flex":null

                })
                
            }
        }
     
    }
)

// for(){}
// document.createElement("div")
// document.createElement("button")
// document.createElement("div")
    // for(let i = 0 ;i<() /6;i++){
    //     console.log(i+1)
    // }

    console.log("????بتطلع اي بتطلع اي ياعم انت")
    console.log("#".repeat(5));
    console.log("apdo is in the House");
    console.log(`
               :*#*:                :*#*:
             :%@@@@@#.            .#@@@@@%.
            *@@@@@@@@@*.        .*@@@@@@@=+=
          *@@@@@@@@@@@@@*      *@@@@@@@=.=+++-
        =@@@@@@@=.+@@@@@@@=  =@@@@@@@+  +++++++:
      =@@@@@@@*.    *@@@%: =@@@@@@@*.    -+++++++:
    :@@@@@@@#.       .#- :@@@@@@@%.       .=++++++=.
    %@@@@@%:           .%@@@@@@%.           .=+++++=
    :@@@@@@@#.       .#@@@@@@@:            =+++++++.
      =@@@@@@@*     *@@@@@@@=            -+++++++:
        +@@@@@@@  +@@@@@@@+            :+++++++-
          *@@@@:=@@@@@@@*            :+++++++=
           .#@=@@@@@@@#.            =++++++=
             :%@@@@@%:             .+++++=.
               :*%*:                .-==.`);

    console.log("#".repeat(5));
