import React from "react";
import Icon1 from "../../public/images/svg-1.svg";
import Icon2 from "../../public/images/svg-2.svg";
import Icon3 from "../../public/images/svg-3.svg";
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "./ServicesElements";

const Services = () => {
  return (
    <ServicesContainer id="services">
      <ServicesH1>Our Features</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>Chore Rotation</ServicesH2>
          <ServicesP>
            Ensures no one is stuck with the same chore each time.
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2>Groups & Households</ServicesH2>
          <ServicesP>Join an existing group or create your own.</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>Score Incentives</ServicesH2>
          <ServicesP>
            Keep group members motivated with an active points system.
          </ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;
