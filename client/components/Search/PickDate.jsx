import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { viVN } from "@mui/x-date-pickers/locales";
import { useCallback, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import "dayjs/locale/en";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
function PickDate() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={
        viVN.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <DemoContainer components={["DatePicker"]} sx={{ paddingTop: "5px" }}>
        <DatePicker
          slotProps={{
            textField: { size: "small" },
            field: { size: "small" },
          }}
          label="Ngày tháng"
          onChange={(newValue) => {
            if (newValue)
              router.push(pathname + "?" + createQueryString("Date", newValue));
            else {
              const params = new URLSearchParams(window.location.search);
              params.delete("Date");
              const newUrl = pathname + "?" + params.toString();
              router.push(newUrl);
            }
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default PickDate;
