import { useMemo } from "react";
import { CampaignCard, CampaignCardTagProps } from "../CampaignCard";
import { Campaign } from "@lib/types";

export interface FutureCampaignCardProps {
  campaign: Campaign;
  onClick?: () => void;
}

export const FutureCampaignCard = ({ campaign, onClick }: FutureCampaignCardProps) => {
  // TODO: generate tags based on campaign state
  const tags: CampaignCardTagProps[] = useMemo(() => {
    return [
      {
        children: "👌 40% SLEVA",
        variant: "white",
      },
      {
        children: "Probíhá přihlašování",
        variant: "warning",
        color: "#FFC107",
      },
    ];
  }, []);

  return (
    <CampaignCard
      image={<img src="https://picsum.photos/384/264" alt="img" />}
      label="Product title"
      tags={tags}
      onClick={onClick}
    />
  );
};
