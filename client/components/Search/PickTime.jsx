import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { viVN } from "@mui/x-date-pickers/locales";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
function PickTime() {
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
        <TimePicker
          slotProps={{
            textField: { size: "small" },
            field: { size: "small" },
          }}
          label="Thời gian"
          onChange={(newValue) => {
            if (newValue)
              router.push(pathname + "?" + createQueryString("Time", newValue));
            else {
              const params = new URLSearchParams(window.location.search);
              params.delete("Time");
              const newUrl = pathname + "?" + params.toString();
              router.push(newUrl);
            }
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default PickTime;
