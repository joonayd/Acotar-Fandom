$(function (){
$("#signup").click(handleBtn);
});

function handleBtn(e){
    e.preventDefault();

    var validation = true
    var email = $("#email").val()
    var password = $("#password").val()

    if(password.length<8 ){
        alert("Password should be atleast 8 characters long")
        $("#password").addClass("error")
      }
      else{
        $("#password").removeClass("error")
      }
}