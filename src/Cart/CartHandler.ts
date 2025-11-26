import { useState } from "react";
import { useSelector } from "react-redux";
import { Cart } from "../Type/Type";
import { useDispatch } from "react-redux";
import { setIsColor, setSelected, setSize, setItemColor } from "../features/uiSlice";
import { addToCart } from "../features/cartSlice";
import { supabase } from "../supabaseCl";
import NotificationCard from "../Notification/NotificationCard";

export default function useCartHandler() {
  const [warning, setWarning] = useState("");
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const { isColor, selected, itemSize, itemColor } = useSelector((state: any) => state.ui);
  const cartListItem = useSelector((state: any) => state.cart.cartItems);

  
  const dispatch = useDispatch();
  async function handleCart({
    id,
    price,
    name,
    image,
    quantity,
    requireSelection = true,
   
  }: {
    id: string | number;
    price: number;
    name: string;
    image: string;
    quantity: number;
    requireSelection?: boolean;
  
  }) {

     const {
      data: { user },
    } = await supabase.auth.getUser();
    const authUserId = user?.id;

    if (requireSelection) {
      if (!itemColor && !itemSize) {
        setWarning("Please select both color and size before adding to cart");
        return;
      }
      if (!itemColor) {
        setWarning("Please select a color before adding to cart");
        return;
      }
      if (!itemSize) {
        setWarning("Please select a size before adding to cart");
        return;
      }
    }
   
    const cart: Cart = {
      id: id,
      price: price,
      name: name,
      image: image,
      quantity: quantity,
      totalPrice: price * quantity,
      itemSize: itemSize,
      itemColor: itemColor,
      date: new Date().toLocaleDateString(),
      user_id: authUserId
    };

    const existing = cartListItem.find((item: Cart) => item.id === id);
    if (existing) {
      setMessage("Item already in cart, updating quantity");
    } else {
      setMessage("Item added to cart");
    }

    dispatch(addToCart(cart));
    setQuantity(1);
    dispatch(setIsColor(false));
    dispatch(setSelected(null));
    dispatch(setItemColor(""));
    dispatch(setSize(""));
    setWarning("");
  }
  return { handleCart, message, warning, setMessage, setWarning, setQuantity, quantity };
}
