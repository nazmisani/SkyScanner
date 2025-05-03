import React, { useState } from "react";
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
import LocationIcon from "@skyscanner/backpack-web/bpk-component-icon/lg/navigation";
import PriceAlertsIcon from "@skyscanner/backpack-web/bpk-component-icon/lg/alert--active";
import SearchIcon from "@skyscanner/backpack-web/bpk-component-icon/lg/search";
import TickIcon from "@skyscanner/backpack-web/bpk-component-icon/sm/tick-circle";

import { cssModules } from "@skyscanner/backpack-web/bpk-react-utils";

import STYLES from "./App.scss";

const getClassName = cssModules(STYLES);
const AlignedAirplaneIcon = withAlignment(AirplaneIcon);
const AlignedCalendarIcon = withAlignment(CalendarIcon);
const AlignedLongArrowRightIcon = withAlignment(LongArrowRightIcon);
const AlignedLocationIcon = withAlignment(LocationIcon);
const AlignedPriceAlertsIcon = withAlignment(PriceAlertsIcon);
const AlignedSearchIcon = withAlignment(SearchIcon);
const AlignedTickIcon = withAlignment(TickIcon);

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
      <div className={getClassName("App__top-gradient")} />
      
      <header className={getClassName("App__header")}>
        <div className={getClassName("App__header-inner")}>
          <div className={getClassName("App__logo-container")}>
            <AlignedAirplaneIcon className={getClassName("App__logo-icon")} />
            <BpkText
              tagName="h1"
              textStyle="xl"
              className={getClassName("App__heading")}
            >
              skyscanner
            </BpkText>
          </div>

          <BpkHorizontalNav className={getClassName("App__nav")}>
            <BpkHorizontalNavItem
              name="flights"
              selected={selected === "flights"}
              onClick={() => setSelected("flights")}
            >
              <AlignedAirplaneIcon className={getClassName("App__nav-icon")} /> Flights
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

      <div className={getClassName("App__hero")}>
        <div className={getClassName("App__hero-content")}>
          <BpkText tagName="h2" textStyle="xxl" className={getClassName("App__hero-title")}>
            Find your next adventure
          </BpkText>
          <BpkText tagName="p" className={getClassName("App__hero-subtitle")}>
            Compare flights, hotels, and car rentals
          </BpkText>
        </div>
      </div>

      <main className={getClassName("App__main")}>
        <div className={getClassName("App__search-panel")}>
          <div className={getClassName("App__search-row")}>
            <div className={getClassName("App__search-column")}>
              <div className={getClassName("App__search-label")}>
                <AlignedLocationIcon className={getClassName("App__search-icon")} />
                <BpkText tagName="p">From</BpkText>
              </div>
              <BpkCard className={getClassName("App__location-card")}>
                <BpkText tagName="h3" textStyle="lg">Jakarta (CGK)</BpkText>
                <BpkText tagName="p">Soekarno-Hatta International</BpkText>
              </BpkCard>
            </div>
            
            <AlignedLongArrowRightIcon className={getClassName("App__arrow-icon")} />
            
            <div className={getClassName("App__search-column")}>
              <div className={getClassName("App__search-label")}>
                <AlignedLocationIcon className={getClassName("App__search-icon")} />
                <BpkText tagName="p">To</BpkText>
              </div>
              <BpkCard className={getClassName("App__location-card")}>
                <BpkText tagName="h3" textStyle="lg">Bali (DPS)</BpkText>
                <BpkText tagName="p">Ngurah Rai International</BpkText>
              </BpkCard>
            </div>
          </div>

          <div className={getClassName("App__search-row")}>
            <div className={getClassName("App__search-column")}>
              <div className={getClassName("App__search-label")}>
                <AlignedCalendarIcon className={getClassName("App__search-icon")} />
                <BpkText tagName="p">Departure date</BpkText>
              </div>
              <BpkCard className={getClassName("App__date-card")}>
                <BpkInput
                  id="dateInput"
                  type="date"
                  name="date"
                  value={inputValue}
                  onChange={handleDateChange}
                  className={getClassName("App__input")}
                />
              </BpkCard>
            </div>
            
            <div className={getClassName("App__search-column")}>
              <BpkButton 
                onClick={() => alert('It works!')} 
                className={getClassName("App__search-button")}
                iconOnly
              >
                <AlignedSearchIcon />
              </BpkButton>
            </div>
          </div>
        </div>
        
        <BpkBannerAlert
          message={
            <div className={getClassName("App__alert-content")}>
              <AlignedPriceAlertsIcon className={getClassName("App__alert-icon")} />
              <span>Get price alerts! We'll notify you if the price changes.</span>
            </div>
          }
          type="success"
          className={getClassName("App__banner")}
        />

        <div className={getClassName("App__section")}>
          <BpkText tagName="h3" textStyle="xl" className={getClassName("App__section-title")}>
            Selected date: <span className={getClassName("App__highlight")}>{displayValue}</span>
          </BpkText>
        </div>
        
        <div className={getClassName("App__section")}>
          <div className={getClassName("App__section-header")}>
            <BpkText tagName="h3" textStyle="xl" className={getClassName("App__section-title")}>
              Available Flight Options
            </BpkText>
            <BpkText tagName="p" className={getClassName("App__section-subtitle")}>
              Best price guarantee
            </BpkText>
          </div>
          
          <div className={getClassName("App__flight-grid")}>
            <BpkCard className={getClassName("App__flight-card")}>
              <div className={getClassName("App__flight-header")}>
                <BpkText tagName="p" className={getClassName("App__airline")}>Garuda Indonesia</BpkText>
                <AlignedTickIcon className={getClassName("App__verified-icon")} />
              </div>
              <div className={getClassName("App__flight-time-container")}>
                <div className={getClassName("App__flight-time-column")}>
                  <BpkText tagName="h4" textStyle="xl" className={getClassName("App__flight-time")}>07:30</BpkText>
                  <BpkText tagName="p" className={getClassName("App__flight-code")}>CGK</BpkText>
                </div>
                <div className={getClassName("App__flight-duration")}>
                  <div className={getClassName("App__duration-line")}></div>
                  <BpkText tagName="p">2h 35m</BpkText>
                </div>
                <div className={getClassName("App__flight-time-column")}>
                  <BpkText tagName="h4" textStyle="xl" className={getClassName("App__flight-time")}>10:05</BpkText>
                  <BpkText tagName="p" className={getClassName("App__flight-code")}>DPS</BpkText>
                </div>
              </div>
              <div className={getClassName("App__flight-footer")}>
                <BpkText tagName="p" className={getClassName("App__direct-label")}>Direct</BpkText>
                <BpkText tagName="p" className={getClassName("App__flight-price")}>IDR 1,850,000</BpkText>
              </div>
              <BpkButton className={getClassName("App__select-button")}>Select</BpkButton>
            </BpkCard>
            
            <BpkCard className={getClassName("App__flight-card")}>
              <div className={getClassName("App__flight-header")}>
                <BpkText tagName="p" className={getClassName("App__airline")}>Lion Air</BpkText>
              </div>
              <div className={getClassName("App__flight-time-container")}>
                <div className={getClassName("App__flight-time-column")}>
                  <BpkText tagName="h4" textStyle="xl" className={getClassName("App__flight-time")}>13:15</BpkText>
                  <BpkText tagName="p" className={getClassName("App__flight-code")}>CGK</BpkText>
                </div>
                <div className={getClassName("App__flight-duration")}>
                  <div className={getClassName("App__duration-line")}></div>
                  <BpkText tagName="p">2h 30m</BpkText>
                </div>
                <div className={getClassName("App__flight-time-column")}>
                  <BpkText tagName="h4" textStyle="xl" className={getClassName("App__flight-time")}>15:45</BpkText>
                  <BpkText tagName="p" className={getClassName("App__flight-code")}>DPS</BpkText>
                </div>
              </div>
              <div className={getClassName("App__flight-footer")}>
                <BpkText tagName="p" className={getClassName("App__direct-label")}>Direct</BpkText>
                <BpkText tagName="p" className={getClassName("App__flight-price--highlighted")}>IDR 1,200,000</BpkText>
              </div>
              <BpkButton className={getClassName("App__select-button--highlighted")}>
                Select
              </BpkButton>
            </BpkCard>
          </div>
        </div>
        
        <div className={getClassName("App__bottom-actions")}>
          <BpkButton onClick={() => alert('It works!')} className={getClassName("App__continue-btn")}>
            Continue
          </BpkButton>
        </div>
      </main>

      <footer className={getClassName("App__footer")}>
        <div className={getClassName("App__footer-content")}>
          <div className={getClassName("App__footer-brand")}>
            <AlignedAirplaneIcon className={getClassName("App__footer-icon")} />
            <BpkText tagName="p" className={getClassName("App__footer-brand-text")}>
              skyscanner
            </BpkText>
          </div>
          <div className={getClassName("App__footer-links")}>
            <div className={getClassName("App__footer-column")}>
              <BpkText tagName="h4" className={getClassName("App__footer-title")}>Company</BpkText>
              <a href="#" className={getClassName("App__footer-link")}>About us</a>
              <a href="#" className={getClassName("App__footer-link")}>Careers</a>
              <a href="#" className={getClassName("App__footer-link")}>Press</a>
            </div>
            <div className={getClassName("App__footer-column")}>
              <BpkText tagName="h4" className={getClassName("App__footer-title")}>Help</BpkText>
              <a href="#" className={getClassName("App__footer-link")}>FAQ</a>
              <a href="#" className={getClassName("App__footer-link")}>Contact</a>
              <a href="#" className={getClassName("App__footer-link")}>Privacy</a>
            </div>
          </div>
        </div>
        <div className={getClassName("App__footer-bottom")}>
          <BpkText tagName="p" className={getClassName("App__footer-text")}>
            © 2025 Skyscanner Ltd
          </BpkText>
        </div>
      </footer>
    </div>
  );
};

export default App;
