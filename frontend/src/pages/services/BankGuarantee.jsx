import ServiceDetailTemplate from "./ServiceDetailTemplate";
import { servicesData } from "./servicesData";

export default function BankGuarantee() {
  return <ServiceDetailTemplate service={servicesData["bank-guarantee"]} />;
}
