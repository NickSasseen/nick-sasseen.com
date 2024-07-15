import { useEffect, useState } from "react";
import TMDBApi from "../api";

const useCollection = (id: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [collection, setCollection] = useState<any>();

  useEffect(() => {
    TMDBApi.Collections.Details(id)
      .then((val) => setCollection(val))
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return { loading, collection };
};

export default useCollection;
