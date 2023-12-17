let products = fetch("http://localhost:5000/products?limit=10")
products.then((response)=>{
    return response.json()
}).then((result)=>{ 

    for (x in result)
    { 
        img_link = result[x].image_paths[0]
        console.log(img_link)
        createCard(result[x].brand, img_link, result[x].material, result[x].product_price, result[x].model_no);
    }

    $(document).ready(function(){
        owl = $('.owl-carousel');
        owl.owlCarousel({
            loop:true,
            margin:10,
            nav:false,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:3
                },
                1300:{
                    items:4
                },
                1920:{
                    items:5
                }
            }
        })
    
        // Go to the next item
        $('.customNextBtn').click(function() {
            owl.trigger('next.owl.carousel');
        })
        // Go to the previous item
        $('.customPrevBtn').click(function() {
            owl.trigger('prev.owl.carousel', [300]);
        })
    
      });
})


function createCard(name, imageSrc, description, price, model_no) {
    var cardContainer = document.getElementById('cardContainer');

    // Create card elements
    var card = document.createElement('div');
    card.className = 'align-self-center my-3 card';

    var image = document.createElement('img');
    image.className = 'card-img-top ';
    image.className += model_no;
    image.src = imageSrc; // Set image source

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    var title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = name; // Set card title

    var text = document.createElement('p');
    text.className = 'card-text';
    text.textContent = description; // Set card description

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'btn btn-primary';
    link.style.width = '100%';
    link.textContent = '$' + price; // Set card price

    // Append elements to the card body
    cardBody.appendChild(title);
    cardBody.appendChild(text);
    cardBody.appendChild(link);

    // Append elements to the card
    card.appendChild(image);
    card.appendChild(cardBody);

    // Append the card to the container
    cardContainer.appendChild(card);
}

new ClipboardJS('.copy-btn');
function copy_toast()
{
    var myToast = new bootstrap.Toast(document.getElementById('liveToast'));
    myToast.show();
}
