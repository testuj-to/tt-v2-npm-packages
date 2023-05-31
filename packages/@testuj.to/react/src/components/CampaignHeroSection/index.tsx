import cx from "classnames";
import { Campaign } from "@lib/types";

import "./styles.css";
import { IconPeople } from "./Icons";
import { LabeledIcon } from "./LabeledIcon";

export interface CampaignHeroSectionProps {
  campaign: Campaign;
  image?: React.ReactNode; // image is passed as react node to allow usage of optimized Image from next.js
  className?: string;
  t: (key: string) => string;
}

export const CampaignHeroSection = ({
  campaign,
  image,
  className,
  t,
}: CampaignHeroSectionProps) => {
  return (
    <section className={cx("tt-campaign-hero-section", className)}>
      <div className="tt-campaign-hero-section-image">{image}</div>
      <div className="tt-campaign-hero-section-content">
        <h2 className="tt-campaign-hero-section-title">{campaign.name}</h2>
        <div className="tt-campaign-hero-section-row">
          <div>
            <LabeledIcon icon={<IconPeople />} label={t("campaign.heroSection.participants")} />
            <LabeledIcon
          </div>
        </div>
      </div>
    </section>
  );
};
