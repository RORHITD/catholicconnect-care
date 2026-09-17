import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    /** Google Preferred Sources button hook (news.google.com publisher.js). */
    "google-add-preferred-source-btn"?: string;
  }
}
