

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