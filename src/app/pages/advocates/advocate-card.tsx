import { Card } from "../../../components";
import { Advocate } from "../../../types/advocate";

import { UserAvatar } from "../../../components/user-avatar/user-avatar";
import { formatPhoneNumber } from "../../../utils";
import { AdvocateSpeciality } from "./advocate-speciality";

interface AdvocateCardProps {
  data: Advocate;
}

export const AdvocateCard: React.FC<AdvocateCardProps> = ({ data }) => {
  return (
    <div className="advocate__card">
      <Card>
        <div className="advocate__avatar">
          <UserAvatar
            src={data.avatar}
            alt={`${data.firstName} ${data.lastName}`}
            size="large"
            shape="circular"
          />
        </div>
        <div className="advocate__header">
          <h3 className="advocate__name">
            {data.firstName} {data.lastName}
          </h3>
          <span className="advocate__degree">{data.degree}</span>
        </div>

        <span className="advocate__sub-header">
          {data.city} • {data.yearsOfExperience} years of experience{" "}
        </span>
        <div className="advocate__specialities">
          {data.specialties.map((speciality) => {
            return <AdvocateSpeciality text={speciality} />;
          })}
        </div>
        <span className="advocate__phone-number ">
          Contact: {formatPhoneNumber(data.phoneNumber)}
        </span>
      </Card>
    </div>
  );
};
