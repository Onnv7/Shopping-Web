export interface INotification {
  type: string;
  message: string;
}

export const NotificationConstant = {
  SUCCESS: "success",
  ERROR: "error",
};
