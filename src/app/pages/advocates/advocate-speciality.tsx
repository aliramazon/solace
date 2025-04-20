import { ListCheck } from "../../../components";

interface AdvocateSpecialityProps {
  text: string;
}

export const AdvocateSpeciality: React.FC<AdvocateSpecialityProps> = ({
  text,
}) => {
  return (
    <div className="advocate__speciality">
      <ListCheck />
      <span className="advocate__speciality-text">{text}</span>
    </div>
  );
};
