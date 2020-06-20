export function getIcon(icon: string): string {
  return `<i class="material-icons inline-text-icon">${icon}</i>`;
}

export function getIconWithStateColor(icon: string, color: string): string {
  return `<i class="material-icons inline-text-icon icon-color icon-color-${color} avatar">${icon}</i>`;
}
