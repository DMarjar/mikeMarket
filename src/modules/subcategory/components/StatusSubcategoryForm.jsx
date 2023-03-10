import React from "react";
import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert, {
  confirmMsj,
  confirmTitle,
  errorMsj,
  errorTitle,
  successMsj,
  successTitle,
} from "../../../shared/plugins/alerts";
import AxiosClient from "../../../shared/plugins/axios";

export const ChangeCategoryStatusModal = ({
  isOpen,
  onClose,
  category,
  status,
  setCategories,
}) => {
  const handleSubmit = async () => {
    try {
      const response = await AxiosClient({
        method: "PUT",
        url: `/category/${category.id}`,
        data: { ...category, status: !status },
      });
      if (!response.error) {
        setCategories((prevCategories) =>
          prevCategories.map((prevCategory) =>
            prevCategory.id === response.data.id ? response.data : prevCategory
          )
        );
        Alert.fire({
          title: successTitle,
          text: successMsj,
          icon: "success",
          confirmButtonColor: "#3b82f6",
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            onClose();
          }
        });
      }
    } catch (error) {
      Alert.fire({
        title: errorTitle,
        text: errorMsj,
        icon: "error",
        confirmButtonColor: "#3b82f6",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          onClose();
        }
      });
    }
  };

  return (
    <Modal
      backdrop="static"
      keyboard={false}
      show={isOpen}
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Cambiar estado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {status
          ? "¿Está seguro que desea desactivar la categoría?"
          : "¿Está seguro que desea activar la categoría?"}
      </Modal.Body>
      <Modal.Footer>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col className="text-end">
              <Button
                className="me-2"
                variant="outline-danger"
                onClick={onClose}
              >
                <FeatherIcon icon="x" />
                &nbsp;Cancelar
              </Button>
              <Button className="me-2" variant="outline-success" type="submit">
                <FeatherIcon icon="check" />
                &nbsp;Confirmar
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};
