import Header from "./components/Header"
import Footer from "./components/Footer"
import ProductList from "./components/ProductList"
import Cart from "./components/Cart"
import { useState } from "react";
import Counter from "./components/Counter";
import { CounterProvider, initState } from "./context/CounterProvider";


function App() {
  const [viewCart, setViewCart] = useState<boolean>(false);
  const pageContent = viewCart ? <Cart /> : <ProductList />;

  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {pageContent}
      <CounterProvider count={initState.count} text={initState.text}>
        <Counter />
      </CounterProvider>
      <Footer viewCart={viewCart} />
    </>
  )
  return content;
}

export default App
