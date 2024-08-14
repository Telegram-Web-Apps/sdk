export const ERR_POPUP_OPENED = 'ERR_POPUP_OPENED';
export const ERR_POPUP_INVALID_PARAMS = 'ERR_POPUP_INVALID_PARAMS';
export const ERR_INVOICE_OPENED = 'ERR_INVOICE_OPENED';
export const ERR_INVALID_HOSTNAME = 'ERR_INVALID_HOSTNAME';
export const ERR_INVALID_SLUG = 'ERR_INVALID_SLUG';
export const ERR_DATA_INVALID_SIZE = 'ERR_DATA_INVALID_SIZE';
export const ERR_ACCESS_DENIED = 'ERR_ACCESS_DENIED';
export const ERR_SCANNER_OPENED = 'ERR_SCANNER_OPENED';
export const ERR_CSS_VARS_BOUND = 'ERR_CSS_VARS_BOUND';

export type ErrorType =
  | typeof ERR_POPUP_OPENED
  | typeof ERR_POPUP_INVALID_PARAMS
  | typeof ERR_INVOICE_OPENED
  | typeof ERR_INVALID_HOSTNAME
  | typeof ERR_INVALID_SLUG
  | typeof ERR_DATA_INVALID_SIZE
  | typeof ERR_ACCESS_DENIED
  | typeof ERR_SCANNER_OPENED
  | typeof ERR_CSS_VARS_BOUND;
