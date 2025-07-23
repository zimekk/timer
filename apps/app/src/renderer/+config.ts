import vikeReact from "vike-react/config";
import type { Config } from "vike/types";

// Default configs (can be overridden by pages)
export const config = {
  // <title>
  title: "Timer",
  extends: vikeReact,
  meta: {
    Page: {
      env: {
        client: true,
      },
    },
  },
} satisfies Config;
