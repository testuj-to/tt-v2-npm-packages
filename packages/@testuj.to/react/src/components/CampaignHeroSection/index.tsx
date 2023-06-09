import cx from "classnames";
import { Campaign } from "@lib/types";

import "./styles.css";
import { IconCheck, IconPeople, IconStar, IconTransport, IconCamera, IconChevron } from "./Icons";
import { LabeledIcon } from "./LabeledIcon";
import { Alert } from "../Alert";
import { Button } from "../Button";
import { LikeButton } from "../LikeButton";

export interface CampaignHeroSectionProps {
  campaign: Campaign;
  image?: React.ReactNode; // image is passed as react node to allow usage of optimized Image from next.js
  className?: string;
  t: (key: string) => string;
  onClickButton?: () => void;
  onBack?: () => void;
  onLike?: () => void;
  liked?: boolean;
}

export const CampaignHeroSection = ({
  campaign,
  image,
  className,
  t,
  onClickButton,
  onBack,
  onLike,
  liked,
}: CampaignHeroSectionProps) => {
  return (
    <section className={cx("tt-campaign-hero-section", className)}>
      <div className="tt-campaign-hero-section-image">
        <div className="tt-campaign-hero-section-image-back" onClick={onBack}>
          <IconChevron direction="left" />
        </div>
        <div className="tt-campaign-hero-section-image-like">
          <LikeButton variant="circle" onClick={onLike} {...{ liked }} />
        </div>
        {image}
      </div>
      <div className="tt-campaign-hero-section-content">
        <h2 className="tt-campaign-hero-section-title">{campaign.name}</h2>
        <div className="tt-campaign-hero-section-row">
          <LabeledIcon
            icon={<IconPeople />}
            label={`${t("Hledame")} ${campaign.applications.slotsCount} ${t("testerů")}`}
          />
          <LabeledIcon icon={<IconTransport />} label={t("Doprava až k vám")} />
          <LabeledIcon icon={<IconCheck />} label={t("Zdarma")} />
        </div>
        <h5>Výstup z testování</h5>
        <div className="tt-campaign-hero-section-row">
          <LabeledIcon icon={<IconStar />} label={`4 ${t("rezenze")}`} />
          <LabeledIcon icon={<IconCamera />} label={t("Fotografie a video")} />
        </div>
        <Alert variant="error" hideIcon className="tt-campaign-hero-section-alert">
          Neváhejte s přihlášením! Končí 20. 4. 2023
        </Alert>
        <Button
          variant="primary"
          className="tt-campaign-hero-section-button"
          onClick={onClickButton}
        >
          {t("Přihlásit se")}
        </Button>
      </div>
    </section>
  );
};
