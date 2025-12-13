import { Box, Button, Divider, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, Tbody, Td, Th, Thead, Tr, Text,} from "@chakra-ui/react";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const OrderInvoiceModal = ({ isOpen, onClose, order }) => {
  const pdfRef = useRef();
  const d = order?.order_details;

  const downloadPDF = async () => {
    const canvas = await html2canvas(pdfRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice_${d?.order_id}.pdf`);
    onClose();
  };

  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Invoice</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box ref={pdfRef} p={6} bg="white">
            {/* HEADER */}
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontSize="2xl" fontWeight="bold">CropX Genetics Pvt Ltd</Text>
                <Text fontSize="sm">Rajasthan, India</Text>
              </Box>
              <Box textAlign="right">
                <Text fontWeight="bold">INVOICE</Text>
                <Text fontSize="sm">Order ID: {d?.order_id}</Text>
                <Text fontSize="sm">
                  Date: {new Date(d?.created_at).toLocaleDateString()}
                </Text>
              </Box>
            </Flex>

            <Divider my={4} />

            {/* BILLING */}
            <Box mb={4}>
              <Text fontWeight="bold" mb={1}>Invoice To:</Text>
              <Text>{d?.name}</Text>
              <Text>{d?.street_name}</Text>
              <Text>{d?.city}, {d?.state} - {d?.pincode}</Text>
              <Text>Phone: {d?.phone_number}</Text>
            </Box>

            {/* ITEMS TABLE */}
            <Table variant="simple" size="sm">
              <Thead bg="gray.100">
                <Tr>
                  <Th>Description</Th>
                  <Th isNumeric>Qty</Th>
                  <Th isNumeric>Price</Th>
                  <Th isNumeric>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {order?.order_items?.map((item) => {
                  const isMultipack = !!item?.multipack_id;
                  const description = isMultipack
                    ? `${item.product_name} (Multipack: ${item.mp_pack_quantity} × ${item.v_quantity_value}${item.v_quantity_type})`
                    : `${item.product_name} (${item.v_quantity_value}${item.v_quantity_type})`;

                  const price = isMultipack
                    ? item.mp_discounted_price
                    : item.item_price;

                  return (
                    <Tr key={item.order_item_id}>
                      <Td>{description}</Td>
                      <Td isNumeric>{item.order_quantity}</Td>
                      <Td isNumeric>₹{price}</Td>
                      <Td isNumeric>₹{item.item_total_price}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>

            <Divider my={4} />

            {/* TOTALS */}
            <Flex justify="flex-end">
              <Box w="300px">
                <Flex justify="space-between">
                  <Text>Subtotal</Text>
                  <Text>₹{d?.subtotal}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text>Delivery Fee</Text>
                  <Text>₹{d?.delivery_fee}</Text>
                </Flex>
                <Divider my={2} />
                <Flex justify="space-between" fontWeight="bold">
                  <Text>Total</Text>
                  <Text>₹{d?.total_amount}</Text>
                </Flex>
              </Box>
            </Flex>

            <Text mt={6} textAlign="center" fontSize="sm">
              Thank you for your purchase!
            </Text>
          </Box>

          <Button mt={4} colorScheme="blue" onClick={downloadPDF} w="full">
            Download Invoice PDF
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OrderInvoiceModal;