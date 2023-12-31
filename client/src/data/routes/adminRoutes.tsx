import AdministratorDashboard from "../../pages/admin/AdministratorDashboard";
import { Route } from "../../types";
import AdminViewMedicinesPage from "../../pages/admin/AdminViewMedicinesPage";
import ManageAdminsPage from "../../pages/admin/AdminAddAdminPage";
import AdminViewPharmacistRequestsPage from "../../pages/admin/AdminViewPharmacistRequestsPage";
import AdminViewPharmacistsPage from "../../pages/admin/AdminViewPharmacistsPage";
import AdminViewPatientsPage from "../../pages/admin/AdminViewPatientsPage";
import AdminViewPharmacistRegistrationRequest from "../../pages/admin/AdminViewPharmacistRegistrationRequest";
import AdminChangePasswordPage from "../../pages/admin/AdminChangePasswordPage";
import NotificationView from "../../pages/notification/NotificationView";
import AdminTotalSalesViewPage from "../../pages/admin/AdminTotalSalesViewPage";

export const adminDashboardRoute: Route = {
  path: "/admin/dashboard",
  element: <AdministratorDashboard />
};

export const viewMedicinesRoute: Route = {
  path: "/admin/view-medicines",
  element: <AdminViewMedicinesPage />
};

export const addAdminRoute: Route = {
  path: "/admin/add-admins",
  element: <ManageAdminsPage />
};

export const viewPharmacistRegistrationRequestsRoute: Route = {
  path: "/admin/pharmacist-registration-requests",
  element: <AdminViewPharmacistRequestsPage />
};

export const viewPharmacistsRoute: Route = {
  path: "/admin/view-pharmacists",
  element: <AdminViewPharmacistsPage />
};

export const viewPatientsRoute: Route = {
  path: "/admin/view-patients",
  element: <AdminViewPatientsPage />
};
export const viewPharmacistRequestRoute: Route = {
  path: "/admin/view-pharmacist-request",
  element: <AdminViewPharmacistRegistrationRequest />
};

export const changeAdminPasswordsRoute: Route = {
  path: "/admin/change-password",
  element: <AdminChangePasswordPage />
};


export const adminViewNotificationRoute: Route = {
  path: "/admin/notification/view",
  element: <NotificationView />
};
export const adminViewTotalSalesRoute: Route = {
  path: "/admin/view-total-sales",
  element: <AdminTotalSalesViewPage />
};

const adminRoutes: Route[] = [
  adminDashboardRoute,
  viewMedicinesRoute,
  addAdminRoute,
  viewPharmacistRegistrationRequestsRoute,
  viewPharmacistsRoute,
  viewPatientsRoute,
  changeAdminPasswordsRoute,
  viewPharmacistRequestRoute,
  adminViewNotificationRoute,
  adminViewTotalSalesRoute
];

export default adminRoutes;
