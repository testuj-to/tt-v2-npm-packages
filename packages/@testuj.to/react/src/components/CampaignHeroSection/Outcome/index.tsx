import { IconCamera, IconSocial, IconVideo } from "../Icons";
import { LabeledIcon } from "../LabeledIcon";

interface OutcomeProps {
  includeImages?: boolean;
  includeVideo?: boolean;
  includeSocialPosts?: boolean;
  t: (key: string) => string;
}

export const Outcome = ({ includeImages, includeVideo, includeSocialPosts, t }: OutcomeProps) => {
  return (
    <>
      {includeImages ? <LabeledIcon label={t("foto")} icon={<IconCamera />} /> : null}
      {includeVideo ? <LabeledIcon label={t("video")} icon={<IconVideo />} /> : null}
      {includeSocialPosts ? <LabeledIcon label={t("social")} icon={<IconSocial />} /> : null}
    </>
  );
};
