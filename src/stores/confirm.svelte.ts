// In-app confirmation instead of the browser's confirm(): `await askConfirm({...})` resolves true or false.

export interface ConfirmRequest {
  title: string;
  text?: string;
  confirmLabel?: string;
  danger?: boolean;
}

class ConfirmStore {
  request = $state<ConfirmRequest | null>(null);
  private resolve: ((answer: boolean) => void) | null = null;

  ask(request: ConfirmRequest): Promise<boolean> {
    this.resolve?.(false);
    this.request = request;
    return new Promise(resolve => {
      this.resolve = resolve;
    });
  }

  answer(value: boolean): void {
    this.request = null;
    const resolve = this.resolve;
    this.resolve = null;
    resolve?.(value);
  }
}

export const confirmDialog = new ConfirmStore();
export const askConfirm = (request: ConfirmRequest): Promise<boolean> => confirmDialog.ask(request);
