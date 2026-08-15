import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Chỉ chạy test cho logic thuần trong src/logic — giao diện kiểm chứng
  // bằng checklist bấm tay, không viết test render.
  test: {
    environment: "node",
    include: ["src/logic/**/*.test.js"],
  },
});
