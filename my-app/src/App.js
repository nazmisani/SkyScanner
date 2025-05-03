import React, { useState } from "react";
import { BpkCode } from "@skyscanner/backpack-web/bpk-component-code";
import BpkButton from "@skyscanner/backpack-web/bpk-component-button";
import BpkText from "@skyscanner/backpack-web/bpk-component-text";
import BpkInput from "@skyscanner/backpack-web/bpk-component-input";
import BpkCard from "@skyscanner/backpack-web/bpk-component-card";
import BpkBannerAlert from "@skyscanner/backpack-web/bpk-component-banner-alert";
import BpkHorizontalNav, {
  BpkHorizontalNavItem,
} from "@skyscanner/backpack-web/bpk-component-horizontal-nav";
import { withAlignment } from "@skyscanner/backpack-web/bpk-component-icon";
import AirplaneIcon from "@skyscanner/backpack-web/bpk-component-icon/lg/flight";
import CalendarIcon from "@skyscanner/backpack-web/bpk-component-icon/lg/calendar";
import LongArrowRightIcon from "@skyscanner/backpack-web/bpk-component-icon/lg/long-arrow-right";

import { cssModules } from "@skyscanner/backpack-web/bpk-react-utils";

import STYLES from "./App.scss";

const getClassName = cssModules(STYLES);
const AlignedAirplaneIcon = withAlignment(AirplaneIcon);
const AlignedCalendarIcon = withAlignment(CalendarIcon);
const AlignedLongArrowRightIcon = withAlignment(LongArrowRightIcon);

// Format date as YYYY-MM-DD for input type="date"
const formatDateForInput = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

// Format date for display in a user-friendly way
const formatDateForDisplay = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputValue, setInputValue] = useState(formatDateForInput(new Date()));
  const [displayValue, setDisplayValue] = useState(
    formatDateForDisplay(new Date())
  );
  const [selected, setSelected] = useState("flights");

  const handleDateChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    try {
      const newDate = new Date(newValue);
      if (!isNaN(newDate)) {
        setSelectedDate(newDate);
        setDisplayValue(formatDateForDisplay(newDate));
      }
    } catch (error) {
      // Invalid date format, keep existing selection
    }
  };

  return (
    <div className={getClassName("App")}>
      <header className={getClassName("App__header")}>
        <div className={getClassName("App__header-inner")}>
          <BpkText
            tagName="h1"
            textStyle="xxl"
            className={getClassName("App__heading")}
          >
            <AlignedAirplaneIcon className={getClassName("App__header-icon")} />{" "}
            Flight Schedule
          </BpkText>

          <BpkHorizontalNav className={getClassName("App__nav")}>
            <BpkHorizontalNavItem
              name="flights"
              selected={selected === "flights"}
              onClick={() => setSelected("flights")}
            >
              Flights
            </BpkHorizontalNavItem>
            <BpkHorizontalNavItem
              name="hotels"
              selected={selected === "hotels"}
              onClick={() => setSelected("hotels")}
            >
              Hotels
            </BpkHorizontalNavItem>
            <BpkHorizontalNavItem
              name="car-rental"
              selected={selected === "car-rental"}
              onClick={() => setSelected("car-rental")}
            >
              Car Rental
            </BpkHorizontalNavItem>
          </BpkHorizontalNav>
        </div>
      </header>
      <main className={getClassName("App__main")}>
        <div className={getClassName("App__destinations")}>
          <div className={getClassName("App__destination")}>
            <BpkText tagName="h2" textStyle="xl">
              Jakarta (CGK)
            </BpkText>
          </div>
          <AlignedLongArrowRightIcon
            className={getClassName("App__arrow-icon")}
          />
          <div className={getClassName("App__destination")}>
            <BpkText tagName="h2" textStyle="xl">
              Bali (DPS)
            </BpkText>
          </div>
        </div>

        <BpkBannerAlert
          message="Find the best prices for your flight with Skyscanner"
          type="info"
          className={getClassName("App__banner")}
        />

        <BpkText tagName="p" className={getClassName("App__text")}>
          Please select your departure date:
        </BpkText>

        <BpkCard className={getClassName("App__calendar-card")}>
          <div className={getClassName("App__date-container")}>
            <BpkText
              tagName="label"
              htmlFor="dateInput"
              className={getClassName("App__date-label")}
            >
              <AlignedCalendarIcon
                className={getClassName("App__calendar-icon")}
              />{" "}
              Select Date
            </BpkText>
            <BpkInput
              id="dateInput"
              type="date"
              name="date"
              value={inputValue}
              onChange={handleDateChange}
              className={getClassName("App__input")}
            />
          </div>

          <div className={getClassName("App__date-display")}>
            <BpkText tagName="p" className={getClassName("App__selected-date")}>
              Selected date: {displayValue}
            </BpkText>
          </div>
        </BpkCard>

        <div className={getClassName("App__flight-options")}>
          <BpkText
            tagName="h3"
            textStyle="lg"
            className={getClassName("App__section-title")}
          >
            Available Flight Options
          </BpkText>
          <BpkCard className={getClassName("App__flight-option")}>
            <div className={getClassName("App__flight-details")}>
              <BpkText
                tagName="h4"
                textStyle="base"
                className={getClassName("App__flight-time")}
              >
                07:30 - 10:05
              </BpkText>
              <BpkText tagName="p">Garuda Indonesia</BpkText>
              <BpkText
                tagName="p"
                className={getClassName("App__flight-duration")}
              >
                2h 35m Direct
              </BpkText>
            </div>
            <BpkText tagName="p" className={getClassName("App__flight-price")}>
              IDR 1,850,000
            </BpkText>
          </BpkCard>
          <BpkCard className={getClassName("App__flight-option")}>
            <div className={getClassName("App__flight-details")}>
              <BpkText
                tagName="h4"
                textStyle="base"
                className={getClassName("App__flight-time")}
              >
                13:15 - 15:45
              </BpkText>
              <BpkText tagName="p">Lion Air</BpkText>
              <BpkText
                tagName="p"
                className={getClassName("App__flight-duration")}
              >
                2h 30m Direct
              </BpkText>
            </div>
            <BpkText tagName="p" className={getClassName("App__flight-price")}>
              IDR 1,200,000
            </BpkText>
          </BpkCard>
        </div>

        <BpkButton
          onClick={() => alert("It works!")}
          className={getClassName("App__continue-btn")}
        >
          Continue
        </BpkButton>
      </main>

      <footer className={getClassName("App__footer")}>
        <BpkText tagName="p" className={getClassName("App__footer-text")}>
          © 2025 Skyscanner Ltd
        </BpkText>
      </footer>
    </div>
  );
};

export default App;
