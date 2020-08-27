

const makeupUrl = "http://localhost:3000/products"
const toyCollection = document.querySelector("#makeup-collection")
const makeupForm = document.querySelector(".add-makeup-form")



makeupForm.addEventListener("submit", function(e){
    e.preventDefault()
    const productName = e.target.name.value
    const productImage = e.target.image.value

    fetch(makeupUrl, {
      method: "POST",
      headers: {
        "Content-type" : "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": productName,
        "image": productImage,
        "likes": 0
      })
    })
    .then(r => r.json())
    .then(newProduct => {
        displayProducts(newProduct)
    })
  })

function loadMakeup(){
    fetch(makeupUrl)
    .then(r=>r.json())
    .then(products => {
        products.forEach( (product) => displayProducts(product))
    }) }

loadMakeup()

function increaseLikes(product, p){
    const newLikes = product.likes += 1
    fetch(`${makeupUrl}/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-type" : "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": newLikes
      })
    })
    .then(r => r.json())
    .then(updatedProduct => {
      p.innerText = updatedProduct.likes
    })
    }

    function deleteToy(product, div){
        fetch(`${makeupUrl}/${product.id}`, {
          method: "DELETE" })
        .then(r=>r.json())
        .then( () => {
          div.remove()
        })
      }



function displayProducts(product){
    console.log(product)
    const div = document.createElement("div")
    div.className = "card"
      const h2 = document.createElement("h2")
      h2.innerText = product.name
      const img = document.createElement("img")
      img.src = product.image
      img.className = "makeup-avatar"
      const p = document.createElement("p")
      p.innerText = product.likes

      const button = document.createElement("button")
      button.className = "like-btn"
      button.innerText = "Like <3"
      button.addEventListener("click", function(){
        increaseLikes(product, p)
      })

      const delButton = document.createElement("button")
      delButton.innerText = "Delete"
      
    div.append(h2, img, p, button, delButton)
    toyCollection.append(div)

    delButton.addEventListener("click", function(){
      deleteToy(product, div)
    })
}




//logic to create a like and dislike button 
let heart = "<3"
let hurt = "/"
let position = 1
function brokenHeart(){
  let breakMyHeart = heart.substring(0, position) + hurt + heart.substring(position)
  return breakMyHeart
}
brokenHeart()


// let heart = "<3"
// function useClosure(){
//   let hurt = "/"
//   let position = 1

//   function brokenHeart(hurt, position){
//     let breakMyHeart = heart.substring(0, position) + hurt + heart.substring(position)
//     return breakMyHeart
//   }
//   return brokenHeart()
// }

// useClosure()




// to be able to display a happy mood on the page depending on the feeling and time 
function useClosure(){
  
  let feeling = "happy"
  if(feeling === "happy"){
    
    return ":)"
  }
  else {
    return ":("
  }
}
useClosure()



function x(){
  let feeling = "happy"
  let today = "Monday"
  let tomorrow = "Tuesday"
  function y(){
    if(feeling === "happy" && today === "Friday"){
      
      return ":)"
    }
    else {
      return ":("
    }
}
return console.dir(y)
}
x()










