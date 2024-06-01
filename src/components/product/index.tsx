import AsyncStorage from "@react-native-async-storage/async-storage";
import bag from "../../assets/bag.svg";
import { toast } from "react-toastify";

export default function Product({
  setModal,
  product,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  product: {
    id: number;
    brand: string;
    name: string;
    price: string;
    photo: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}) {
  async function handleAddProduct(product: {
    id: number;
    brand: string;
    name: string;
    price: string;
    photo: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }) {
    try {
      const getCart = await AsyncStorage.getItem("shoppingCart");
      if (getCart) {
        const cart = JSON.parse(getCart);
        const findProduct = cart.find((item: any) => item.id === product.id);
        if (findProduct) {
          throw new Error("Produto já está ao carrinho");
        }
        cart.push({ ...product, quantity: 1 });
        await AsyncStorage.setItem("shoppingCart", JSON.stringify(cart));
      } else {
        await AsyncStorage.setItem(
          "shoppingCart",
          JSON.stringify([{ ...product, quantity: 1 }])
        );
      }

      toast.success("Produto adicionado ao carrinho", {
        theme: "colored",
        autoClose: 3000,
        position: "bottom-center",
        pauseOnHover: false,
      });
      setModal(true);
    } catch (error: any) {
      toast.error(error.message, {
        theme: "colored",
        autoClose: 3000,
        position: "bottom-center",
      });
    }
  }
  return (
    <div className="product">
      <img src={product.photo} alt={`img ${product.name}`} />
      <div className="info">
        <div>
          <h1>{product.name}</h1>
          <p className="price">R${product.price.split(".")[0]}</p>
        </div>
        <p className="description">{product.description}</p>
      </div>
      <button
        onClick={() => handleAddProduct(product)}
        className="buttonBag"
        type="button"
      >
        <img src={bag} alt="" />
        COMPRAR
      </button>
    </div>
  );
}
