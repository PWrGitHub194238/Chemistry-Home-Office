import { BulletPoint } from ".";

export interface FaqPoint {
  icon: string;
  header: string;
  bulletPoints: BulletPoint[];
  slideImages: string[];
  visible?: boolean;
}
