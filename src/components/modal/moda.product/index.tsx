import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ModalProduct({
  getCart,
  product,
}: {
  getCart: () => void;
  product: {
    id: number;
    photo: string;
    name: string;
    price: string;
    quantity: number;
  };
}) {
  async function changeQty(type: string) {
    try {
      const cart = JSON.parse(
        (await AsyncStorage.getItem("shoppingCart")) || "[]"
      );

      const productIndex = cart.findIndex(
        (item: any) => item.id === product.id
      );

      if (productIndex !== -1) {
        if (type === "sum") {
          cart[productIndex].quantity += 1;
        } else if (type === "minus" && cart[productIndex].quantity > 1) {
          cart[productIndex].quantity -= 1;
        }

        await AsyncStorage.setItem("shoppingCart", JSON.stringify(cart));
      }
      getCart();
    } catch (error: any) {
      console.error(error);
    }
  }

  async function handleRemoveProduct() {
    try {
      const cart = JSON.parse(
        (await AsyncStorage.getItem("shoppingCart")) || "[]"
      );

      const newCart = cart.filter((item: any) => item.id !== product.id);

      await AsyncStorage.setItem("shoppingCart", JSON.stringify(newCart));
      getCart();
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    <div className="productModal">
      <button onClick={handleRemoveProduct} className="buttonX">
        X
      </button>
      <img src={product.photo} alt={`img ${product.name}`} />
      <h1>{product.name}</h1>

      <div>
        <p>Qtd:</p>
        <div className="qtd">
          <h3 onClick={() => changeQty("minus")} className="changeQty">
            -
          </h3>
          <h3 className="quantity">{product.quantity}</h3>
          <h3 onClick={() => changeQty("sum")} className="changeQty">
            +
          </h3>
        </div>
      </div>
      <h2>R${Number(product.price) * product.quantity}</h2>
    </div>
  );
}
