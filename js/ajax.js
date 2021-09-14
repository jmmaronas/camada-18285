let produts;
console.log(produts);

$.getJSON("productos.json", function(req,res){
    if(res === "success"){
      produts= req;
      console.log(produts);
    }  
  });


  console.log(produts);

  $("#ajax").on("click", ()=>{
    console.log(produts);
  })