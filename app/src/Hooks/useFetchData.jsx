import React, { useEffect, useState } from "react";

export const useFetchData = (url) => {
  const [data, setdata] = useState([]);
  const [error, seterror] = useState("");
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    setisLoading(true);
    fetch(url)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Fetch Error");
      })
      .then((dt) => setdata(dt))
      .catch((err) => seterror(err.message || "Error"))
      .finally(() => setisLoading(false));
  }, [url]);

  return [data, error, isLoading];
};
