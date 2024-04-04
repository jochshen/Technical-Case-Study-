import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import { useState, useEffect } from "react";
import storeItems from "../data/items.json";

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
      // Make the API call and populate products state
      fetch("https://dummyjson.com/products")
        .then((response) => response.json()) // Parse the JSON response
        .then((data) => {
          // Assuming data is an array of products
          console.log(data);
          setProducts(data.products);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }, []); // Empty dependency array ensures useEffect runs only once on component mount
    
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
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = products.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
