import React from "react";

export default function Tabs(props) {
  const { todos, selectedTab, setSelectedTab } = props;
  const tabs = ["All", "Active", "Completed"];
  return (
    <nav className="tab-container">
      {tabs.map((tab, tabIndex) => {
        const numOfTodos =
          tab === "All"
            ? todos.length
            : tab === "Active"
            ? todos.filter((val) => !val.completed).length
            : todos.filter((val) => val.completed).length;
        return (
          <button
            key={tabIndex}
            className={
              "tab-button " + (tab === selectedTab ? "tab-selected" : "")
            }
            onClick={() => setSelectedTab(tab)}
          >
            <h4>
              {tab} <span>({numOfTodos})</span>
            </h4>
          </button>
        );
      })}
      <hr />
    </nav>
  );
}
