$(function(){
    loadRecipes();
    $("#recipes").on("click",".btn-danger",handleDelete)
    $("#recipes").on("click",".btn-warning",handleUpdate)
    $("#addBtn").click(addRecipe)
    $("#updateSave").click(function() {
        var id = $("#updateId").val();
        var title = $("#updateTitle").val();
        var body = $("#updateBody").val();
        $.ajax({
          url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
          data: { title, body },
          method: "PUT",
          success: function(response) {
            console.log(response);
            loadRecipes();
            $("#updateModal").modal("hide");
          }
        });
      });
})
function loadRecipes(){
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: 'GET',
        error: function(response){
            var recipes = $("#recipes")
            recipes.empty()
            recipes.append("An error has occured!")
        },
        success: function(response){
            console.log(response)
            var recipes = $("#recipes")
            recipes.empty()
            for(var i = 0; i<response.length;i++){
                var rec = response[i]
                recipes.append(` <div class = "recipe" data-id = "${rec._id}"><h3>${rec.title}</h3><p><button class = "btn btn-danger btn-sm float-right">Delete</button><button class = "btn btn-warning btn-sm float-right">Edit</button>${rec.body} </p></div> `)
            }
            
        }
    })
}
function handleDelete(){
console.log("Handle Delete")
var btn = $(this)
var parentDiv = btn.closest(".recipe")
var id = parentDiv.attr("data-id")


$.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
    method: "DELETE",
    success: function(){
        loadRecipes()
    }
})
}
function addRecipe(){
var title = $("#title").val()
var body = $("#body").val()

$.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "POST",
    data: {title, body},
    success: function(){
        loadRecipes()
    }
})
}
function handleUpdate(){
    $("#updateModal").modal("show")
    var btn = $(this)
var parentDiv = btn.closest(".recipe")
var id = parentDiv.attr("data-id")

$.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
    method: "GET",
    success: function(response){
        $("#updateId").val(response._id)
        $("#updateTitle").val(response.title)
        $("#updateBody").val(response.body)
        $("#updateModal").modal("show")

    } 
})
}