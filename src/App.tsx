import Button from "./components/ui/button";
import { useProductStore } from "./stores/products";
import { Minus, PackagePlus, ShoppingBag } from "lucide-react";

const products = [
  {
    id: 1,
    title: "smart watch",
    coverImage:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2899&q=80",
    price: 200,
  },
  {
    id: 2,
    title: "airpods",
    coverImage:
      "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2448&q=80",
    price: 120,
  },
  {
    id: 3,
    title: "clock",
    coverImage:
      "https://images.unsplash.com/photo-1541480601022-2308c0f02487?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80",
    price: 15,
  },
  {
    id: 4,
    title: "pen",
    coverImage:
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2817&q=80",
    price: 8,
  },
  {
    id: 5,
    title: "shades",
    coverImage:
      "https://images.unsplash.com/photo-1584036553516-bf83210aa16c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3080&q=80",
    price: 10,
  },
  {
    id: 6,
    title: "sneakers",
    coverImage:
      "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2980&q=80",
    price: 40,
  },
];

function App() {
  return (
    <main>
      <CartButton />
      <Products />
    </main>
  );
}

function Products() {
  const { addAProduct } = useProductStore();

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="relative rounded-xl aspect-square overflow-hidden"
          >
            <p className="absolute bottom-3 left-3 text-xl font-light uppercase">
              {product.title}
            </p>
            <img
              src={product.coverImage}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-3">
              <p className="bg-gray-500 p-3 text-white rounded-2xl">
                {product.price}$
              </p>
              <Button onClick={() => addAProduct(product)}>
                <PackagePlus />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function CartButton() {
  const { totalItems, toggleCartModal } = useProductStore();

  return (
    <div className="relative w-full flex justify-end p-2">
      <Button onClick={toggleCartModal}>
        <ShoppingBag />
      </Button>
      {totalItems > 0 && (
        <p className="absolute text-sm top-2 font-light right-0 bg-white rounded-full w-5 h-5">
          {totalItems}
        </p>
      )}
      <CartModal />
    </div>
  );
}

function CartModal() {
  const { products, totalPrice, showCartModal, removeFromCart } =
    useProductStore();

  return (
    <>
      {showCartModal && products.length > 0 && (
        <div className="absolute w-52 aspect-square top-14 z-10 bg-white shadow-slate-200 shadow-lg p-2 rounded-lg flex flex-col justify-between">
          <div className="space-y-1">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center"
              >
                <p className="uppercase text-left text-xs">
                  <span>{product.quantity}x </span>
                  {product.title}
                </p>
                <button
                  className="text-xs h-max p-1"
                  onClick={() => removeFromCart(product)}
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs font-light">
            Total cost <span className="font-medium">{totalPrice}$</span>
          </p>
        </div>
      )}
    </>
  );
}

export default App;
