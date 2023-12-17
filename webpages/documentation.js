const root_url = "http://localhost:5000/"
document.addEventListener('DOMContentLoaded', function() {
    // Fetch the content of text.json
    fetch(root_url+"products?_id=653aecf061a11eecb45b17ab")
        .then(response => response.json())
        .then(data => {
            // Update the content of the element with the ID "try-code"
            const tryCodeElement = document.getElementById('try-code');
            tryCodeElement.textContent = JSON.stringify(data, null, 2); // Beautify JSON with 2 spaces indentation
            delete tryCodeElement.dataset.highlighted;
            hljs.highlightAll(tryCodeElement);
        })
        .catch(error => console.error('Error fetching JSON:', error));
    
    fetch(root_url+encodeURI("products?limit=1&skip=5"))
        .then(response => response.json())
        .then(data => {
            const tryCodeElement = document.getElementById('limit-skip-code');
            tryCodeElement.textContent = JSON.stringify(data, null, 2);
            delete tryCodeElement.dataset.highlighted;
            hljs.highlightAll(tryCodeElement);
        })
        .catch(error => console.error('Error fetching JSON:', error));

    fetch(root_url+encodeURI("products?product_type=Eyeglasses&frame_shape=Cat Eye"))
    .then(response => response.json())
    .then(data => {
        const tryCodeElement = document.getElementById('filters-code');
        tryCodeElement.textContent = JSON.stringify(data, null, 2);
        delete tryCodeElement.dataset.highlighted;
        hljs.highlightAll(tryCodeElement);
    })
    .catch(error => console.error('Error fetching JSON:', error));

    fetch(root_url+encodeURI("products?product_type=Eyeglasses&minPrice=1000&maxPrice=2000"))
    .then(response => response.json())
    .then(data => {
        const tryCodeElement = document.getElementById('price-code');
        tryCodeElement.textContent = JSON.stringify(data, null, 2);
        delete tryCodeElement.dataset.highlighted;
        hljs.highlightAll(tryCodeElement);
    })
    .catch(error => console.error('Error fetching JSON:', error));

    fetch(root_url+encodeURI("products/search?q=geometric"))
    .then(response => response.json())
    .then(data => {
        const tryCodeElement = document.getElementById('search-code');
        tryCodeElement.textContent = JSON.stringify(data, null, 2);
        delete tryCodeElement.dataset.highlighted;
        hljs.highlightAll(tryCodeElement);
    })
    .catch(error => console.error('Error fetching JSON:', error));
});

function try_out()
{
    route = encodeURI(document.getElementById("try-out-url").value)

    if(route!="")
    {
    fetch(root_url+route)
        .then(response => response.json())
        .then(data => {
            // Update the content of the element with the ID "try-code"
            const tryCodeElement = document.getElementById('try-code');
            tryCodeElement.textContent = JSON.stringify(data, null, 2); // Beautify JSON with 2 spaces indentation

            delete tryCodeElement.dataset.highlighted;
            hljs.highlightAll(tryCodeElement);
        })
        .catch(error => console.error('Error fetching JSON:', error));
    }
}

new ClipboardJS('.copy-url');
new ClipboardJS('.copy-result');
function copy_toast()
{
    var myToast = new bootstrap.Toast(document.getElementById('liveToast'));
    myToast.show();
}