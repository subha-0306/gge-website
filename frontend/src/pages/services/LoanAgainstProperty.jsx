import ServiceDetailTemplate from "./ServiceDetailTemplate";
import { servicesData } from "./servicesData";

export default function LoanAgainstProperty() {
  return <ServiceDetailTemplate service={servicesData["loan-against-property"]} />;
}
