import ServiceDetailTemplate from "./ServiceDetailTemplate";
import { servicesData } from "./servicesData";

export default function WorkingCapital() {
  return <ServiceDetailTemplate service={servicesData["working-capital-solutions"]} />;
}
