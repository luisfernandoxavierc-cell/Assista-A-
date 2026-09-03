const eventos = [

```
{
    id: 1,

    titulo: "Festival Horizonte",

    categoria: "Festivais",

    data: "12 de Outubro de 2026",

    local: "Recife - PE",

    preco: 120,

    imagem:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",

    descricao:
        "Uma experiência musical inesquecível com grandes artistas, performances e muita cultura."
},

{
    id: 2,

    titulo: "Noite Pop",

    categoria: "Shows",

    data: "22 de Outubro de 2026",

    local: "Recife - PE",

    preco: 85,

    imagem:
        "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=800&q=80",

    descricao:
        "Uma noite dedicada aos maiores sucessos da música pop."
},

{
    id: 3,

    titulo: "Arte em Movimento",

    categoria: "Cultura",

    data: "05 de Novembro de 2026",

    local: "Olinda - PE",

    preco: 50,

    imagem:
        "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80",

    descricao:
        "Uma experiência cultural que reúne arte, música e performances."
},

{
    id: 4,

    titulo: "Noite no Teatro",

    categoria: "Teatro",

    data: "18 de Novembro de 2026",

    local: "Recife - PE",

    preco: 65,

    imagem:
        "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=800&q=80",

    descricao:
        "Uma apresentação especial que celebra o teatro e a arte."
},

{
    id: 5,

    titulo: "Summer Music Experience",

    categoria: "Shows",

    data: "10 de Dezembro de 2026",

    local: "Porto de Galinhas - PE",

    preco: 150,

    imagem:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80",

    descricao:
        "Grandes artistas e uma experiência única à beira-mar."
},

{
    id: 6,

    titulo: "Festival Cultural Brasileiro",

    categoria: "Cultura",

    data: "20 de Dezembro de 2026",

    local: "Olinda - PE",

    preco: 70,

    imagem:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",

    descricao:
        "Música, gastronomia, arte e cultura brasileira reunidas em um único evento."
}
```

];

let eventoSelecionado = null;

let quantidadeSelecionada = 1;

let carrinho =
JSON.parse(localStorage.getItem("carrinho")) || [];

/* CARREGAR EVENTOS */

function carregarEventos(lista = eventos) {

```
const container =
    document.getElementById("events-container");


container.innerHTML = "";


if (lista.length === 0) {

    container.innerHTML =
        "<p>Nenhum evento encontrado.</p>";

    return;
}


lista.forEach(evento => {

    container.innerHTML += `

        <div
            class="event-card"
            onclick="abrirEvento(${evento.id})"
        >

            <img
                class="event-image"
                src="${evento.imagem}"
                alt="${evento.titulo}"
            >

            <div class="event-info">

                <span class="event-category">
                    ${evento.categoria}
                </span>

                <h3>
                    ${evento.titulo}
                </h3>

                <p>
                    📅 ${evento.data}
                </p>

                <p>
                    📍 ${evento.local}
                </p>

                <div class="event-price">
                    R$ ${evento.preco.toFixed(2).replace(".", ",")}
                </div>

            </div>

        </div>

    `;

});
```

}

/* ABRIR EVENTO */

function abrirEvento(id) {

```
eventoSelecionado =
    eventos.find(evento => evento.id === id);


quantidadeSelecionada = 1;


document.getElementById("ticket-quantity")
    .innerText = quantidadeSelecionada;


document.getElementById("modal-image")
    .src = eventoSelecionado.imagem;


document.getElementById("modal-category")
    .innerText = eventoSelecionado.categoria;


document.getElementById("modal-title")
    .innerText = eventoSelecionado.titulo;


document.getElementById("modal-date")
    .innerText =
    "📅 " + eventoSelecionado.data;


document.getElementById("modal-location")
    .innerText =
    "📍 " + eventoSelecionado.local;


document.getElementById("modal-description")
    .innerText =
    eventoSelecionado.descricao;


document.getElementById("modal-price")
    .innerText =
    "R$ " +
    eventoSelecionado.preco
        .toFixed(2)
        .replace(".", ",");


document
    .getElementById("eventModal")
    .classList
    .add("active");
```

}

/* FECHAR EVENTO */

function fecharEvento() {

```
document
    .getElementById("eventModal")
    .classList
    .remove("active");
```

}

/* QUANTIDADE */

function alterarQuantidade(valor) {

```
quantidadeSelecionada += valor;


if (quantidadeSelecionada < 1) {

    quantidadeSelecionada = 1;

}


document
    .getElementById("ticket-quantity")
    .innerText =
    quantidadeSelecionada;
```

}

/* ADICIONAR AO CARRINHO */

function adicionarAoCarrinho() {

```
if (!eventoSelecionado) return;


const itemExistente =
    carrinho.find(
        item =>
            item.id === eventoSelecionado.id
    );


if (itemExistente) {

    itemExistente.quantidade +=
        quantidadeSelecionada;

}

else {

    carrinho.push({

        ...eventoSelecionado,

        quantidade:
            quantidadeSelecionada

    });

}


salvarCarrinho();

fecharEvento();

mostrarNotificacao(
    "Ingressos adicionados ao carrinho!"
);
```

}

/* SALVAR CARRINHO */

function salvarCarrinho() {

```
localStorage.setItem(
    "carrinho",
    JSON.stringify(carrinho)
);


atualizarCarrinho();
```

}

/* ATUALIZAR CARRINHO */

function atualizarCarrinho() {

```
const container =
    document.getElementById("cart-items");


const contador =
    document.getElementById("cart-count");


container.innerHTML = "";


let total = 0;

let quantidadeTotal = 0;


carrinho.forEach(item => {

    total +=
        item.preco *
        item.quantidade;


    quantidadeTotal +=
        item.quantidade;


    container.innerHTML += `

        <div class="cart-item">

            <div>

                <h4>
                    ${item.titulo}
                </h4>

                <p>
                    ${item.quantidade}
                    ingresso(s)
                </p>

                <p>
                    R$ ${(
                        item.preco *
                        item.quantidade
                    )
                    .toFixed(2)
                    .replace(".", ",")}
                </p>

            </div>


            <button
                class="remove-btn"
                onclick="removerDoCarrinho(${item.id})"
            >

                Remover

            </button>

        </div>

    `;

});


if (carrinho.length === 0) {

    container.innerHTML =
        "<p>Seu carrinho está vazio.</p>";

}


contador.innerText =
    quantidadeTotal;


document
    .getElementById("cart-total")
    .innerText =
    "R$ " +
    total
        .toFixed(2)
        .replace(".", ",");
```

}

/* REMOVER */

function removerDoCarrinho(id) {

```
carrinho =
    carrinho.filter(
        item => item.id !== id
    );


salvarCarrinho();
```

}

/* ABRIR CARRINHO */

function abrirCarrinho() {

```
document
    .getElementById("cartPanel")
    .classList
    .add("active");
```

}

/* FECHAR CARRINHO */

function fecharCarrinho() {

```
document
    .getElementById("cartPanel")
    .classList
    .remove("active");
```

}

/* FINALIZAR COMPRA */

function finalizarCompra() {

```
if (carrinho.length === 0) {

    alert(
        "Seu carrinho está vazio!"
    );

    return;

}


const usuario =
    localStorage.getItem("usuario");


if (!usuario) {

    fecharCarrinho();

    mostrarLogin();

    alert(
        "Faça login antes de finalizar a compra."
    );

    return;

}


let ingressos =
    JSON.parse(
        localStorage.getItem("ingressos")
    ) || [];


carrinho.forEach(item => {

    for (
        let i = 0;
        i < item.quantidade;
        i++
    ) {

        ingressos.push({

            id:
                Date.now() +
                Math.random(),

            evento:
                item.titulo,

            data:
                item.data,

            local:
                item.local,

            codigo:
                Math.random()
                    .toString(36)
                    .substring(2, 10)
                    .toUpperCase()

        });

    }

});


localStorage.setItem(
    "ingressos",
    JSON.stringify(ingressos)
);


carrinho = [];


salvarCarrinho();


fecharCarrinho();


alert(
    "Compra realizada com sucesso! 🎉 Seus ingressos foram gerados."
);
```

}

/* BUSCAR */

function buscarEventos() {

```
const termo =
    document
        .getElementById("searchInput")
        .value
        .toLowerCase();


const resultado =
    eventos.filter(evento =>

        evento.titulo
            .toLowerCase()
            .includes(termo)

        ||

        evento.local
            .toLowerCase()
            .includes(termo)

        ||

        evento.categoria
            .toLowerCase()
            .includes(termo)

    );


carregarEventos(resultado);
```

}

/* FILTRAR */

function filtrarCategoria(categoria) {

```
if (categoria === "Todos") {

    carregarEventos(eventos);

    return;

}


const resultado =
    eventos.filter(
        evento =>
            evento.categoria === categoria
    );


carregarEventos(resultado);
```

}

/* LOGIN */

function mostrarLogin() {

```
document
    .getElementById("loginModal")
    .classList
    .add("active");
```

}

function fecharLogin() {

```
document
    .getElementById("loginModal")
    .classList
    .remove("active");
```

}

function fazerLogin() {

```
const nome =
    document
        .getElementById("userName")
        .value
        .trim();


if (nome === "") {

    alert(
        "Digite seu nome."
    );

    return;

}


localStorage.setItem(
    "usuario",
    nome
);


fecharLogin();


mostrarNotificacao(
    `Bem-vindo, ${nome}!`
);
```

}

/* NOTIFICAÇÃO */

function mostrarNotificacao(mensagem) {

```
const notification =
    document.getElementById(
        "notification"
    );


notification.innerText =
    mensagem;


notification
    .classList
    .add("show");


setTimeout(() => {

    notification
        .classList
        .remove("show");

}, 3000);
```

}

/* INICIAR */

carregarEventos();

atualizarCarrinho();
