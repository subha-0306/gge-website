import ServiceDetailTemplate from "./ServiceDetailTemplate";
import { servicesData } from "./servicesData";

export default function ChequeBasedFinance() {
  return <ServiceDetailTemplate service={servicesData["cheque-based-finance"]} />;
}
