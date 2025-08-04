import { useFormik } from "formik";
import axios from "axios";

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

  return (
    <form onSubmit={formik.handleSubmit} className="card bg-base-100 shadow-md p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="roomNumber"
          onChange={formik.handleChange}
          value={formik.values.roomNumber}
          placeholder="Room Number"
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          name="price"
          onChange={formik.handleChange}
          value={formik.values.price}
          placeholder="Price"
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          name="floor"
          onChange={formik.handleChange}
          value={formik.values.floor}
          placeholder="Floor"
          className="input input-bordered w-full"
        />

        <select
          name="type"
          onChange={formik.handleChange}
          value={formik.values.type}
          className="select select-bordered w-full"
          required
        >
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="suite">Suite</option>
        </select>

        <select
          name="status"
          onChange={formik.handleChange}
          value={formik.values.status}
          className="select select-bordered w-full"
        >
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="cleaning">Cleaning</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <textarea
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
        placeholder="Description"
        className="textarea textarea-bordered w-full"
      />

      <button type="submit" className="btn btn-primary w-full md:w-auto">
        {mode === "edit" ? "Update" : "Create"} Room
      </button>
    </form>
  );
}
