import ServiceDetailTemplate from "./ServiceDetailTemplate";
import { servicesData } from "./servicesData";

export default function MedicalEquipment() {
  return <ServiceDetailTemplate service={servicesData["medical-equipment-finance"]} />;
}
