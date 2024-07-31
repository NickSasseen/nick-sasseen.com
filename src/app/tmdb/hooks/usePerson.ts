import { useEffect, useState } from "react";
import TMDBApi from "../api";

const usePerson = (id: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [person, setPerson] = useState<any>();

  useEffect(() => {
    TMDBApi.People.Details(id)
      .then((val) => setPerson(val))
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return { loading, person };
};

export default usePerson;
