import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import ModalProduct from "./moda.product";

export default function Modal({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [cart, setCart] = useState([]);
  async function getCart() {
    const shoppingCart = await AsyncStorage.getItem("shoppingCart");
    if (shoppingCart) {
      setCart(JSON.parse(shoppingCart));
    }
  }
  useEffect(() => {
    getCart();
  }, []);
  return (
    <div className="modal">
      <div className="modalHeader">
        <h2 className="modalTitle">Carrinho de compras</h2>
        <button className="buttonX" onClick={() => setOpen(false)}>
          X
        </button>
      </div>
      <div className="modalBody">
        {cart.length > 0 ? (
          cart.map((product, key) => {
            return (
              <ModalProduct getCart={getCart} product={product} key={key} />
            );
          })
        ) : (
          <p className="emptyCart">Seu carrinho esta vazio</p>
        )}
      </div>
    </div>
  );
}
