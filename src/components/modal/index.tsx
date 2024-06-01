import { motion } from "framer-motion";
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

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div className="modalContainer" onClick={() => setOpen(false)}>
      <motion.div
        className="modal"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
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
      </motion.div>
    </motion.div>
  );
}
