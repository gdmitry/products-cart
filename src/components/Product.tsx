import React, { ReactElement, memo } from 'react'
import { ProductType } from '../context/ProductsProvider'
import { ReducerActionType, ReducerAction } from '../context/CartProvider'


type PropsType = {
  product: ProductType,
  dispatch: React.Dispatch<ReducerAction>,
  REDUCER_ACTIONS: ReducerActionType,
  inCart: boolean,
}

const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart }: PropsType): ReactElement => {
  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href; // Load product thum
  console.log(img)

  const onAddToCart = () => dispatch({
    type: REDUCER_ACTIONS.ADD, payload: {
      ...product, qty: 1,
    }
  });

  const itemInCart = inCart ? ' → Item in Cart: ✅' : null


  return (
    <article className="product">
      <h3>{product.name}</h3>
      <img src={img} alt={product.name} />
      <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}{itemInCart}</p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </article>
  )
}

// export default Product
function areProductsEqual({ product: prevItem, inCart: prevInCart }: PropsType, { product: nextItem, inCart: nextInCart }: PropsType) {
  return Object.keys(prevItem).every(key => {
    return prevItem[key as keyof ProductType] ===
      nextItem[key as keyof ProductType];
  }) && prevInCart === nextInCart;
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;