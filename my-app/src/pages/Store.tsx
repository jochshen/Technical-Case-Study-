import { useState, useEffect, useRef } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";

interface Products {
  id: number;
  title: string;
  images: string[];
  price: number;
}

export function Store() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<Products[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [items, setItems] = useState<string[]>([]);

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

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    console.log(searchQuery);
  };
  const filteredProducts = products.filter((product) =>
    String(product.title.toLowerCase()).includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <h1>Store</h1>
      {/* Search bar */}
      <Form className="mb-3" onSubmit={(e) => e.preventDefault()}>
        <Form.Control
          type="text"
          placeholder="Search by product ID"
          value={searchQuery}
          onChange={handleSearch}
        />
      </Form>
      {searchQuery === "" ? (
        <Row md={2} xs={1} lg={3} className="g-3">
          {/* Render filtered products */}
          {products.map((product) => (
            <Col key={product.id}>
              <StoreItem product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <Row md={2} xs={1} lg={3} className="g-3">
          {filteredProducts.map((product) => (
            <Col key={product.id}>
              <StoreItem product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
