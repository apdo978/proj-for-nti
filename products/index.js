
    const fs = require('fs');

    function addProduct(data,path="./products.json"){
        try{
            if(typeof data !== 'object') {
                console.log(`please add a product as object type not ${typeof data} `);  
                return;
            }
            if (fs.existsSync(path)&&fs.readFileSync(path,'utf-8').length>0){
         let products = JSON.parse(fs.readFileSync(path,'utf-8'))
         if(products.some(product => product.id === data.id)){
            console.log(`product with same id was added `);
            return;}
            products.push(data)
            fs.writeFileSync(path,JSON.stringify(products) , 'utf-8')
        
            console.log("product =>",JSON.stringify(data),"\ninserted successfully")
            return
        }
                if (!fs.existsSync(path)||fs.readFileSync(path,'utf-8').length==0){
                    if(Array.isArray(data)){
                        fs.writeFile(path, JSON.stringify(data), 'utf-8', (err)=>{
                            err?console.log("file error"):console.log(path," has Created and =>",[data],"\ninserted successfully");
                            return})
                    }else{
                    fs.writeFile(path, JSON.stringify([data]), 'utf-8', (err)=>{
                        err?console.log("file error"):console.log(path," has Created and =>",[data],"\ninserted successfully");
                        return
                    })}
                }
    }
    
    catch(error){
        console.log("file error");
    }

}
    
    
    function getProduct(id=1,path="./products.json"){
            fs.readFile(path, 'utf-8', (err, data) => {
                if(err) {
                    console.log("error reading");
                } else if(data.length > 0){
                    if(JSON.parse(data).some(e=> e.id === id)){
                   JSON.parse(data).forEach(element => {
                    element.id === id&&console.table(element)})}
                    else{console.log("No product found with this id")}
                }


                     if(data.length==0){
                        console.log("Please insert a product first");
                    }
                   
})}
      

    function deleteProducts(id,path="./products.json"){
fs.readFile(path, 'utf-8', (err,data)=>{
    if(err) {
        console.log("file error")
        return;
    } else if(data.length>0) {
        if(JSON.parse(data).some(e=> e.id === id)){
        let products = JSON.parse(data);
        for(let i=0; i<products.length; i++){
            if(products[i].id === id){   
              products.splice(i, 1); 
             break
            }
        }
        fs.writeFile("./products.json", JSON.stringify(products), 'utf-8', (err)=>{
            err?console.log(" file eror"): console.log( " product with This ID "+id+" Deleted");
        })
    }
else{console.log("not Found")}
}
    
})
    }
    function editProducts(id,content,path="./products.json"){
    deleteProducts(id,path)
    addProduct(content,path)
    }
    addProduct({id:1})
    getProduct(1)

    module.exports = {
        addProduct,
        getProduct,
        deleteProducts,
        editProducts
    };