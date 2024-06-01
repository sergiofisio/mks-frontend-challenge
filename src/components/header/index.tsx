import cart from "../../assets/cart.svg";

export default function Header({
  count,
  setShowModal,
}: {
  count: number;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <header>
      <div className="logo">
        <h1>MKS</h1>
        <h2>Sistemas</h2>
      </div>
      <div onClick={() => setShowModal(true)} className="cartCount">
        <img src={cart} alt="Carrinho de compras" />
        <span>{count}</span>
      </div>
    </header>
  );
}
