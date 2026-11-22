
import { Suspense } from "react";
import EditServiceForm from "./EditServiceForm";

export default function EditServicePage() {
  return (
    <Suspense
      fallback={<div className="p-6">Loading edit form...</div>}
    >
      <EditServiceForm />
    </Suspense>
  );
}
