if (!customElements.get('upsell-button')) {
  customElements.define('upsell-button', class UpsellButton extends HTMLElement {
    constructor(){
      super()

      this.drawer = document.querySelector('#CartDrawer')
      this.btn = this.querySelector('button')
      this.variantId = this.btn.getAttribute('data-variant-id')
      this.btn.addEventListener('click', (e) => this.addProduct(e))
    }
    
    addProduct(e){
      e.preventDefault()

      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'xmlhttprequest'
        },
        body: JSON.stringify({
          quantity: 1,
          id: this.variantId
        })
      })
      .then(function(response) {
        return response.json();
      })
      .then((data) => {
        this.updateCart()
      });
    }

    updateCart(){
      fetch(window.Shopify.routes.root, {
        method: 'GET',
        headers: {
          'X-Requested-With': 'xmlhttprequest'
        }
      })
      .then(function(response) {
        return response.text();
      })
      .then(function(html) {
        const drawer = document.querySelector('#CartDrawer')
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        drawer.innerHTML = doc.querySelector('#CartDrawer').innerHTML;
        document.querySelector('cart-drawer').classList.remove('is-empty')
      });
    }

    updateCounter(number){

    }
  })
}