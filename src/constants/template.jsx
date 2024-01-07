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
            value: "sa",
            label: "SA",
          },
          {
            value: "eu",
            label: "EU",
          },
          {
            value: "oce",
            label: "OCE",
          },
          {
            value: "ru",
            label: "RU",
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
            value: "vesper",
            label: "vesper",
          },
          {
            value: "strata",
            label: "strata",
          },
          {
            value: "leonov",
            label: "leonov",
          },
          {
            value: "kuiper",
            label: "kuiper",
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
      const items = [];

      Object.keys(object).forEach((item) => {
        const currentForm = forms.find((form) => form.name === item);
        let val;

        if (!object[item]) return;

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
        placeholder: "@KucingKeren",
      },
      {
        key: 2,
        label: "Credits",
        name: "credits",
        placeholder: "@KucingMangkal",
      },
      {
        key: 3,
        label: "Resources",
        name: "Resources",
        placeholder: "@KucingNgetem",
      },
      {
        key: 4,
        label: "Damage",
        name: "Damage",
        placeholder: "@KucingKongkow",
      },
      {
        key: 5,
        label: "Health",
        name: "Health",
        placeholder: "@KucingTuru",
      },
      {
        key: 6,
        label: "Shields",
        name: "Shields",
        placeholder: "@KucingBerak",
      },
      {
        key: 7,
        label: "Backup",
        name: "backup",
        placeholder: "@KucingCadangan",
      },
      {
        key: 8,
        label: "Time till bless (in minutes)",
        name: "ttb",
        placeholder: "minutes",
        type: "number",
        min: 5,
        max: 20,
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
        const { label, key } = forms.find((form) => form.name === item);
        if (item === "variant") {
          // do nothing
        } else if (item === "ttb") {
          // eslint-disable-next-line no-unused-expressions
          object[item] &&
            items.push({
              key,
              toString: () => `Bless in ${object[item]} minutes!`,
            });
        } else if (item === "backup") {
          const names = object[item].split(",").map((x) => x.trim());

          items.push({
            key,
            toString: () => `@${names.join(", @")} -> ${label}`,
          });
        } else {
          items.push({ key, toString: () => `@${object[item]} -> ${label}` });
        }
      });

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
      "Thanks for joining blessing. See you next time!",
      "Thanks for joining blessing",
      "See you next time!",
      "See you next time! Thanks for joining blessing.",
    ],
  },
];

export default textTemplate;