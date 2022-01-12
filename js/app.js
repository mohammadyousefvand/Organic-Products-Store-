let $ = document

let allProducts = [
    {id : 1  , title : 'strawberry'   , image : 'images/1.png'  , price : 10 , count : 1},
    {id : 2  , title : 'onion'        , image : 'images/2.png'  , price : 3  , count : 1},
    {id : 3  , title : 'tomato'       , image : 'images/3.png'  , price : 5  , count : 1},
    {id : 4  , title : 'eggplant'     , image : 'images/4.png'  , price : 6  , count : 1},
    {id : 5  , title : 'broccoli'     , image : 'images/5.png'  , price : 16 , count : 1},
    {id : 7  , title : 'carrot'       , image : 'images/7.png'  , price : 15 , count : 1},
    {id : 8  , title : 'cauliflower'  , image : 'images/8.png'  , price : 8  , count : 1},
    {id : 9  , title : 'cucumber'     , image : 'images/9.png'  , price : 4  , count : 1},
    {id : 10 , title : 'garlic'       , image : 'images/10.png' , price : 10 , count : 1},
    {id : 11 , title : 'green-pepper' , image : 'images/11.png' , price : 7  , count : 1},
    {id : 12 , title : 'lettuce'      , image : 'images/12.png' , price : 5  , count : 1},
    {id : 13 , title : 'red-pepper'   , image : 'images/13.png' , price : 8  , count : 1},
    {id : 14 , title : 'watermelon'   , image : 'images/14.png' , price : 12 , count : 1},
    {id : 15 , title : 'mushrooms'    , image : 'images/15.png' , price : 14 , count : 1},
    {id : 16 , title : 'banana'       , image : 'images/16.png' , price : 20 , count : 1},
    {id : 17 , title : 'squash'       , image : 'images/17.png' , price : 6  , count : 1},
]

const itemContainer = $.querySelector('.item-container')
const previewContainer = $.querySelector('.preview-container')
let pagenation = $.querySelector('.pagenation')
let app = document.getElementById('app');

let courentPage = 1
let rowItem = 3 
let btnItems;

function createItemProducts (itemContainer , allProducts , courentPage , rowItem) {

    itemContainer.innerHTML = ''

    let endItem = courentPage * rowItem
    let startItem = endItem - rowItem

    let pageItem = allProducts.slice(startItem , endItem)

    pageItem.forEach(function (item) {
    
        let boxProduct = '<div class="product" onclick="showProductInformation(' + item.id + ')"><img src="' + item.image + 
        '"><p class="title">' + item.title + '</p><p class="price">$ ' + item.price + '</p></div>'
    
        itemContainer.insertAdjacentHTML('beforeend' , boxProduct)
    })
}

function pagenationHandler (pagenation , allProducts , rowItem) {

    pagenation.innerHTML = ''

    let pageNeed = Math.ceil(allProducts.length / rowItem)

    for (let i = 1 ; i < pageNeed + 1 ; i++) {

        btnItems = pagenationGenerator(i , allProducts)

        pagenation.append(btnItems)
    } 
}

function pagenationGenerator (page , allProducts) {

    let button = $.createElement('button')
    button.innerHTML = page

    if (courentPage === page) {
        button.classList.add('active')
    }

    button.addEventListener('click' , function () {

        itemContainer.classList.add('hide')

        if (courentPage === page) {
            itemContainer.classList.remove('hide')
        }

        setTimeout(function () {

            itemContainer.classList.remove('hide')

            courentPage = page
            createItemProducts(itemContainer , allProducts , courentPage , rowItem)
    
            let buttonClass = $.querySelector('button.active')
    
            buttonClass.classList.remove('active')
    
            button.classList.add('active')
        } , 600)
    })

    return button
}

function showProductInformation (productId) {

    previewContainer.innerHTML = ''

    previewContainer.classList.add('show')
    itemContainer.style.filter = 'blur(3px)'

    let showElem;

    allProducts.forEach(function (product) {
        if (productId == product.id) {

            showElem = '<div class="preview"><span class="fa fa-close close" onclick="hidePreview()"></span><img src="' + product.image + 
            '"alt="product"><p class="name-product">' + product.title + 
            '</p><div class="star"><span class="fa fa-star" ></span><span class="fa fa-star" ></span> ' +
            ' <span class="fa fa-star" ></span><span class="fa fa-star-o" ></span><span class="fa fa-star-o"></span></div><p class="bio-product">' + 
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, sunt!</p><p class="price-product">$ ' + product.price + 
            '</p><div class="btn-product"><button>Buy</button><button>Add</button></div></div>'
        
            previewContainer.insertAdjacentHTML('beforeend' , showElem)
        }
    })
}

//blur style for background
function hidePreview () {
    previewContainer.classList.remove('show')
    itemContainer.style.filter = 'blur(0)'
}

//type writer library config.
let typewriter = new Typewriter(app, {
    loop: true
});

typewriter.typeString('organic products')
    .pauseFor(2500)
    .deleteAll()
    .typeString('Variety of products')
    .pauseFor(2500)
    .deleteAll()
    .typeString('Welcome')
    .pauseFor(2500)
    .start();


createItemProducts(itemContainer , allProducts , courentPage , rowItem)
pagenationHandler(pagenation , allProducts , rowItem)