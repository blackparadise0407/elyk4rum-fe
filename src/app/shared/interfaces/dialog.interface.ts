export interface ConfirmDialogData {
  confirmText?: string;
  cancelText?: string;
  content?: string;
  title?: string;
  danger?: boolean;
}

export type DialogOptions = ConfirmDialogData;
