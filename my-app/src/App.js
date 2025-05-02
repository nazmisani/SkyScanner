import React, { useState } from "react";
import { BpkCode } from "@skyscanner/backpack-web/bpk-component-code";
import BpkButton from "@skyscanner/backpack-web/bpk-component-button";
import BpkText from "@skyscanner/backpack-web/bpk-component-text";
import BpkInput from "@skyscanner/backpack-web/bpk-component-input";

import { cssModules } from "@skyscanner/backpack-web/bpk-react-utils";

import STYLES from "./App.scss";

const getClassName = cssModules(STYLES);

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
            Flight Schedule
          </BpkText>
        </div>
      </header>
      <main className={getClassName("App__main")}>
        <BpkText tagName="p" className={getClassName("App__text")}>
          Please select your departure date:
        </BpkText>

        <div className={getClassName("App__form")}>
          <BpkInput
            id="dateInput"
            type="date"
            name="date"
            value={inputValue}
            onChange={handleDateChange}
            className={getClassName("App__input")}
          />
        </div>

        <BpkText tagName="p" className={getClassName("App__text")}>
          Selected date: {displayValue}
        </BpkText>

        <BpkButton onClick={() => alert(`Selected date: ${displayValue}`)}>
          Confirm Date
        </BpkButton>
      </main>
    </div>
  );
};

export default App;
