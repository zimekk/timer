import React, { Suspense } from "react";

const App = React.lazy(() => import("@dev/app"));

const Spinner = () => `loading...`;

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  );
}
