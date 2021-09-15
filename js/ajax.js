$(document).ready(()=>{
  console.log("ultimo  "+produts);  
})
let produts;
console.log("primero  "+produts);

$.getJSON("productos.json", function(req,res){
    if(res === "success"){
      produts = req;
      console.log("segundo", produts);
    }  
  });


  console.log("tercero  "+produts);

  $("#ajax").on("click", ()=>{
    console.log("cuarto  "+produts);
  })

  console.log("quinto  ", produts);