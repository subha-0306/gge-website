import ServiceDetailTemplate from "./ServiceDetailTemplate";
import { servicesData } from "./servicesData";

export default function LetterOfCredit() {
  return <ServiceDetailTemplate service={servicesData["letter-of-credit"]} />;
}
