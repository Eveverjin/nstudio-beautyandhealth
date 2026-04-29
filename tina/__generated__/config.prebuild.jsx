// tina/config.js
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "."
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "."
    }
  },
  schema: {
    collections: [
      // ── Site-wide settings (hero, intro, booking link) ──
      {
        name: "settings",
        label: "Site Settings",
        path: "content",
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        match: { include: "settings" },
        fields: [
          {
            type: "string",
            name: "heroTitle",
            label: "Hero Title"
          },
          {
            type: "string",
            name: "heroSubtitle",
            label: "Hero Subtitle"
          },
          {
            type: "string",
            name: "introHeading",
            label: "Intro Heading"
          },
          {
            type: "string",
            name: "introText",
            label: "Intro Text",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "bookingUrl",
            label: "Booking URL"
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Photo"
          }
        ]
      },
      // ── Team members ──
      {
        name: "team",
        label: "Team Members",
        path: "content/team",
        format: "json",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "role",
            label: "Role / Title"
          },
          {
            type: "string",
            name: "bio",
            label: "Bio",
            ui: { component: "textarea" }
          },
          {
            type: "image",
            name: "photo",
            label: "Photo"
          }
        ]
      },
      // ── Location & contact info ──
      {
        name: "info",
        label: "Location & Contact",
        path: "content",
        format: "json",
        ui: { allowedActions: { create: false, delete: false } },
        match: { include: "info" },
        fields: [
          { type: "string", name: "address", label: "Address" },
          { type: "string", name: "mapsUrl", label: "Google Maps URL" },
          { type: "string", name: "hours", label: "Opening Hours", ui: { component: "textarea" } },
          { type: "string", name: "phone", label: "Phone" },
          { type: "string", name: "email", label: "Email" },
          { type: "string", name: "instagram", label: "Instagram URL" }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
