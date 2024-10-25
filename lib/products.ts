export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
  }
  
  export const products: Product[] = [
    { id: 1, name: "Polera blanca", price: 15000, image: "/imagenes/polera_blanca.jpg", category: "Camisetas" },
    { id: 2, name: "jeans azules", price: 20000, image: "/imagenes/jeans.jpg", category: "Pantalones" },
    { id: 3, name: "Vestido Floral", price: 35000, image: "/imagenes/vestido_floral.jpg", category: "Vestidos" },
    { id: 4, name: "Chaqueta de Cuero", price: 70000, image: "/imagenes/chaqueta_cuero.jpg", category: "Chaquetas" },
    { id: 5, name: "Camisa de Lino", price: 25000, image: "/imagenes/camisa_de_lino.jpg", category: "Camisas" },
    { id: 6, name: "Falda Plisada", price: 10000, image: "/imagenes/falda_plisada.jpg", category: "Faldas" },
    { id: 7, name: "Poleron con gorro", price: 15000, image: "/imagenes/poleron_gorro.jpg", category: "Sudaderas" },
    { id: 8, name: "Blazer Elegante mujer", price: 14000, image: "/imagenes/blazer.jpg", category: "Chaquetas" },
  ]
  
  export const categories = Array.from(new Set(products.map(product => product.category)))