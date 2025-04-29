import { Input } from "../../../components/input/input";

interface AdvocatesFiltersProps {
  onTextSearch: (value: string) => void;
  searchedText: string;
  onNext: () => void;
  onPrev: () => void;
  hasNextData: boolean;
  hasPrevData: boolean;
}

export const AdvocatesFilters: React.FC<AdvocatesFiltersProps> = ({
  onTextSearch,
  searchedText,
  onNext,
  onPrev,
  hasNextData,
  hasPrevData,
}) => {
  return (
    <div className="container">
      <div className="advocates__filters">
        <div className="advocates__search-box">
          <Input
            onChange={onTextSearch}
            placeholder="Search for your advocate"
            value={searchedText}
            clearable
          />
        </div>
        <div className="advocates__pagination">
          <span
            onClick={onPrev}
            className={`advocates__pagination-control ${
              !hasPrevData ? "advocates__pagination-control--disabled" : ""
            }`}
          >
            Prev
          </span>
          <span
            onClick={onNext}
            className={`advocates__pagination-control ${
              !hasNextData ? "advocates__pagination-control--disabled" : ""
            }`}
          >
            Next
          </span>
        </div>
      </div>
    </div>
  );
};
