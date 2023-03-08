import React from "react";
import { useFormik } from "formik";
import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import * as yup from "yup";
import AxiosClient from "../../../shared/plugins/axios";
import FeatherIcon from "feather-icons-react";

import Alert, {
  confirmMsj,
  confirmTitle,
  errorMsj,
  errorTitle,
  successMsj,
  successTitle,
} from "../../../shared/plugins/alerts";

export const CategoryForm = ({ isOpen, setCategories, onClose }) => {
  const form = useFormik({
    initialValues: {
      name: "",
      status: true,
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("El nombre es ")
        .min(4, "El nombre es de 4 caracteres"),
    }),
    onSubmit: async (values) => {
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
              method: "POST",
              url: "/category/",
              data: JSON.stringify(values),
            });
            if (!response.error) {
              setCategories((categories) => [
                response.data,
                ...categories.filter((category) => category.id !== values.id),
              ]);
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
        <Modal.Title>Registrar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={form.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="name"
              placeholder="Clazado"
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
                <Button className="me-2" variant="outline-success">
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
