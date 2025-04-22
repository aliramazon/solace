import { Advocate } from "../../../types/advocate";
import { AdvocateCard } from "./advocate-card";

interface AdvocatesListProps {
  data: Advocate[];
  isFetching: boolean;
}

export const AdvocatesList: React.FC<AdvocatesListProps> = ({
  data,
  isFetching,
}) => {
  return (
    <main className="container advocates__list">
      {isFetching && <p>Fetching</p>}
      {data.map((advocate) => {
        return <AdvocateCard key={advocate.id} data={advocate} />;
      })}
    </main>
  );
};
