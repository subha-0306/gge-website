import ServiceDetailTemplate from "./ServiceDetailTemplate";
import { servicesData } from "./servicesData";

export default function CheckBasedFinance() {
  return <ServiceDetailTemplate service={servicesData["check-based-finance"]} />;
}
