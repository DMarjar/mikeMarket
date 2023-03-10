import React from "react";
import { useFormik } from "formik";
import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import * as yup from "yup";
import AxiosClient from "../../../shared/plugins/axios";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

import Alert, {
  confirmMsj,
  confirmTitle,
  errorMsj,
  errorTitle,
  successMsj,
  successTitle,
} from "../../../shared/plugins/alerts";

export const EditCategoryForm = ({
  isOpen,
  setCategories,
  onClose,
  category,
}) => {
  console.log(category);

  const form = useFormik({
    initialValues: {
      name: "",
      status: true,
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("El nombre es obligatorio")
        .min(4, "El nombre debe tener al menos 4 caracteres"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      Alert.fire({
        title: confirmTitle,
        text: confirmMsj,
        icon: "question",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3b82f6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        backdrop: true,
        showCancelButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Alert.isLoading(),
        preConfirm: async () => {
          try {
            const response = await AxiosClient({
              method: "PUT",
              url: `/category/${category.id}`,
              data: JSON.stringify(values),
            });
            if (!response.error) {
              setCategories((categories) => [response.data, ...categories]);
              Alert.fire({
                title: successTitle,
                text: successMsj,
                icon: "success",
                confirmButtonColor: "#3b82f6",
                confirmButtonText: "Aceptar",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleClose();
                }
              });
            }
            return response;
          } catch (error) {
            Alert.fire({
              title: errorTitle,
              text: errorMsj,
              icon: "error",
              confirmButtonColor: "#3b82f6",
              confirmButtonText: "Aceptar",
            }).then((result) => {
              if (result.isConfirmed) {
                handleClose();
              }
            });
          }
        },
      });
    },
  });

  React.useMemo(() => {
    const { name, id, status } = category;
    form.values.name = name;
    form.values.id = id;
    form.values.status = status;
  }, [category]);

  const handleClose = () => {
    form.resetForm();
    onClose();
  };
  return (
    <Modal
      backdrop="static"
      keyboard={false}
      show={isOpen}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={form.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="name"
              placeholder={category.name}
              value={form.values.name}
              onChange={form.handleChange}
            />
            {form.errors.name && (
              <span className="error-text">{form.errors.name}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Row>
              <Col className="text-end">
                <Button
                  className="me-2"
                  variant="outline-danger"
                  onClick={handleClose}
                >
                  <FeatherIcon icon="x" />
                  &nbsp;Cancelar
                </Button>
                <Button
                  className="me-2"
                  variant="outline-success"
                  type="submit"
                >
                  <FeatherIcon icon="save" />
                  &nbsp;Guardar
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
