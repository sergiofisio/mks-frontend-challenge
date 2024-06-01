import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";
import TopBarProgress from "react-topbar-progress-indicator";
import { useEffect, useState } from "react";
import Product from "../product";

export default function Body({
  setModal,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(true);
  const fetchRepo = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_APP_URL
      }/products?page=1&rows=50&sortBy=id&orderBy=ASC`
    );
    return data;
  };

  const { isLoading, error, data } = useQuery("repoData", fetchRepo);

  useEffect(() => {
    const handleLoading = () => {
      if (isLoading) {
        toast.info("Colocando produtos na estante...", {
          progress: undefined,
          autoClose: false,
          closeButton: false,
          toastId: "loadingToast",
          theme: "colored",
        });
      } else {
        setTimeout(() => {
          setLoading(false);
          toast.dismiss("loadingToast");
        }, 5000);
      }
    };

    handleLoading();
  }, [isLoading, loading]);

  if (error)
    return toast.error(
      "Ocorreu um erropor favor entre com contato com o suporte",
      {
        theme: "colored",
        autoClose: 3000,
        position: "bottom-center",
      }
    );

  return (
    <div className="body">
      <div>
        {!isLoading &&
          (loading ? (
            <>
              <TopBarProgress />
              <div className="fixed top-0 left-0 z-50 w-full h-full bg-black opacity-50" />
            </>
          ) : (
            data.products.map((product: any) => {
              return (
                <Product
                  setModal={setModal}
                  product={product}
                  key={product.id}
                />
              );
            })
          ))}
      </div>
    </div>
  );
}
