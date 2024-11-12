//class du produit
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

//calcul du prix total
class TotalPrice {
    constructor(product, quantity) {
        this.product = product;  // 
        this.quantity = quantity;
    }

    // Méthode pour calculer le prix total de cet élément (prix * quantité)
    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// l'ajout et la suppression des produits
class Shopping {
    constructor() {
        this.items = [];  // Tableau pour stocker les éléments du panier
    }

    // Ajouter un élément au panier
    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        
        if (existingItem) {
            // Si le produit est déjà dans le panier, on met à jour la quantité
            existingItem.quantity += quantity;
        } else {
            // Sinon, on crée un nouvel élément dans le panier (TotalPrice, pas Shopping)
            const newItem = new TotalPrice(product, quantity);
            this.items.push(newItem);
        }
    }

    // Supprimer un élément du panier en fonction de l'ID du produit
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    // Obtenir le total des éléments dans le panier
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Obtenir le total du prix des éléments dans le panier
    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    // Afficher les éléments du panier (pour des fins de test)
    displayCart() {
        this.items.forEach(item => {
            console.log(`${item.product.name} (x${item.quantity}) - ${item.getTotalPrice()}€`);
        });
    }
}

// Création de quelques produits
const robe = new Product(1, "Robe", 2.5);
const jupe = new Product(2, "Jupe", 1.2);
const escarpin = new Product(3, "Escarpin", 3.0);

// Création d'un panier
const cart = new Shopping();

// Ajouter des éléments au panier
cart.addItem(robe, 3);   // 3 robes
cart.addItem(jupe, 2);  // 2 jupes
cart.addItem(escarpin, 1);  // 1 escarpin

// Afficher le panier
console.log("Panier actuel:");
cart.displayCart();

// Afficher le total des articles
console.log(`Total des articles : ${cart.getTotalItems()}`);

// Afficher le prix total du panier
console.log(`Prix total du panier : ${cart.getTotalPrice()}€`);

// Supprimer un produit du panier (par exemple, supprimer la jupe)
cart.removeItem(2);

// Afficher le panier après suppression
console.log("Panier après suppression de la jupe:");
cart.displayCart();

// Afficher à nouveau le total des articles et le prix total
console.log(`Total des articles après suppression : ${cart.getTotalItems()}`);
console.log(`Prix total après suppression : ${cart.getTotalPrice()}€`);
