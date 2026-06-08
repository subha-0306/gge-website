import ServiceDetailTemplate from "./ServiceDetailTemplate";
import { servicesData } from "./servicesData";

export default function ProfessionalLoan() {
  return <ServiceDetailTemplate service={servicesData["professional-loans"]} />;
}
