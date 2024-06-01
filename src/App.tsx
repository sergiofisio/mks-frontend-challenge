import { QueryClient, QueryClientProvider } from "react-query";

import "./App.scss";
import Header from "./components/header";
import Footer from "./components/footer";
import Body from "./components/body";
import { useEffect, useState } from "react";
import Modal from "./components/modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const queryClient = new QueryClient();

function App() {
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getCartInfo() {
      const shoppingCart = await AsyncStorage.getItem("shoppingCart");
      if (shoppingCart) {
        setCount(JSON.parse(shoppingCart).length);
      }
    }
    getCartInfo();
  }, [showModal]);

  return (
    <QueryClientProvider client={queryClient}>
      <Header setShowModal={setShowModal} count={count} />
      <Body setModal={setShowModal} />
      <Footer />
      {showModal && <Modal setOpen={setShowModal} />}
    </QueryClientProvider>
  );
}

export default App;
