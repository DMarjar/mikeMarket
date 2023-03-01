import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { ButtonCircle } from "../../shared/components/ButtonCircle";
import DataTable from "react-data-table-component";
import { Loading } from "./../../shared/components/Loading";

export const CategoryScreen = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [filterText, setFilterText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Esto es para filtrar las categorias por el nombre que se escribe en el input
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col>Categories</Col>
          <Col className="text-end">
            <ButtonCircle
              type={"btn btn-outline-success"}
              icon={"plus"}
              size={16}
              onClick={() => {
                console.log("Add Category");
              }}
            />
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <DataTable
          columns={[]}
          data={categories}
          progressPending={isLoading}
          progressComponent={<Loading />}
          noDataComponent={"No data found"}
          pagination
          paginationComponentOptions={{}}
          subHeader
          subHeaderComponent={<></>}
          persistTableHead
          striped={true}
          highlightOnHover={true}
        />
      </Card.Body>
    </Card>
  );
};
