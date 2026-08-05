import api from "./api";

export const getReportSummary = () => {
  return api.get("/reports/summary");
};

export const getReportGraph = () => {
  return api.get("/reports/graph");
};