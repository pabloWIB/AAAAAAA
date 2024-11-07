$(function(){
    $(".active1").hover(function(){
        $(".hoverSelection1").toggleClass("hoverSelection1N");
    });
});


$(function(){
    $(".active2").hover(function(){
        $(".hoverSelection2").toggleClass("hoverSelection2N");
    });
});

$(function(){
    $(".active3").hover(function(){
        $(".hoverSelection3").toggleClass("hoverSelection3N");
    });
});

$(function(){
    $(".active4").click(function(){
        $(".active4").toggleClass("hoverSelection4N");
        $(".overlay").toggleClass("hoverSelection5N");
        $("main").toggleClass("hoverSelection6N");
        $("footer").toggleClass("hoverSelection7N");
        $("section").toggleClass("hoverSelection8N");
    });
});


var alto = 0;
$("#carrusel .carousel-item").each(function(index,elemento){
    if(alto < $(elemento).height()){
        alto = $(elemento).height();
    }
});

$("#carrusel .carousel-item").css("min-height",alto);


new Vue({
    el: "#app",
    data() {
      return {
        currentCardBackground: Math.floor(Math.random() * 25 + 1), // just for fun :D
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: "",
        minCardYear: new Date().getFullYear(),
        amexCardMask: "#### ###### #####",
        otherCardMask: "#### #### #### ####",
        cardNumberTemp: "",
        isCardFlipped: false,
        focusElementStyle: null,
        isInputFocused: false
      };
    },
    mounted() {
      this.cardNumberTemp = this.otherCardMask;
      document.getElementById("cardNumber").focus();
    },
    computed: {
      getCardType() {
        let number = this.cardNumber;
        let re = new RegExp("^4");
        if (number.match(re) != null) return "visa";
  
        re = new RegExp("^(34|37)");
        if (number.match(re) != null) return "amex";
  
        re = new RegExp("^5[1-5]");
        if (number.match(re) != null) return "mastercard";
  
        re = new RegExp("^6011");
        if (number.match(re) != null) return "discover";
  
        re = new RegExp('^9792')
        if (number.match(re) != null) return 'troy'
  
        return "visa"; // default type
      },
      generateCardNumberMask() {
        return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
      },
      minCardMonth() {
        if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
        return 1;
      }
    },
    watch: {
      cardYear() {
        if (this.cardMonth < this.minCardMonth) {
          this.cardMonth = "";
        }
      }
    },
    methods: {
      flipCard(status) {
        this.isCardFlipped = status;
      },
      focusInput(e) {
        this.isInputFocused = true;
        let targetRef = e.target.dataset.ref;
        let target = this.$refs[targetRef];
        this.focusElementStyle = {
          width: `${target.offsetWidth}px`,
          height: `${target.offsetHeight}px`,
          transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
        }
      },
      blurInput() {
        let vm = this;
        setTimeout(() => {
          if (!vm.isInputFocused) {
            vm.focusElementStyle = null;
          }
        }, 300);
        vm.isInputFocused = false;
      }
    }
  });

  // cart.js

// Lista simulada de productos/servicios
const itemsInCart = [
    {
        name: "Alojamiento (Habitación Estándar)",
        price: 320.000, // Precio por noche
        quantity: 3, // Días seleccionados
    },
    {
        name: "Decoración de Aniversario",
        price: 50.000, // Precio por decoración
        quantity: 1, // Una decoración seleccionada
    },
    {
        name: "Paseo a caballo",
        price: 20.000, // Precio por paseo
        quantity: 2, // Dos paseos seleccionados
    }
];

// Función para calcular el total del carrito
function calculateTotal() {
    let subtotal = 0;
    itemsInCart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const discount = 0.1; // Descuento del 10% (puedes modificarlo)
    const discountAmount = subtotal * discount;
    const totalAfterDiscount = subtotal - discountAmount;
    const tax = totalAfterDiscount * 0.1; // Impuesto del 10%

    const total = totalAfterDiscount + tax;

    // Actualizar el HTML con los valores calculados
    document.getElementById("totalPrice").textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    document.getElementById("discountMessage").textContent = `Descuento aplicado: -$${discountAmount.toFixed(2)}`;
    document.getElementById("taxAmount").textContent = tax.toFixed(2);
    document.getElementById("finalPrice").textContent = total.toFixed(2);

    // Llenar la tabla del carrito
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = ""; // Limpiar tabla
    itemsInCart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeItem('${item.name}')">Eliminar</button></td>
        `;
        cartItemsContainer.appendChild(row);
    });
}

// Función para eliminar un ítem del carrito
function removeItem(itemName) {
    const index = itemsInCart.findIndex(item => item.name === itemName);
    if (index !== -1) {
        itemsInCart.splice(index, 1); // Eliminar del carrito
        calculateTotal(); // Recalcular total
    }
}

// Función para proceder al pago
function goToPayment() {
    alert("Redirigiendo al pago...");
    // Aquí puedes redirigir a la pasarela de pago (Stripe, PayPal, etc.)
    // window.location.href = "URL_DE_TU_PASARELA_DE_PAGO";
}

// Inicializar la página y calcular total
calculateTotal();
