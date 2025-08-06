import { useFormik } from "formik";
import axios from "axios";
import { Card, Input, Select, Button, Textarea } from "../ui";

export default function RoomForm({ initialValues, onSuccess, mode = "create" }) {
  const formik = useFormik({
    initialValues: initialValues || {
      roomNumber: "",
      type: "single",
      status: "available",
      price: "",
      floor: "",
      description: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (mode === "edit") {
          await axios.put(`/api/rooms/${values._id}`, values);
        } else {
          await axios.post("/api/rooms", values);
        }
        onSuccess();
        resetForm();
      } catch (err) {
        console.error("Room save error:", err);
      }
    },
  });

  const roomTypes = [
    { value: "single", label: "Single" },
    { value: "double", label: "Double" },
    { value: "suite", label: "Suite" }
  ];

  const roomStatuses = [
    { value: "available", label: "Available" },
    { value: "occupied", label: "Occupied" },
    { value: "cleaning", label: "Cleaning" },
    { value: "maintenance", label: "Maintenance" }
  ];

  return (
    <Card title={`${mode === "edit" ? "Update" : "Create"} Room`}>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Room Number"
            name="roomNumber"
            placeholder="Enter room number"
            value={formik.values.roomNumber}
            onChange={formik.handleChange}
            required
          />

          <Input
            label="Price"
            name="price"
            type="number"
            placeholder="Enter price per night"
            value={formik.values.price}
            onChange={formik.handleChange}
            required
          />

          <Input
            label="Floor"
            name="floor"
            type="number"
            placeholder="Enter floor number"
            value={formik.values.floor}
            onChange={formik.handleChange}
          />

          <Select
            label="Room Type"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            options={roomTypes}
            required
          />

          <Select
            label="Status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            options={roomStatuses}
            className="md:col-span-1"
          />
        </div>

        <Textarea
          label="Description"
          name="description"
          placeholder="Enter room description (optional)"
          value={formik.values.description}
          onChange={formik.handleChange}
          rows={3}
        />

        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            {mode === "edit" ? "Update" : "Create"} Room
          </Button>
        </div>
      </form>
    </Card>
  );
}
