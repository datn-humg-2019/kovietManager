import User from "./User";
import OnApp from "./OnApp";
import Home from "./Home";
import Debt from "./Debt";
import Sale from "./Sale";
import Profit from "./Profit";
import Inventory from "./Inventory";

const stores = {
  User,
  OnApp,
  Home,
  Inventory,
  Profit,
  Sale,
  Debt,
};

export default {
  ...stores
};
