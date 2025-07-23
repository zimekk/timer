import React, { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("auth")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <>
      <h1>Api</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
