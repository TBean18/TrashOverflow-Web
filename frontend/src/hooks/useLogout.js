import react, { useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";

export default function useLogout() {
  localStorage.clear();
  window.location.href = "/signin";
}
