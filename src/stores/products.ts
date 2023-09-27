import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type ProductStore = {
  products: Product[];
  totalItems: number;
  totalPrice: number;
  showCartModal: boolean;
  addAProduct: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  toggleCartModal: () => void;
};

type Product = {
  title: string;
  id: number;
  price: number;
  coverImage: string;
  quantity?: number;
};

type MyPersist = (
  config: StateCreator<ProductStore>,
  options: PersistOptions<ProductStore>
) => StateCreator<ProductStore>;

export const useProductStore = create<ProductStore, []>(
  (persist as MyPersist)(
    (set, get): ProductStore => ({
      products: [],
      totalItems: 0,
      totalPrice: 0,
      showCartModal: false,
      addAProduct: (product) => {
        const { products, totalPrice, totalItems } = get();
        const findProduct = products.find((p) => p.id === product.id);
        if (findProduct) {
          findProduct.quantity! += 1;
        } else {
          products.push({ ...product, quantity: 1 });
        }
        set({
          products,
          totalPrice: totalPrice + product.price,
          totalItems: totalItems + 1,
        });
      },
      removeFromCart: (product) => {
        const { products, totalItems, totalPrice } = get();
        const indexOfProduct = products.findIndex((p) => p.id === product.id);
        if (products[indexOfProduct].quantity! > 1) {
          products[indexOfProduct].quantity! -= 1;
        } else {
          products.splice(indexOfProduct, 1)
        }
        set({
          products,
          totalItems: totalItems - 1,
          totalPrice: totalPrice - product.price,
          showCartModal: products.length > 0
        });
      },
      toggleCartModal: () => {
        const { showCartModal } = get();
        set({ showCartModal: !showCartModal });
      },
    }),
    {
      name: "product-store",
    }
  )
);
