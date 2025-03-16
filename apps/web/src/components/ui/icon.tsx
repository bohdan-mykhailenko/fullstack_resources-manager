import {
  AlertCircle,
  Globe,
  type LucideProps,
  MapPinHouse,
  Menu,
  Moon,
  Phone,
  Sun,
  X,
} from "lucide-react";

const IconsList = {
  Sun,
  Moon,
  X,
  Menu,
  Phone,
  AlertCircle,
  MapPinHouse,
  Globe,
};

export type IconName = keyof typeof IconsList;

interface IconProps extends LucideProps {
  name: IconName;
}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const LucideIcon = IconsList[name];

  return <LucideIcon {...props} />;
};

// import * as LucideIcons from "lucide-react";
// import type { LucideIcon, LucideProps } from "lucide-react";

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const { createLucideIcon, ...IconsList } = LucideIcons;

// type IconsType = Exclude<keyof typeof IconsList, keyof typeof createLucideIcon>;

// interface IconProps extends LucideProps {
//   name: IconsType;
// }

// export const Icon = ({ name, ...props }: IconProps) => {
//   const LucideIcon = IconsList[name] as LucideIcon;

//   return <LucideIcon {...props} />;
// };

// export type { IconsType as IconName };
