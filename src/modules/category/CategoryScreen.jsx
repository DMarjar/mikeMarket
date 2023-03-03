import React, { useState, useEffect } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { ButtonCircle } from "../../shared/components/ButtonCircle";
import DataTable from "react-data-table-component";
import { Loading } from "./../../shared/components/Loading";
import AxiosClient from "./../../shared/plugins/axios";
import { FilterComponent } from "./../../shared/components/FilterComponent";

const options = {
  rowsPerPageText: "Categories per page",
  rangeSeparatorText: "of",
};

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await AxiosClient({ url: "/category" });
        if (!data.error) setCategories(data.data);
      } catch (error) {
        console.log("Error -> CategoryScreen.jsx -> fetchData -> ", error);
        // TODO: Handle error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Esto es para que el filtro se actualice cada vez que se escribe en el input y no todas las veces que se renderiza el componente
  const headerComponent = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText("");
      }
      return (
        <FilterComponent
          onFilter={(event) => setFilterText(event.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
      );
    };
  }, [filterText]);

  // Cabecera de la tabla
  const columns = React.useMemo(() => [
    {
      name: "#",
      cell: (row, index) => <div>{index + 1}</div>,
      sortable: true,
    },
    {
      name: "Category",
      cell: (row) => <div>{row.name}</div>,
      sortable: true,
      selector: (row) => row.name,
    },
    {
      name: "Status",
      cell: (row) =>
        row.status ? (
          <Badge bg="success">Active</Badge>
        ) : (
          <Badge bg="danger">Inactive</Badge>
        ),
      sortable: true,
      selector: (row) => row.status,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <ButtonCircle
            icon="edit"
            type={"btn btn-outline-warning btn-circle"}
            size={16}
            onClick={() => {
              setIsEditing(true);
              setSelectedCategory(row);
            }}
          />
          {row.status ? (
            <ButtonCircle
              icon="trash-2"
              type={"btn btn-outline-danger btn-circle"}
              size={16}
              onClick={() => {}}
            />
          ) : (
            <ButtonCircle
              icon="refresh-cw"
              type={"btn btn-outline-primary btn-circle"}
              size={16}
              onClick={() => {}}
            />
          )}
        </>
      ),
    },
  ]);

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
          columns={columns}
          data={filteredCategories}
          progressPending={isLoading}
          progressComponent={<Loading />}
          noDataComponent={"No categories found"}
          pagination
          paginationComponentOptions={options}
          subHeader
          subHeaderComponent={headerComponent}
          persistTableHead
          striped={true}
          highlightOnHover={true}
        />
      </Card.Body>
    </Card>
  );
};
