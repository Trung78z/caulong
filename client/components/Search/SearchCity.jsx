import { action, INITIAL_STATE, PostReducer } from "@/hooks/GiaoluuReducer";
import { provinces } from "@/lib/data";
import { Autocomplete, TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useReducer } from "react";
function SearchCity({ city_data }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [state, dispatch] = useReducer(PostReducer, INITIAL_STATE);
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const defaultProps = {
    options: provinces,
    getOptionLabel: (option) => option,
  };
  const filterCity = (cityName) => {
    const filteredData = city_data.filter((data) => {
      return data.city === cityName;
    });
    dispatch({ type: action.FETCH_UPDATE, payload: filteredData });
  };

  return (
    <div className="d-flex " style={{ marginTop: "5px" }}>
      <Autocomplete
        {...defaultProps}
        sx={{ width: 150 }}
        size="small"
        id="auto-complete"
        autoComplete
        includeInputInList
        onChange={(event, newValue) => {
          if (newValue) {
            filterCity(newValue);
            router.push(pathname + "?" + createQueryString("city", newValue));
          } else {
            const params = new URLSearchParams(window.location.search);
            params.delete("city");
            const newUrl = pathname + "?" + params.toString();
            router.push(newUrl);
          }
        }}
        renderInput={(params) => <TextField {...params} label="Thành phố" />}
      />
    </div>
  );
}

export default SearchCity;
