import { useState } from "react";

import TestingImports from "./components/TestingImports";

export default function Home() {

  const [state, setState] = useState()
  return (
    <div className="">  
      Hola    
      <TestingImports />
    </div>
  );
}
