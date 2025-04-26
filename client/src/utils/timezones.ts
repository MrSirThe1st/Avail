interface Timezone {
  value: string;
  label: string;
}

// A subset of common timezones
const timezones: Timezone[] = [
  { value: "Pacific/Honolulu", label: "(GMT-10:00) Hawaii" },
  { value: "America/Anchorage", label: "(GMT-09:00) Alaska" },
  { value: "America/Los_Angeles", label: "(GMT-08:00) Pacific Time" },
  { value: "America/Phoenix", label: "(GMT-07:00) Arizona" },
  { value: "America/Denver", label: "(GMT-07:00) Mountain Time" },
  { value: "America/Chicago", label: "(GMT-06:00) Central Time" },
  { value: "America/New_York", label: "(GMT-05:00) Eastern Time" },
  { value: "America/Halifax", label: "(GMT-04:00) Atlantic Time" },
  {
    value: "America/Argentina/Buenos_Aires",
    label: "(GMT-03:00) Buenos Aires",
  },
  { value: "Atlantic/Azores", label: "(GMT-01:00) Azores" },
  { value: "Europe/London", label: "(GMT+00:00) London, Edinburgh" },
  { value: "Europe/Paris", label: "(GMT+01:00) Paris, Berlin, Rome" },
  { value: "Europe/Athens", label: "(GMT+02:00) Athens, Cairo" },
  { value: "Europe/Moscow", label: "(GMT+03:00) Moscow" },
  { value: "Asia/Dubai", label: "(GMT+04:00) Dubai" },
  { value: "Asia/Karachi", label: "(GMT+05:00) Karachi" },
  { value: "Asia/Dhaka", label: "(GMT+06:00) Dhaka" },
  { value: "Asia/Bangkok", label: "(GMT+07:00) Bangkok" },
  { value: "Asia/Singapore", label: "(GMT+08:00) Singapore, Hong Kong" },
  { value: "Asia/Tokyo", label: "(GMT+09:00) Tokyo" },
  { value: "Australia/Sydney", label: "(GMT+10:00) Sydney" },
  { value: "Pacific/Auckland", label: "(GMT+12:00) Auckland" },
];

export default timezones;
