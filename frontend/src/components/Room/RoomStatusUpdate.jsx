import { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Card, Select, Button, Checkbox, Badge } from "../ui";

// Batch update room statuses using useFormik
export default function RoomStatusUpdate({ permissions }) {
	const [rooms, setRooms] = useState([]);
	const [loading, setLoading] = useState(false);
	const [updating, setUpdating] = useState(false);
	const canUpdate = permissions ? !!permissions.update_room : true;

	const loadRooms = async () => {
		setLoading(true);
		try {
			const res = await axios.get("/api/rooms");
			setRooms(res.data || []);
		} catch (err) {
			console.error("Failed to load rooms:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadRooms();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const roomStatuses = [
		{ value: "available", label: "Available" },
		{ value: "occupied", label: "Occupied" },
		{ value: "cleaning", label: "Cleaning" },
		{ value: "maintenance", label: "Maintenance" },
	];

	const formik = useFormik({
		initialValues: {
			status: "",
			selected: {}, // { [roomId]: boolean }
		},
		onSubmit: async (values, { resetForm }) => {
			const ids = Object.keys(values.selected).filter((id) => values.selected[id]);
			if (!ids.length || !values.status) return;
			setUpdating(true);
			try {
				const updates = ids.map((id) => axios.put(`/api/rooms/${id}`, { status: values.status }));
				const results = await Promise.allSettled(updates);
				const success = results.filter((r) => r.status === "fulfilled").length;
				const failed = results.length - success;
				if (failed > 0) {
					console.warn(`Some updates failed: ${failed}`);
				}
				await loadRooms();
				// Keep selections, but clear them by default for clarity
				resetForm({ values: { status: "", selected: {} } });
			} catch (err) {
				console.error("Batch update error:", err);
			} finally {
				setUpdating(false);
			}
		},
	});

	const allSelected = useMemo(() => {
		if (!rooms.length) return false;
		const ids = rooms.map((r) => r._id);
		return ids.every((id) => formik.values.selected[id]);
	}, [rooms, formik.values.selected]);

	const toggleAll = (checked) => {
		const next = { ...formik.values.selected };
		rooms.forEach((r) => {
			next[r._id] = checked;
		});
		formik.setFieldValue("selected", next);
	};

	const isSubmitDisabled = !canUpdate || updating || loading || !formik.values.status || !Object.values(formik.values.selected).some(Boolean);

	const getStatusBadge = (status) => {
		switch (status) {
			case "available":
				return "success";
			case "occupied":
				return "warning";
			case "cleaning":
				return "info";
			case "maintenance":
				return "error";
			default:
				return "neutral";
		}
	};

	return (
		<Card title="Batch Update Room Statuses">
			<form onSubmit={formik.handleSubmit} className="space-y-4">
				<div className="flex flex-col sm:flex-row gap-3 sm:items-end">
					<div className="sm:w-64">
						<Select
							label="New Status"
							name="status"
							value={formik.values.status}
							onChange={formik.handleChange}
							options={roomStatuses}
							placeholder="Select status"
							required
						/>
					</div>
					<div className="flex-1" />
					<div className="flex gap-2">
						<Button
							type="button"
							variant="neutral"
							onClick={() => toggleAll(!allSelected)}
							disabled={loading || updating || !rooms.length}
						>
							{allSelected ? "Deselect All" : "Select All"}
						</Button>
						<Button type="submit" variant="primary" disabled={isSubmitDisabled}>
							{updating ? "Updating..." : "Apply to Selected"}
						</Button>
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="table table-zebra">
						<thead>
							<tr>
								<th style={{ width: 48 }}></th>
								<th>Room</th>
								<th>Type</th>
								<th>Floor</th>
								<th>Status</th>
								<th>Price</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td colSpan={6}>
										<div className="text-center py-6 opacity-70">Loading rooms...</div>
									</td>
								</tr>
							) : rooms.length ? (
								rooms.map((room) => (
									<tr key={room._id}>
										<td>
											<Checkbox
												name={`selected.${room._id}`}
												checked={!!formik.values.selected[room._id]}
												onChange={(e) => formik.setFieldValue(`selected.${room._id}`, e.target.checked)}
												disabled={!canUpdate || updating}
											/>
										</td>
										<td className="font-medium">#{room.roomNumber}</td>
										<td className="capitalize">{room.type}</td>
										<td>{room.floor}</td>
										<td>
											<Badge size="sm" variant={getStatusBadge(room.status)} className="capitalize">
												{room.status}
											</Badge>
										</td>
										<td>${room.price}</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={6}>
										<div className="text-center py-6 opacity-70">No rooms found</div>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				{!canUpdate && (
					<div className="alert alert-warning">
						<span>You don't have permission to update rooms.</span>
					</div>
				)}
			</form>
		</Card>
	);
}