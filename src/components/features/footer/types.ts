export type FooterColumnItem =
  | { kind: 'text'; labelKey: string }
  | { kind: 'link'; labelKey: string; to: string }
