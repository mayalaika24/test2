import * as Icons from 'iconsax-reactjs';

export type IconName = keyof typeof Icons;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export default function Icon({
  name,
  size = 24,
  color = 'currentColor',
}: IconProps) {
  const Component = Icons[name];

  if (!Component) {
    console.warn(`Icon "${name}" not found in iconsax-reactjs`);
    return null;
  }

  return <Component size={size} color={color} />;
}
