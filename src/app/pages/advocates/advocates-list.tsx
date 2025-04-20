import { Advocate } from "../../../types/advocate";
import { AdvocateCard } from "./advocate-card";

interface AdvocatesListProps {
  data: Advocate[];
}

export const AdvocatesList: React.FC<AdvocatesListProps> = ({ data }) => {
  return (
    <main className="container advocates__list">
      {data.map((advocate) => {
        return <AdvocateCard data={advocate} />;
      })}
    </main>
  );
};
