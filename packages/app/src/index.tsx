import React, { useCallback } from "react";

export default function App() {
  const setVolume = useCallback(
    (volume: number) => fetch(`setVolume?volume=${volume}`),
    [],
  );

  return (
    <section>
      <main>volume</main>
      {[80, 90, 100, 120].map((volume, index) => (
        <button key={index} onClick={(e) => setVolume(volume)}>
          {volume}
        </button>
      ))}
    </section>
  );
}
