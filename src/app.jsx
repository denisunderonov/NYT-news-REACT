import Main from "./components/main/main";
import Header from "./components/header/header";
import { useEffect, useState } from "react";

export default function App() {
  const [likeCounter, setLikeCounter] = useState(0);

  useEffect(() => { }, [])

  return (
    <>
      <Header likeCounter={likeCounter}/>
      <Main setLikeCounter={setLikeCounter} likeCounter={likeCounter}/>
    </>
  );
}
