"use client";
import axios from "axios";
import {
  useEffect,
  useReducer,
  useCallback,
  useState,
  useContext,
} from "react";
import "./page.scss";
import {
  ArrowTrendingUpIcon,
  CalendarIcon,
  MapPinIcon,
  StarIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Box from "@mui/material/Box";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import { INITIAL_STATE, PostReducer, action } from "@/hooks/GiaoluuReducer";
import { Autocomplete, Rating, TextField } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { provinces, rank } from "@/lib/data";
import { useRouter } from "next/navigation";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { viVN } from "@mui/x-date-pickers/locales";
import { Button } from "@mui/material";
import { PostContext } from "@/hooks/Postprovide";

const isSameDate = (a, b) => {
  const date1 = new Date(a);
  const date2 = new Date(b);
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
function GiaoLuu() {
  const { state, dispatch } = useContext(PostContext);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

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
  const uniqueOptions = [
    ...new Set(state.data_using.map((option) => option.stadium)),
  ];

  const defaultPropsStadium = {
    options: uniqueOptions.map((option) => ({
      stadium: option,
    })),
    getOptionLabel: (option) => option.stadium,
  };
  const defaultPropsRank = {
    options: rank,
    getOptionLabel: (option) => option,
  };
  const filter = (datafilter, filter) => {
    if (filter === 1) {
      const filteredData = state.data_using.filter((data) => {
        return data.city === datafilter;
      });
      dispatch({ type: action.FETCH_UPDATE, payload: filteredData });
    } else if (filter === 2) {
      const filteredData = state.data_using.filter((data) => {
        return data.stadium === datafilter.stadium;
      });

      dispatch({ type: action.FETCH_UPDATE, payload: filteredData });
    } else if (filter === 3) {
      const filteredData = state.data_using.filter((data) => {
        return isSameDate(data.updatedAt, datafilter);
      });

      dispatch({ type: action.FETCH_UPDATE, payload: filteredData });
    } else {
      dispatch({ type: action.FETCH_UPDATE, payload: state.data });
    }
  };
  return (
    <div className="session">
      <div className="container-sa">
        <div className="navSort">
          <div className="searchpage">
            <div className="searchcontainer">
              <div
                className="filter pt-0 pb-2 "
                style={{
                  overflowX: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Button
                  variant="contained"
                  sx={{ minWidth: 150, marginTop: "8px" }}
                  onClick={() => router.push("/giaoluu/tao-bai-viet")}
                >
                  Tạo bài viết
                </Button>
                <div>
                  <Autocomplete
                    {...defaultProps}
                    sx={{ width: 150, paddingTop: "8px" }}
                    size="small"
                    id="auto-complete"
                    autoComplete
                    includeInputInList
                    onChange={(event, newValue) => {
                      if (newValue) {
                        filter(newValue, 1);
                        router.push(
                          pathname + "?" + createQueryString("city", newValue)
                        );
                      } else {
                        filter(newValue, 0);
                        const params = new URLSearchParams(
                          window.location.search
                        );
                        params.delete("city");
                        const newUrl = pathname + "?" + params.toString();
                        router.push(newUrl);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Thành phố" />
                    )}
                  />
                </div>
                <div>
                  <Autocomplete
                    {...defaultPropsStadium}
                    sx={{ width: 160, paddingTop: "8px" }}
                    size="small"
                    id="auto-complete"
                    autoComplete
                    includeInputInList
                    onChange={(event, newValue) => {
                      if (newValue) {
                        filter(newValue, 2);
                        router.push(
                          pathname +
                            "?" +
                            createQueryString("stadium", newValue)
                        );
                      } else {
                        filter(newValue, 0);
                        const params = new URLSearchParams(
                          window.location.search
                        );
                        params.delete("stadium");
                        const newUrl = pathname + "?" + params.toString();
                        router.push(newUrl);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sân vận động" />
                    )}
                  />
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", padding: 0 }}
                >
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    localeText={
                      viVN.components.MuiLocalizationProvider.defaultProps
                        .localeText
                    }
                  >
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        sx={{ width: 100 }}
                        slotProps={{
                          field: { size: "small" },
                          textField: { width: 160 },
                        }}
                        format="DD/MM/YYYY"
                        label="Ngày tháng"
                        onChange={(newValue) => {
                          filter(newValue, 3);

                          if (newValue)
                            router.push(
                              pathname +
                                "?" +
                                createQueryString("Date", newValue)
                            );
                          else {
                            const params = new URLSearchParams(
                              window.location.search
                            );
                            params.delete("Date");
                            const newUrl = pathname + "?" + params.toString();
                            router.push(newUrl);
                          }
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    localeText={
                      viVN.components.MuiLocalizationProvider.defaultProps
                        .localeText
                    }
                  >
                    <DemoContainer components={["DatePicker"]}>
                      <TimePicker
                        sx={{ width: 100 }}
                        slotProps={{
                          textField: { size: "small" },
                          field: { size: "small" },
                        }}
                        label="Thời gian"
                        format="hh:mm"
                        onChange={(newValue) => {
                          if (newValue)
                            router.push(
                              pathname +
                                "?" +
                                createQueryString("Time", newValue)
                            );
                          else {
                            const params = new URLSearchParams(
                              window.location.search
                            );
                            params.delete("Time");
                            const newUrl = pathname + "?" + params.toString();
                            router.push(newUrl);
                          }
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>{" "}
                <div className="d-flex " style={{ marginTop: "5px" }}>
                  <Autocomplete
                    {...defaultPropsRank}
                    sx={{ width: 200 }}
                    size="small"
                    id="auto-complete"
                    autoComplete
                    includeInputInList
                    onChange={(event, newValue) => {
                      if (newValue)
                        router.push(
                          pathname + "?" + createQueryString("Rank", newValue)
                        );
                      else {
                        const params = new URLSearchParams(
                          window.location.search
                        );
                        params.delete("Rank");
                        const newUrl = pathname + "?" + params.toString();
                        router.push(newUrl);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Trình độ" />
                    )}
                  />
                </div>
                <Button
                  variant="text"
                  onClick={() =>
                    dispatch({
                      type: action.FETCH_UPDATE,
                      payload: state.data,
                    })
                  }
                >
                  Xóa lọc
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "80px" }}></div>
      </div>
    </div>
  );
}

export default GiaoLuu;
