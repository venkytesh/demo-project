// var mobile = [
//     {
//       name: "chair",
//       inventory: 5,
//       unit_price: 45.99
//     },
//     {
//       name: "table",
//       inventory: 10,
//       unit_price: 123.75
//     },
//     {
//       name: "sofa",
//       inventory: 2,
//       unit_price: 399.50
//     }
//   ];
// document.write(mobile);
// for(var a=0;a<mobile.length;a++)
// {
// //    document.write(mobile[a].inventory +"");
// }





//   function listProducts(prods) {
//     let product_names = [];
//     for (let i=0; i<prods.length; i+=1) {
//      product_names.push(prods[i].name);
//     }
//     return product_names;
//   }
//   console.log(listProducts(products));
//   function totalValue(prods) {
//     let inventory_value = 0;
//     for (let i=0; i<prods.length; i+=1) {
//       inventory_value += prods[i].inventory * prods[i].unit_price;
//     }
//     return inventory_value;
//   }
//   console.log(totalValue(products));

// const mobile=[
//     { id:1,name:'MI M1',specification:'128GB,4GB RAM',Price:13999},
//     { id:2,name:'VIVO',specification:'128GB,4GB RAM',Price:13999},
//     { id:3,name:'UREKHA',specification:'128GB,4GB RAM',Price:13999},
//     { id:4,name:'MI 8',specification:'128GB,4GB RAM',Price:13999},
//     { id:5,name:'MICROMAX',specification:'128GB,4GB RAM',Price:13999},
//     { id:6,name:'MI M1',specification:'128GB,4GB RAM',Price:13999},
//     { id:7,name:'MI M1',specification:'128GB,4GB RAM',Price:13999},
//     ];
//     function send(){
//       // for(var a=0;a<mobile;a++)
//     document.write(mobile);
//     // location.replace("http://localhost:9000/cart");
    
//     };
//     send();

const data=
{ id:1,name:'MI M1',specification:'128GB,4GB RAM',Price:13999}
// { id:2,name:'VIVO',specification:'128GB,4GB RAM',Price:13999},
// { id:3,name:'UREKHA',specification:'128GB,4GB RAM',Price:13999},
// { id:4,name:'MI 8',specification:'128GB,4GB RAM',Price:13999},
// { id:5,name:'MICROMAX',specification:'128GB,4GB RAM',Price:13999},
// { id:6,name:'MI M1',specification:'128GB,4GB RAM',Price:13999},
// { id:7,name:'MI M1',specification:'128GB,4GB RAM',Price:13999},
// ];
function send(){
    console.log(data.id+""+data.name+""+data.specification+""+data.Price);
};
send();