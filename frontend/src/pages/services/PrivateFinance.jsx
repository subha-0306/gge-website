import ServiceDetailTemplate from "./ServiceDetailTemplate";
import { servicesData } from "./servicesData";

export default function PrivateFinance() {
  return <ServiceDetailTemplate service={servicesData["private-finance"]} />;
}
