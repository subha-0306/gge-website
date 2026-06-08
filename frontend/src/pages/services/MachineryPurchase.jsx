import ServiceDetailTemplate from "./ServiceDetailTemplate";
import { servicesData } from "./servicesData";

export default function MachineryPurchase() {
  return <ServiceDetailTemplate service={servicesData["machinery-purchase-finance"]} />;
}
