console.log('Hola Mundo');

document.getElementById("form_product").addEventListener("submit",(event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const price = event.target.price.value;
    const description = event.target.description.value;
    const image = event.target.image.value;

    console.warn(title,price,description,image);
    
    fetch('/api/products',{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(
                {
                    title,
                    price,
                    description,
                    image
                }
            )
        })
            .then(res=>res.json())
            .then(data=>{
                document.getElementById("message").innerHTML = "Producto guardado: "+data.title;
                console.log(data)
            })
            
})