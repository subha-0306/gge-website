import ServiceDetailTemplate from "./ServiceDetailTemplate";
import { servicesData } from "./servicesData";

export default function PackingCredit() {
  return <ServiceDetailTemplate service={servicesData["packing-credit"]} />;
}
