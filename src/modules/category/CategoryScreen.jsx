import React, { useEffect, useState } from "react";
import { Card, Col, Row, Badge } from "react-bootstrap";
import { ButtonCircle } from "../../shared/components/ButtonCircle";
import DataTable from "react-data-table-component";
import { Loading } from "./../../shared/components/Loading";
import { FilterComponent } from "./../../shared/components/FilterComponent";
import AxiosClient from "./../../shared/plugins/axios";
import { CategoryForm } from "./components/CategoryForm";
import { EditCategoryForm } from "./components/EditCategoryForm";

const options = {
  rowsPerPageText: "Registros por página",
  rangeSeparatorText: "de",
};
export const CategoryScreen = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [filterText, setFilterText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Esto es para filtrar las categorias por el nombre que se escribe en el input
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const data = await AxiosClient({ url: "/category/" });
      if (!data.error) {
        setCategories(data.data);
        setIsLoading(false);
      }
    } catch (error) {
      //Poner alerta del error
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const HeaderComponent = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) setFilterText("");
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText]);

  const columns = React.useMemo(() => [
    {
      name: "#",
      cell: (row, index) => <div>{index + 1}</div>,
      sortable: true,
    },
    {
      name: "Categoria",
      cell: (row) => <div>{row.name}</div>,
      sortable: true,
      selector: (row) => row.name,
    },
    {
      name: "Estado",
      cell: (row) =>
        row.status ? (
          <Badge bg="success">Activo</Badge>
        ) : (
          <Badge bg="danger">Inactivo</Badge>
        ),
      sortable: true,
      selector: (row) => row.status,
    },
    {
      name: "Acciones",
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
              onClick={() => {}}
              size={16}
            />
          ) : (
            <ButtonCircle
              icon="pocket"
              type={"btn btn-outline-success btn-circle"}
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
              onClick={() => setIsOpen(true)}
            />
            <CategoryForm
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              setCategories={setCategories}
            />
            <EditCategoryForm
              isOpen={isEditing}
              onClose={() => setIsEditing(false)}
              category={selectedCategory}
              setCategories={setCategories}
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
          noDataComponent={"No data found"}
          pagination
          paginationComponentOptions={options}
          subHeader
          subHeaderComponent={HeaderComponent}
          persistTableHead
          striped={true}
          highlightOnHover={true}
        />
      </Card.Body>
    </Card>
  );
};
