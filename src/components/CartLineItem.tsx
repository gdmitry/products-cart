import React, { ChangeEvent, ReactElement, memo } from 'react'
import { CartItemType, ReducerAction, ReducerActionType } from '../context/CartProvider'

type PropsType = {
  item: CartItemType,
  dispatch: React.Dispatch<ReducerAction>,
  REDUCER_ACTIONS: ReducerActionType,
}

function CartLineItem({ item, dispatch, REDUCER_ACTIONS }: PropsType) {
  const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url).href; // Load product thum
  
  const lineTotal: number = (item.qty * item.price);

  const highestQty: number = 20 > item.qty ? 20 : item.qty; // limit highest qty

  const optionValues: number[] = [...Array(highestQty).keys()].map(i => i + 1); // fill qty dropdown

  const options: ReactElement[] = optionValues.map(val => {
    return <option key={`opt${val}`} value={val}>{val}</option>
  });

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) }
    })
  }

  const onRemoveFromChart = () => dispatch({
    type: REDUCER_ACTIONS.REMOVE,
    payload: item,
  })
  console.log(img)
  
  const content = (
    <li className="cart__item">
      <img src={img} alt={item.name} className="cart__img" />
      <div aria-label="Price Per Item">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
        .format(item.price)}</div>
      <label htmlFor="itemQty" className="offscreen">Item Qty</label>
      <select
        name="itemQty"
        id="itemQty"
        className="cart__select"
        value={item.qty}
        aria-label="Item Quantity"
        onChange={onChangeQty}>
        {options}
      </select>
      <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
          .format(lineTotal)}
      </div>
      <button className="cart__button"
        aria-label="Remove Item From Cart"
        title="Remove Item From Cart"
        onClick={onRemoveFromChart}>
        ❌
      </button>
    </li>
  )
  return content;
}

// export default CartLineItem
function areItemsEqual({ item: prevItem }: PropsType, { item: nextItem }: PropsType) {
  return Object.keys(prevItem).every(key => {
    return prevItem[key as keyof CartItemType] ===
      nextItem[key as keyof CartItemType];
  });
}
const MemoizedCartItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual);


export default MemoizedCartItem;