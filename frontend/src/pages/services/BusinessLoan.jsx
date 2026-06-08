import ServiceDetailTemplate from "./ServiceDetailTemplate";
import { servicesData } from "./servicesData";

export default function BusinessLoan() {
  return <ServiceDetailTemplate service={servicesData["business-loans"]} />;
}
