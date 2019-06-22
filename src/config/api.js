const api = {
  AUTH: {
    login: "/login",
    forgetPass: "/forgot-password",
    userInfo: "/user-info",
    changePass: "/change-pass",
    logout: "/logout"
  },

  REPORTS: {
    GetListBuysCount: "/list_buys_count",
    GetListBuysPrice: "/list_buys_price",
    GetListSalesCount: "/list_sales_count",
    GetListSalesPrice: "/list_sales_price",
    getChart: "/admin_chart_sales",
    GetListInventory: "/inventorys",
    GetListNotification: ""
  }
};

export default api;
