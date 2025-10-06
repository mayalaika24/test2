import * as Icons from 'iconsax-reactjs';

export type IconName = keyof typeof Icons;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  variant?: 'Bold' | 'Linear' | 'Outline' | 'Broken' | 'Bulk' | 'TwoTone';
}

export default function Icon({
  name,
  size = 24,
  color = 'currentColor',
  variant = 'Linear',
}: IconProps) {
  const Component = Icons[name];

  if (!Component) {
    console.warn(`Icon "${name}" not found in iconsax-reactjs`);
    return null;
  }

  return <Component variant={variant} size={size} color={color} />;
}
