import { AdvocateCard } from "./advocate-card";
import { useAdvocatesContext } from "./store/advocates-context";

export const AdvocatesList = () => {
  const {
    state: { filteredAdvocates, isFetching },
  } = useAdvocatesContext();

  return isFetching ? null : (
    <section className="advocates__list">
      {filteredAdvocates.map((advocate) => {
        return <AdvocateCard key={advocate.id} data={advocate} />;
      })}
    </section>
  );
};
