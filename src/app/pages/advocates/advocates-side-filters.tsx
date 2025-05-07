import { Card, Checkbox } from "../../../components";
import { specialties } from "../../../const";
import { useAdvocatesContext } from "./store/advocates-context";
import { AdvocateActions } from "./store/types";

export const AdvocatesSideFilters = () => {
  const { state, dispatch } = useAdvocatesContext();
  const { filters } = state;
  const onChange = (checked: boolean, value?: string) => {
    dispatch({
      type: checked
        ? AdvocateActions.ADD_FILTER
        : AdvocateActions.DELETE_FILTER,
      payload: {
        name: "specialty",
        value: value!,
      },
    });
  };

  return (
    <aside className="advocates__side-filters">
      <Card>
        <ul className="advocates__specialty-filters">
          {specialties.map((specialty) => {
            return (
              <li key={specialty}>
                <Checkbox
                  value={specialty}
                  label={specialty}
                  id={specialty}
                  onChange={onChange}
                  checked={filters.specialty?.includes(specialty) ?? false}
                />
              </li>
            );
          })}
        </ul>
      </Card>
    </aside>
  );
};
