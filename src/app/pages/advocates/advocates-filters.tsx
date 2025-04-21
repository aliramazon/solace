import { Input } from "../../../components/input/input";

interface AdvocatesFiltersProps {
  onTextSearch: (value: string) => void;
  textSearchValue: string;
}

export const AdvocatesFilters: React.FC<AdvocatesFiltersProps> = ({
  onTextSearch,
  textSearchValue,
}) => {
  return (
    <div className="container">
      <div className="advocates__filters">
        <div advocates__search-box>
          <Input
            onChange={onTextSearch}
            placeholder="Search for your advocate"
            value={textSearchValue}
            clearable
          />
        </div>
      </div>
    </div>
  );
};
