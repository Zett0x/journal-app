import React from "react";
import { Link } from "react-router-dom";
import { JournalEntries } from "./JournalEntries";

export const Sidebar = () => {
  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i>
          <span> Test</span>
        </h3>
        <button className="btn">Log out</button>

        <Link to="/auth/login" className="temp-link">
          temp-link
          {/* BORRAR ESTE LINK, ESOLO PARA TEST*/}
        </Link>
      </div>
      <div className="journal__new-entry">
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">New entry</p>
      </div>
      <JournalEntries />
    </aside>
  );
};
