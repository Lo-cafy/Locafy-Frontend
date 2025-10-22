import { useState, useEffect } from "react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select } from "../../ui/select";
import { Alert } from "../../ui/AlertProps";
import api from "@/Api/baseurl";
import { SelectContent, SelectItem, SelectTrigger } from "@radix-ui/react-select";

type AvailabilityStatus = "available" | "busy";

export default function Preference() {
  const [availabilityStatus, setAvailabilityStatus] = useState<AvailabilityStatus>("available");
  const [isOnVacation, setIsOnVacation] = useState(false);
  const [vacationStart, setVacationStart] = useState("");
  const [vacationEnd, setVacationEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Optional: Fetch current availability on mount
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await api.get("/users/business/availability");
        setAvailabilityStatus(res.data.availabilityStatus);
        setIsOnVacation(res.data.isOnVacation);
        setVacationStart(res.data.vacationStartDate || "");
        setVacationEnd(res.data.vacationEndDate || "");
      } catch {
        console.log("Failed to fetch availability");
      }
    };
    fetchAvailability();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setAlert(null);
    try {
      await api.patch("/users/business/availability", {
        availabilityStatus,
        isOnVacation,
        vacationStartDate: vacationStart || null,
        vacationEndDate: vacationEnd || null,
      });
      setAlert({ type: "success", message: "Availability updated successfully!" });
    } catch {
      setAlert({ type: "error", message: "Failed to update availability." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white border p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Availability Settings</h2>

      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-2">Availability Status</label>
        <Select value={availabilityStatus} onValueChange={(value: AvailabilityStatus) => setAvailabilityStatus(value)}>
        <SelectTrigger>{availabilityStatus}</SelectTrigger>
        <SelectContent>
        <SelectItem value="available">Available</SelectItem>
        <SelectItem value="busy">Busy</SelectItem>
       </SelectContent>
       </Select>

        </div>

        <div>
          <label className="block text-gray-700 mb-2">On Vacation?</label>
          <select
            value={isOnVacation ? "yes" : "no"}
            onChange={(e) => setIsOnVacation(e.target.value === "yes")}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {isOnVacation && (
          <>
            <div>
              <label className="block text-gray-700 mb-2">Vacation Start</label>
              <Input type="date" value={vacationStart} onChange={(e) => setVacationStart(e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Vacation End</label>
              <Input type="date" value={vacationEnd} onChange={(e) => setVacationEnd(e.target.value)} />
            </div>
          </>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Card>
  );
}
