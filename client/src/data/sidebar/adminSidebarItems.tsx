import {
  addAdminRoute,
  adminDashboardRoute,
  viewMedicinesRoute,
  viewPatientsRoute,
  viewPharmacistRegistrationRequestsRoute,
  viewPharmacistsRoute
} from "../routes/adminRoutes";
import AdminIcon from "@mui/icons-material/AdminPanelSettings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import MedicationIcon from "@mui/icons-material/Medication";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FeedIcon from "@mui/icons-material/Feed";

import { SidebarItem } from "../../types";

export const adminSidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: adminDashboardRoute.path,
    icon: <DashboardIcon />
  },
  {
    title: "Manage Users",
    icon: <ManageAccountsIcon />,
    items: [
      {
        title: "Patients",
        href: viewPatientsRoute.path,
        icon: <RecentActorsIcon />
      },
      {
        title: "Pharmacists",
        href: viewPharmacistsRoute.path,
        icon: <LocalPharmacyIcon />
      },
      {
        title: "Admins",
        href: addAdminRoute.path,
        icon: <AdminIcon />
      }
    ]
  },
  {
    title: "Registration Requests",
    icon: <FeedIcon />,
    items: [
      {
        title: "Pharmacists",
        href: viewPharmacistRegistrationRequestsRoute.path,
        icon: <LocalPharmacyIcon />
      }
    ]
  },
  {
    title: "System Services",
    icon: <SettingsSuggestIcon />,
    items: [
      {
        title: "Medicines",
        href: viewMedicinesRoute.path,
        icon: <MedicationIcon />
      }
    ]
  }
];
