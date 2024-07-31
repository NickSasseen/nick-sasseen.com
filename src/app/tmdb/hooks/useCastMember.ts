import { useEffect, useState } from "react";
import TMDBApi from "../api";

const useCastMember = (id: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [castMember, setCastMember] = useState<any>();

  useEffect(() => {
    TMDBApi.Credits.Details(id)
      .then((val) => setCastMember(val))
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return { loading, castMember };
};

export default useCastMember;
