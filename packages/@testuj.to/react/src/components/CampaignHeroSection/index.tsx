import cx from "classnames";

import "./styles.css";
import { IconCheck, IconPeople, IconStar, IconTransport, IconCamera, IconChevron } from "./Icons";
import { LabeledIcon } from "./LabeledIcon";
import { Alert } from "../Alert";
import { Button, ButtonProps } from "../Button";
import { LikeButton } from "../LikeButton";
import { DeliveryType } from "@lib/types";

export interface Campaign {
  name: string;
  openSpots?: number;
  alert?: {
    text?: string;
    type?: "error" | "success" | "warning";
  };
  deliveryType?: DeliveryType;
  freeDelivery?: boolean;
}
export interface CampaignHeroSectionProps {
  campaign: Campaign;
  image?: React.ReactNode; // image is passed as react node to allow usage of optimized Image from next.js
  className?: string;
  t: (key: string) => string;
  onClickButton?: () => void;
  onBack?: () => void;
  onLike?: () => void;
  liked?: boolean;
  small?: boolean;
  button?: {
    text?: React.ReactNode;
    onClick?: () => void;
    variant?: ButtonProps["variant"];
    disabled?: boolean;
  };
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
  small,
  button,
}: CampaignHeroSectionProps) => {
  return (
    <section
      className={cx(
        "tt-campaign-hero-section",
        { "tt-campaign-hero-section-small": small },
        className
      )}
    >
      <div
        className={cx("tt-campaign-hero-section-image", {
          "tt-campaign-hero-section-image-small": small,
        })}
      >
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
            label={`${t("looking")} ${campaign?.openSpots} ${t("testers")}`}
          />
          <LabeledIcon icon={<IconTransport />} label={t(`delivery.${campaign.deliveryType}`)} />
          {campaign.freeDelivery ? (
            <LabeledIcon icon={<IconCheck />} label={t("for_free")} />
          ) : null}
        </div>
        <div className="tt-campaign-hero-section-row-space-between">
          <div>
            <h5>{t("test_outcome")}</h5>
            <div className="tt-campaign-hero-section-row">
              <LabeledIcon icon={<IconStar />} label={`4 ${t("review")}`} />
              <LabeledIcon icon={<IconCamera />} label={t("foto_video")} />
            </div>
          </div>
          {button ? (
            <Button
              variant={button?.variant || "primary"}
              className={cx("tt-campaign-hero-section-button", {
                "tt-campaign-hero-section-button-small": small,
              })}
              onClick={button?.onClick || onClickButton}
              disabled={button?.disabled}
            >
              {button?.text || t("register")}
            </Button>
          ) : null}
        </div>

        {campaign.alert ? (
          <Alert variant={campaign.alert.type} hideIcon className="tt-campaign-hero-section-alert">
            {campaign.alert?.text}
          </Alert>
        ) : null}

        {small ? null : (
          <Button
            variant="primary"
            className={cx("tt-campaign-hero-section-button")}
            onClick={onClickButton}
          >
            {t("register")}
          </Button>
        )}
      </div>
    </section>
  );
};
