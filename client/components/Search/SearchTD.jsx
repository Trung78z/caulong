import { Autocomplete, TextField } from "@mui/material";
import { useCallback, useState, React } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { rank } from "@/lib/data";

function SearchTD() {
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
  const defaultProps = {
    options: rank,
    getOptionLabel: (option) => option,
  };
  return (
    <div className="d-flex " style={{ marginTop: "5px" }}>
      <Autocomplete
        {...defaultProps}
        sx={{ width: 160 }}
        size="small"
        id="auto-complete"
        autoComplete
        includeInputInList
        onChange={(event, newValue) => {
          if (newValue)
            router.push(pathname + "?" + createQueryString("Rank", newValue));
          else {
            const params = new URLSearchParams(window.location.search);
            params.delete("Rank");
            const newUrl = pathname + "?" + params.toString();
            router.push(newUrl);
          }
        }}
        renderInput={(params) => <TextField {...params} label="Trình độ" />}
      />
    </div>
  );
}

export default SearchTD;
