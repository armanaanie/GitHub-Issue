document.getElementById("signin-btn").addEventListener("click",function(){
 const nameInput= document.getElementById("name-input");
 const name= nameInput.value;
 const passInput= document.getElementById("pass-input");
 const pass= passInput.value;
if(name==="admin" && pass==="admin123"){
    alert("Sign In successfull!");
    window.location.assign("./home.html")

}  
else{
    alert("Wrong Info!Try again.");
    return
}
})