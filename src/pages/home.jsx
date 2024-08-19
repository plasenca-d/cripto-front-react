import { linkEnum } from "@/types/enums/link";
import Body from "@/components/layout/Body";
import CreditCard from "@/components/ui/card/CreditCard";
import {
  SliderCard,
  TransactionCard,
  WeeklyChart,
  ExpenseChart,
  BalanceChart,
} from "@/components/pages/home";
import SectionWithTitle from "@/components/pages/SectionWithTitle";

function Home() {
  return (
    <Body pageName={linkEnum.Dashboard}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-5 lg:gap-x-5">
        <div className="col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="grid grid-cols-2 col-span-1 lg:col-span-2">
            <p className="flex items-center text-2xl font-semibold text-primary-200">
              Inicio
            </p>
            <p className="flex items-center justify-end text-lg text-primary-200">
              Ver Todas
            </p>
          </div>
          <CreditCard theme="blue" />
          <CreditCard theme="white" />
        </div>
        <div className="flex flex-col gap-5">
          <SectionWithTitle title="Recent Transaction">
            <TransactionCard />
          </SectionWithTitle>
        </div>
      </div>
    
    </Body>
  );
}

export default Home;
