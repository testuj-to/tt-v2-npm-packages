import cx from "classnames";

import { IconCheck, IconPeople, IconStar, IconTransport, IconCamera, IconChevron } from "./Icons";
import { LabeledIcon } from "./LabeledIcon";
import { Alert, AlertProps } from "../Alert";
import { Button, ButtonProps } from "../Button";
import { LikeButton } from "../LikeButton";
import { DeliveryType } from "@lib/types";
import { Outcome } from "./Outcome";

import "./styles.css";

export interface DataProps {
  name: string;
  openSpots?: number;
  alert?: {
    text?: string;
    type?: AlertProps["variant"];
  };
  deliveryType?: DeliveryType;
  freeDelivery?: boolean;
  outcome?: {
    includeImages?: boolean;
    includeVideo?: boolean;
    includeSocialPosts?: boolean;
    noOfReviews?: number;
  };
  discount?: number;
}
export interface CampaignHeroSectionProps {
  data: DataProps;
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
  mainButton?: {
    text?: React.ReactNode;
    onClick?: () => void;
    variant?: ButtonProps["variant"];
    disabled?: boolean;
  };
  customContent?: React.ReactNode;
}

export const CampaignHeroSection = ({
  data,
  image,
  className,
  t,
  onClickButton,
  onBack,
  onLike,
  liked,
  small,
  button,
  mainButton,
  customContent,
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
        {customContent ? (
          customContent
        ) : (
          <>
            <h2 className="tt-campaign-hero-section-title">{data?.name}</h2>
            <div className="tt-campaign-hero-section-row">
              <LabeledIcon
                icon={<IconPeople />}
                label={`${t("looking")} ${data?.openSpots} ${t("testers")}`}
              />
              <LabeledIcon icon={<IconTransport />} label={t(`delivery.${data.deliveryType}`)} />
              {data.discount === 100 ? (
                <LabeledIcon icon={<IconCheck />} label={t("forFree")} />
              ) : (
                <LabeledIcon icon={<></>} label={`${data.discount}% ${t("discount")}`} />
              )}
            </div>
            <div className="tt-campaign-hero-section-row-space-between">
              <div>
                <h5>{t("test_outcome")}</h5>
                <div className="tt-campaign-hero-section-row">
                  <LabeledIcon
                    icon={<IconStar />}
                    label={`${data.outcome?.noOfReviews || 0} ${
                      data?.outcome?.noOfReviews > 4 ? t("reviews") : t("review")
                    }`}
                  />
                  <Outcome {...data.outcome} t={t} />
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
            </div>{" "}
            {data.alert ? (
              <Alert variant={data.alert.type} hideIcon className="tt-campaign-hero-section-alert">
                {data.alert?.text}
              </Alert>
            ) : null}
            {small ? null : (
              <Button
                variant={mainButton?.variant || "primary"}
                className={cx("tt-campaign-hero-section-button")}
                onClick={mainButton?.onClick || onClickButton}
                disabled={mainButton?.disabled}
              >
                {mainButton?.text || t("register")}
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  );
};
