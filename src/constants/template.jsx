import _orderBy from "lodash/orderBy";
import _isEmpty from "lodash/isEmpty";

const textTemplate = [
  {
    name: "Bless Command",
    description: "",
    url: "/gen/bless-command",
    form: [
      {
        key: 1,
        label: "Region",
        name: "region",
        placeholder: "Select Region",
        type: "select",
        options: [
          {
            value: "as",
            label: "Asia",
          },
          {
            value: "na",
            label: "NA",
          },
          {
            value: "eu",
            label: "EU",
          },
        ],
      },
      {
        key: 2,
        label: "Relay",
        name: "relay",
        type: "select",
        placeholder: "Select Relay",
        options: [
          {
            value: "kronia",
            label: "kronia",
          },
          {
            value: "larunda",
            label: "larunda",
          },
          {
            value: "strata",
            label: "strata",
          },
          {
            value: "orcus",
            label: "orcus",
          },
          {
            value: "maroo",
            label: "maroo",
          },
        ],
      },
      {
        key: 3,
        label: "Instance",
        name: "instance",
        placeholder: "Instance Number",
        type: "number",
        min: 0,
        max: 99,
      },
      {
        key: 4,
        label: "Time till bless (in minutes)",
        placeholder: "minutes",
        name: "ttb",
        type: "number",
        min: 5,
        max: 20,
      },
      {
        key: 5,
        label: "Bless Type",
        name: "blessType",
        type: "checkbox",
        options: [
          {
            value: "aff",
            label: "Affinity",
          },
          {
            value: "creds",
            label: "Credits",
          },
          {
            value: "damage",
            label: "Damage",
          },
          {
            value: "health",
            label: "Health",
          },
          {
            value: "res",
            label: "Resource",
          },
          {
            value: "shields",
            label: "Shields",
          },
        ],
      },
    ],
    template: (object, forms) => {
      if (!forms) return;

      const items = [];

      Object.keys(object).forEach((item) => {
        const currentForm = forms.find((form) => form.name === item);
        let val;

        if (!object[item] || !currentForm) return;

        if (item === "blessType") {
          val =
            object[item].length === currentForm.options.length
              ? "all"
              : object[item].join(" ");
        } else if (item === "ttb") {
          val = `${object[item]}m`;
        } else {
          val = object[item];
        }

        items.push({
          key: currentForm.key,
          toString: () => val,
        });
      });

      // eslint-disable-next-line consistent-return
      return !_isEmpty(object) && `!bless ${_orderBy(items, "key").join(" ")}`;
    },
  },

  {
    name: "Relay Chat",
    description: "",
    url: "/gen/relay-chat",
    form: [
      {
        key: 1,
        label: "Affinity",
        name: "affinity",
        placeholder: "...",
      },
      {
        key: 2,
        label: "Credits",
        name: "credits",
        placeholder: "...",
      },
      {
        key: 3,
        label: "Resources",
        name: "Resources",
        placeholder: "...",
      },
      {
        key: 4,
        label: "Damage",
        name: "Damage",
        placeholder: "...",
      },
      {
        key: 5,
        label: "Health",
        name: "Health",
        placeholder: "...",
      },
      {
        key: 6,
        label: "Shields",
        name: "Shields",
        placeholder: "...",
      },
      {
        key: 7,
        label: "Backup",
        name: "backup",
        placeholder: "...",
      },
      {
        key: 8,
        label: "Time till bless (in minutes)",
        name: "ttb",
        placeholder: "minutes",
        type: "number",
        min: 0,
        max: 50,
      },
      {
        key: 9,
        label: "Variant",
        name: "variant",
        placeholder: "Select Variant",
        type: "select",
        defaultOptions: "|",
        options: [
          {
            value: "|",
            label: "Variant 1",
          },
          {
            value: "|-|",
            label: "Variant 2",
          },
        ],
      },
    ],
    template: (object, forms) => {
      const items = [];
      Object.keys(object).forEach((item) => {
        const currentForm = forms.find((form) => form.name === item);

        if (!currentForm) return;

        if (item === "variant") {
          // do nothing
        } else if (item === "ttb") {
          // eslint-disable-next-line no-unused-expressions
          object[item] &&
            items.push({
              key: currentForm.key,
              toString: () => `Bless in ${object[item]} minutes!`,
            });
        } else if (item === "backup") {
          const names = object[item].split(",").map((x) => x.trim());

          items.push({
            key: currentForm.key,
            toString: () => `@${names.join(", @")} -> ${currentForm.label}`,
          });
        } else {
          items.push({
            key: currentForm.key,
            toString: () => `@${object[item]} -> ${currentForm.label}`,
          });
        }
      });

      // eslint-disable-next-line consistent-return
      return (
        !_isEmpty(object) &&
        `ROLES: ${_orderBy(items, "key").join(
          ` ${
            object.variant ??
            forms.find((form) => form.name === "variant").defaultOptions
          } `,
        )}`
      );
    },
  },

  {
    name: "Common Copypaste",
    description: "",
    url: "/gen/common",
    specialPageCommonCopyPaste: [
      "Remember to thank the blessers by pressing “F” (or triangle on console) when the blesses come in! There’s always time to sprinkle some good vibes. :heart:",
      ":community: Join our Discord (tiny.cc/warframeblessing) to keep yourself updated with mass blessings, or join as a blesser!",
      "Thanks for coming, blessers and the blessed! May your hunts be fruitful, and your conquests great! And also special thanks to the fellow blessers that made this possible. :heart:",
      "Placeholder.",
    ],
  },
];

export default textTemplate;
