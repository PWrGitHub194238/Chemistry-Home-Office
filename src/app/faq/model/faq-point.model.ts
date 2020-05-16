import { BulletPoint } from "./bullet-point.model";

export interface FaqPoint {
  icon: string;
  header: string;
  bulletPoints: BulletPoint[];
  slideImages: string[];
  visible?: boolean;
}
