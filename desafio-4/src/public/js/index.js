const socketClient = io(); //socket del lado del cliente

/*  socketClient.on("bienvenida", (message) => {
  //nombre del evento con un callback con lo que quieras en este caso un log
  console.log(message);
  socketClient.emit("respuestaBienvenida", "Gracias");
});  */

/* const formProduct = document.getElementById("formProduct");
const inputTitleProd = document.getElementById("title");
const price = document.getElementById("price");

formProduct.onsubmit = (e) => {
  e.preventDefault();
  socketClient.emit("producto", inputTitleProd.value, price.value);
};
//escuchamos el evento que se llama allprod y cuando reciba esos prod los ve por consola
socketClient.on("allProd", (productos) => {
  console.log(productos); //para mostrar por consola del navegador
});
 */

const formProd = document.getElementById("formProduct");
const title = document.getElementById("title");
const description = document.getElementById("description");
const price = document.getElementById("price");
const stock = document.getElementById("stock");
const code = document.getElementById("code");
const category = document.getElementById("category");
const tableProds = document.getElementById("bodyProd");
const formDelete = document.getElementById("deleteProduct");
const id = document.getElementById("id");

formProd.onsubmit = (e) => {
  e.preventDefault();
  const objProd = {
    title: title.value,
    description: description.value,
    price: Number(price.value),
    stock: Number(stock.value),
    code: code.value,
    category: category.value,
  };
  socketClient.emit("agregar", objProd);
  title.value = "";
  description.value = "";
  price.value = "";
  stock.value = "";
  code.value = "";
  category.value = "";
};

formDelete.onsubmit = (e) => {
  e.preventDefault();
  socketClient.emit("eliminar", Number(id.value));
  id.value = "";
};

socketClient.on("added", (newProduct) => {
  if (typeof newProduct === "object") {
    const addRow = `
        <tr>
            <td>${newProduct.id}</td>
            <td>${newProduct.title}</td>
            <td>${newProduct.description}</td>
            <td>${newProduct.price}</td>
            <td>${newProduct.stock}</td>
            <td>${newProduct.code}</td>
        </tr>`;
    tableProds.innerHTML += addRow;
  } else {
    console.alert("no anda");
  }
});

socketClient.on("deleted", (arrProducts) => {
  if (typeof arrProducts === "object") {
    const addRow = arrProducts
      .map((objProd) => {
        return `
              <tr>
                  <td>${objProd.id}</td>
                  <td>${objProd.title}</td>
                  <td>${objProd.description}</td>
                  <td>${objProd.price}</td>
                  <td>${objProd.stock}</td>
                  <td>${objProd.code}</td>
              </tr>`;
      })
      .join(" ");
    tableProds.innerHTML = addRow;
  } else {
    Toastify({
      text: arrProducts,
      duration: 3000,
      gravity: "top",
      style: {
        background: "rgb(0,0,9)",
        background:
          "linear-gradient(90deg, rgba(0,0,9,1) 0%, rgba(198,8,8,1) 50%, rgba(0,0,0,1) 100%)",
        width: "25%",
        color: "white",
      },
    }).showToast();
  }
});
