import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { useState, useEffect } from "react";

type ShoppingCartProps = {
  isOpen: boolean;
};
interface Products {
  id: number;
  title: string;
  images: string[];
  price: number;
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const { closeCart, cartItems } = useShoppingCart();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total {"$"}
            {cartItems.reduce((total, cartItem) => {
              const item = products.find((i) => i.id === cartItem.id);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0)}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
