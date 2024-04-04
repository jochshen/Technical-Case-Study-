import { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";

interface Products {
  id: number;
  title: string;
  images: string[];
  price: number;
  category: string;
}

export function Store() {
  const [products, setProducts] = useState<Products[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

//   handle user input to search bar 
  const handleSearch = (e: any) => {
    e.preventDefault();
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    console.log(searchQuery);
  };

//   create filtered array based on current searchQuery
  const filteredProducts = products.filter(
    (product) =>
      String(product.title.toLowerCase()).includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <h1>Store</h1>
      <Form className="mb-3" onSubmit={(e) => e.preventDefault()}>
        <Form.Control
          type="text"
          placeholder="Search by name or categories (i.e. smartphone, skincare)"
          value={searchQuery}
          onChange={handleSearch}
        />
      </Form>
      {searchQuery === "" ? (
        <Row md={2} xs={1} lg={3} className="g-3">
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
